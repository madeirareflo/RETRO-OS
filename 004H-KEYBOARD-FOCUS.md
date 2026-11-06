# Controles e foco — resultado 004H

A ponte original input-bridge.js fica no iframe confiável do emulador. Não há listener global de Ctrl+K no desktop. Ctrl+A/Ctrl+K/F-keys só têm defaults do navegador suprimidos com o engine focado; Alt+Tab não é cancelado. Shift+Esc e blur liberam teclas/botões. Dispose remove listeners e libera recursos de entrada.

O canvas visível era espelho de um engine de 1 px. Seus eventos agora são encaminhados com coordenadas proporcionais à imagem. Testes unitários verificam mapeamento, liberação, isolamento, pedido explícito de lock e remoção de listeners. E2E Quake verifica contagem de eventos, disparo e liberação real no navegador. O engine pode receber mouse sem lock. Captura nativa contínua não foi homologada e seu botão experimental foi retirado da interface; não é prometida como concluída.

Focar usa foco síncrono same-origin antes do postMessage, evitando perder a primeira tecla rápida após clicar. A verificação de origem/source das mensagens permanece. Prince preserva a combinação Ctrl+K restrita ao preset; não remapeia teclas arbitrariamente. Seu menu/edição determina o comportamento da combinação, não um atalho global do RETRO OS.

Chrome/Edge: movimento do Prince observado antes e depois de alternar janela; teclas soltas ao minimizar; Notepad isolado; Shift+Esc retorna ao botão Focar. Quake: teclado/mouse, release e troca de janela DOM. Não foi bloqueado Alt+Tab do sistema. Comportamento físico de Alt+Tab, mouse relativo em sessão visível e todos os atalhos de todos os oito jogos: PARTIAL/NOT TESTED. Áudio exige ativação por gesto e não é validado pelo mero estado running do AudioContext.

Falhas de QA preservadas: waits fixos de animação do Prince geraram falsos negativos de pose; roteiro final observa deslocamento antes de soltar a tecla. Clique em jogo coberto por Launcher após trocar janela gerou timeout de teste, corrigido restaurando o jogo pela taskbar. Nenhuma dessas tentativas foi registrada como PASS.
