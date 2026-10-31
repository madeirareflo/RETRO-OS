# Disquete Perdido — programa DOS original

Jogo do Projeto Davi escrito nesta missão. Não é port de jogo comercial.

Compilar com NASM 2.16.03 (ferramenta externa, não redistribuída):

    nasm -f bin games-source/disquete-perdido/game.asm -o public/emulation/DISQUETE.COM

Modo real x86, DOS .COM, vídeo texto BIOS/B800, teclado BIOS, PC Speaker e
arquivo SAVE.DAT via int 21h. Cinco itens, três vidas, paredes, perigos e saída.
Setas/WASD movem; P pausa; R reinicia; M silencia. No navegador Esc devolve foco
ao desktop. Fechar a janela remove o iframe e a instância do emulador.

A bridge somente carrega o binário fixo e um save validado de oito bytes.
Não há upload de executáveis nem acesso ao disco físico. Código e binário:
MIT dedicada em LICENSE. Runtime GPL2 e seus fontes ficam separados.
