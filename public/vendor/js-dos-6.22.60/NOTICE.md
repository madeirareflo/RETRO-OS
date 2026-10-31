# js-dos 6.22.60 — proveniência e fontes

Origem: pacote npm oficial js-dos@6.22.60, tarball js-dos-6.22.60.tgz.
Repositório: https://github.com/caiiiycuk/js-dos
Commit indicado pelo registry (gitHead): d9d1045ef321bcde3f061dc8e686ded890147d6a.
Documentação da versão: https://js-dos.com/6.22/docs/

Os três arquivos de runtime são cópias sem alteração do pacote. O nome
wdosbox.wasm.js é original do pacote; o conteúdo é WebAssembly binário.
LICENSE é a licença GPL2 do repositório. A indicação ISC nos metadados npm
conflita com o arquivo de licença: adotamos GPL2 e preservamos os avisos.

SOURCE.zip acompanha o runtime na mesma distribuição estática e contém fontes
desse commit: 3rd-party, dreamlayers-em-dosbox-em-dosbox-svn-sdl2, js-dos-cpp,
js-dos-ts, CMakeLists.txt, LICENSE, package.json, gulpfile.js e tsconfig.json.
Foram excluídos jogos de exemplo e binários de demonstração. Não se distribuem
dados de jogos comerciais. A cópia também está em third-party-source/.

A build original usa CMake/Emscripten e ferramentas legadas; não foi reconstruída
nesta máquina. A integridade do tarball foi comparada ao SHA512 do registry:
1EhfMftOhBZ34Gvz/RCLsAoEcgWcZ1pmumpG28Z+9oQ9oQVP90jckQpvS9NW7vvfwYJWmCj+PX+j3UO44iO6LA==

O uso deste runtime antigo é um laboratório privado. Auditoria de vulnerabilidades,
rebuild reprodutível e revisão completa das obrigações GPL são bloqueadores de
publicação futura. Não se afirma que o runtime seja livre de vulnerabilidades.
