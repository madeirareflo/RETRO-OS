# Auditoria documental de licenças — 004H

**Publicação: NO-GO.** A missão não autoriza push/deploy. Além disso, há permissões de redistribuição insuficientemente documentadas. Não foram acrescentados ou baixados jogos. Os oito ZIPs já estavam no commit be6f9ad; todos os hashes foram conferidos e permanecem inalterados. Preserve-os somente na entrega privada até decisão documentada. Nenhum arquivo eXoDOS comercial foi importado.

| Pacote | Titular conhecido | Evidência local | Avaliação de redistribuição |
|---|---|---|---|
| Prince DOS demo | Brøderbund / direitos históricos sujeitos a confirmação | DEMOINFO.TXT descreve demo, não concede permissão suficiente | BLOCKED para nova publicação |
| DOOM 1.9 shareware | id Software | README e documentação do ZIP; termos completos desta composição não comprovados | BLOCKED até documentação suficiente; FAQ de terceiro não licencia WAD |
| Duke 1.3d shareware | 3D Realms / Apogee | LICENSE.DOC contém condições para BBS e autorização escrita para outros serviços online | BLOCKED para nova publicação sem esclarecer modalidade |
| Quake 1.06 shareware | id Software | SLICNSE.TXT e LICINFO.TXT permitem distribuição sob condições; integridade da composição precisa revisão | PARTIAL; não homologado para publicação |
| Heretic 1.2 shareware | Raven / id conforme licença incluída | LICENSE.DOC autoriza distribuição eletrônica comprimida e proíbe exploração comercial; VENDOR tem condições próprias | PARTIAL; confirmar composição integral e aplicação ao projeto |
| Freedoom + FastDoom | contribuidores Freedoom / autores FastDoom | BSD 3-clause e GPL; fontes e créditos existentes em public/licenses/003m | Condicionado a notices e fonte correspondente; não confundir WAD comercial |
| Ken 2.1 | Ken Silverman / Epic conforme README | release freeware pelo autor, README e distribuição integral oficial; [autor](https://advsys.net/ken/klab.htm) | Condicionado à preservação integral/notices; não retirar arquivos |
| SkyRoads | Bluemoon Interactive | readme: freeware distribuível somente como unidade integral e sem modificar arquivos | Condicionado à integridade e notices; [autor](https://www.bluemoon.ee/history/skyroads/) |

Termos extraídos para evidence/004h/licenses, nomes e SHA-256 de **todos os arquivos internos** em inventory/packages.json. Origem registrada na base está nas entradas catalog-baseline.json; ela não substitui autorização. Não se baixou novamente o distribuidor original para comparar pacote por pacote nesta missão. Os cinco pacotes preparados podem diferir do arquivo original de distribuição; não se presume cumprimento da condição de integralidade.

Textos que afirmavam redistribuição livre/autorização geral foram corrigidos nos registros do Launcher. Shareware/demo/freeware são modelos distintos e não liberam automaticamente direitos. Um motor GPL não licencia os dados do jogo. As outras 32 fichas não incluem dados de jogos nesta entrega; uma cópia pessoal legítima não deve entrar no Git, dist compartilhável ou bundle.

O parecer é auditoria técnica/documental, não adjudicação de titularidade. Revisão específica antes de qualquer publicação futura, incluindo inventário de dependências e THIRD-PARTY-LICENSES.md. Bibliotecas/emulador existentes não foram atualizados nem substituídos; suas licenças/notices permanecem.
