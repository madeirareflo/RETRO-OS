# Diagnóstico Prince demo DOS 1.0

## Evidências
O runtime usa dois canvases: engine, oculto e escutado pelo SDK, e screen, espelho visível. O handler antigo focava engine em pointerdown; a ação padrão subsequente do navegador focava screen. baseline-key-events.json e a sondagem confirmaram o destino incorreto após clicar na imagem. Foi adicionado encaminhamento de focus de screen para engine, preservando a propagação dos eventos de mouse.

Além disso, a demo inicia com detecção de joystick. O SDK tem joysticktype=auto por padrão; o wrapper de distribuição consultado desativa joystick. O fluxo seguro do projeto não executa BAT e essa preparação não acompanhava a entrada EXE. Ctrl+K produziu a indicação KEYBOARD MODE na demo, consistente com a documentação específica do DOSBox Staging.

A tentativa de config -set após main e a tentativa isolada de um arquivo de configuração no arranque não produziram movimento no primeiro teste. Não são apresentadas como solução comprovada. Mantemos o preset restrito ao Prince e fornecemos o comando nativo explícito pelo botão Ativar teclado (Ctrl+K). O procedimento final testado: iniciar, Enter, ativar teclado, aguardar a animação, pressionar seta direita. As imagens e coordenadas do personagem demonstram deslocamento breve; não houve alteração de memória do jogo para simulá-lo.

## Teclas
As sondagens registraram ArrowRight como keyCode 39, com keydown e keyup chegando ao engine. A tecla Numpad6 também chegou como keyCode 39 no ambiente; sua movimentação não prova que o jogo exige remapeamento. Por isso não introduzimos mapeamento de setas para teclado numérico. A pose inicial agachada/transição também exige aguardar antes de avaliar a caminhada.

## Foco e teclas presas
O adaptador registra teclas físicas pressionadas e envia keyup ao SDK ao perder foco, sair ou usar Shift+Esc. Consultar a ajuda libera a entrada sem roubar o foco do diálogo; ao fechá-la, Focar no jogo recebe foco e o usuário retoma explicitamente. Esc simples continua disponível para o comando nativo dos perfis preparados.

## Referência primária
[DOSBox Staging — configuração desta demo](https://www.dosbox-staging.org/preview/dev/0.83/getting-started/setting-up-prince-of-persia/). Referência de comportamento; não implica troca de engine nem redistribuição de conteúdo do guia.

Conclusão: interferência de modo de entrada e foco comprovada; correção com comando nativo validada em smoke curto. Aprovação humana ainda pendente.
