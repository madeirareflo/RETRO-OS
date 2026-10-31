# Perfis 003N
Fontes locais: nove relatórios 003M-ANTI-RESEARCH, mais três registros pertinentes de exodos_37_detailed_analysis.json e estrutura dos demais manifestos JSON. 18 correspondências/37 pesquisados são metadados; nenhum pacote completo foi considerado instalado.

| Perfil | Ano | Executável DOS | Dados mínimos reconhecidos | Ciclos aplicados |
|---|---|---|---|---:|
| Prince of Persia | DOS 1990; original Apple II 1989 | PRINCE.EXE | LEVELS.DAT + todos os demais dados da edição | 6000 |
| DOOM shareware v1.9 | jogo original 1993; revisão v1.9 posterior | DOOM.EXE | DOOM1.WAD, mesma distribuição | 20000 |
| Duke Nukem 3D shareware v1.3d | 1996 | DUKE3D.EXE | DUKE3D.GRP + demais dados/configuração da edição | 20000 |

Reconhecimento por nomes/estrutura e validação de formato não comprova a edição ou completude de todos os dados. Não é autenticação por hash de uma distribuição comercial. Prince não exige PRINCE.SAV pré-existente nem o PRINCE.DAT genérico sugerido pelo Anti. O save é produzido pelo jogo quando suportado.
Adaptador reutilizado: DOSBox WASM/js-dos 6.22.60. Perfis não aplicam machine/memoryMb/scaler personalizados: vídeo, heap, Sound Blaster/OPL e mouse são herdados do runtime existente. 6000/20000 são estimativas de configuração; não calibração de gameplay. Duke 25000 proposto pelo Anti foi reduzido ao teto real 20000, sem prometer desempenho.

ZIP pode conter pasta pai: no runtime apenas a subárvore da pasta do executável escolhido é montada como raiz virtual C:. O ZIP original no IndexedDB permanece intacto. Caminhos externos e BATs não são executados. Esc permanece no jogo em perfis; Shift+Esc libera foco. Importações genéricas antigas preservam seus controles.
PRINCE.SAV, DOOMSAV*.DSG e GAME*.SAV são exemplos de saves nativos dependentes da edição; não foram homologados na 003N. Persistência herdada: 4 MB por arquivo, 8 MB por snapshot de arquivos; não é snapshot de CPU. Pausa, reinício e configuração de áudio devem ser realizados pelo menu do próprio jogo quando não houver API genérica validada.
