# Auditoria de segurança e privacidade — Colégio CPPEM

Data: 07/10/2026, referência America/Fortaleza.

**Revalidação posterior:** o workspace recebeu mudanças nas proteções dos formulários após o estado descrito neste relatório inicial. Consulte [o teste atualizado de frequência e deduplicação](TESTES-FREQUENCIA-DEDUPLICACAO.md): há bloqueio local e deduplicação normal funcionando, com limitações reproduzidas entre instâncias e em recuperação de falha. Os achados abaixo preservam a evidência histórica da auditoria inicial.

Projeto: `C:\Projetos\cppem\Sites CPPEM\siteColegioCPPEM-Novo`. Commit de referência: `3f309da`. Os dois banners já estavam modificados antes da auditoria e foram preservados.

**Conclusão:** há lacunas relevantes de privacidade e resistência a abuso que devem ser corrigidas antes de considerar este projeto pronto para receber dados de famílias em produção. Não foi demonstrado vazamento, invasão, execução remota de código ou exploração dos avisos do Next.js. A revisão técnica não permite declarar conformidade LGPD de toda a organização.

Foram acrescentados somente este relatório, evidências e um utilitário de reprodução isolada. Nenhuma correção foi aplicada à aplicação; não houve deploy, cadastro real, alteração no Notion ou envio de mensagem.

## Escopo e limites

- Revisão das rotas e componentes do site, das três Server Actions públicas, validação de dados, upload de logos, integrações Notion/n8n, rastreamento, configurações, dependências e exposição de segredos.
- Consulta de documentação da versão instalada em `node_modules/next/dist/docs/`, avisos dos mantenedores, LGPD e orientações ANPD.
- `npm audit` completo e sem dependências de desenvolvimento, ESLint e TypeScript.
- Testes locais das funções reais, transpilation TypeScript e dependências externas simuladas; não são testes HTTP nem de WAF.
- GETs de baixo volume no domínio público, sem submissões, exploração de vulnerabilidades ou testes de carga.
- Consulta autenticada apenas dos metadados dos cinco bancos Notion usados pelo código; nenhum registro de aluno ou responsável foi consultado.
- O navegador não estava disponível. Não foi possível observar execução de tags, cookies, armazenamento ou requisições disparadas pelo navegador.
- Não foram auditados painéis de hospedagem/GTM/PixelX, membros e permissões completas do Notion, implementação do workflow n8n, logs operacionais, contratos e autorizações de imagem. O portal `escola.cppem.com.br` e os outros sites vinculados são sistemas distintos, sem código neste checkout.

**Divergência de publicação:** `https://colegio.cppem.com.br/` respondeu 200, mas `/matriculas/fundamental-1`, `/parceiros` e `/empresas` responderam 404. A navegação do HTML público também difere deste projeto. Portanto, os achados de código se referem ao checkout; não se atribui sua versão de Next.js ou suas Server Actions ao deploy público. Os cabeçalhos observados pertencem ao domínio consultado, cuja correspondência com este checkout não foi comprovada.

## Fluxos de dados encontrados

| Entrada | Dados | Destino observado no código | Observações |
| --- | --- | --- | --- |
| Inscrição | Nome do responsável e aluno, e-mail, telefone, gênero, série, segmento, observações | Banco Notion de inscrições | Nome completo e gênero do aluno são obrigatórios; observações livres podem receber dados sensíveis |
| Aviso de inscrição | Identificador da página Notion e nome do evento | Webhook n8n | O código descreve notificação posterior em grupo WhatsApp; conteúdo e destinatários do workflow não foram verificados |
| Proposta de parceria | Empresa, categoria, responsável, telefone, e-mail, benefício, Instagram, logo | Banco/arquivos Notion de parceiros | Proposta entra como `Novo`; publicação exige `Ativo` |
| Convênio | Empresa, CNPJ opcional, ramo, porte, responsável, cargo, telefone, e-mail, mensagem | Banco Notion de convênios | Não há rota de leitura pública desses pedidos no projeto |
| Navegação e formulário | Loader GTM global; campos preparados para captura PixelX de nome/e-mail/telefone | Container externo `sgtm.cppem.com.br` | Configuração efetiva das tags, dados enviados e bases legais precisam de validação no painel/navegador |
| Clique após inscrição | Nome do aluno e série em mensagem pré-preenchida | URL `wa.me` | Só há navegação mediante clique; inclui dados do aluno no parâmetro `text` |
| Fotos/vídeo | Imagens de alunos e vídeo institucional | Assets públicos e YouTube após clique | Autorizações e critérios de publicação são documentação externa |

