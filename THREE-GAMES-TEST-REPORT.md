# Verificação técnica — 003N-FIX
TypeScript, lint e build passaram. 26 testes unitários relevantes passaram (perfis, pasta, limites de validação, exceção autenticada e servidor privado). Smokes curtos: seis em desenvolvimento e seis na build estática, Chrome/Edge. Não foi feita regressão visual extensa, teste Firefox ou campanha de gameplay.

## Inicialização com dados reais
| Jogo | Evidência nativa observada no Chrome | Resultado |
|---|---|---|
| Prince demo DOS 1.0 | Fase limitada, personagem e cenário da demo | Inicialização confirmada |
| DOOM shareware v1.9 | Tela original DOOM, executável e WAD reais | Inicialização confirmada |
| Duke shareware v1.3d | Demonstração automática 3D após CFG criado | Inicialização confirmada após correção |

Arquivos: evidence/003n-fix/*-native-start.png, real-initialization.json, duke-initialization.json e private-installation-inventory.json. Os screenshots foram efetivamente inspecionados. Não foi usada fixture como prova desses jogos. O marcador ready/heap do emulador, isoladamente, não foi considerado suficiente: o primeiro Duke chegou ao console, mas encerrou por falta de CFG.

Falhas observadas e corrigidas: importação do Duke recusada pelo auxiliar SWCBBS.EXE sem MZ; exceção limitada ao hash original desse arquivo passivo. Na abertura seguinte, erro nativo ReadSetup/DUKE3D.CFG ausente; configuração gerada no setup original e novo boot mostrou o ambiente 3D. As correções não alteram EXEs ou GRP e não modificam os jogos anteriormente aprovados.

Configuração inicial Duke mantém áudio desativado no CFG produzido pelo setup. Não se declara áudio, mouse, desempenho ou saves homologados. Prince é demo, sem promessa de save. As três janelas foram encerradas pelo controle do desktop; não houve partida longa ou fase concluída.

Nos smokes sintéticos o endpoint pessoal foi interceptado como ausente para isolar fixtures e testar a build sem dados privados. O fluxo pessoal verdadeiro foi validado separadamente nas inicializações acima. A build estática não contém o endpoint nem os pacotes novos. A pasta do proprietário não foi anexada aos testes ou ao Git.


