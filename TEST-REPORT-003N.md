# Testes técnicos 003N
| Verificação | Resultado | Evidência |
|---|---|---|
| TypeScript | Passou | evidence/003n/typecheck.log (saída vazia, sucesso) |
| ESLint | Passou | lint.log (saída vazia, sucesso) |
| Build | Passou, aviso de chunk >500 KB | build.log |
| Unitários afetados + regressão do importador/catálogo e assets fornecidos | 16/16 | unit.log |
| Smoke dev, Chrome/Edge | 6/6, 21.7s | smoke-dev.log |
| Smoke build estática, Chrome/Edge | 6/6, 18.4s | smoke-static.log |
| Screenshots mínimos | 4 PNG próprios, painel manual | *-manual-panel.png |
| Bundle da base 003M | Verificado antes de finalizar | base-bundle-verify.log |

Escopo: desktop → Game Center → Launcher → perfis; ausência de Jogar quando faltam arquivos; persistência de resultado/observações em perfil temporário; importação genérica anterior; importação guiada de estrutura sintética; bytes em IndexedDB; reload; botão Jogar abre AppHost real; inicialização e encerramento do Disquete Perdido DOS, sem partida. Build estática testada em /RETRO-OS/, sem backend/API social. Os metadados legados da importação genérica permanecem funcionais.

As fixtures PRINCE.EXE/LEVELS.DAT são sintéticas e explicitamente identificadas como não sendo um jogo. Não foram usadas como prova de gameplay ou save nativo. Arquivos são criados em memória pelo teste, em perfis de navegador isolados; não são incluídos na biblioteca do proprietário nem na distribuição como jogo.

Primeira tentativa: label acessível Resultado incluía texto de opções e não era localizado de modo exato. Corrigido com aria-label, recompilado e repetidos os smokes afetados. Os logs *-first.log preservam a tentativa falha; os resultados finais acima são os das novas execuções. Avaliações foram vinculadas ao ID do pacote para não transferir homologação a nova importação.

Não executados: partidas dos candidatos, fases, campanhas de screenshots, testes completos de saves, Firefox, aparelho mobile físico ou regressão visual histórica extensa. Isso atende ao escopo econômico da missão; testes humanos permanecem pendentes, sem reutilizar resultados 003M como se fossem da 003N.
