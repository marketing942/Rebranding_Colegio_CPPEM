# Revalidação de frequência e deduplicação

Data: 07/10/2026. Projeto `siteColegioCPPEM-Novo`.

O código examinado nesta revalidação já contém proteções que não existiam na auditoria inicial. As mudanças estavam no workspace antes deste teste. Nenhuma correção foi aplicada às funções da aplicação nesta revalidação.

**Resultado:** a proteção funciona numa instância para o uso normal, mas não oferece quota global nem garantia de unicidade entre instâncias. Não se deve considerar encerrado o risco de spam e duplicação em um deploy com múltiplas instâncias.

## Método

O utilitário executa o código TypeScript atual de `app/matriculas/actions.ts`, `app/parceiros/actions.ts`, `app/parceiros/corporate-actions.ts`, `lib/request-guard.ts`, `lib/notion/dedupe.ts` e as respectivas funções reais de persistência.

Somente a API Notion, as notificações, os cabeçalhos recebidos e o relógio foram simulados. O simulador Notion respeita os filtros usados pelo código e permite atrasar consultas para reproduzir a sequência: duas consultas sem resultado, seguidas de duas criações.

Não carrega `.env`, não usa rede, não grava no Notion real e não envia mensagens. Não valida HTTP, proxy, WAF, configuração da Vercel nem semântica completa/consistência da API Notion. Os resultados de corrida mostram ausência de garantia na lógica da aplicação; não demonstram que duplicatas já ocorreram em produção.

Execução na raiz: `node docs/auditoria-2026-10-07/testar-frequencia-deduplicacao.cjs`.

Evidência: [resultados-frequencia-deduplicacao.json](resultados-frequencia-deduplicacao.json). Foram executadas 34 verificações/observações, todas com os resultados esperados pelo teste. Algumas expectativas reproduzem limitações, portanto a conclusão não é “segurança aprovada”.

## Resultados dos três formulários

| Cenário | Resultado observado |
| --- | --- |
| 8 solicitações diferentes, mesmo IP, mesma instância | 5 aceitas e 3 bloqueadas antes da consulta/criação no Notion |
| Avançar o relógio 10 minutos | Novo envio diferente permitido |
| 20 reenvios idênticos sequenciais | 20 respostas de sucesso, mas apenas 1 consulta e 1 criação; inscrição gerou apenas 1 notificação simulada |
| 5 reenvios idênticos simultâneos, mesma instância | 1 consulta e 1 criação |
| Reenvio em outra instância depois de concluir a primeira gravação | A consulta ao Notion simulado encontra o registro e evita outra criação |
| 2 solicitações idênticas simultâneas em instâncias distintas | **2 registros criados**; inscrição gerou 2 notificações simuladas |
| 10 solicitações diferentes do mesmo IP divididas em duas instâncias | **10 aceitas**, porque cada instância mantém sua própria quota de 5 |
| 61 solicitações diferentes, IPs diferentes, mesma instância | 60 aceitas; a 61ª bloqueada pelo limite total do formulário |
| Falha na consulta de deduplicação, mas criação disponível | **Outra criação permitida**; comportamento de falha aberta já descrito no código |

A fronteira temporal de deduplicação também foi exercitada. Exatamente aos 30 minutos, o filtro `on_or_after` ainda inclui o registro. Quando essa duplicata é consultada, o cache local é renovado; por isso, a janela efetiva de uma instância pode se estender além de 30 minutos da criação inicial. Depois de expirar o registro na consulta e o cache local, novo cadastro é permitido.

## Falha adicional no mecanismo de exclusão mútua

Em `lib/request-guard.ts:70-82`, reenvios esperam uma tarefa em andamento. Quando a tarefa inicial falha, dois reenvios que estavam aguardando podem despertar e iniciar duas tarefas de criação. O teste direto de `runOnce` reproduziu uma falha inicial seguida de duas tarefas concluídas como `created`.

Esse caso não prova duas gravações reais do Notion: reproduz duas tarefas simultâneas permitidas pelo guard. Combinado com consulta antes da criação, também deixa a deduplicação exposta a corrida.

## O que precisa ser fortalecido

- **Limitação global:** usar armazenamento compartilhado ou controle equivalente de plataforma, com atualização atômica da quota. O contador atual é perdido em reinício e multiplicado por instâncias.
- **Unicidade:** substituir “consultar e depois criar” por aquisição atômica de chave/registro único compartilhado. Uma consulta Notion seguida de criação não é uma transação com restrição de unicidade.
- **Falha e recuperação:** controlar o estado da solicitação para evitar reenvio duplicado quando o resultado de uma criação é incerto; serializar corretamente reenvios após uma falha inicial.
- **Origem do IP:** confirmar que a hospedagem normaliza/remove cabeçalhos controlados pelo cliente. O código confia no primeiro valor de `x-forwarded-for`; a configuração de proxy não foi testada.
- **Regra de equivalência:** hoje, inscrição usa e-mail + aluno + série; parceria/convênio usam empresa + e-mail. Mudanças em telefone, mensagem ou benefício não diferenciam a solicitação no cache. Confirmar que esse comportamento corresponde ao atendimento desejado.

## PixelX e preferência de rastreamento

Para o uso descrito de reconhecer leads e medir campanhas, uma interface de consentimento pode controlar o rastreamento opcional, desde que a preferência seja aplicada tecnicamente às tags. O botão não pode apenas esconder o banner enquanto a PixelX continua carregada.

O fluxo recomendado é permitir aceitar, recusar e rever preferências; quando consentimento for a base escolhida, executar a coleta correspondente somente após a aceitação. Recusa deve preservar o envio da inscrição e o atendimento solicitado. Nome/e-mail/telefone usados para reconhecimento são dados pessoais mesmo quando esse é um uso habitual de marketing. Informar a finalidade e não enviar dados escolares do aluno para essas tags.

A política precisa considerar coleta sem cookies e chamadas server-side: desativar cookies isoladamente não bloqueia necessariamente todos os eventos ou a captura de campos. Nesta revalidação não foram alterados GTM/PixelX e não foi verificado o container em execução.

Referências oficiais: [guia ANPD sobre cookies](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais) e [recomendações ANPD para rejeição e gerenciamento](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-emite-recomendacoes-para-adequacao-da-pratica-de-coleta-de-cookies-do-portal-gov.br).