## Achados prioritários

### A01 — Alta prioridade: rastreamento sem controle de preferência no projeto

**Evidência:** `app/layout.tsx:51-61` instala GTM globalmente com `afterInteractive` e iframe `noscript`, sem consultar uma preferência. `lib/tracking.ts:1-15`, `lib/lead-validation.ts:11-22` e `components/matriculas/enrollment-form.tsx:14-22,124-125` documentam integração com PixelX para captura de leads. Não há interface nem armazenamento de preferências de privacidade no código examinado.

O formulário informa em `components/matriculas/enrollment-form.tsx:207-208` que os dados são usados somente para contato da equipe de matrículas. Essa explicação não esclarece a integração de rastreamento documentada no próprio código. A renomeação de campos dos demais formulários para evitar captura automática não constitui isolamento dos dados em relação a scripts de terceiros.

**Limite da conclusão:** carregamento incondicional do container e falta de controle no projeto estão confirmados. Não foi demonstrado que dados de crianças foram enviados a plataformas publicitárias ou que cookies publicitários foram gravados antes de consentimento. O JavaScript público do container contém referências a consentimento; isso, isoladamente, não comprova Consent Mode configurado nem bloqueio adequado das tags.

**Ação recomendada:** inventariar tags, finalidades e bases legais; separar atendimento solicitado de marketing; implementar preferência granular e revogável quando o consentimento for a base adotada. Bloquear tags não necessárias até a escolha correspondente, inclusive caminhos `noscript`. Impedir captura de nome do aluno, observações e outros dados escolares por tags. Manter o envio de inscrição funcional quando marketing for recusado.

**Aceite:** navegador limpo permite aceitar, recusar e rever a escolha; inspeção de rede confirma bloqueio e ausência de dados pessoais em eventos de marketing não autorizados. Referência: [guia ANPD sobre cookies](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais).

### A02 — Alta prioridade: transparência e minimização insuficientes para dados de menores

**Evidência:** `components/matriculas/enrollment-form.tsx:135-188`, `lib/lead-validation.ts:39-44` e `lib/notion/inscricoes.ts:26-38` exigem e armazenam nome completo, gênero e série do aluno, além do contato do responsável. A mensagem aberta “Algo que a gente deva saber?” pode induzir envio de informações médicas. Não há aviso de privacidade completo ou link para ele nos três formulários e na navegação do projeto. No domínio público, os dois caminhos usuais de política consultados responderam 404; isso não exclui documento em outro endereço.

**Risco:** coleta maior que a necessária na fase de primeiro contato, informações insuficientes sobre finalidade/compartilhamento/retenção/direitos e entrada de dados sensíveis por texto livre. Ausência de documento no repositório não prova ausência de uma base legal ou procedimento fora do site.

**Ação recomendada:** documentar a base legal por finalidade e avaliar o melhor interesse dos menores; justificar cada campo, retirando gênero e nome completo desta etapa caso não sejam necessários. Evitar informação de saúde em formulário comercial. Publicar aviso com controlador, contato para direitos, finalidades, categorias de destinatários, retenção e transferências. Registrar versão do aviso apresentado; se houver consentimento, registrar sua prova e permitir revogação.

