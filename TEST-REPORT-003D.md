# Testes 003D — 31/10/2026

Baseline: 26 testes unitários e integração real 003C passaram antes de alterações.

Matriz final após todas as integrações: 60 testes Playwright Edge/Chrome aprovados (1,4 minuto). Inclui janelas, temas, persistência, editor, Explorer, tarefas, apps anteriores, quatro resoluções, mobile emulado e ausência de erros nos fluxos que monitoram console.

26 testes Vitest aprovados; TypeScript --noEmit, ESLint src e build Vite aprovados (JS 345,32 KB / gzip 108,97 KB). Nenhuma dependência nova.

node --test server/integration.test.mjs server/security003d.test.mjs server/naval.test.mjs: três testes aprovados. O primeiro usa HTTP/SQLite e três contas; o segundo HTTP/SQLite com três contas, privacidade, bloqueio, JSON, SSE e rate limit; o terceiro SQLite em memória com regras reais da Batalha Naval até vitória, sem mocks. O terceiro não é teste gráfico nem HTTP.

Quatro testes gráficos sociais Edge aprovados (24,1 segundos): Messenger, comunidade, LAN/Velha completa e Naval com convite, aceite, frotas, tiros e reload. Naval até vitória foi testada no domínio; a interface foi testada até reconexão, não até vitória. Testes usam contextos independentes e bancos temporários; não usuários de produção.

Firefox: um teste falhou ao iniciar browserType.launch: spawn UNKNOWN, sem executar a aplicação. Sem homologação Firefox ou dispositivo físico. Houve falha intermediária de sintaxe SQL/JavaScript durante a alteração de perfis; corrigida antes das execuções finais. Nenhuma falha funcional restante observada nas suítes executadas.

Evidências em evidence/003d/index.html. Regressão gerou capturas dos quatro temas; as antigas foram preservadas e as novas copiadas para evidence/003d/regression. Screenshots não provam todos os critérios de fidelidade.

Reproduzir: node node_modules/vitest/vitest.mjs run; node --test server/integration.test.mjs server/security003d.test.mjs server/naval.test.mjs; node node_modules/@playwright/test/cli.js test --project=edge --project=chrome; node node_modules/@playwright/test/cli.js test --config=playwright.social.config.ts.
