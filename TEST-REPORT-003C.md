# Testes 003C

Node 24.22.1, Windows, Playwright 1.64.1. 31/10/2026.

- TypeScript, lint e build: aprovados.
- Vitest: 26 aprovados.
- Regressão Edge/Chrome: 56 aprovados em 1,4 minuto, incluindo os testes da 002 e dois novos para Windows 2000.
- Backend real/SQLite, três sessões: integração aprovada; cobre autenticação, mensagens, SSE, bloqueio, integridade de acesso, comunidades, recados, salas privadas e partida completa de Jogo da Velha.
- Interface social, Edge: três fluxos com sessões independentes, sem mocks. Messenger, comunidade/perfil e LAN/jogo. Capturas em evidence/003c.

Uma repetição do teste de comunidade encontrou duas biografias iguais de fixtures antigas (seletor ambíguo). O teste passou a identificar o autor e o servidor de teste usa SQLite temporário único. Nenhum dado local foi apagado. O timeout anterior do backup não reapareceu na rodada completa de 56 testes.

Reproduzir: node --test server/integration.test.mjs; node node_modules/@playwright/test/cli.js test --config playwright.social.config.ts; npm run test:e2e; npm test; npm run build.

Não foram testadas funções ainda não implementadas. Firefox funcional, celular físico, benchmarks, auditoria WCAG e comparação histórica completa permanecem pendentes. Não homologar toda a missão por estes resultados.
