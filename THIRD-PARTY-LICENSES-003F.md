# Licenças e proveniência — 003F

O inventário de dependências anterior permanece em THIRD-PARTY-LICENSES.md.
Nenhum asset Microsoft, música comercial, ROM, ISO, crack ou jogo comercial foi
acrescentado. Metadados editoriais não concedem licença aos títulos citados.

## Componentes novos

| Item | Origem/licença | Arquivos e tratamento |
|---|---|---|
| js-dos 6.22.60 / DOSBox WASM | Repositório caiiiycuk/js-dos; root LICENSE GPL2. Metadados npm dizem ISC: conflito documentado, não adotamos ISC como licença suficiente | public/vendor/js-dos-6.22.60/{js-dos.js,wdosbox.js,wdosbox.wasm.js,LICENSE,NOTICE.md,SOURCE.zip}; runtime sem alterações |
| Fontes do runtime | GitHead d9d1045ef321bcde3f061dc8e686ded890147d6a; licenças internas preservadas | third-party-source/js-dos-6.22.60-source.zip e cópia pública SOURCE.zip; sem jogos de exemplo |
| Disquete Perdido DOS | Criação original Projeto Davi; MIT dedicada a game.asm e DISQUETE.COM | games-source/disquete-perdido/LICENSE e public/emulation/GAME-LICENSE.txt |
| Retratos, álbum, CRTs, roteiros e páginas | Criações desta missão, sem fotografias pessoais | src/museum, src/apps/Offline*, HistoricalPage e MuseumSocial |
| NASM 2.16.03 | Ferramenta oficial externa de compilação, não redistribuída | Usada apenas para gerar .COM; instrução em games-source/disquete-perdido/README.md |

O hash/integridade do pacote npm e os hashes locais ficam em
public/vendor/js-dos-6.22.60/NOTICE.md e evidence/003f/runtime-integrity.json.
A build do runtime não foi reproduzida nesta máquina. Auditoria das dependências
legadas e cumprimento final de distribuição GPL são condições antes de publicar.
O iframe não remove obrigações de licença. Não se altera a licença geral do código
do usuário por este documento.

Freedoom, Quake, v86 e ScummVM foram referências de pesquisa: nenhum de seus dados
ou binários foi integrado. Imagens históricas vistas para comparação ficaram em
TEMP e não fazem parte do código, bundle, build ou entrega.
