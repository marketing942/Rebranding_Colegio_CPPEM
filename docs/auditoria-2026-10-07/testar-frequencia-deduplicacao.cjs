/* eslint-disable @typescript-eslint/no-require-imports -- teste CommonJS isolado */
// Executa actions, guard e persistência reais com cabeçalhos, relógio e API Notion simulados.
// Não carrega .env, não usa rede e não envia notificações reais.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '../..');
const initialTime = Date.UTC(2026, 9, 7, 15);

function database() {
  const state = { rows: [], queries: 0, writes: 0, notifications: 0, failQuery: false, queryDelay: 0 };
  state.client = {
    dataSources: { async query({ data_source_id, filter }) {
      state.queries++;
      if (state.failQuery) throw new Error('Falha simulada na consulta');
      const results = state.rows.filter(row => row.source === data_source_id && filter.and.every(f => {
        if (f.timestamp) return row.created >= Date.parse(f.created_time.on_or_after);
        const actual = row.properties[f.property];
        if (f.email) return actual?.email === f.email.equals;
        if (f.title) return actual?.title?.[0]?.text.content === f.title.equals;
        if (f.select) return actual?.select?.name === f.select.equals;
        throw new Error('Filtro não suportado pelo simulador');
      })).slice(0, 1).map(row => ({ id: row.id }));
      // A consulta captura um snapshot antes do atraso: reproduz duas leituras antes das gravações.
      if (state.queryDelay) await new Promise(resolve => setTimeout(resolve, state.queryDelay));
      return { results };
    } },
    pages: { async create({ parent, properties }) {
      state.writes++;
      const row = { id: 'fake-' + state.writes, source: parent.data_source_id, properties, created: state.clock() };
      state.rows.push(row);
      return { id: row.id };
    } },
  };
  return state;
}

function instance(db) {
  const clock = { now: initialTime, ip: '192.0.2.1' };
  db.clock ??= () => clock.now;
  class TestDate extends Date { constructor(...args) { super(...(args.length ? args : [clock.now])); } static now() { return clock.now; } }
  const cache = new Map();
  const errors = [];
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const filename = path.join(root, file);
    const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }, fileName: filename,
    }).outputText;
    const mod = { exports: {} };
    cache.set(file, mod.exports);
    vm.runInNewContext(output, {
      module: mod, exports: mod.exports, FormData, File, Blob, Uint8Array, Date: TestDate,
      console: { error: (...args) => errors.push(args.join(' ')), warn() {}, log() {} },
      process: { env: { NOTION_ENROLLMENTS_DATABASE_ID: 'fake-enrollments' } },
      require(id) {
        if (id === 'server-only') return {};
        if (id === 'node:crypto') return require('node:crypto');
        if (id === 'next/headers') return { headers: async () => new Headers(clock.ip ? { 'x-forwarded-for': clock.ip } : {}) };
        if (id === 'next/cache') return { unstable_cache: fn => fn };
        if (id === '@/lib/notion/client') return { notion: db.client, NOTION_CACHE_SECONDS: 300 };
        if (id === '@/lib/notion/properties') return { resolveDataSourceId: async id => id };
        if (id === '@/lib/notify-enrollment') return { notifyEnrollment: async () => { db.notifications++; } };
        if (id.startsWith('@/lib/')) return load(id.slice(2) + '.ts');
        throw new Error('Importação bloqueada: ' + id);
      },
    }, { filename, timeout: 5000 });
    return mod.exports;
  }
  return { clock, errors, load };
}

const definitions = [
  { name: 'inscricao', file: 'app/matriculas/actions.ts', fn: 'submitEnrollment', data: { segment: 'fundamental-1', name: 'Responsavel Teste', student: 'Aluno Ficticio', email: 'audit@example.invalid', phone: '81999990000', series: '1º ano', notes: '' }, vary: (v, i) => ({ ...v, student: 'Aluno Ficticio ' + i }) },
  { name: 'parceiro', file: 'app/parceiros/actions.ts', fn: 'submitPartnerProposal', data: { company: 'Empresa Ficticia', category: 'Saúde', responsavel: 'Contato Teste', contato: '81999990000', correio: 'audit@example.invalid', benefit: '', instagram: '' }, vary: (v, i) => ({ ...v, company: 'Empresa Ficticia ' + i }) },
  { name: 'convenio', file: 'app/parceiros/corporate-actions.ts', fn: 'submitCorporateRequest', data: { empresa_conv: 'Empresa Ficticia', porte: 'Até 20', responsavel_conv: 'Contato Teste', contato_conv: '81999990000', correio_conv: 'audit@example.invalid' }, vary: (v, i) => ({ ...v, empresa_conv: 'Empresa Ficticia ' + i }) },
];
function form(values) { const data = new FormData(); for (const [key, value] of Object.entries(values)) data.set(key, value); return data; }
function call(inst, def, values = def.data) { return inst.load(def.file)[def.fn]({ status: 'idle' }, form(values)); }
const results = [];
function result(action, scenario, expectation, observed, limitation = false) {
  results.push({ action, scenario, expectation, observed, limitation });
}

