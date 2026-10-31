# Executar a 003M no Windows
Requisitos: Node.js atual compatível com Vite 7, pnpm, Chrome/Edge para os testes.
Na pasta do código: pnpm install --frozen-lockfile; pnpm dev.
Preview privado: http://127.0.0.1:4476/
Build: pnpm build. Preview da build: pnpm preview (porta 4477).
Abra Retro Game Launcher no desktop, busque Freedoom, Ken's Labyrinth ou SkyRoads, selecione e clique Iniciar Jogo; confirme Iniciar jogo DOS. Áudio é opt-in. Use Focar no jogo; Shift+Esc libera foco. Saves são locais ao perfil do navegador e à origem/porta: mudar porta não migra seus dados automaticamente.

Interface sem execução de jogos: node scripts/validate-ui003m.mjs. A suíte completa scripts/validate-003m.mjs inclui jogos e fica disponível para execução pelo usuário, não foi concluída nesta entrega.
Provas nativas: node node_modules/@playwright/test/cli.js test --config playwright.games003m.config.ts --project=edge --project=chrome saves.spec.ts behavior.spec.ts.
Firefox: definir PLAYWRIGHT_BROWSERS_PATH para cache compatível e instalar browser oficial com Playwright. Não desativar políticas de segurança.
Não é necessário backend. Não executar scripts de deploy nem push. O bundle privado pode ser restaurado com git clone -b development/retro-os-003m ARQUIVO.bundle DESTINO_NOVO.
