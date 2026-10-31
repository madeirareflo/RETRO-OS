# Auditoria de jogos 003M
Base: 991abc78ed75c3d23e0bab49f7d388029da700ab (003L). Branch isolada development/retro-os-003m.
Relatórios 003L, 003I e 003K-ANTI foram lidos; seus resultados não substituem os testes atuais. Artefatos Anti df29402832e8ff143d5c11ab20dcb6636fa6a081 foram comparados por entradas, sem incorporar sua ancestralidade Git.

| Jogo | Arquivos | Licença dos dados/código | Engine | Execução | Save |
|---|---|---|---|---|---|
| Freedoom Phase 1 0.13.0 (2024) | freedoom1.wad oficial, renomeado FREEDM1.WAD | BSD-3-Clause / FastDoom 1.0.0 GPL-2.0-or-later | FDOOM13H.EXE + DOSBox WASM | Teste nativo atual | FD1SV0.DSG |
| Ken's Labyrinth 2.1 (1993) | labfull.zip oficial integral | Grant de distribuição gratuita do README de 1999, sem retirar arquivos; não comercializar | KEN.EXE / DOSBox WASM | Teste nativo atual | SAVGAME0.DAT |
| SkyRoads (1993) | skyroads.zip oficial integral | Freeware: unidade completa, sem alterar programa/arquivos | SKYROADS.EXE / DOSBox WASM | Corrida em teste | Progresso não homologado |

## Fontes primárias
- https://github.com/freedoom/freedoom/releases/tag/v0.13.0 — release 29/01/2024.
- https://github.com/viti95/FastDoom/releases/tag/1.0.0 — release 11/09/2024; fonte tag c092c9d.
- https://advsys.net/ken/klab.htm e https://advsys.net/ken/klab/labfull.zip
- http://www.bluemoon.ee/history/skyroads/ e skyroads.zip nessa página.

Hashes, tamanhos e componentes: evidence/003m/asset-manifest.json. Comparação Anti/oficial: anti-vs-official.json. SkyRoads e Ken possuem as mesmas entradas e bytes das cópias oficiais; os ZIPs antigos diferiam no empacotamento. Foram usados os oficiais completos. O binário Anti chamado FDOOM.EXE corresponde de fato a FDOOM13H.EXE oficial, não ao outro executável da release.

Ken conserva aviso antigo de não distribuição dentro do jogo; o README posterior de Ken/Epic concede distribuição gratuita, mantendo todos os arquivos. Não se trata de autorização geral para editar ou comercializar o jogo.
Freedoom é uma continuidade livre moderna, não uma cópia de Doom comercial de 1993. Assets comerciais Doom não foram incluídos.
A instalação eXoDOS informada existe, mas nenhum arquivo comercial dela foi copiado. Nenhum ROM/ISO foi adicionado.
