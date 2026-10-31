# Prova de conceito DOS — 003F

Status: funcional em Edge e Chrome; demonstração original, não jogo comercial.

Disquete Perdido é um programa DOS .COM x86 em Assembly, fonte própria em
games-source/disquete-perdido/game.asm, licença MIT dedicada. Recolha cinco itens,
evite perigos, mantenha as três vidas e chegue à saída. P pausa, R reinicia,
M silencia, setas/WASD movem. Esc no navegador devolve foco ao desktop.

Runtime self-hosted js-dos 6.22.60/DOSBox WASM, sob GPL2 conforme LICENSE real.
Não confundir metadado npm ISC com a licença do código. Fontes e avisos acompanham
public/vendor/js-dos-6.22.60/SOURCE.zip. Nenhum programa recebido de visitantes é
executado; apenas DISQUETE.COM fixo. Mouse serve para foco/UI, não é mecânica do jogo.

## Demonstração efetiva

1. Abrir Game Center, buscar Disquete Perdido, abrir ficha e Jogar demonstração DOS.
2. Iniciar a engine na janela; antes disso nenhum iframe/runtime é carregado.
3. Teclado movimenta e altera score real no arquivo DOS.
4. PC Speaker emulado produz amostras Web Audio não nulas após ativação por gesto.
   Essa é medição digital, não teste auditivo em alto-falantes físicos.
5. Pausa impede movimento; reinício zera score. Tela cheia entra/sai via browser.
6. Escape entrega foco ao botão do desktop; sair remove iframe/realm da engine.
7. Save DOS SAVE.DAT de oito bytes é lido pelo filesystem emulado e espelhado em
   localStorage. Reabrir recupera estado; partida completa foi vencida após reload.
8. Build estática foi executada em /RETRO-OS/ sem requests externos ou /api.

## Tamanho e performance

- DISQUETE.COM: aproximadamente 1,9 KB; tamanho/hash exatos em runtime-integrity.json.
- Runtime: js-dos.js 108367 B + wdosbox.js 189751 B + WASM 1808397 B, cerca de 2,1 MB.
- Fontes do runtime: ZIP 1789459 B separado; acompanha distribuição, não é baixado
  na inicialização do desktop ou da partida.
- Heap inicial medido: 67108864 bytes (64 MiB). Não é memória total do navegador.
- Carregamento local observado na regressão aproximadamente 1 segundo; valores de
  cada execução aparecem em e2e-final.log. Não é benchmark de rede/CPU de usuários.
- Bundle principal atual: cerca de 458 KB antes de gzip; CSS cerca de 65 KB.
  Histórico/figuras de museu possuem chunks separados; engine não entra nesse JS.

## Falhas encontradas e correções

A primeira chamada main com jogo no autoexec não resolvia a interface pronta;
passamos a iniciar shell e executar o programa depois. O teste de áudio inicialmente
media apenas ScriptProcessor; o runtime usa BufferSource, agora observado também.
A restauração de save precisava reconstruir o mapa antes de aplicar a máscara de
coletas: corrigido e comprovado por vitória completa após reload. Corrigida também
a posição do dígito de vidas no HUD após inspeção da screenshot.

## Limitações

Firefox não iniciou neste ambiente; sem homologação. Não houve teste físico mobile.
Fechar remove iframe e seus recursos, mas GC/memória total não foi perfilado e não
se garante liberação instantânea pelo browser. Há watchdog de carregamento e retry;
travamento durante execução não é detectado por watchdog separado. Saves não entram
ainda no backup universal e não oferecem segurança competitiva. Emulador legado
precisa auditoria/rebuild antes de eventual publicação. Nenhum clássico comercial
foi testado ou distribuído como consequência desta PoC.

Evidências: evidence/003f/*-dos-window.png, *-dos-victory.png,
*-static-production.png e os testes e2e/emulation003f.spec.ts,
e2e/dos-victory003f.spec.ts e static-e2e/static003f.spec.ts.

A inspeção visual final identificou composição parcial das linhas estáticas do
DOS em escala grande. O programa força refresh VGA e a bridge apresenta uma cópia
completa do framebuffer real a cerca de 30 fps; não contém lógica do jogo. A
verificação passou a contar pixels desenhados e aguardar estabilidade, em vez
de inferir conteúdo pelo tamanho comprimido do PNG. As capturas finais foram
abertas e mostram mapa, HUD com três vidas e mensagem de vitória completos.
