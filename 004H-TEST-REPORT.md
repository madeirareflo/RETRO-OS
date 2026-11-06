# Relatório de testes — 004H

| Verificação | Resultado | Evidência em evidence/004h |
|---|---|---|
| TypeScript | PASS | typecheck-final.log |
| ESLint src | PASS | lint-final.log |
| Vitest | 137 PASS / 27 arquivos | unit-final.log |
| Playwright Chrome/Edge completo | 44 PASS | e2e-acceptance.log |
| Salto nativo Prince adicional | 2 PASS | prince-action.log |
| Build /RETRO-OS/ | PASS, aviso de chunk grande | build-final.log |
| Preview e servidor portátil | PASS Chrome/Edge | static-results.json e static-portable-qa.log |
| Matriz de interface | 40 screenshots reais | matrix/results.json e PNGs |
| Firefox | BLOCKED, spawn UNKNOWN | matrix/results.json |
| Oito ZIPs | hashes intactos, sem novos assets | security-scan.json |
| Gameplay mínimo movimento+ação | 7 comprovados; Ken PARTIAL | PLAYABILITY-MATRIX e capturas |
| Áudio software | 4 com PCM não nulo; 4 silenciosos | session-log.json; sem escuta física |
| Save/load nativo | DOOM/Heretic Chrome+Edge; Quake Chrome limitado | SAVES-PERSISTENCE |

Hardware: Core i5-13420H, 8 cores/12 threads, memória reportada 16.890.519.552 bytes. Chrome 156.0.8078.80; Edge 156.0.4314.58. Browsers headless e perfis de teste isolados. Resoluções: 1024×768, 1280×720, 1366×768, 1600×900 e 1920×1080, quatro temas. Mobile foi viewport simulado, sem dispositivo físico.

Não foram medidos FPS sustentado ou RAM total do processo. Heap WASM observado de 64/128 MiB é memória alocada do motor, não prova de ausência de vazamento. Ready mede inicialização do emulador, não boot completo de cada jogo. Screenshots nas resoluções demonstram interface, não gameplay de cada jogo em cada resolução.

Pendentes: testes longos/humanos, áudio físico/configuração, saves adicionais, concorrência/quota física/abertura repetida extensa, importação de todas as edições e pacotes grandes, pointer lock, Firefox e mobile físico. Falhas intermediárias estão separadas dos logs finais. Não há homologação geral dos 37 ou de todos os aspectos dos oito.

Dependências instaladas offline/frozen no baseline; nenhuma dependência adicionada. Build estática sem backend social. Resultado global PARCIAL, CONDITIONAL GO para avaliação privada. Publicação proibida.