Não se deve resolver tudo com uma caixa obrigatória de consentimento genérico. A ANPD admite as hipóteses legais dos arts. 7º e 11 para crianças/adolescentes, observada a prevalência de seu melhor interesse; a hipótese precisa ser adequada ao caso. Referências: [LGPD, especialmente arts. 6º, 9º, 14 e 18](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) e [Enunciado ANPD sobre menores](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-divulga-enunciado-sobre-o-tratamento-de-dados-pessoais-de-criancas-e-adolescentes).

**Aceite:** coleta mínima aprovada pelo controlador, aviso acessível em todos os pontos de coleta e processo verificável para acesso, correção e eliminação quando cabível.

### A03 — Alta prioridade: formulários sem limitação de abuso e sem idempotência na aplicação

**Evidência:** `app/matriculas/actions.ts:20-47`, `app/parceiros/actions.ts:39-76` e `app/parceiros/corporate-actions.ts:22-50` dependem de honeypot e validação de campos. Não há quota por solicitante, desafio verificado no servidor ou idempotência. O espaçamento de 340 ms em `lib/notion/client.ts:11-23` regula saída para a API numa instância; não impede novos pedidos nem limita o conjunto de instâncias.

**Reprodução:** o teste isolado executou três solicitações idênticas consecutivas para cada action, todas aceitas e encaminhadas à persistência simulada. Preencher o honeypot impediu persistência; deixá-lo vazio permitiu os pedidos. Nenhum dado real foi gravado.

**Impacto:** spam, duplicação, consumo de API/armazenamento e potencial sobrecarga de notificações e atendimento. Controles de CDN/WAF poderiam mitigar parte do risco, mas não foram verificados. Um formulário público não precisa exigir login para ser seguro; a falta de login não é o achado.

**Ação recomendada:** rate limit compartilhado e proporcional ao tráfego, limites globais, mitigação de bots validada no servidor e chave de idempotência por envio. Avaliar privacidade de qualquer fornecedor de CAPTCHA. Preservar a proteção nativa de origem das Server Actions.

**Aceite:** limites produzem rejeição controlada antes de chamar Notion/n8n; reenvio do mesmo pedido não duplica registro nem aviso; usuários legítimos compartilham redes sem bloqueio excessivo.

### A04 — Prioridade média, atualização em curto prazo: dependências com avisos conhecidos

Versões verificadas: Next.js `16.3.7`, React/React DOM `19.2.8`, `braces` `3.0.3`, `source-map-js` `1.2.1`.

`npm audit`: **7 entradas de pacotes classificadas como high e 0 critical**. `npm audit --omit=dev`: **2 entradas high**, Next.js e source-map-js. Isso não significa sete falhas independentes exploráveis: cinco entradas do relatório completo decorrem da cadeia ESLint → fast-glob → micromatch → braces; Next.js reúne seis advisories na mesma entrada.

