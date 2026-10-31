# Auditoria de integração 003L

Base WORK 0d43f13; Anti df29402832e8ff143d5c11ab20dcb6636fa6a081; ancestral comum 7c26450.
Bundles completos verificados; backup PRE-003L verificado antes das alterações.
Worktree e branch development/retro-os-003l-integration exclusivos.
Estratégia: portar seletivamente código relevante, resolver manualmente shell e execução.
Sem merge da ancestralidade Anti enquanto licenças dos binários do histórico não forem auditadas.
Launcher/CSS/teste unitário importados do Anti; Desktop/Explorer/StartMenu/estilos históricos WORK preservados.
Planos: validar ZIP em limites descomprimidos, armazenar bytes transacionalmente,
montar DOS real, persistir saves produzidos pelo jogo, testar sessões independentes,
regressão completa integrada. Não aceitar teste com mockSaveBytes como save nativo.

## Resolução efetiva

Não houve merge cego nem resolução por “ours/theirs”. Port seletivo preserva a
ancestralidade WORK e atribui a origem Anti neste relatório. Não se acrescentou um
merge-parent Anti, pois seu histórico contém os três ZIPs não liberados para este
pacote de entrega. O bundle final usa somente a branch003L, não --all.
Ambos os commits de origem e o backup anterior permanecem disponíveis privadamente.

Arquivos sobrepostos: Desktop.tsx e Explorer.tsx, além de evidências antigas.
Desktop recebeu somente entrada/preset do Launcher e resolução de atalhos importados;
Explorer recebeu associação de .lnk e correção do clique MIX. Provider, presets
históricos, foco, dirty guards, clipboard e estilos003K foram preservados.
AppHost/registry foram editados manualmente: retrolauncher e dos-imported, sem substituir
Run ou apagar aplicativos. DosGame ganhou contexto separado por gameId, montagem de
bytes validados e persistência. StartMenu e historical-003k.css permaneceram idênticos
à WORK. VFS/local e runtime vendor também. As capturas antigas não são substituídas
na entrega: novos resultados são arquivados em003l/regression.

Código Anti portado: src/launcher, retroGameLauncher.css e testes unitários de catálogo.
Wizard, lote, armazenamento e modais foram corrigidos; adapters deixaram de anunciar
funções init/mount/launch vazias: engineAdapters agora é registro descritivo; o ciclo
real está em DosGame.tsx + emulation/adapter.js. Não se declara um adapter genérico
universal implementado. CSS do Launcher foi ajustado sem trocar o shell histórico.
Nenhuma dependência nova ou alteração de lockfile.

Testes mock antigos do Anti não foram portados como prova. Foram substituídos por
qa003l/native.spec.ts e integration/storage.spec.ts com pacotes originais e navegador
persistente. O guard003K foi atualizado para os limites autorizados003L, mantendo
a verificação de assets/VFS/jogos legados intactos e registry sem contas sociais.