async function main() {
  for (const def of definitions) {
    {
      const db = database(), inst = instance(db);
      const statuses = [];
      for (let i = 0; i < 8; i++) statuses.push((await call(inst, def, def.vary(def.data, i))).status);
      assert.equal(statuses.filter(s => s === 'success').length, 5);
      assert.equal(db.writes, 5);
      assert.equal(db.queries, 5);
      result(def.name, '8 solicitações diferentes, mesmo IP', '5 aceitas, 3 bloqueadas antes do Notion', { statuses, writes: db.writes, queries: db.queries });
      inst.clock.now += 10 * 60_000;
      assert.equal((await call(inst, def, def.vary(def.data, 8))).status, 'success');
      result(def.name, 'fim da janela de frequência', 'novo envio permitido após 10 minutos', { allowed: true });
    }
    {
      const db = database(), inst = instance(db);
      const statuses = [];
      for (let i = 0; i < 20; i++) statuses.push((await call(inst, def)).status);
      assert.ok(statuses.every(s => s === 'success'));
      assert.equal(db.writes, 1);
      assert.equal(db.queries, 1);
      if (def.name === 'inscricao') assert.equal(db.notifications, 1);
      result(def.name, '20 reenvios idênticos sequenciais', '1 registro; reenvios respondem sucesso', { successes: 20, writes: db.writes, notifications: db.notifications });
      inst.clock.now += 30 * 60_000;
      assert.equal((await call(inst, def)).status, 'success');
      assert.equal(db.writes, 1);
      result(def.name, 'limite exato de 30 minutos', 'consulta Notion inclui registro na fronteira da janela', { writes: db.writes });
      // O reenvio aceito como duplicado renova o cache local por mais 30 minutos.
      inst.clock.now += 30 * 60_000 + 1;
      assert.equal((await call(inst, def)).status, 'success');
      assert.equal(db.writes, 2);
      result(def.name, 'fim da janela de deduplicação sem cache ativo', 'novo registro permitido após expirar o registro e o cache', { writes: db.writes });
    }
    {
      const db = database(); db.queryDelay = 5;
      const inst = instance(db);
      const states = await Promise.all(Array.from({ length: 5 }, () => call(inst, def)));
      assert.ok(states.every(s => s.status === 'success'));
      assert.equal(db.writes, 1);
      result(def.name, '5 reenvios simultâneos, mesma instância', '1 registro', { writes: db.writes, queries: db.queries, notifications: db.notifications });
    }
    {
      const db = database(), first = instance(db);
      await call(first, def);
      const second = instance(db);
      assert.equal((await call(second, def)).status, 'success');
      assert.equal(db.writes, 1);
      result(def.name, 'reenvio sequencial em outra instância', 'consulta persistente evita segundo registro', { instances: 2, writes: db.writes, queries: db.queries });
    }
    {
      const db = database(); db.queryDelay = 10;
      const a = instance(db), b = instance(db);
      await Promise.all([call(a, def), call(b, def)]);
      assert.equal(db.writes, 2);
      result(def.name, 'envios simultâneos em instâncias diferentes', 'medir proteção contra corrida entre consulta e criação', { instances: 2, writes: db.writes, notifications: db.notifications }, true);
    }
    {
      const db = database(), a = instance(db), b = instance(db);
      const states = [];
      for (const inst of [a, b]) for (let i = 0; i < 5; i++) states.push(await call(inst, def, def.vary(def.data, states.length)));
      assert.ok(states.every(s => s.status === 'success'));
      assert.equal(db.writes, 10);
      result(def.name, 'mesmo IP distribuído por duas instâncias', 'medir se quota é global', { accepted: 10, writes: db.writes, instances: 2 }, true);
    }
    {
      const db = database(), inst = instance(db);
      let allowed = 0;
      for (let i = 0; i < 61; i++) { inst.clock.ip = '192.0.2.' + i; if ((await call(inst, def, def.vary(def.data, i))).status === 'success') allowed++; }
      assert.equal(allowed, 60);
      result(def.name, '61 solicitações diferentes, IPs diferentes', 'limite de 60 por formulário na instância', { accepted: allowed, blocked: 1, writes: db.writes });
    }
    {
      const db = database();
      await call(instance(db), def);
      db.failQuery = true;
      await call(instance(db), def);
      assert.equal(db.writes, 2);
      result(def.name, 'Notion falha na consulta, mas aceita criação', 'medir comportamento de falha aberta da deduplicação', { writes: db.writes }, true);
    }
  }
  {
    const db = database(), inst = instance(db), guard = inst.load('lib/request-guard.ts');
    let runs = 0;
    const task = async () => { runs++; if (runs === 1) { await new Promise(r => setTimeout(r, 5)); throw new Error('Primeira gravação falhou'); } await new Promise(r => setTimeout(r, 5)); return 'created'; };
    const settled = await Promise.allSettled(Array.from({ length: 3 }, () => guard.runOnce('failure-retry', task)));
    assert.equal(runs, 3);
    result('guard', 'primeira tarefa falha e dois reenvios aguardam', 'medir exclusão mútua após falha', { taskExecutions: runs, successfulCreates: settled.filter(s => s.status === 'fulfilled' && s.value === 'created').length }, true);
  }
  const output = { date: '2026-10-07', mode: 'actual-source-with-mocked-notion-clock-and-request-headers', liveNotionWrites: 0, liveNotifications: 0, httpAndHostingNotTested: true, checks: results.length, results };
  fs.writeFileSync(path.join(__dirname, 'resultados-frequencia-deduplicacao.json'), JSON.stringify(output, null, 2));
  console.log(JSON.stringify(output, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
