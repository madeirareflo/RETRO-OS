# Laboratório de emulação — pesquisa 003F

Pesquisa documental e ensaio local têm estados separados. Emulação efetivamente
executada nesta missão: somente js-dos/DOSBox 6.22.60 + Disquete Perdido DOS.
Nenhum jogo comercial foi copiado, baixado ou executado.

| Tecnologia | Evidência documental | Execução local | Decisão |
|---|---|---|---|
| js-dos 6.22.60 / DOSBox WASM | API da versão 6.22, pacote npm e fonte no gitHead d9d1045ef321bcde3f061dc8e686ded890147d6a | Sim, programa x86 .COM, vídeo texto, teclado, save e PC Speaker | PoC isolada, runtime legado; auditar antes de publicação |
| v86 | x86 com JIT WASM; requer imagens/BIOS e configurações de hardware | Não instalado/testado | Complexidade alta, OS e dados comerciais não autorizados; não presumir DirectX/3D |
| ScummVM | Reimplementação de engines, não emulador completo; não inclui jogos | Pesquisa apenas | Full Throttle/The Dig/Eye of Beholder exigem dados e build web específica; nenhuma compatibilidade web certificada |
| Engines Quake I/II/III | Repositórios oficiais GPL, dados comerciais separados | Pesquisa apenas | Porte WASM e dados livres precisam revisão e testes próprios |
| Doom + Freedoom | Código/engine e WAD são licenças distintas; Freedoom tem licença BSD de três cláusulas | Não integrado/testado | Bom próximo candidato; selecionar porte GPL compatível e preservar COPYING/CREDITS |
| Windows 9x/XP completo | APIs Win32/DirectX, drivers, mídia e proteções variam por título | Não testado | Não instalar Windows nem redistribuir ISOs/DLLs; museu ou distribuição externa |

Não se infere que o jogo funciona no navegador a partir da CPU do usuário ou do
suporte de uma engine em outra plataforma. Porta web, teclado, som, saves, idioma,
edição e licença de cada asset precisam ser demonstrados individualmente.

## Fontes consultadas

- https://js-dos.com/6.22/docs/ e sua API js-dos/js-dos-ci/js-dos-options.
- https://github.com/caiiiycuk/js-dos/tree/6.22 e pacote npm js-dos@6.22.60.
- https://github.com/copy/v86 (documentação oficial).
- https://www.scummvm.org/compatibility/ (DEV, não garante a versão estável ou web).
- https://github.com/id-Software/DOOM/blob/master/README.TXT (arquivo histórico;
  não tratar a antiga licença non-profit como autorização universal GPL).
- https://github.com/id-Software/Quake
- https://github.com/id-Software/Quake-2
- https://github.com/id-Software/Quake-III-Arena
- https://github.com/freedoom/freedoom/blob/master/COPYING.adoc

Apenas fontes do runtime selecionado foram incorporadas. Não houve comparação de
performance entre todas as engines. Pesquisa de compatibilidade por jogo segue
preliminar em GAMES-COMPATIBILITY-003F.md; catálogo comercial permanece Museu.