| Advisory | Aplicabilidade observada neste projeto |
| --- | --- |
| [SSRF no otimizador de imagens](https://github.com/vercel/next.js/security/advisories/GHSA-cjq9-62q9-8jv4) | `images.remotePatterns` não está configurado. O mantenedor informa que essa condição não é afetada; não foi demonstrada SSRF neste projeto |
| [Cache poisoning Pages Router/self-hosted](https://github.com/vercel/next.js/security/advisories/GHSA-4jqv-mc3x-m676) | Este projeto usa App Router, sem `pages/`; condição descrita não encontrada |
| [Cache poisoning com catch-all na raiz](https://github.com/vercel/next.js/security/advisories/GHSA-mcj8-r9mp-w47p) | Não há rota catch-all na raiz; condição descrita não encontrada |
| [Vazamento Draft Mode/use cache](https://github.com/vercel/next.js/security/advisories/GHSA-3w37-wq28-93x7) | Não foram encontrados Draft Mode nem diretiva `use cache`; `unstable_cache` não equivale automaticamente a essa condição |
| [Bypass em rotas de imagens de metadados](https://github.com/vercel/next.js/security/advisories/GHSA-f87g-xv8r-7p7x) | Há `dynamicParams=false`, mas não há handlers dinâmicos `opengraph-image`/`twitter-image` que exponham conteúdo privado |
| [MCP do servidor de desenvolvimento](https://github.com/vercel/next.js/security/advisories/GHSA-39w2-rjm5-chcv) | Relevante ao ambiente `next dev`; exposição externa desse ambiente não foi auditada |
| `braces`, GHSA-vfj7-8cjw-p6xm | Cadeia de ferramentas ESLint; não foi encontrado fluxo de padrões fornecidos por visitantes para essa biblioteca |
| `source-map-js`, GHSA-68fv-2mgg-jv7q | Também chega por PostCSS dependência do Next, por isso permanece no audit de produção; não há upload/processamento de source maps de visitantes identificado |

**Ação recomendada:** atualizar Next.js para versão corrigida compatível, no mínimo `16.3.8` para os seis avisos listados conforme o registro npm consultado; alinhar pacotes Next relacionados e corrigir transitivas. O audit sugeriu `16.4.0` como atualização disponível. Não executar `npm audit fix --force` indiscriminadamente: para ESLint ele sugeriu regressão para `14.2.35`, não uma correção segura automaticamente aplicável. Referência de release: [Next.js 16.3.8](https://github.com/vercel/next.js/releases/tag/v16.3.8).

**Aceite:** árvore de dependências revisada, novos audits sem esses avisos ou exceções documentadas, lint/typecheck/build e regressão de formulários aprovados em ambiente sem efeitos reais.

### A05 — Prioridade média: falta de cabeçalhos de defesa em profundidade

**Evidência:** `next.config.ts` não define cabeçalhos. No domínio público consultado, as respostas não apresentaram `Content-Security-Policy`, `Content-Security-Policy-Report-Only`, `X-Frame-Options`, `Strict-Transport-Security` ou `Permissions-Policy`. Foram observados `X-Content-Type-Options: nosniff` e `Referrer-Policy: strict-origin-when-cross-origin`.

**Impacto:** ausência de uma camada adicional contra inclusão indevida em frames e execução/carregamento de recursos não previstos. Isso não comprova XSS existente. Ausência de HSTS na resposta não determina, sozinha, a situação de preload ou política herdada do domínio pai.

**Ação recomendada:** política CSP compatível com Next e serviços necessários, incluindo `frame-ancestors`; proteção anti-frame; política de permissões e HSTS após validar HTTPS e subdomínios. Testar CSP em report-only antes de bloquear e evitar registrar dados pessoais nos relatórios. Revisar lista de origens externas de imagens/scripts.

**Aceite:** validar os cabeçalhos no deploy correspondente ao checkout e regressão de GTM autorizado, fontes, imagens, navegação e vídeo. Não extrapolar os cabeçalhos do domínio atual como configuração comprovada deste deploy futuro.

### A06 — Prioridade média: credencial única para conteúdo público e cadastros pessoais

**Evidência:** `lib/notion/client.ts:4,26-34` usa um único `NOTION_TOKEN`; todos os módulos de dados importam esse cliente. A consulta de metadados confirmou que a credencial do site acessa os cinco bancos: inscrições, banners, eventos, parceiros e convênios.

**Impacto:** maior alcance de uma eventual exposição da credencial ou comprometimento do servidor. A observação não demonstra permissões administrativas nem acesso a todos os outros bancos da organização.

**Ação recomendada:** separar leitura de conteúdo editorial de operações sobre leads; restringir compartilhamento e capacidades de cada integração ao necessário, quando suportado. Isolar credenciais de desenvolvimento/produção e revisar membros, convidados, MFA e integrações dos bancos. O comentário de `.env.example` sobre integração compartilhada com outro site é indício documental, não comprovação de reutilização atual.

**Resultado favorável:** os cinco bancos retornaram `public_url` vazio e não estavam na lixeira. Isso não substitui auditoria de links compartilhados, herança de acesso ou páginas-filhas.

### A07 — Baixa prioridade: validação superficial de upload

**Evidência/reprodução:** `app/parceiros/actions.ts:25-29,63-69` reconhece PNG pelos primeiros quatro bytes. Um arquivo de somente quatro bytes passou pela action e chegou à persistência simulada como logo. Não é uma imagem válida. Aceitação final pelo Notion não foi testada.

**Impacto:** arquivos inválidos/metadados não tratados chegam à integração; não foi demonstrado XSS ou execução de arquivo. Há controles úteis: nome gerado pelo servidor, formatos restritos, limite de tamanho e aprovação manual antes de publicar.

**Ação recomendada:** decodificar a imagem com biblioteca atualizada, impor limites de dimensões/pixels e recodificar removendo metadados, antes de enviar ao fornecedor. Rejeitar conteúdo truncado com mensagem controlada.

**Inconsistência adicional:** interface/action anunciam 2 MB, mas a configuração não aumenta o limite padrão de 1 MB do corpo de Server Actions. Parte dos arquivos anunciados como aceitos pode ser recusada antes da action. Alinhar limites sem liberar corpos arbitrariamente grandes; considerar overhead multipart. Fonte: documentação instalada `.../serverActions.md:59-77`.

### A08 — Baixa prioridade: chave de segmento herdada causa erro não tratado

**Evidência:** `app/matriculas/actions.ts:21-23,39` consulta objeto comum por chave enviada pelo cliente. `__proto__` e `constructor` resultam em valor truthy, passam pelo `if (!info)` e fazem a validação acessar `series.includes` com `series` indefinido.

**Reprodução:** ambos geraram exceção não tratada no teste isolado, antes da persistência. Não é prototype pollution: não houve escrita no protótipo. Não se demonstrou queda do processo ou indisponibilidade geral.

**Ação recomendada:** validar com `Object.hasOwn(enrollmentInfo, segmentId)` ou allowlist explícita. Responder erro de validação para qualquer chave fora do domínio esperado.

### A09 — Baixa prioridade: campo Instagram aceita outros domínios

**Evidência/reprodução:** `app/parceiros/actions.ts:32-36` preserva qualquer texto iniciado por `https://`. `https://example.invalid/` passou no teste isolado. `lib/notion/partners.ts:59` verifica somente protocolo e `components/partners/partner-directory.tsx:141-144` apresenta o link com rótulo Instagram após aprovação.

**Impacto:** parceiro aprovado sem revisão desse campo pode direcionar visitante a outro site sob rótulo confiável. Não há publicação automática: `Status=Novo` e filtro `Ativo` reduzem a exposição.

**Ação recomendada:** analisar URL e aceitar apenas hosts e caminhos do serviço esperado; restringir formato de handles e manter revisão editorial de links.

## Governança LGPD que permanece a comprovar

Esses itens dependem de documentos, pessoas e painéis; ausência no código não prova inexistência na organização.

| Tema | Evidência necessária para fechar a avaliação |
| --- | --- |
| Bases legais e melhor interesse | Registro de finalidades, campos necessários, públicos e justificativas, incluindo distinção entre atendimento e marketing |
| Retenção e descarte | Prazos por finalidade; eliminação/anonimização de leads descartados e cópias em fornecedores, logs, backups e mensagens; o status `Descartado` não apaga dados |
| Direitos dos titulares | Canal divulgado e procedimento de autenticação proporcional, resposta, correção e exclusão quando aplicável |
| Notion/n8n/WhatsApp | Pessoas com acesso, conteúdo das notificações, minimização, retenção de execuções, autenticação real do webhook, deduplicação e saída de colaboradores do grupo |
| Operadores e transferência internacional | Contratos, localização e suboperadores reais, instruções de tratamento e mecanismo de transferência aplicável; não presumir irregularidade só por usar fornecedor estrangeiro |
| Fotos de alunos | Autorizações/bases adequadas ao uso, finalidade, controle de vigência e processo de retirada de imagens e cópias em cache |
| Incidentes e recuperação | Responsáveis, inventário, trilhas de auditoria sem exposição excessiva de dados, restauração testada, revogação de credenciais e processo de comunicação quando cabível |
| Hospedagem e desenvolvimento | MFA, controle de acesso, proteção de previews, segregação de ambientes, WAF e exposição de `next dev` |
| ECA Digital | Avaliação jurídica da incidência da Lei 15.211/2025 ao serviço e ao acesso provável por menores; não inferida apenas por ser site de escola |

Referências oficiais: [ANPD — transferências internacionais](https://www.gov.br/anpd/pt-br/assuntos/noticias/resolucao-normatiza-transferencia-internacional-de-dados) e [Lei 15.211/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm).

## Controles positivos verificados

- Integrações sensíveis marcadas `server-only`; token Notion e segredo n8n não usam prefixo público.
- `.env.local` ignorado pelo Git. Só `.env.example` está versionado; a consulta de histórico pelos nomes `.env`, `.env.local` e `.env.production` não encontrou commits. Não foi feita varredura integral de todo o histórico.
- Varredura por padrões em 83 arquivos de texto versionados não encontrou credenciais; busca pelos valores dos segredos locais em 15 arquivos do bundle cliente existente não encontrou correspondências. O bundle não foi reconstruído e a busca não prova ausência universal de segredos.
- Os três formulários validam entradas no servidor e impõem limites de comprimento. A validação de e-mail e série inválidos foi exercitada sem persistir dados.
- Novas propostas de parceiro ficam como `Novo`; listagem pública filtra `Ativo` e constrói um objeto com campos públicos, sem repassar e-mail/telefone interno do responsável.
- JSON-LD escapa `<`, reduzindo o risco de fechamento de script por conteúdo serializado. Conteúdo textual é renderizado pelo React.
- Webhook configurado localmente usa HTTPS, exige segredo presente para envio, usa timeout de 4 segundos e transmite somente evento e pageId. A validação do segredo pelo receptor não foi verificada.
- YouTube só é instanciado após clique, usando domínio `youtube-nocookie.com`; isso não significa ausência absoluta de tratamento pelo fornecedor após o clique.
- Não foi encontrado endpoint público de listagem de alunos, autenticação própria, SQL ou execução de comandos a partir de campos dos formulários.

## Evidências e validações

| Verificação | Resultado / arquivo |
| --- | --- |
| Lint do projeto antes dos artefatos | `npm run lint`: concluído sem erros |
| TypeScript | `npx tsc --noEmit --incremental false`: concluído sem erros |
| Dependências completas | [npm-audit.json](npm-audit.json); exit 1 significa vulnerabilidades reportadas, não falha da consulta |
| Dependências sem dev | [npm-audit-producao.json](npm-audit-producao.json) |
| Funções reais com integrações simuladas | [resultados-actions.json](resultados-actions.json), 11 verificações/observações |
| Reprodução local | `node docs/auditoria-2026-10-07/verificar-actions.cjs` — não carrega `.env`, usa importações restritas e mocks de persistência/notificação |
| Respostas públicas | [http-publico.json](http-publico.json) — status, cabeçalhos selecionados e navegação, sem corpos de formulários |
| Notion | [notion-metadata.json](notion-metadata.json) — metadados somente, sem alunos/responsáveis nem credenciais |

Não foi realizado build novo, pentest intrusivo, teste de carga, exploração de CVEs, submissão real ou validação visual em navegador. Lint e typecheck não são provas de segurança.

## Ordem proposta para correção

1. Resolver A01/A02: rastreamento, informação ao titular, minimização e tratamento de dados de menores, com decisões do controlador sobre finalidades e bases legais.
2. Implementar A03 e atualizar dependências de A04; verificar em ambiente com integrações simuladas antes de publicar.
3. Aplicar cabeçalhos e segregação de credenciais, depois fortalecer upload e validações pontuais.
4. Confirmar qual deploy corresponde a este projeto; validar HTTP e navegador nesse ambiente e concluir os itens de governança junto aos responsáveis pelos serviços.

Não há fundamento nesta revisão para afirmar que o sistema foi invadido. Há evidência suficiente para priorizar correções antes de ampliar a coleta e as campanhas.
