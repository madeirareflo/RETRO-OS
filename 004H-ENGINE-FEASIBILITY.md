# Motores pendentes — 004H

Estudo documental, **nenhum motor novo integrado ou baixado**. Sete perfis E: Quake II, Quake III Arena, Captain Claw, Full Throttle, The Dig, Diablo e GTA III.

| Título | Caminho técnico | Dados/licença | Lacunas antes de integrar |
|---|---|---|---|
| Quake II | q2dos existe como port DOS; não homologado neste DOSBox; port WASM dedicado é alternativa | código e dados têm direitos separados; não incluir PAK comercial | build controlada, performance, áudio e saves; não anunciar DOSBox como solução pronta |
| Quake III | ioquake3/Emscripten a investigar | GPL do motor não libera PK3 comerciais | revisão do port exato e licença, WebGL, captura de mouse e persistência |
| Captain Claw | OpenClaw menciona suporte/build Emscripten | motor GPLv3; CLAW.REZ comercial separado | verificar commit/licença/dependências, memória, áudio, save e controles; não executar CLAW.EXE Win32 no DOSBox |
| Full Throttle / The Dig | ScummVM possui alvo Emscripten e suporte aos jogos | GPL do motor não libera dados LucasArts; usar cópia legítima do usuário | build mínima, importador e identificação de edição, IndexedDB/IDBFS, vozes, tamanho/quota |
| Diablo | DevilutionX e portas web como caminhos de pesquisa | DIABDAT.MPQ exige mídia/compra legítima; não confundir código do port com direitos dos assets | selecionar port e licença exatos, segurança, áudio e save antes de integrar |
| GTA III | port re3 seria estudo separado | riscos de distribuição/código e dados comerciais exigem análise; não aprovado | não prometer WASM nem browser suporte; museu ou E até estudo jurídico/técnico |

Fontes primárias consultadas em 04/11/2026: [ScummVM Emscripten](https://github.com/scummvm/scummvm/blob/master/dists/emscripten/README.md), [dados ScummVM](https://docs.scummvm.org/en/latest/use_scummvm/game_files.html), [compatibilidade](https://www.scummvm.org/compatibility), [OpenClaw](https://github.com/pjasicek/OpenClaw), [DevilutionX MPQ](https://devilutionx.com/mpq), [q2dos](https://github.com/maraakate/q2dos).

O alvo Emscripten do ScummVM documenta persistência de configurações/saves em IDBFS; demais dados em memória. Isso demonstra viabilidade do projeto upstream, não integração ou homologação no RETRO OS. O site DevilutionX instrui obter DIABDAT de mídia/loja autorizada. Não foi baixado nenhum MPQ.

Tamanhos reais dos jogos ausentes, FPS, memória e compatibilidade dessas builds: NOT TESTED. O limite atual do importador é 32 MiB ZIP / 64 MiB extraídos / 512 arquivos, inadequado a muitas edições Windows/CD. GitHub Pages não oferece backend nem controle geral de headers de isolamento; ports com pthreads/SharedArrayBuffer precisam verificar headers ou build sem threads. Sem promessa de execução irrestrita, saves de servidor ou multiplayer. Windows nativo não é DOS.
