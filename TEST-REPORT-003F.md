# Testes — RETRO OS 003F

Estado final: consultar resultados abaixo e logs associados. Não há homologação
Firefox ou mobile físico. Data de referência da missão: 31/10/2026.

## Execução

Validador reproduzível: node scripts/validate-003f.mjs.

| Verificação | Resultado | Evidência |
|---|---|---|
| TypeScript --noEmit | Passou | evidence/003f/typecheck.log (vazio em sucesso) |
| ESLint src | Passou | evidence/003f/lint.log (vazio em sucesso) |
| Vitest | 40 passaram, 6 arquivos | evidence/003f/unit.log |
| Build Vite | Passou | evidence/003f/build.log |
| Regressão completa Edge/Chrome | 102 passaram | evidence/003f/e2e-final.log |
| Prévia estática /RETRO-OS/ Edge/Chrome | 2 passaram | evidence/003f/static-production.log |
| Firefox | 3 testes bloqueados no launch: spawn UNKNOWN | evidence/003f/firefox-attempt.log |

Baseline antes de arquivar o social: 36 unitários, 8 testes Node de servidor e 78
E2E aprovados. Os testes sociais antigos foram preservados no arquivo; não se
reativou servidor para executar a 003F. A validação atual é do museu estático.

## Cobertura real

Regressões anteriores: boot, janelas, arraste/redimensionamento, foco, minimizar/
restaurar, multitarefa, menu, temas e persistência, VFS, Ctrl/Shift e transferência,
lixeira, documentos, PNG IndexedDB/exportação, playlist/áudio local, jogos,
calculadora, terminal, modem, protetores, discos virtuais e backup/migração.

Novos fluxos: navegação de perfis/álbum/recados/tópicos com /api bloqueada; Messenger
roteirizado e LAN; histórico de perfis no navegador; partida naval local completa
até vitória e reload; cancelamento de reinício com texto alterado; menus Explorer,
menu de sistema e visão de itens do Painel de Controle nos quatro temas.

DOS: abertura pelo Game Center, execução x86 real, teclado, score, áudio digital
não nulo, pausa sem movimento, reinício, fullscreen, Esc liberando foco, remoção
do iframe, restauração de save e vitória após reload em Edge/Chrome. Não foi
exigido mouse dentro do jogo. Teste da build estática observa zero /api ou requests
remotos no fluxo de emulação e zero pageerror.

Resolucões: 800×600, 1024×768, 1366×768 e 1920×1080 nos testes herdados. Não equivale
a teste físico touch. Fontes/DPI dependem do ambiente. Medição de heap é da engine,
não da memória total do browser; não houve profiling de GC ou benchmark externo.

Após a última correção puramente visual do HUD DOS, os fluxos DOS/Paint e a prévia estática foram repetidos; ver dos-final.log e static-production.log.

## Falhas encontradas nesta missão

- Perfil com retrato tinha nome acessível inadequado: aria-label corrigido, fluxos
  repetidos e aprovados. Não foi ocultada falha por remover a interação do teste.
- CI da engine aguardava shell terminar: sequência de inicialização corrigida.
- Detector inicial de som não media BufferSource: teste observa caminho usado pela
  engine e coleta real em vez de apenas clicar no botão de som.
- Mapa não reconstruído após save: corrigido e testado com vitória após reload.
- HUD de vidas escrevia o dígito ao lado do original: offset corrigido após captura.
- Vite preview tinha base /, divergente de /RETRO-OS/: isPreview agora usa a base
  da build; repetição estática aprovada. Não houve publicação para testar.
- Firefox: spawn UNKNOWN antes de executar fluxos; limitação permanece aberta.

## Evidências e limites

Screenshots novas em evidence/003f; visual/ contém quatro temas nos dois browsers,
menus e diálogos; before/ traz capturas 003E extraídas do commit de base. Capturas
herdadas regeneradas foram copiadas a regression/ e os originais antigos restaurados.
As referências Windows consultadas permaneceram em TEMP, sem redistribuição.

Os testes não demonstram igualdade visual histórica, compatibilidade dos títulos
comerciais, segurança do backend arquivado, áudio em hardware físico, Firefox,
leitor de tela, mobile físico ou desempenho em equipamentos de terceiros.

A inspeção visual final identificou composição parcial das linhas estáticas do
DOS em escala grande. O programa força refresh VGA e a bridge apresenta uma cópia
completa do framebuffer real a cerca de 30 fps; não contém lógica do jogo. A
verificação passou a contar pixels desenhados e aguardar estabilidade, em vez
de inferir conteúdo pelo tamanho comprimido do PNG. As capturas finais foram
abertas e mostram mapa, HUD com três vidas e mensagem de vitória completos.

Último ajuste: o catálogo adicional DOS passou a ser compartilhado pelo Game
Center e pelos atalhos do desktop. Após esse ajuste foram repetidos TypeScript,
lint, 40 unitários, build, 24 E2E dirigidos de desktop/catálogo/Paint/DOS e 2 testes
estáticos, todos aprovados. Ver shortcut-regression.log. Esses 24 se sobrepõem à
suíte de 102: não são 24 casos únicos adicionais.
