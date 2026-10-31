# Inicialização local privada

Requer Node.js e dependências instaladas. Na pasta de código execute pnpm install --frozen-lockfile, caso necessário, e powershell -File scripts/start-private-three-games.ps1. URL habitual: http://127.0.0.1:4676/.

O servidor utiliza somente loopback. Pacotes privados ficam fora do código, em ../RETRO-OS-003N-FIX-PRIVATE, definido por RETRO_PRIVATE_GAMES_DIR. Não foram incluídos no código, dist ou bundle desta entrega. Este backup pressupõe o cache privado existente para instalar esses três pacotes em um perfil de navegador novo. Biblioteca já instalada usa IndexedDB. Não apagar o cache nem os dados do navegador.

A build estática contém somente os assets herdados autorizados; não instala automaticamente os três pacotes privados. Testes usam 4776 para não tocar os dados do proprietário na origem 4676.

Checks: node node_modules/typescript/bin/tsc --noEmit; node node_modules/eslint/bin/eslint.js src; node node_modules/vitest/vitest.mjs run src/tests/gameControls.test.ts src/tests/prepared003n.test.ts src/tests/core.test.ts; node node_modules/vite/bin/vite.js build. Smoke: node node_modules/@playwright/test/cli.js test --config playwright.controls.config.ts.

Nenhum push ou deploy autorizado/executado.
