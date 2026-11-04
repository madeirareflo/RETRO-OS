# 004H-03 — controles e foco

Foi isolada uma ponte de entrada no iframe (public/emulation/input-bridge.js). Teclas e botões pressionados são liberados em blur, Shift+Esc e descarte; os listeners são removidos. Ctrl+K só é tratado quando o canvas do emulador tem foco. Não foi acrescentado listener de Ctrl+K no desktop.

O canvas visível era um espelho; agora seus eventos de mouse são encaminhados ao canvas real com coordenadas proporcionais à imagem, sem usar a escala de 1 px do canvas oculto. Foi acrescentado pedido explícito de captura (clique do usuário), com allow-pointer-lock no iframe, instrução de liberação e fallback quando o navegador recusa. O disparo via mouse e eventos chegaram ao emulador no probe Chrome; captura persistente será validada separadamente e não é presumida pelo pedido da API.

Alt+Tab não é cancelado pelo novo bridge nem pelo handler virtual do desktop. A troca real do sistema operacional não pode ser certificada por eventos sintéticos/headless; não se tenta bloqueá-la. F2/F3 e Ctrl+K têm o comportamento padrão do navegador suprimido apenas enquanto o canvas está ativo.

Quake teve dois prompts identificados: música de CD ausente e calibração de joystick sem uso. Os switches -nocdaudio e -nojoy estão documentados no README.TXT/TECHINFO.TXT da própria distribuição e foram aplicados somente ao perfil Quake/QUAKE.EXE. Os efeitos sonoros permanecem habilitados; não foram incluídas faixas musicais. Os binários e saves não foram alterados.

O status da janela diferencia emulador iniciado de partida confirmada. Instruções novas de entrada são fornecidas em pt-BR, inglês e espanhol; os três idiomas existentes foram preservados.

Testes de fronteira executados: cinco unitários PASS (keyup em blur; Ctrl+K restrito; coordenadas do espelho; captura mediante ação; dispose e Alt+Tab não cancelado). Ver input-unit.log. Os testes gráficos de minimizar/restaurar, troca de aplicativos e Prince serão registrados no checkpoint seguinte.
