; Disquete Perdido — original DOS game for RETRO OS 003F.
; Copyright (c) 2026 Projeto Davi. Dedicated game source/binary: MIT license.
; Build: nasm -f bin game.asm -o DISQUETE.COM
BITS 16
ORG 100h
start:
    push cs
    pop ds
    mov ax,3
    int 10h
    mov ah,1
    mov cx,2607h
    int 10h
    mov dx,filename
    mov ax,3d00h
    int 21h
    jc fresh
    mov bx,ax
    mov ah,3fh
    mov cx,8
    mov dx,state
    int 21h
    push ax
    mov ah,3eh
    int 21h
    pop ax
    cmp ax,8
    jne fresh
    cmp word [pos],384
    jae fresh
    cmp byte [score],5
    ja fresh
    cmp byte [lives],3
    ja fresh
    cmp byte [version],1
    jne fresh
    jmp restoremap
fresh:
    call reset
restoremap:
    ; A restored save still needs the original geometry before applying its mask.
    push es
    push cs
    pop es
    mov si,original
    mov di,map
    mov cx,384
    rep movsb
    pop es
    mov bx,targets
    mov cl,1
    mov dx,5
.restore:
    test [collected],cl
    jz .next
    mov si,[bx]
    mov byte [map+si],'.'
.next:
    add bx,2
    shl cl,1
    dec dx
    jnz .restore
    call save
    call render
loopgame:
    xor ah,ah
    int 16h
    cmp al,27
    je quit
    cmp al,'r'
    je restart
    cmp al,'R'
    je restart
    cmp al,'m'
    je mute
    cmp al,'M'
    je mute
    cmp al,'p'
    je pause
    cmp al,'P'
    je pause
    cmp byte [paused],0
    jne loopgame
    cmp byte [lives],0
    je loopgame
    mov bx,[pos]
    cmp ah,4bh
    je left
    cmp al,'a'
    je left
    cmp ah,4dh
    je right
    cmp al,'d'
    je right
    cmp ah,48h
    je up
    cmp al,'w'
    je up
    cmp ah,50h
    je down
    cmp al,'s'
    je down
    jmp loopgame
left: dec bx
    jmp move
right: inc bx
    jmp move
up: sub bx,32
    jmp move
down: add bx,32
move:
    cmp bx,384
    jae loopgame
    mov al,[map+bx]
    cmp al,'#'
    je loopgame
    cmp al,'E'
    jne .hazard
    cmp byte [score],5
    jne loopgame
    mov [pos],bx
    mov byte [paused],2
    call beep
    jmp changed
.hazard:
    cmp al,'X'
    jne .treasure
    dec byte [lives]
    mov word [pos],33
    call beep
    jmp changed
.treasure:
    mov [pos],bx
    cmp al,'*'
    jne changed
    mov byte [map+bx],'.'
    inc byte [score]
    mov si,targets
    mov cl,1
.find:
    cmp [si],bx
    je .found
    add si,2
    shl cl,1
    jmp .find
.found:
    or [collected],cl
    call beep
changed:
    call save
    call render
    jmp loopgame
pause:
    cmp byte [paused],2
    je loopgame
    xor byte [paused],1
    jmp changed
mute:
    xor byte [audio],1
    jmp changed
restart:
    call reset
    jmp changed
reset:
    mov word [pos],33
    mov byte [score],0
    mov byte [lives],3
    mov byte [paused],0
    mov byte [collected],0
    mov byte [version],1
    push es
    push cs
    pop es
    mov si,original
    mov di,map
    mov cx,384
    rep movsb
    pop es
    ret
save:
    pusha
    mov ah,3ch
    xor cx,cx
    mov dx,filename
    int 21h
    jc .end
    mov bx,ax
    mov ah,40h
    mov cx,8
    mov dx,state
    int 21h
    mov ah,3eh
    int 21h
.end: popa
    ret
