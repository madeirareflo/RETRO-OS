# Fontes, direitos e isolamento dos dados
Esta entrega contém código próprio de integração, relatórios, hashes e screenshots. Não contém os ZIPs/binários/dados dos três novos jogos, nem no Git/bundle, nem em public/dist. A instalação pessoal ativa está no diretório RETRO-OS-003N-FIX-PRIVATE ao lado do worktree; a pasta é externa ao repositório.

| Jogo | Obtenção utilizada | Uso desta missão | Redistribuição nesta entrega |
|---|---|---|---|
| Prince | Demo interativa DOS do DOS Games Archive, com indicação de origem histórica Brøderbund | Utilização pessoal da demonstração limitada | Nenhum dado distribuído; versão completa não obtida |
| DOOM | Arquivo shareware original v1.9 no idstuff/Gamers.org | Instalação pessoal do episódio 1, sem modificar níveis/executável | Nenhum dado distribuído; GPL do código não aplicada ao WAD |
| Duke | Shareware v1.3d do arquivo DOS, LICENSE.DOC interno conferido | Todos os arquivos originais preservados e CFG pessoal gerado pelo setup | Nenhum dado distribuído, apesar do grant limitado de compartilhamento gratuito |

Fontes e detalhes estão nos três relatórios de instalação. Não se usou pacote comercial completo do eXoDOS, crack, serial, DRM bypass ou jogo substituto com nome comercial. Os três jogos já aprovados pelo proprietário (Freedoom, Ken e SkyRoads) não foram alterados: pacotes, descritores e adaptador permanecem intactos.

O endpoint de dados pessoais existe somente no servidor Vite de desenvolvimento com RETRO_PRIVATE_GAMES_DIR explicitamente configurado. Bind 127.0.0.1, hosts locais, rejeição de Origin/Fetch-Site externos, GET somente, nomes/IDs allowlisted e realpath dentro da pasta privada. Não é registrado em build estática/preview. O cliente só tenta instalação automática em desenvolvimento e host local; hash/tamanho são conferidos antes do importador existente.

Nenhum upload, backend social ou contratação. Os dados privados não são um asset do produto. Backup Git restaura código; para restaurar a instalação pessoal é preciso conservar a pasta privada do proprietário ou obter novamente os pacotes das fontes legítimas. Publicação continua não autorizada.
