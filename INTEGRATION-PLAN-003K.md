# Limites de integração — 003K WORK

Base confirmada: 7c26450fb8f08229ec5fef870271dc8af3353fda (003F).
Branch exclusiva: development/retro-os-003k-visual, worktree RETRO-OS-003K-VISUAL.
A ferramenta gerenciada recusou o repositório aninhado; worktree criado por Git.
Backup PRE-003K-WORK verificado antes das alterações. Build/dist, dependências,
cache e portas 4276/4277 pertencem a este worktree; nenhum build compartilhado.

## Entregas localizadas e lidas

003I: G:/Meu Drive/WORKGPT/RETRO-OS/entregas-privadas/003I, bundle HEAD
7b0781533961ef0847590554e7b43cd8bbb88e56. 003J: HEAD
4267cd7abb38b912308759f648963e2f274a0dc8, bundle verificado com histórico completo.
A revisão é clone separado --no-checkout; não é merge nem alteração do Anti.
Na revisão inicial, 003K-ANTI ainda não estava disponível. Foi localizada ao fim; veja atualização abaixo. Não foi integrada/homologada pelo WORK.

## Arquivos reservados ao Anti — não editar

src/launcher/**; public/emulation/**; public/vendor/**; public/games/**;
games-source/**; src/apps/DosGame.tsx; src/games/**;
src/museum/gameCatalog.ts; src/storage/local.ts; src/styles/retroGameLauncher.css.
AppHost.tsx e registry.ts serão somente mapeados, mantendo-os inalterados nesta missão.
Desktop.tsx e Explorer.tsx são compartilhados: alterações visuais isoladas precisam
reconciliação manual com a entrega final do Anti. Não cherry-pick automático.

## Observações concretas da revisão 003J

engineAdapters.ts define EmulatorAdapter, mas init/mountFiles/launch/shutdown dos
adaptadores disponíveis são funções vazias. A execução concreta ocorre por outro
fluxo: contratos não podem ser considerados homologados com base nesses stubs.
IndexedDB RetroOS_GamesStorage versão 1 tem stores saves e game_packages. Precisamos
de migração, recuperação de quotas e testes reais de save/reload/exclusão por jogo.
O relatório de quatro E2E 003J cobre modais e importação simulada; não é teste geral
de todos os jogos/engines. Licenças de cada pacote precisam revisão independente.
Freedoom: Phase 1 (1993) é um metadado suspeito no relatório 003I: não usar o ano
original de Doom como ano do projeto Freedoom sem fonte e edição confirmadas.

## Procedimento futuro

1. Receber commit final, bundle, relatório, testes e inventário de licenças do Anti.
2. Verificar bundle/hash, recuperar em cópia de revisão separada e conferir diff,
   dependências, contratos, mídia, ausência de segredos e arquivos de usuários.
3. Resolver manualmente Desktop/Explorer/AppHost/registry/catalog/storage; preservar
   VFS e preferências 003F. Nunca substituir arquivo inteiro para contornar conflito.
4. Testar GameEntry → seleção → adapter real → mount → launch → áudio/foco/fullscreen
   → save → close → reload → restaurar. Nenhum stub pode satisfazer esses critérios.
5. Validar importação autorizada com limites de tamanho/descompressão, paths e origem,
   sem download automático comercial ou exposição de eXoDOS.
6. Regressão completa nos três temas/resoluções, sem API social, antes de decisão GO.

Não foi feito merge, push ou deploy. O plano será completado com evidências da WORK.

## Mapa de integração por arquivo e contrato

| Ponto | WORK 003K | Entrega 003J revisada | Reconciliar somente após handoff final |
|---|---|---|---|
| registry.ts | Inalterado, sem retrolauncher | Acrescenta retrolauncher e dos-skyroads/dos-klab/dos-freedoom | Validar cada appId e capacidade real; não abrir IDs arbitrários do catálogo |
| AppHost.tsx | Inalterado, Disquete fixo e museu 003F | Importa Launcher, inclui aliases e gameId no DosGame | Merge manual; manter todos os apps atuais e contrato active/close |
| Desktop.tsx | Provider SystemThemeContext, presets, pixels inteiros, menu de contexto, preferências | Preset 880×600 e atalhos do Launcher | Preservar provider, restauração, dirty guards e tratamento de foco |
| Explorer.tsx | Web view 98/2000, tarefas XP, seleção/duplo clique históricos, menus de teclado | Alterações de importação/associação de jogos | Conservar Ctrl/Shift, clipboard, atalhos e preview MIX; importar somente dados validados |
| StartMenu.tsx | Enumera registry, cascatas e navegação por teclado | Novo aplicativo no registry | A enumeração atende o novo item sem alterar o núcleo para cada jogo |
| local.ts / IndexedDB | VFS e chaves 003F sem alteração | Catálogo e RetroOS_GamesStorage v1 | Não misturar nem apagar retro-os-media ou documentos ao excluir jogo |
| CSS/ícones | historical-003k.css e arte própria contextual | retroGameLauncher.css | Isolar seletores; não sobrescrever globalmente janelas, diálogos ou foco |

Observações adicionais verificadas no código **003J**, não na futura 003K-ANTI:

- DosGame envia retro:focus-app com `dosgame-${gameId}`. O registry usa `dosgame`,
  `dos-skyroads`, `dos-klab`, `dos-freedoom`; Desktop filtra os IDs pelo registry.
  Esses valores não coincidem. A integração deve passar appId explicitamente ou
  corrigir o mapeamento e testar foco real da janela em cada jogo.
- handleCreateShortcut do Launcher apenas altera a mensagem de status; não presumir
  que ele já persiste um atalho no Desktop. Testar persistência e abertura da ficha.
- isPlayable/appId são lidos do catálogo e convertidos por cast. Verificar whitelist,
  arquivos, engine e evidência de execução antes de promover um estado jogável.
- As funções vazias de engineAdapters.ts não demonstram falha de toda execução legada;
  demonstram que aquela interface não está implementada. Validar a rota real e definir
  uma única interface de ciclo de vida antes de depender dela no shell.

## Aceitação futura obrigatória (não executada como integração nesta missão)

1. Identificar bundle/commit final, conferir hash e restaurar sem depender de HEAD
   implícito. Instalar dependências pelo lockfile e revisar cada alteração de pacote.
2. Executar build/E2E da entrega do Anti em diretório/portas próprios, sem usar este
   dist ou o workspace ativo de desenvolvimento.
3. Registry → menu/atalho → Launcher → GameEntry → engine real → mount/launch.
   Verificar conteúdo gráfico e interação de partida; não aceitar só modal ou tela inicial.
4. Foco/captura de teclado, Esc, minimizar/pausar, restaurar, áudio, fullscreen,
   fechar/reabrir, remover listeners e cancelar carregamentos pendentes por sessão.
5. Importação local: extensão/assinatura, quantidade de entradas, tamanho comprimido
   e descomprimido, path traversal, nomes duplicados, arquivos corrompidos e quota.
6. Perfil aplicado de verdade: cycles/machine/memory/soundDevice devem chegar à engine,
   com erro claro para opção não suportada. Conversão de CONF não valida compatibilidade.
7. Save original por jogo → backup → reload → restaurar; rejeitar dados incorretos e
   impedir troca entre gameIds. Exclusão deve preservar documentos e saves escolhidos.
8. Nenhum download comercial automático, fonte remota não confiável ou arquivo de
   eXoDOS incluído sem autorização. Inventário por asset/versão/origem/licença.
9. Repetir 800×600, 1024×768, 1366×768 e 1920×1080 em 98/2000/XP e Edge/Chrome;
   complementar Firefox e dispositivos físicos quando disponíveis.
10. Só declarar integração concluída após resolver manualmente os conflitos e executar
    a regressão completa combinada. A aprovação da WORK não homologa o Launcher.

## Atualização: entrega 003K-ANTI localizada na conferência final

Bundle privado completo verificado: `retro-os-003k-games.bundle`, ref
`development/retro-os-003k-games`, commit **df29402832e8ff143d5c11ab20dcb6636fa6a081**.
Leitura feita em clone separado sem checkout; nenhum fetch/merge no branch WORK.
O Anti relata 18 testes Chrome aprovados; este WORK não os reexecutou.

**Gate de integração ainda não aprovado.** A inspeção de
`e2e/homologation003k.spec.ts` mostra que o teste de save injeta bytes fictícios
por `page.evaluate` no localStorage e depois compara esse mesmo armazenamento.
Isso não comprova gravação pelo jogo nem restauração dentro do filesystem DOS.
O teste chamado pipeline de importação abre/fecha modais e verifica controles;
não envia pacote, monta arquivos ou executa o pacote importado.
`src/launcher/engineAdapters.ts` ainda declara os adapters disponíveis com
init/mountFiles/launch/shutdown vazios. Isso não invalida a rota legada de jogos,
mas impede homologar o contrato genérico apenas pelo relatório.

Antes de integrar: jogo deve produzir um save por sua própria interface; fechar,
reabrir e demonstrar progresso restaurado dentro do jogo. Importação deve usar
fixture original licenciada, verificar bytes montados, executar e reabrir.
Revisar separadamente licenças dos arquivos de jogos, limites de upload/ZIP,
quitação de recursos e conflitos de Desktop/AppHost/registry. Sem merge automático.
O parecer GO do Anti é registrado como declaração do produtor, não aprovação WORK.

