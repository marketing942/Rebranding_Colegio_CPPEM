/**
 * Política de Privacidade da CPPEM COLÉGIO E CURSOS LTDA (página /politica-de-privacidade).
 *
 * É o MESMO texto publicado na Central de Ajuda (https://central-de-ajuda.cppem.com.br/artigo/duvidas-gerais/politica-de-privacidade),
 * que vale para os cursos e para o Colégio. Arquivo gerado a partir daquela página: não edite o texto
 * aqui por conta própria. Quando a política mudar lá, gere este arquivo de novo.
 */
export type PolicySpan = { text: string; bold?: boolean };

export type PolicyBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; spans: PolicySpan[] }
  | { type: "list"; items: PolicySpan[][] }
  | { type: "table"; head: string[]; rows: string[][] };

export const PRIVACY_POLICY_SOURCE_URL = "https://central-de-ajuda.cppem.com.br/artigo/duvidas-gerais/politica-de-privacidade";

/** Data da última atualização, como aparece na política. */
export const PRIVACY_POLICY_UPDATED = "21 de setembro de 2026";

export const privacyPolicy: PolicyBlock[] = [
  {
    "type": "heading",
    "level": 2,
    "text": "1. Quem é o controlador"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "A controladora dos dados pessoais abrangidos por esta Política é "
      },
      {
        "text": "CPPEM COLÉGIO E CURSOS LTDA",
        "bold": true
      },
      {
        "text": ", inscrita no CNPJ sob nº "
      },
      {
        "text": "57.347.872/0001-48",
        "bold": true
      },
      {
        "text": ", com endereço na Praça Presidente Getúlio Vargas, nº 119, bairro Nossa Senhora das Dores, Caruaru/PE, CEP 55002-150 (“CPPEM”, “nós” ou “Controladora”)."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Esta Política se aplica às operações relacionadas aos cursos CPPEM, ao Colégio CPPEM, à loja, aos sites, às plataformas digitais, aos eventos e aos canais de atendimento administrados pela Controladora."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Encarregado pelo tratamento de dados pessoais (DPO):",
        "bold": true
      },
      {
        "text": " Elias Glaucio\n"
      },
      {
        "text": "E-mail para privacidade e exercício de direitos:",
        "bold": true
      },
      {
        "text": " pedagogico@cppem.com.br\n"
      },
      {
        "text": "WhatsApp de atendimento:",
        "bold": true
      },
      {
        "text": " (81) 97310-5354"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "2. Princípios e compromisso"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Tratamos dados pessoais de acordo com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD), observando finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "O uso dos nossos serviços não representa consentimento geral para qualquer tratamento. Cada operação deve possuir uma finalidade determinada e uma base legal adequada. Quando o consentimento for necessário, ele será solicitado de forma livre, informada, inequívoca, específica e destacada, podendo ser revogado a qualquer momento."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "3. A quem esta Política se aplica"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Esta Política alcança dados pessoais de:"
      }
    ]
  },
  {
    "type": "list",
    "items": [
      [
        {
          "text": "visitantes dos nossos sites, loja e plataformas;"
        }
      ],
      [
        {
          "text": "leads e pessoas interessadas em conteúdos, cursos, eventos ou matrículas;"
        }
      ],
      [
        {
          "text": "alunos, ex-alunos, candidatos e participantes de eventos;"
        }
      ],
      [
        {
          "text": "pais, mães, responsáveis legais e responsáveis financeiros;"
        }
      ],
      [
        {
          "text": "compradores, assinantes e usuários dos serviços;"
        }
      ],
      [
        {
          "text": "pessoas que entram em contato com nossos canais de atendimento;"
        }
      ],
      [
        {
          "text": "parceiros e representantes de pessoas jurídicas, quando aplicável."
        }
      ]
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Colaboradores e candidatos a vagas poderão estar sujeitos também a avisos internos específicos."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "4. Dados pessoais que podemos tratar"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Coletamos apenas os dados adequados, pertinentes e necessários para cada finalidade, que podem incluir:"
      }
    ]
  },
  {
    "type": "list",
    "items": [
      [
        {
          "text": "identificação e cadastro:",
          "bold": true
        },
        {
          "text": " nome, CPF, documento de identidade, data de nascimento, gênero quando necessário, fotografia, assinatura e dados de responsáveis legais;"
        }
      ],
      [
        {
          "text": "contato:",
          "bold": true
        },
        {
          "text": " e-mail, telefone, WhatsApp e endereço;"
        }
      ],
      [
        {
          "text": "dados acadêmicos e pedagógicos:",
          "bold": true
        },
        {
          "text": " matrícula, turma, frequência, notas, avaliações, progresso, participação, certificados, histórico e registros de atendimento pedagógico;"
        }
      ],
      [
        {
          "text": "dados contratuais e financeiros:",
          "bold": true
        },
        {
          "text": " produtos ou serviços contratados, valores, forma e status de pagamento, dados de cobrança, notas fiscais, reembolsos e histórico de compras. Dados completos de cartão são processados diretamente por provedores de pagamento e não devem ser armazenados pela CPPEM;"
        }
      ],
      [
        {
          "text": "dados de uso e segurança:",
          "bold": true
        },
        {
          "text": " endereço IP, data e hora de acesso, dispositivo, navegador, sistema operacional, registros de autenticação, páginas acessadas, eventos de navegação e identificadores de cookies;"
        }
      ],
      [
        {
          "text": "comunicações:",
          "bold": true
        },
        {
          "text": " mensagens, gravações quando previamente informadas, solicitações, reclamações e registros de suporte;"
        }
      ],
      [
        {
          "text": "imagem e voz:",
          "bold": true
        },
        {
          "text": " quando necessários para aulas, eventos, segurança ou divulgação, conforme a base legal aplicável e, quando exigido, mediante autorização específica;"
        }
      ],
      [
        {
          "text": "dados de terceiros:",
          "bold": true
        },
        {
          "text": " informações fornecidas por responsáveis legais, parceiros ou plataformas integradas, sempre dentro de uma finalidade legítima e informada."
        }
      ]
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "text": "Dados pessoais sensíveis"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Em situações estritamente necessárias, especialmente no contexto educacional, podemos tratar dados de saúde, deficiência, acessibilidade, restrições alimentares, informações biométricas ou outros dados sensíveis. Esses dados serão limitados ao mínimo necessário e tratados com proteção reforçada, com base em uma das hipóteses do art. 11 da LGPD, como consentimento específico e destacado, cumprimento de obrigação legal, proteção da vida, tutela da saúde ou exercício regular de direitos."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Não solicitamos dados sensíveis por canais informais quando houver meio mais seguro disponível. O titular ou responsável deve evitar enviar informações excessivas ou não solicitadas."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "5. Como os dados são coletados"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Os dados podem ser obtidos:"
      }
    ]
  },
  {
    "type": "list",
    "items": [
      [
        {
          "text": "diretamente do titular ou de seu responsável, em cadastros, contratos, formulários, matrículas, compras, eventos e atendimentos;"
        }
      ],
      [
        {
          "text": "automaticamente, durante o uso de sites, loja e plataformas, por registros técnicos e cookies;"
        }
      ],
      [
        {
          "text": "por prestadores utilizados para pagamento, hospedagem, CRM, comunicação, autenticação e ensino;"
        }
      ],
      [
        {
          "text": "por parceiros, instituições de ensino ou fontes públicas, quando houver base legal e compatibilidade com a finalidade informada."
        }
      ]
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Quando recebermos dados de terceiros, adotaremos medidas razoáveis para confirmar a legitimidade da origem e fornecer as informações exigidas pela LGPD."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "6. Finalidades e bases legais"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "A base legal depende do contexto. As principais operações são:"
      }
    ]
  },
  {
    "type": "table",
    "head": [
      "Finalidade",
      "Exemplos de dados",
      "Bases legais que podem ser aplicáveis"
    ],
    "rows": [
      [
        "Criar cadastro, autenticar e administrar contas",
        "identificação, contato e registros de acesso",
        "execução de contrato ou procedimentos preliminares; legítimo interesse para segurança; obrigação legal"
      ],
      [
        "Realizar matrícula e prestar serviços educacionais",
        "cadastro, responsáveis, dados acadêmicos e pedagógicos",
        "execução de contrato; obrigação legal ou regulatória; exercício regular de direitos"
      ],
      [
        "Processar compras, cobranças, pagamentos, notas fiscais e reembolsos",
        "dados contratuais, financeiros e fiscais",
        "execução de contrato; obrigação legal ou regulatória; exercício regular de direitos"
      ],
      [
        "Entregar materiais, cursos, certificados, produtos e eventos",
        "cadastro, endereço, matrícula e participação",
        "execução de contrato ou procedimentos preliminares"
      ],
      [
        "Prestar suporte e responder solicitações",
        "contato, conteúdo da solicitação e histórico",
        "execução de contrato; legítimo interesse; exercício regular de direitos"
      ],
      [
        "Prevenir fraude, abuso e acessos indevidos",
        "IP, autenticação, dispositivo e transações",
        "legítimo interesse; proteção do crédito; exercício regular de direitos; obrigação legal"
      ],
      [
        "Cumprir deveres legais, regulatórios e ordens de autoridades",
        "dados exigidos no caso concreto",
        "obrigação legal ou regulatória; exercício regular de direitos"
      ],
      [
        "Produzir estatísticas e melhorar serviços",
        "dados de uso e feedback, preferencialmente agregados ou anonimizados",
        "legítimo interesse, mediante avaliação e salvaguardas; consentimento para cookies não essenciais"
      ],
      [
        "Enviar publicidade, ofertas e newsletters",
        "nome, e-mail, telefone e preferências",
        "consentimento; ou legítimo interesse em comunicações compatíveis com relação prévia, com opção simples de oposição"
      ],
      [
        "Usar imagem, voz ou depoimentos para divulgação",
        "imagem, voz e conteúdo autorizado",
        "consentimento ou outra base legal aplicável ao contexto, com informação prévia"
      ],
      [
        "Proteger a vida, a saúde e a acessibilidade",
        "dados necessários ao atendimento",
        "proteção da vida; tutela da saúde; obrigação legal; consentimento específico, conforme o caso"
      ]
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "O legítimo interesse somente será utilizado quando houver finalidade legítima, necessidade, expectativa razoável do titular e salvaguardas para seus direitos. O titular poderá se opor quando a LGPD permitir."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Não condicionaremos um serviço ao fornecimento de dados desnecessários. Quando determinado dado for indispensável para a contratação, matrícula, segurança ou cumprimento legal, informaremos as consequências da não apresentação."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "7. Crianças e adolescentes"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Como parte das atividades do Colégio CPPEM e de produtos educacionais, tratamos dados de crianças e adolescentes. Todo tratamento será orientado pelo "
      },
      {
        "text": "melhor interesse",
        "bold": true
      },
      {
        "text": " desses titulares, avaliado no caso concreto."
      }
    ]
  },
  {
    "type": "list",
    "items": [
      [
        {
          "text": "Dados serão coletados no limite necessário para matrícula, ensino, acompanhamento pedagógico, segurança, saúde, comunicação com responsáveis e cumprimento de obrigações legais."
        }
      ],
      [
        {
          "text": "Quando a base legal for consentimento e o titular for criança, solicitaremos consentimento específico e destacado de pelo menos um dos pais ou do responsável legal, após esforços razoáveis para verificar sua identidade."
        }
      ],
      [
        {
          "text": "Poderemos utilizar outras bases legais admitidas pelos arts. 7º e 11 da LGPD quando forem adequadas ao caso, sempre com prevalência do melhor interesse."
        }
      ],
      [
        {
          "text": "Informações sobre o tratamento serão apresentadas de modo simples, claro e acessível, inclusive aos responsáveis."
        }
      ],
      [
        {
          "text": "Não realizaremos publicidade comportamental dirigida a crianças nem utilizaremos seus dados para finalidades incompatíveis com o contexto educacional."
        }
      ],
      [
        {
          "text": "A publicação de imagem, voz, nome ou trabalhos escolares para divulgação observará autorização específica quando necessária e não deverá expor a criança ou o adolescente a risco, constrangimento ou discriminação."
        }
      ]
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Em situação de proteção da vida ou da integridade física, dados poderão ser coletados sem consentimento e apenas na medida necessária para contatar responsáveis ou autoridades."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "8. Consentimento e comunicações de marketing"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Quando utilizarmos consentimento:"
      }
    ]
  },
  {
    "type": "list",
    "items": [
      [
        {
          "text": "explicaremos a finalidade de forma específica;"
        }
      ],
      [
        {
          "text": "manteremos registro da manifestação do titular;"
        }
      ],
      [
        {
          "text": "permitiremos a revogação por meio gratuito e facilitado;"
        }
      ],
      [
        {
          "text": "interromperemos os tratamentos futuros baseados exclusivamente no consentimento revogado, preservando os tratamentos anteriores realizados de forma válida e eventuais retenções autorizadas por lei."
        }
      ]
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Mensagens promocionais conterão mecanismo de descadastramento ou orientação clara para oposição. Solicitações de descadastro serão processadas em prazo razoável. Comunicações operacionais indispensáveis — como confirmação de matrícula, cobrança, segurança ou alteração de serviço — poderão continuar sendo enviadas enquanto necessárias e amparadas por outra base legal."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "9. Cookies e tecnologias semelhantes"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Usamos cookies, pixels, tags, SDKs e tecnologias semelhantes para operar e proteger nossos ambientes digitais."
      }
    ]
  },
  {
    "type": "list",
    "items": [
      [
        {
          "text": "Cookies necessários:",
          "bold": true
        },
        {
          "text": " viabilizam autenticação, segurança, carrinho, preferências essenciais e funcionamento técnico. Não dependem de consentimento quando estritamente necessários."
        }
      ],
      [
        {
          "text": "Cookies de funcionalidade:",
          "bold": true
        },
        {
          "text": " lembram escolhas e personalizam recursos não essenciais."
        }
      ],
      [
        {
          "text": "Cookies de medição e desempenho:",
          "bold": true
        },
        {
          "text": " ajudam a compreender o uso dos serviços e corrigir falhas."
        }
      ],
      [
        {
          "text": "Cookies de publicidade:",
          "bold": true
        },
        {
          "text": " medem campanhas e podem personalizar anúncios."
        }
      ]
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Cookies não essenciais devem permanecer desativados até uma escolha válida do usuário. O mecanismo de preferências deve permitir aceitar, rejeitar ou configurar categorias com facilidade equivalente, sem caixas pré-marcadas, e possibilitar a revogação posterior. A recusa a cookies não essenciais não impedirá o acesso às funcionalidades básicas."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "A lista de cookies, fornecedores, finalidades e prazos de retenção deve ser disponibilizada no gerenciador ou Aviso de Cookies do respectivo site. Cookies de terceiros também estão sujeitos às políticas dos fornecedores, sem afastar nossa responsabilidade pelas escolhas de integração sob nosso controle."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "10. Compartilhamento de dados"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Não vendemos dados pessoais. Podemos compartilhar dados, no limite necessário, com:"
      }
    ]
  },
  {
    "type": "list",
    "items": [
      [
        {
          "text": "plataformas de pagamento, instituições financeiras, antifraude e proteção ao crédito;"
        }
      ],
      [
        {
          "text": "provedores de hospedagem, nuvem, segurança, autenticação, suporte e tecnologia;"
        }
      ],
      [
        {
          "text": "plataformas educacionais, de videoconferência, gestão acadêmica e emissão de certificados;"
        }
      ],
      [
        {
          "text": "CRM, atendimento, e-mail, WhatsApp Business, SMS e automação de comunicação;"
        }
      ],
      [
        {
          "text": "transportadoras e operadores logísticos;"
        }
      ],
      [
        {
          "text": "contabilidade, auditoria, assessorias jurídica e tributária;"
        }
      ],
      [
        {
          "text": "empresas do mesmo grupo econômico, quando houver finalidade legítima, necessidade e transparência;"
        }
      ],
      [
        {
          "text": "autoridades públicas, órgãos reguladores ou Poder Judiciário, quando houver obrigação, ordem válida ou necessidade de exercer direitos;"
        }
      ],
      [
        {
          "text": "sucessores em operação societária, mediante salvaguardas e comunicação quando cabível."
        }
      ]
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Prestadores que atuam como operadores recebem instruções, obrigações de confidencialidade e requisitos de segurança compatíveis com o risco. Cada terceiro responde pelos tratamentos que realizar como controlador independente."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "O titular poderá solicitar informações sobre entidades públicas e privadas com as quais seus dados foram compartilhados, observados segredos comercial e industrial protegidos por lei."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "11. Transferências internacionais"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Alguns fornecedores de tecnologia podem armazenar ou acessar dados fora do Brasil. Transferências internacionais somente serão realizadas quando houver uma hipótese do art. 33 da LGPD e um mecanismo válido, como decisão de adequação da ANPD, cláusulas-padrão contratuais aprovadas pela ANPD, cláusulas específicas aprovadas, normas corporativas globais ou outra hipótese legal aplicável."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Não presumimos consentimento para transferência internacional pelo simples uso dos serviços. Quando o consentimento for a base utilizada, ele será específico, destacado e acompanhado de informação sobre o caráter internacional da operação. Adotaremos medidas de segurança e governança compatíveis com a Resolução CD/ANPD nº 19/2024."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "12. Retenção e eliminação"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Conservamos dados pelo tempo necessário para cumprir as finalidades informadas, atender obrigações legais e regulatórias, executar contratos, prevenir fraudes e exercer direitos em processos judiciais, administrativos ou arbitrais."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Os prazos variam conforme a categoria e o contexto. São considerados, entre outros, prazos fiscais, contábeis, educacionais, consumeristas e prescricionais, bem como regras aplicáveis a registros de acesso quando incidentes ao serviço."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Encerrada a finalidade e inexistindo fundamento para conservação, os dados serão eliminados, anonimizados ou bloqueados de forma segura. Cópias residuais em backups serão protegidas e eliminadas conforme o ciclo técnico aplicável, sem reutilização para finalidades incompatíveis."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Um pedido de exclusão não alcança dados cuja conservação seja permitida ou exigida por lei. Nesse caso, explicaremos, sempre que possível, os motivos da retenção e restringiremos o uso às finalidades que a justificam."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "13. Direitos dos titulares"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Nos termos da LGPD, o titular ou seu representante legal pode solicitar:"
      }
    ]
  },
  {
    "type": "list",
    "items": [
      [
        {
          "text": "confirmação da existência de tratamento;"
        }
      ],
      [
        {
          "text": "acesso aos dados;"
        }
      ],
      [
        {
          "text": "correção de dados incompletos, inexatos ou desatualizados;"
        }
      ],
      [
        {
          "text": "anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade;"
        }
      ],
      [
        {
          "text": "portabilidade, observada a regulamentação da ANPD e os segredos comercial e industrial;"
        }
      ],
      [
        {
          "text": "eliminação de dados tratados com consentimento, ressalvadas as hipóteses legais de conservação;"
        }
      ],
      [
        {
          "text": "informação sobre compartilhamentos;"
        }
      ],
      [
        {
          "text": "informação sobre a possibilidade de negar consentimento e suas consequências;"
        }
      ],
      [
        {
          "text": "revogação do consentimento;"
        }
      ],
      [
        {
          "text": "oposição a tratamento realizado em desconformidade com a LGPD;"
        }
      ],
      [
        {
          "text": "revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses e informações sobre os critérios utilizados, resguardados segredos comercial e industrial;"
        }
      ],
      [
        {
          "text": "petição perante a ANPD e defesa de direitos em juízo ou perante órgãos de proteção do consumidor."
        }
      ]
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Para exercer direitos, escreva para "
      },
      {
        "text": "pedagogico@cppem.com.br",
        "bold": true
      },
      {
        "text": " com o assunto “Privacidade/LGPD”. Poderemos solicitar informações proporcionais para confirmar a identidade ou a representação, sem criar barreiras indevidas."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "A confirmação e o acesso serão fornecidos em formato simplificado imediatamente, quando possível, ou por declaração completa no prazo legal de até 15 dias. Outras solicitações serão respondidas sem demora indevida, conforme a complexidade e os prazos aplicáveis. Se não pudermos atender integralmente, apresentaremos justificativa clara, quando permitido."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "14. Decisões automatizadas"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Atualmente, não adotamos decisões exclusivamente automatizadas que produzam efeitos jurídicos ou afetem significativamente o titular. Se essa prática for implementada, informaremos a lógica e os critérios relevantes, adotaremos medidas para prevenir discriminação e asseguraremos os direitos previstos na LGPD."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Ferramentas de apoio, classificação, recomendação, antifraude ou personalização não dispensam supervisão e governança compatíveis com o risco."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "15. Segurança e governança"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Adotamos medidas técnicas e administrativas proporcionais à natureza dos dados e aos riscos, que podem incluir controle de acesso, autenticação, gestão de credenciais, criptografia quando apropriada, registros de atividade, backups, atualização de sistemas, gestão de fornecedores, treinamento e procedimentos de resposta a incidentes."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Nenhum ambiente é absolutamente invulnerável. Por isso, revisamos controles periodicamente e orientamos usuários a proteger senhas, evitar compartilhamento de credenciais e comunicar atividades suspeitas."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "As afirmações desta Política representam compromissos de governança e devem ser acompanhadas de controles efetivamente implementados e documentados."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "16. Incidentes de segurança"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Quando ocorrer incidente capaz de acarretar risco ou dano relevante aos titulares, avaliaremos natureza, extensão e impactos, adotaremos medidas de contenção e manteremos os registros exigidos."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Quando aplicável, comunicaremos a ANPD e os titulares afetados no prazo regulatório de três dias úteis contado do conhecimento do incidente pelo controlador, ressalvada a existência de prazo específico, justificativa fundamentada ou complementação permitida pela regulamentação. A comunicação conterá informações claras sobre os dados afetados, riscos, medidas adotadas e canal de contato, sem comprometer investigações ou segurança."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Suspeitas de incidente podem ser comunicadas pelo e-mail "
      },
      {
        "text": "pedagogico@cppem.com.br",
        "bold": true
      },
      {
        "text": "."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "17. Alterações desta Política"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Esta Política poderá ser atualizada para refletir mudanças legais, operacionais ou tecnológicas. A versão vigente e a data de atualização permanecerão disponíveis nos nossos canais oficiais."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Alterações relevantes serão comunicadas de forma adequada. Se uma nova finalidade depender de consentimento, solicitaremos nova manifestação; a continuidade de uso, por si só, não será tratada como consentimento quando a lei exigir autorização específica."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "18. Lei aplicável e solução de controvérsias"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Esta Política é regida pelas leis brasileiras, especialmente pela LGPD, pelo Marco Civil da Internet e pela legislação de defesa do consumidor, quando aplicáveis."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Buscaremos solucionar dúvidas e controvérsias de forma cooperativa por nossos canais de atendimento. Ficam preservados os direitos do consumidor e as regras legais de competência territorial, inclusive o direito de recorrer à ANPD, aos órgãos de defesa do consumidor e ao Poder Judiciário."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "text": "19. Contato"
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Controladora:",
        "bold": true
      },
      {
        "text": " CPPEM COLÉGIO E CURSOS LTDA\n"
      },
      {
        "text": "CNPJ:",
        "bold": true
      },
      {
        "text": " 57.347.872/0001-48\n"
      },
      {
        "text": "Encarregado (DPO):",
        "bold": true
      },
      {
        "text": " Elias Glaucio\n"
      },
      {
        "text": "E-mail:",
        "bold": true
      },
      {
        "text": " pedagogico@cppem.com.br\n"
      },
      {
        "text": "WhatsApp:",
        "bold": true
      },
      {
        "text": " (81) 97310-5354\n"
      },
      {
        "text": "Endereço:",
        "bold": true
      },
      {
        "text": " Praça Presidente Getúlio Vargas, nº 119, bairro Nossa Senhora das Dores, Caruaru/PE, CEP 55002-150"
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Ao contatar-nos, descreva a solicitação de forma clara. Não envie senha, número completo de cartão ou outros dados desnecessários."
      }
    ]
  },
  {
    "type": "paragraph",
    "spans": [
      {
        "text": "Última atualização:",
        "bold": true
      },
      {
        "text": " 21 de setembro de 2026.\n"
      },
      {
        "text": "Versão:",
        "bold": true
      },
      {
        "text": " 2.0."
      }
    ]
  }
];
