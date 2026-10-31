# Testes 003M
Todos os resultados abaixo pertencem a execuções desta missão. Resultados antigos 003L/Anti não foram contados.

## Alteração de escopo pelo usuário
O usuário assumiu os testes de jogos durante a execução. Runners abrangentes ainda em andamento foram interrompidos para não iniciar novos cenários de jogo. Evidências já concluídas foram mantidas; não se declara regressão completa final dos jogos. Roteiro: HOMOLOGACAO-MANUAL-003M.md.

## Execuções
| Grupo | Resultado | Evidência |
|---|---|---|
| TypeScript final | Passou | typecheck-final.log |
| ESLint final | Passou | lint-final.log |
| Build final | Passou; aviso de chunk grande | build-final.log |
| Unitários | 71/71 | unit-final.log |
| Desktop sem cenários de jogos, Chrome/Edge | 86/86 após fallback tipográfico | desktop-final.log |
| Matriz visual 3 temas × 4 resoluções × 2 browsers | 24/24; 144 PNG | visual-final.log, after/ |
| Build estática sem backend, Painel e Notepad | 2/2 | static-ui.log |
| Saves nativos, dois jogos × dois browsers | 4/4, antes do usuário assumir | gates-resumed.log e quatro *-native.json |
| SkyRoads e Painel, Chrome/Edge | 4/4 | behavior-verified.log |
| Firefox regressão inicial | 43/51; oito falhas | firefox-regression.log |

## Falhas e interrupções preservadas
- Primeiro unitário Freedoom excedeu 5s sob carga de descompactação. Prazo específico ampliado para 30s; 71 passaram em seguida. Não houve redução de asserções de integridade.
- Primeiras provas SkyRoads pararam no menu/seleção; sequência de entrada corrigida para aguardar três telas nativas. Corrida, movimento, salto, áudio e reabertura passaram nos dois browsers.
- Primeira regressão geral: 94/102; oito falhas apontavam seletor CSS antigo do Painel, ausente após mudança estrutural. Testes atualizados para .period-control-panel .cp-items. O comportamento novo também possui prova própria de seleção/duplo clique/teclado/busca.
- Nova regressão geral foi interrompida por orientação do usuário antes de terminar; regression-final.log é parcial, não aprovação de 102 casos.
- QA ampla 003K/integração 003L e testes estáticos com emulação não foram finalizados após essa orientação. Nenhum resultado antigo foi reaproveitado como resultado integrado atual.
- Firefox iniciou após reparo em cache isolado, mas mantém falhas de foco DOS, arraste, navegação Game Center e timeout no discador; quatro falhas adicionais eram do seletor antigo. Não há homologação completa Firefox final.
- Não houve teste físico mobile; cenários responsivos de navegador não equivalem a aparelho real.

## Como repetir sem jogos
node scripts/validate-ui003m.mjs
node node_modules/@playwright/test/cli.js test --config playwright.static.config.ts ui003m.spec.ts
A suíte de desktop usa filtro inverso DOS|jog|Game|Snake|Batalha, explicitamente excluindo os cenários delegados ao usuário. Os unitários verificam dados/validação, não gameplay.
