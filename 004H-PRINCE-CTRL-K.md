# 004H-04 — Prince Ctrl+K e controles

Resultado final: os quatro cenários gráficos (Prince e Quake, Chrome e Edge) passaram dentro da execução de 38 testes registrada em evidence/004h/regression-e2e.log.

Prince: partida da demo DOS, movimento medido no canvas, minimizar/restaurar, Bloco de Notas sem vazamento de Ctrl+A/Ctrl+K, retorno à partida com movimento, Shift+Esc liberando teclas. O preset continua restrito à demo e envia a combinação original. Cliques no botão Focar agora focam o canvas de forma síncrona quando same-origin; o postMessage permanece fallback. Não há captura global de Ctrl+K.

As primeiras tentativas estão preservadas: falha de amostragem de pose em instantes fixos, repetição indevida de um seletor após troca de janela e timeout ao clicar em jogo coberto pelo Launcher. A versão final usa observação de deslocamento e restaura o jogo pela barra de tarefas antes da saída. Não são ocultadas as falhas intermediárias.

Quake: encaminhamento de mouse, disparo, liberação de teclas e botões, foco e Alt+Tab DOM não cancelado passaram. A troca nativa do Windows não foi testada fisicamente. Pointer lock nativo não foi homologado; o botão experimental não está exposto na interface. Mouse sem captura continua encaminhado. Não há promessa de captura relativa ilimitada.

Evidências: evidence/004h/controls/{chrome,edge}-prince*.png e *-mouse.json; traces privados fora do Git em RETRO-OS-004H-TRACES. A extensão Heretic dos saves foi corrigida de .DSG para .HSG com base no arquivo produzido pelo próprio jogo.

Teste adicional: salto nativo ArrowUp passou nos dois navegadores, com deslocamento vertical observado e screenshots before/airborne/after; ver prince-action.log.
