/* eslint-disable @typescript-eslint/no-require-imports -- utilitário CommonJS isolado de auditoria */
// Auditoria isolada: executa o TypeScript real com persistência e notificações simuladas.
// Uso, na raiz do projeto: node docs/auditoria-2026-10-07/verificar-actions.cjs
// Não carrega .env e não acessa rede, Notion ou WhatsApp.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '../..');
const calls = { enrollment: [], partner: [], corporate: [], notify: [] };
const stubs = {
  '@/lib/notion/inscricoes': { saveEnrollment: async (v) => { calls.enrollment.push(v); return 'audit-fake-id'; } },
  '@/lib/notion/partners': { savePartnerProposal: async (v) => { calls.partner.push(v); } },
  '@/lib/notion/corporate': {
    EMPLOYEE_RANGES: ['Até 20', '21 a 50', '51 a 100', '101 a 300', 'Mais de 300'],
    saveCorporateRequest: async (v) => { calls.corporate.push(v); },
  },
  '@/lib/notify-enrollment': { notifyEnrollment: async (id) => { calls.notify.push(id); } },
};
const cache = new Map();
function load(relative) {
  if (cache.has(relative)) return cache.get(relative);
  const filename = path.join(root, relative);
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText;
  const mod = { exports: {} };
  cache.set(relative, mod.exports);
  const sandbox = {
    module: mod, exports: mod.exports, FormData, File, Blob, Uint8Array, console,
    require(id) {
      if (Object.hasOwn(stubs, id)) return stubs[id];
      if (['@/lib/matriculas', '@/lib/lead-validation', '@/lib/partners'].includes(id)) return load(id.slice(2) + '.ts');
      throw new Error('Importação bloqueada no teste isolado: ' + id);
    },
  };
  vm.runInNewContext(output, sandbox, { filename, timeout: 5000 });
  return mod.exports;
}
function form(values) { const f = new FormData(); for (const [key, value] of Object.entries(values)) f.set(key, value); return f; }
async function main() {
  const enrollment = load('app/matriculas/actions.ts').submitEnrollment;
  const partner = load('app/parceiros/actions.ts').submitPartnerProposal;
  const corporate = load('app/parceiros/corporate-actions.ts').submitCorporateRequest;
  const e = { segment: 'fundamental-1', name: 'Responsavel Teste', student: 'Aluno Ficticio', email: 'audit@example.invalid', phone: '81999990000', gender: 'Masculino', series: '1º ano', notes: '' };
  const p = { company: 'Empresa Ficticia', category: 'Saúde', responsavel: 'Contato Teste', contato: '81999990000', correio: 'audit@example.invalid', benefit: '', instagram: '' };
  const c = { empresa_conv: 'Empresa Ficticia', porte: 'Até 20', responsavel_conv: 'Contato Teste', contato_conv: '81999990000', correio_conv: 'audit@example.invalid' };
  const results = [];
  for (const [name, fn, data, bucket] of [['enrollment', enrollment, e, calls.enrollment], ['partner', partner, p, calls.partner], ['corporate', corporate, c, calls.corporate]]) {
    const start = bucket.length;
    for (let i = 0; i < 3; i++) assert.equal((await fn({status:'idle'}, form(data))).status, 'success');
    results.push({ test: 'repeated_identical_valid_submissions', action: name, accepted: bucket.length - start, attempts: 3 });
    const beforeHoney = bucket.length;
    assert.equal((await fn({status:'idle'}, form({...data, website:'bot'}))).status, 'success');
    assert.equal(bucket.length, beforeHoney);
    results.push({ test: 'filled_honeypot_blocks_persistence', action: name, passed: true });
  }
  const beforeInvalid = calls.enrollment.length;
  assert.equal((await enrollment({}, form({...e, email:'invalid', series:'99º ano'}))).status, 'error');
  assert.equal(calls.enrollment.length, beforeInvalid);
  results.push({ test:'invalid_email_and_series_blocked', passed:true });
  for (const segment of ['__proto__', 'constructor']) {
    let failure;
    try { await enrollment({}, form({...e, segment})); } catch (err) { failure = err.message; }
    assert.ok(failure);
    results.push({ test:'inherited_segment_key', segment, unhandledError:failure });
  }
  const fakePng = form(p);
  fakePng.set('logo', new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], 'not-an-image.png', {type:'image/png'}));
  assert.equal((await partner({}, fakePng)).status, 'success');
  assert.equal(calls.partner.at(-1).logo.data.size, 4);
  results.push({test:'four_byte_invalid_png_passes_application_validation', passed:true, bytes:4, notionAcceptanceNotTested:true});
  assert.equal((await partner({}, form({...p, instagram:'https://example.invalid/'}))).status, 'success');
  assert.equal(calls.partner.at(-1).instagram, 'https://example.invalid/');
  results.push({test:'instagram_field_accepts_unrelated_https_host', passed:true, publicationRequiresManualApproval:true});
  console.log(JSON.stringify({mode:'isolated-mocked-integrations', httpAndWafNotTested:true, results}, null, 2));
}
main().catch((err) => { console.error(err); process.exitCode = 1; });
