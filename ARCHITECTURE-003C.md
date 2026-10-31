# Arquitetura

Base React/TypeScript/Vite preservada. win2000 é valor próprio de preferência, separado de era; reutiliza os controles clássicos com modificadores. SQLite existente foi ampliado com tabelas idempotentes em server/community.mjs e server/lan.mjs; não houve recriação das contas ou migração destrutiva. Rotas autenticadas usam a mesma sessão HttpOnly. A origem é preservada pelo proxy local do Vite.

Comunidades, perfis e LAN são apps registrados no mesmo gerenciador de janelas. SSE sinaliza atualização e cada cliente busca somente os dados autorizados. LAN também atualiza a cada 5 s para estado de presença; assentos são reservas persistentes, não contagens inventadas de online. Dados locais do desktop continuam independentes do backend.

Jogo da Velha usa tabuleiro de 9 casas persistido, turno e vencedor no servidor. Partidas só são visíveis aos dois jogadores. Batalha Naval e rankings ainda não existem. Esquema inicial idempotente precisa evoluir para migrações versionadas formais antes de produção. Não publicar no GitHub Pages: ele não hospeda Node/SQLite.
