# Fundação social 003 — trabalho em andamento

Node 24 com SQLite nativo. Execute da raiz: `node server/social.mjs`. Escuta somente loopback por padrão. Banco em server/data; não versionar. Senhas scrypt com salt, sessões aleatórias armazenadas por hash e cookie HttpOnly/SameSite. SSE autenticado sinaliza atualizações. Consultas limitam mensagens ao usuário autenticado; amizade aceita é exigida e bloqueios são bilaterais.

Não publicar: ainda faltam homologação com dois usuários, integração da interface, recuperação/exclusão de conta, expiração de SSE, limites robustos por IP/rota, política de privacidade, moderação operacional, testes de segurança e demais recursos da missão. SQLite é a alternativa local inicial; não há PostgreSQL ou serviço externo configurado.
