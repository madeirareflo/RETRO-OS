# Save nativo — 003L

Jogo: Disquete Perdido DOS, binário original MIT de1955bytes,
SHA256 f0c50f1717cd8a12ddbdd52addb675e79e9fb1b393ceb35a8af3f44bd3084726.
Fonte preservada em games-source/disquete-perdido/game.asm: o próprio programa usa
INT21h para ler/gravar SAVE.DAT; nenhum arquivo de save é criado pelo teste.

Procedimento qa003l/native.spec.ts:
1. Chrome/Edge com perfil persistente temporário exclusivo e sem progresso.
2. Importação de ZIP deflate do binário original pela interface.
3. Conferência dos bytes/hash no IndexedDB; bloquear download remoto do jogo.
4. Iniciar e observar0/5; pressionar seta direita e recolher item, observar1/5.
5. Ler, apenas para evidência, save gerado no FS/emissor e no IndexedDB; registrar8bytes e SHA256.
6. Sair pelo app, fechar aba e navegador. Lançar um novo processo com o mesmo perfil.
7. Reabrir Launcher, executar pacote, ver1/5 e posição preservada no próprio jogo.
8. Comparar com outro navegador/perfil sem progresso: mesmo pacote inicia0/5.
9. Ver Gerenciador, criar atalho, remover pacote e verificar que os saves continuam.

Evidências: chrome-real-save.json e msedge-real-save.json, *-native-progress.png,
*-native-restored.png, *-native-fresh.png, *-save-manager.png. Hash do arquivo e
valores vêm da execução, não de mockSaveBytes. Regressão também conclui os5 itens
até vitória após reload na rota player.html original.

Persistência: saves por gameId+nome no IndexedDB; espelho síncrono localStorage
por gameId cobre pagehide/fechamento. Captura só arquivos alterados em relação ao
pacote, excluindo executáveis e diretórios internos do emulador. Limites:4MiB por
save,8MiB de snapshot,64 arquivos por mensagem. Não é savestate da memória DOSBox.
Falha de quota apresenta erro; não há garantia de sobreviver a desligamento abrupto
entre escrita no DOS e sincronização250ms. Restore/exclusão devem ocorrer com o
jogo fechado. Compatibilidade de slots de Ken/SkyRoads/Freedoom não foi homologada.

Saves genéricos: a captura atual não reproduz exclusões de arquivos ou arquivos
vazios como operações persistentes. Isso não afeta o SAVE.DAT de8bytes homologado,
mas deve ser resolvido antes de prometer recuperação universal de qualquer jogo.
