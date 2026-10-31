# RETRO OS 003N-FIX-B — Controles e manuais

Entrega privada. Base: 74aca12a3e6565e4fa7bfbe1597321960d8f4097. Branch: development/retro-os-003n-fix-controls.

## Parecer
Pronta para novo teste humano, com movimento breve do Prince observado em Chrome e Edge. Não é homologação de gameplay, de todos os comandos ou de saves. Os cinco jogos que o proprietário aprovou não foram novamente submetidos a partidas extensas.

## Implementado
- Corrigido o foco do canvas visível espelhado: o clique agora encaminha a entrada ao canvas que o SDK escuta.
- Rastreamento de keydown/keyup e liberação das teclas ao sair, perder foco ou usar Shift+Esc, evitando comandos presos.
- Prince: configuração de joystick desativado no início, restrita a esse perfil; botão Ativar teclado (Ctrl+K) envia o comando nativo depois de entrar na partida. A configuração sozinha não resolveu o teste; o procedimento validado inclui esse botão.
- Controles / Ajuda no Launcher e no jogo para Prince demo DOS 1.0, DOOM shareware DOS v1.9 e Duke shareware DOS v1.3d.
- Manuais com comandos por edição, foco, pausa, saída, áudio e limites de salvamento. Aviso dispensável persistido por jogo.
- Duke: instruções do SETUP e identificação do CFG inicial com áudio desligado; sem forçar Sound Blaster nem mudar configurações de terceiros.

## Preservação
Sem migrações, remoções, alteração dos pacotes, favoritos, formatos de saves, Explorer ou temas. O adaptador comum recebeu apenas as correções necessárias de entrada; o preset e Ctrl+K só se aplicam a Prince. Bibliotecas de emulação, arquivos dos outros jogos e seus perfis permaneceram idênticos à base, verificados pelo diff. Não houve push/deploy e main permaneceu 23096cd902c9aef9c4d358bf0c8b9165c6b89ba3.

003P-ANTI não foi integrada nem modificada. A entrega foi somente lida. SHA256 do bundle Anti: 455f1a4a2ad10cb61bbafe7af0015510d1dc0c39f957cc642794fde48b41222e. Seu commit não estava disponível como objeto neste repositório; não foi importado.

## Arquivos relevantes
src/apps/DosGame.tsx; public/emulation/adapter.js; src/launcher/gameControls.ts; GameControlsHelp.tsx; game-controls-help.css; RetroGameLauncher.tsx. Testes em src/tests/gameControls.test.ts e qa003n-controls/controls.spec.ts. Evidências em evidence/003n-controls.

## Limites
Ainda precisam de avaliação do proprietário: subir/agarrar/combate e combinações da demo; controles completos de DOOM/Duke; áudio configurado no SETUP; persistência de save nativo. Não foi feita avaliação física mobile nem nova certificação Firefox. Preservação de código/bytes não significa que toda combinação de controles de todos os jogos foi retestada.

Veja PRINCE-CONTROLS-CAUSE.md, CONTROLS-MANUAL.md, TEST-REPORT-003N-FIX-B.md e MANUAL-RETEST-INSTRUCTIONS.md. O commit e o bundle final são registrados em CHECKPOINT.txt na entrega.
