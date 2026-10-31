# Duke Nukem 3D shareware — instalação privada
Resultado: INSTALADO — PRONTO PARA TESTE HUMANO. Edição DOS v1.3d, episódio shareware, executável DUKE3D.EXE original e GRP de 11.035.779 bytes.

Fonte: https://www.dosgamesarchive.com/file/duke-nukem-3d/3dduke13 e https://image.dosgamesarchive.com/games/3dduke13.zip. A FAQ mantida pelo projeto EDuke32 confirma a existência da edição shareware e os hashes GRP: https://wiki.eduke32.com/wiki/Frequently_Asked_Questions. MD5 conferido do GRP: c03558e3a78d1c5356dc69b6134c5b55.

O pacote é um instalador real, não o jogo já instalado: INSTALL.EXE, DUKE3DS.IFC e cinco volumes. O instalador foi executado exclusivamente dentro do DOSBox/WebAssembly, gerando DN3DSW13.EXE. O ZIP desse autoextrator foi lido sem execução no Windows. As 20 entradas originais foram mantidas integralmente, incluindo LICENSE.DOC, CONs, ajuda, utilitários e dados. Nenhum executável do jogo foi alterado.

LICENSE.DOC de 24/04/1996 concede compartilhamento individual gratuito e download por serviços gratuitos, condicionado à preservação dos arquivos/notices; outras modalidades têm restrições. Mesmo assim, os dados ficaram somente na instalação pessoal e não foram adicionados ao código/build/bundle. Não se trata de licença irrestrita dos assets ou da edição registrada.

## Problemas efetivamente corrigidos
1. SWCBBS.EXE original é um programa de estilo COM com extensão EXE, sem MZ. O validador estrito recusava o pacote inteiro. Agora somente o perfil Duke aceita esse auxiliar específico, pelo nome, tamanho 4960 e SHA-256 12622c52fa30e57a7bbd8c42c936ce0c278c0fa50bf8027604657cc49eb5119c. Não é selecionável como executável principal pelo perfil; EXEs não MZ arbitrários continuam recusados.
2. A primeira inicialização encerrou porque DUKE3D.CFG não existia. Foi executado o SETUP.EXE original em sandbox DOS e salvo o CFG nativo de 5076 bytes. O validador agora exige CFG e GAME/DEFS/USER.CON junto ao GRP. A repetição exibiu a demonstração 3D nativa, sem erro de script.

Configuração inicial produzida pelo setup: ScreenMode 2, 320×200, FXDevice 13 e MusicDevice 13. O áudio ficou desativado na configuração inicial; não se afirma áudio validado. Para alterar, usar o setup DOS da distribuição e reimportar a pasta com o CFG atualizado. Não editar executáveis ou usar o EDuke32 Win32 no DOSBox.

20000 ciclos, limite já suportado pelo adaptador. Memória/vídeo do runtime existente. A abertura pode levar dezenas de segundos enquanto compila os CONs; a primeira captura de console não foi considerada prova suficiente. A captura final mostra a demonstração automática 3D. Jogabilidade, mouse, áudio e saves permanecem para o proprietário; não foi jogada campanha.
