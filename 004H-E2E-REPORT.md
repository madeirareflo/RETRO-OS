# E2E — 004H

Rodada final completa: **44 PASS**, Chrome e Edge, 22 cenários por navegador, `evidence/004h/e2e-acceptance.log`. Salto nativo do Prince adicional: **2 PASS**, `prince-action.log`. São 46 execuções de cenários nos dois navegadores em duas rodadas finais distintas, não 46 cenários por navegador.

Cobertura: Prince movimento antes/depois de troca de janela, Ctrl+K restrito e key release; mouse/teclado e saída Quake; bytes reais importados, reimportação, corrupção e reload; janelas/multitarefa; texto persistido; temas; Paint PNG; jogos locais; terminal/calculadora; viewport móvel simulado; nove jornadas da internet; falha simulada de quota no fallback localStorage e recuperação nativa via IndexedDB; 37 estados selecionados individualmente; motores pendentes sem Jogar; pacote incluído 404 bloqueando botão e duplo clique.

Verificar estados não é gameplay; importar não é provar execução da entrada recém-instalada. A quota é injetada em perfil isolado no fallback, não falta física de disco. Save/load de DOOM/Heretic foi observado separadamente após reiniciar processos Chrome/Edge; Quake limitado ao Chrome. Esses fluxos não são contados como casos do runner.

Tentativas anteriores preservadas: controles com amostragem fixa de pose e clique em janela coberta; 38/40 por roteiro que não acionava Iniciar no jogo original; 42/44 por seletor que encontrava a janela externa. Corrigidos os roteiros e repetida a rodada. Não se contaram falhas como PASS. Traces privados de Prince estão fora do Git. O primeiro trace Heretic falhou ao exportar; não contou como restart de navegador.

Firefox: executável não iniciou, spawn UNKNOWN. Aplicação NÃO TESTADA nele. Sem afirmação de compatibilidade universal, áudio físico, teclado físico reservado do OS, desempenho prolongado ou mobile físico.
