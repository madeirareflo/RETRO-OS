# Executar e recuperar no Windows

## Requisitos
Node.js 24 ou superior com node:sqlite. Dependências do projeto já instaladas no workspace. Para uma recuperação limpa: npx pnpm@11.25.0 install --frozen-lockfile. Não contratar hospedagem nem publicar.

## Iniciar
Na raiz do código, execute INICIAR-PRIVADO.cmd ou powershell -NoProfile -File scripts/start-private.ps1. A política local do PowerShell pode bloquear scripts; nesse caso use dois terminais manualmente, sem alterar política do computador:
1. node server/social.mjs
2. node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort
Abra http://127.0.0.1:5173. O backend fica em 127.0.0.1:4190. O script privado cria somente seu próprio processo backend e o encerra ao finalizar o frontend. Não encerra servidores preexistentes. Verificação do script: sintaxe/revisão; fluxo de lançamento conjunto não foi homologado por duplo clique. Os testes iniciam os mesmos dois comandos por Playwright.

## Usar
Retro Game Center tem ícone no desktop e está em Jogos. Pelo Executar, abra Retro Messenger, Comunidades e Perfis, Minha Conta e Privacidade, Administração Social ou Placares da LAN. Para multiplayer, use sessões/perfis de navegador independentes. São contas locais reais no SQLite, não serviço hospedado entre computadores remotos.

## Administração local
Crie uma conta pelo Messenger e confira qual conta receberá privilégio. No terminal da raiz: node server/admin.mjs grant SEU_APELIDO. Revogar: node server/admin.mjs revoke SEU_APELIDO. Essa ferramenta usa o banco local e não envia senha. Nenhuma rota HTTP concede papel. Se RETRO_DATABASE for personalizado, o comando deve usar a mesma variável. Não há admin padrão.

## Dados e recuperação
Banco em server/data/social.sqlite, ignorado pelo Git. Não copiar dados reais para o repo público. Backup Git: git clone RETRO-OS-003E-PRIVATE.bundle RETRO-OS-recuperado. Depois instale dependências e execute. O bundle inclui histórico/código/relatórios/evidências, não banco, node_modules ou dados do navegador. Backups de banco exigem procedimento privado separado e teste de restauração. Nunca apagar checkpoints anteriores.

## Verificações
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js src
node node_modules/vitest/vitest.mjs run
node node_modules/vite/bin/vite.js build
node --test server/governance.test.mjs server/integration.test.mjs server/migration003e.test.mjs server/naval.test.mjs server/security003d.test.mjs
node node_modules/@playwright/test/cli.js test --project=edge --project=chrome
node node_modules/@playwright/test/cli.js test --config=playwright.social.config.ts

Na entrega WORKGPT, descompacte o ZIP de código numa pasta local para desenvolver. Evite operar o SQLite ativo em unidade sincronizada; guarde no WORKGPT os artefatos de backup. O Git bundle não contém banco ou dados do navegador.