beep:
    cmp byte [audio],0
    je .end
    pusha
    mov al,0b6h
    out 43h,al
    mov ax,1200
    out 42h,al
    mov al,ah
    out 42h,al
    in al,61h
    or al,3
    out 61h,al
    mov ah,86h
    xor cx,cx
    mov dx,55000
    int 15h
    in al,61h
    and al,0fch
    out 61h,al
    popa
.end: ret
render:
    pusha
    ; Force a complete VGA refresh; legacy surface renderer loses unchanged rows.
    mov ax,3
    int 10h
    mov ah,1
    mov cx,2607h
    int 10h
    push es
    mov ax,0b800h
    mov es,ax
    xor di,di
    mov ax,1720h
    mov cx,2000
    rep stosw
    mov si,title
    mov di,164
    call line
    mov si,help
    mov di,324
    call line
    mov si,legend
    mov di,484
    call line
    mov si,map
    mov di,824
    mov bp,12
.row:
    mov cx,32
.cell:
    lodsb
    mov ah,17h
    cmp al,'#'
    jne .star
    mov ah,1bh
.star:
    cmp al,'*'
    jne .exit
    mov ah,1eh
.exit:
    cmp al,'E'
    jne .bad
    mov ah,2fh
.bad:
    cmp al,'X'
    jne .put
    mov ah,4fh
.put:
    stosw
    loop .cell
    add di,96
    dec bp
    jnz .row
    mov ax,[pos]
    xor dx,dx
    mov cx,32
    div cx
    mov bx,dx
    mov cx,160
    mul cx
    shl bx,1
    add ax,bx
    add ax,824
    mov di,ax
    mov ax,2f40h
    stosw
    mov al,[score]
    add al,'0'
    mov [status+8],al
    mov al,[lives]
    add al,'0'
    mov [status+21],al
    mov si,status
    mov di,2904
    call line
    mov si,normal
    cmp byte [paused],1
    jne .win
    mov si,pausedText
.win:
    cmp byte [paused],2
    jne .dead
    mov si,wonText
.dead:
    cmp byte [lives],0
    jne .msg
    mov si,lostText
.msg:
    mov di,3224
    call line
    pop es
    popa
    ret
line:
    lodsb
    test al,al
    jz .end
    mov ah,1fh
    stosw
    jmp line
.end: ret
quit:
    call save
    mov ax,3
    int 10h
    mov ax,4c00h
    int 21h
state:
pos dw 33
score db 0
lives db 3
paused db 0
audio db 1
collected db 0
version db 1
filename db 'SAVE.DAT',0
title db 'DISQUETE PERDIDO  /  RETRO OS  /  DOS ORIGINAL',0
help db 'SETAS ou WASD: mover | P: pausar | R: reiniciar | M: som | ESC: desktop',0
legend db '@ voce   * disquetes   X curto-circuito   E saida (5 disquetes)',0
status db 'PONTOS: 0/5   VIDAS: 3   SAVE LOCAL AUTOMATICO',0
normal db 'Explore o laboratorio. Leve os cinco disquetes ate a saida!',0
pausedText db 'PAUSADO - pressione P para continuar.',0
wonText db 'VOCE VENCEU! Os trabalhos da escola estao salvos. R: nova partida',0
lostText db 'FIM DE JOGO. R: tentar novamente.',0
targets dw 34,40,105,225,348
%macro row 1
%%begin: db %1
 times 32-($-%%begin) db '#'
%endmacro
original:
 row '################################'
 row '#.*.....*......................#'
 row '#.###.######.#####.#####.#####.#'
 row '#........*.....................#'
 row '#.###.######.#####.#####.#####.#'
 row '#...........X..................#'
 row '#.###.######.#####.#####.#####.#'
 row '#*.............................#'
 row '#.###.######.#####.#####.#####.#'
 row '#...................X..........#'
 row '#...........................*.E#'
 row '################################'
map: times 384 db 0

