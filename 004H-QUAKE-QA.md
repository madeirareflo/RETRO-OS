# Quake shareware 1.06 — QA 004H

**B — inicia, com pendências. Gameplay representativo observado; homologação integral pendente.**

Chrome: menu, início, movimento pelas setas, disparo (munição 25 → 24), troca de vista, console e save nativo. `ID1/H004Q.SAV`, 36.341 bytes, SHA-256 `7105a74f0c89f3115d4f400799af29ad8a27ab06412391ee964fdb5261b68076`. Após encerrar o jogo e o processo do navegador, o comando nativo `load h004q` informou a carga desse caminho e recuperou a cena com munição 24. Não foi fabricado arquivo de save. Ver `quake-real-restored-progress-frame.png` e session-log.json. Teste de recarga com pose serializada/regravação equivalente ainda pendente; uma tentativa posterior de resave não gerou arquivo e não foi contada.

O pacote pedia tecla por ausência de música de CD e depois calibração de joystick inexistente. `README.TXT`/`TECHINFO.TXT` da própria distribuição documentam `-nocdaudio` e `-nojoy`. Aplicados somente ao perfil dos-quake-1996/QUAKE.EXE; nenhum binário ou faixa de música foi acrescentado. A ausência de CD music não constitui falha de execução. Efeitos produziram PCM não nulo no Chrome. Não houve escuta física.

Os testes de mouse encaminhado, disparo, liberação e volta ao desktop passaram em Chrome e Edge. Captura nativa contínua/relative mouse, desempenho sustentado, testes longos e save/load no Edge continuam pendentes. O botão experimental de pointer lock não está exposto. `data-ready` indica emulador pronto, nunca gameplay homologado.

Evidências: evidence/004h/playability/chrome/quake-*.png; evidence/004h/controls/*-quake-mouse.png e *-mouse.json. Traces e logs intermediários são privados; nenhuma publicação.
