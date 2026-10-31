# 003B — fundação e Messenger em desenvolvimento

Produção preservada em main, commit publicado 23096cd. Workflow pages.yml só dispara em main. Desenvolvimento isolado na branch development/retro-os-003b. A base social não foi descartada nem publicada em produção.

Foi mantido o backend SQLite já iniciado e integrado um aplicativo Retro Messenger ao registro do desktop. O Vite encaminha /api para localhost:4190 somente em desenvolvimento. Conta/login/logout, contatos, solicitações, aceite, histórico, mensagens via SSE, bloqueio e denúncia estão acessíveis na interface. Falha do servidor aparece apenas no app social; as ferramentas locais não dependem dele. Conteúdo usa texto React, sem HTML executável.

Execute em dois terminais na raiz: `node server/social.mjs` e `npm run dev`. Abra Retro Messenger em Iniciar → Todos os programas, ou Executar → Retro Messenger. Use perfis de navegador diferentes para contas diferentes. O servidor escuta loopback: esta entrega não habilita acesso de outros computadores nem serviço remoto.

Teste de integração: `node --test server/integration.test.mjs`. Usa banco temporário e três sessões HTTP independentes, sem mocks: registro A/B/C, amizade A→B, aceite por B, mensagem A→B recebida por stream SSE, resposta, isolamento de C, recusa de aceite e envio indevidos, bloqueio no servidor, logout, novo login e histórico persistente. O teste passou. Isso valida endpoints e stream, não equivale à homologação completa do Messenger pela UI.

## Auditoria e limitações de segurança

Senhas scrypt com salt e comparação constante, token aleatório armazenado por hash, cookie HttpOnly/SameSite, validade de 24 horas. SQL parametrizado, mensagens limitadas, amizade exigida e bloqueio bilateral. Rotas POST verificam Origin quando presente; servidor local não habilita CORS. Rate limit inicial é em memória, ainda exige separação de limites para autenticação e ações. SSE ainda precisa revogação imediata/expiração de conexão e limites de conexões. A listagem de usuários precisa políticas de privacidade. Não há autorização administrativa ou moderação operacional completa.

## Homologação pendente

Faltam: teste automatizado com duas janelas de navegador na interface, screenshots, chamar atenção/cooldown, recusa/remoção de amizade, leitura/não lidas, estados de presença completos, perfis editáveis, recados, comunidades, LAN House, jogos multiplayer, rankings, exclusão/recuperação de conta, administração, retenção e política de privacidade. Denúncias são persistidas, mas ainda não há console de revisão. Regressão E2E 002 precisa ser repetida nesta branch. Não declarar a missão 003B homologada.

## Arquivos e produção futura

Backend em server/social.mjs; esquema inicial idempotente no bootstrap SQL. Banco e sessões em server/data, ignorados pelo Git. Testes usam diretório temporário. Não há chaves externas. O frontend social está em src/apps/Messenger.tsx. A cópia de entrega estável WORKGPT não foi substituída por esta versão parcial.

Uma arquitetura de produção deverá servir SPA/API sob HTTPS na mesma origem, usar banco persistente com backups, limites compartilhados, sessões revogáveis em todos os streams e moderação humana operacional. PostgreSQL gerenciado é uma possibilidade, sem contratação ou credenciais nesta etapa. GitHub Pages continuará servindo apenas a versão estável; não executa este backend. Custos e provedor precisam de aprovação antes de contratar/publicar.
