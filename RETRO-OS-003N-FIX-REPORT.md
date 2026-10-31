# RETRO OS 003N-FIX — três jogos instalados privadamente
Parecer: INSTALAÇÃO PESSOAL PRONTA PARA TESTE HUMANO. Prince é a demo DOS limitada; a versão completa continua dependente de uma cópia legítima do proprietário. Nenhuma aprovação de gameplay, áudio, desempenho ou saves foi emitida em nome dele.

Base: 5faa9038b5ac49acbcb866df948de9730b15e82a, branch development/retro-os-003n-fix-three-games, worktree RETRO-OS-003N-FIX. As versões anteriores, main e site público 002 foram preservados. Sem push/deploy. O SHA final e hashes de backup constam no manifesto externo de entrega.

| Jogo | Arquivos disponíveis | Instalado | Jogar habilitado | Pendências |
|---|---|---|---|---|
| Prince of Persia demo DOS 1.0 | 18 arquivos originais + identificação da demo, pasta pessoal | Sim, via instalação local/IndexedDB | Sim | Não é versão completa; gameplay/save da demo a avaliar |
| DOOM shareware v1.9 | EXE DOS e DOOM1.WAD, 20 arquivos extraídos do pacote original | Sim | Sim | Avaliação humana de controles/áudio/save |
| Duke 3D shareware v1.3d | 20 originais + CFG gerado pelo setup nativo | Sim | Sim | Áudio inicialmente desativado no CFG; controles/mouse/save a avaliar |

## O problema real e a correção
A 003N possuía perfis, mas não os dados. Foram obtidas demonstração/sharewares de fontes identificadas, conferidos os arquivos originais e executados os componentes DOS somente em sandbox quando necessário. Os instaladores multipartes não foram confundidos com instalação pronta. Detalhes de licença, hashes e extração nos relatórios individuais.

Dados pessoais estão em RETRO-OS-003N-FIX-PRIVATE, pasta irmã externa ao repositório. O servidor de desenvolvimento, quando iniciado explicitamente com RETRO_PRIVATE_GAMES_DIR, fornece somente três pacotes allowlisted ao próprio navegador. O Launcher verifica tamanho/SHA-256, reutiliza o importador e grava bytes no IndexedDB. A coleção Prince / DOOM / Duke facilita encontrá-los; IDs estáveis evitam cópias repetidas ao reabrir. O catálogo histórico continua separado das instalações, sem modificar fichas ou os três jogos anteriores.

Incluída seleção de pasta, empacotada no próprio navegador, além de ZIP. A validação de dados mínimos foi reforçada com os arquivos reais da demo Prince e com CON/CFG do Duke. A interface mostra edição instalada, andamento/erro e mantém a avaliação manual separada.

## Isolamento e entrega
Nenhum pacote novo de jogo entrou em public, dist, Git, bundle ou ZIP de código. O endpoint pessoal só existe em desenvolvimento com diretório explícito, preso a loopback/origem local; não existe no build estático. Os ativos, descritores e adaptador de Freedoom/Ken/SkyRoads permanecem inalterados. VFS, preferências, saves e dados anteriores não foram apagados.

Entrega G:/Meu Drive/WORKGPT/RETRO-OS/entregas-privadas/003N-FIX-THREE-GAMES: código, build sem dados pessoais, commit local, bundle verificável, restauração independente, evidências e instruções. O backup Git restaura o código; a pasta privada do proprietário deve ser conservada separadamente para manter os três pacotes disponíveis. Não mover dados pessoais para public/dist.

Preview instalado: http://127.0.0.1:4676/. Instruções: MANUAL-TEST-INSTRUCTIONS.md. Testes: THREE-GAMES-TEST-REPORT.md. Nem o resultado técnico nem a licença de shareware autorizam publicação nesta missão.
