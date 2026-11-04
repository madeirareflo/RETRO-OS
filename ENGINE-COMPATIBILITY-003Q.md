# Motores — fatos e pendências

DOSBox/js-dos já integrado executa os oito títulos disponíveis. Os outros perfis DOS são preparados, mas não foram executados sem dados. Q2DOS é um port real, documentado no [projeto do autor](https://github.com/maraakate/q2dos); não foi incluído nem homologado e Quake II permanece Motor pendente.

## Motores avançados não integrados
- Quake II: Q2DOS.EXE, BASEQ2/PAK0.PAK
- Quake III Arena: BASEQ3/PAK0.PK3
- Captain Claw: CLAW.REZ
- Full Throttle: FT.SOU, FT.LA0, FT.LA1
- The Dig: DIG.SOU, DIG.LA0, DIG.LA1
- Diablo: DIABDAT.MPQ
- Grand Theft Auto III: models/gta3.img, data/default.ide

[ScummVM upstream](https://github.com/scummvm/scummvm/blob/master/dists/emscripten/README.md) documenta build Emscripten como aplicação de navegador. Integrar Full Throttle/The Dig ainda requer build fixada, revisão GPL, montagem dos dados e saves ligados ao armazenamento existente. Não basta usar a página externa.

[OpenClaw](https://github.com/pjasicek/OpenClaw) contém instruções Emscripten, mas não há um adapter/build verificado no RETRO OS; não foram incluídos CLAW.REZ nem artes comerciais. [DevilutionX](https://github.com/diasurgical/devilutionX) é um projeto separado; não foi vendorizado e dados MPQ não foram fornecidos. ioquake3/re3 são candidatos do Anti sem build web local auditada nesta missão. Não se afirma licença/permissão de redistribuição desses projetos por mera presença no catálogo. GTA III fica bloqueado para avaliação técnica e de direitos.

Sem máquina virtual Windows nesta missão. Os 15 títulos Museu permanecem fichas históricas. Nenhum backend ou proxy multiplayer foi acrescentado.
