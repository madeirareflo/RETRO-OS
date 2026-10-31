# Integração 003M
Três descritores fixos em src/launcher/builtinGames.ts; registry e AppHost abrem dos-freedoom, dos-klab e dos-skyroads. Game Center e Launcher consomem o mesmo catálogo; fichas de museu permanecem distintas. Favoritos e importados antigos usam suas chaves anteriores. Nenhum banco foi reinicializado.

Pacote same-origin → SHA-256 fixo → inspectPackage → arquivos validados → iframe local → DOSBox WASM. Não há busca de jogo em servidor externo durante a execução. A importação de arquivo pessoal continua explícita e separada. Pacotes fornecidos são somente leitura; saves são individualizados por ID e nome.

FastDoom usa executável DOS estendido LE, cuja aceitação é restrita ao nome FDOOM13H.EXE do pacote já verificado por hash. Importações comuns continuam rejeitando LE/LX e PE/NE. Argumento -iwad FREEDM1.WAD é fixo no adaptador, sem executar BAT ou aceitar comandos livres.

O adaptador agora calcula fingerprint somente para arquivos mutáveis elegíveis; não serializa WADs de dezenas de MB a cada 250ms. Limites existentes de snapshot/arquivo continuam ativos. Não há snapshot de CPU/memória: persistimos arquivos nativos alterados. Arquivos vazios, exclusões e saves acima dos limites continuam limitações.

Esc permanece dentro dos jogos fornecidos; Shift+Esc devolve foco ao desktop. Importados/Disquete preservam seu comportamento anterior. Pausa/reinício genéricos ficam desabilitados quando a engine não oferece contrato confiável: use o menu do próprio jogo. Ken foi calibrado a 12000 ciclos e seu auxílio corrigido para salvar/carregar pelo menu Esc.

Freedoom tem áudio original livre e efeitos confirmáveis pelo medidor. Ken teve vídeo/controle/save, mas o áudio não apresentou pico na configuração testada; pendência explícita. SkyRoads não recebe alegação de save nativo homologado.
