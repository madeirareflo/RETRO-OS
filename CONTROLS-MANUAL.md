# Manuais integrados — 003N-FIX-B

Abra o jogo no Launcher e clique Controles / Ajuda, ou use o botão de mesmo nome na janela DOS. O diálogo acompanha os controles clássicos do tema, tem rolagem e fecha por Fechar/Esc. Ele não pausa automaticamente a emulação.

## Prince demo DOS 1.0
Enter/uma tecla inicia; aguarde a transição. Clique Ativar teclado (Ctrl+K). Setas esquerda/direita movem; cima/baixo saltam/sobem e abaixam/descem conforme contexto; Shift com direção realiza passos/ações. Esc é pausa nativa e Ctrl+Q sai para DOS. Ctrl+K e movimento breve foram observados. As demais ações são documentadas, não foram todas jogadas. A demo não tem save homologado; não prometemos os atalhos de save da versão completa.

## DOOM shareware DOS v1.9
Padrões: setas movem/viram, Ctrl dispara, Espaço usa, Shift corre, Alt com direção desloca lateralmente, Tab mapa, 1–7 armas disponíveis; Pause pausa, Esc menu, F2/F3 salvar/carregar, F10 saída. Dependem do SETUP e de remapeamentos pessoais. A edição shareware limita o conteúdo. Saves DOOMSAV*.DSG ainda devem ser testados pelo proprietário.

## Duke shareware DOS v1.3d
CFG inicial inspecionado: setas movem/viram; Ctrl dispara; Espaço usa; A salta; Z abaixa; Shift corre; Alt deslocamento lateral. Não indicar Espaço como salto nesse CFG. Esc menu, Pause pausa, F2/F3 menus nativos de salvar/carregar. Remapeamentos pessoais e mouse dependem do setup.

Áudio: o CFG inicial tinha FXDevice/MusicDevice desligados. Saia por Quit Game para o prompt DOS sem fechar a janela. Digite SETUP, abra Sound Setup, use os testes nativos e salve/execute o jogo. O runtime anuncia A220, IRQ7, DMA1/HDMA5; isso é informação, não homologação de toda placa. Use também Ativar áudio do jogo no navegador. Nenhum preset sonoro foi forçado. Saves GAME*.SAV e recuperação do CFG precisam de confirmação humana.

## Comum
Clique na tela/Focar no jogo para entrada; Shift+Esc devolve o foco. Ao fechar ajuda, clique Focar no jogo. Em caso de captura de ponteiro, Esc libera o ponteiro antes de Shift+Esc. A ajuda discrimina comandos documentados, CFG inicial inspecionado e observações limitadas do smoke. Referências completas estão em src/launcher/gameControls.ts.
