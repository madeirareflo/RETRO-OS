# Execução e restauração no Windows
Preview atual privado: http://127.0.0.1:4576/
Código: extrair RETRO-OS-003N-SOURCE.zip em pasta independente, executar pnpm install --frozen-lockfile e pnpm dev. Requisitos: Node compatível com Vite 7 e pnpm.
Build: pnpm build. Preview: pnpm preview, porta 4577; observar a base /RETRO-OS/ configurada no projeto.
Alternativa Git: git clone -b development/retro-os-003n-games RETRO-OS-003N-PRIVATE.bundle RETRO-OS-003N-RESTORED. Bundle deve passar git bundle verify; restauração independente e git fsck estão registrados na entrega.

Arquivos/saves/reviews são locais ao perfil e origem do navegador. A porta 4476 continua sendo a 003M, sem perda de dados. A 003N usa 4576 por isolamento; não há migração automática entre portas. Em mesma origem, os campos opcionais não apagam dados antigos. Não limpe o armazenamento se quiser preservar os arquivos.

Testes técnicos curtos: node node_modules/typescript/bin/tsc --noEmit; node node_modules/eslint/bin/eslint.js src; node node_modules/vitest/vitest.mjs run src/tests/prepared003n.test.ts src/tests/launcher003g.test.ts src/tests/builtin003m.test.mjs.
Smoke: node node_modules/@playwright/test/cli.js test --config playwright.manual003n.config.ts. Para build estática: definir RETRO_STATIC=1 e repetir. Instalar browsers Playwright apenas se necessário.
Sem backend, push ou deploy. Gameplay será avaliado pelo proprietário conforme MANUAL-TEST-CHECKLIST-003N.md.
