# RETRO-OS-001 — relatório técnico

Data: 30/10/2026. Entrega local no workspace Davi, pasta RETRO-OS. Código também no repositório privado [madeirareflo/RETRO-OS](https://github.com/madeirareflo/RETRO-OS). Site não publicado.

## Pesquisa e limites da referência

Foi acessado [TheBomb.com](https://www.thebomb.com/) por ferramenta web e analisado seu conteúdo público: entrada por energia/inicialização, organização de desktop, aplicativos, jogos, player, terminal, páginas de comunidade e conteúdo escondido. A conclusão de design foi usar o desktop como ambiente de exploração e manter ferramentas e jogos dentro de janelas.

A tentativa de abrir a referência com a ferramenta de navegação visual retornou “Local browser use is disabled in Work settings”. Portanto **não houve inspeção visual interativa da referência**, nem medição de seus gestos de drag/resize; esses comportamentos foram desenvolvidos a partir dos requisitos. Nenhum arquivo, código, imagem ou áudio da referência foi copiado. Depois, os testes Playwright locais explicitamente pedidos foram executados no Edge instalado, com capturas do RETRO OS.

Foi consultada a raiz da [pasta central do Drive](https://drive.google.com/drive/folders/1F80u4nb3Urcf64aZAnTaRpVKGLdtJj0V) com a conta Davi. Não havia RETRO OS nessa listagem. Não foram criadas pastas ou enviados arquivos ao Drive. O workspace não tinha estrutura RETRO existente; os demais projetos e sources foram preservados.

## Implementado

| Módulo | Entrega |
| --- | --- |
| Inicialização | BIOS fictício, memória, unidades, logotipo, carregamento, pular e preferência de exibição |
| Desktop | 12 ícones originais, seleção, duplo clique/Enter, arrastar, persistência, organizar, contexto e limites da viewport |
| Janelas | Abrir/fechar, foco, z-order, arrastar, oito bordas de resize, maximizar/restaurar, minimizar sem desmontar, taskbar e limites |
| Iniciar e bandeja | Categorias, apps reais, Executar, Ajuda, configurações, reiniciar/desligar virtuais, relógio, volume e conexão fictícia |
| Temas | MIX, XP azul/oliva/prata, clássico global; atalhos no Iniciar e configurações rápidas; persistência |
| Explorador | A:, C:, D:, pastas, textos simulados, cartão original, propriedades e arquivos locais virtuais |
| Disquete | Volume 001, arquivos de escola, pasta de coleção, easter egg e erro lúdico recuperável sem perda de dados |
| Bloco de Notas | Digitar, selecionar/copiar/colar nativos, novo/abrir/salvar, rascunho persistente e exportação TXT |
| Paint | Canvas, pincel, lápis, borracha, flood fill, linha, retângulo, elipse, paleta/cor livre, largura, limpar, desfazer e PNG |
| Player | Upload local de áudio, play/pause, playlist, volume, progresso, skins e visualizador simples |
| Internet interna | Portal fictício, homepage animada original, construção, livro local, links e download TXT original; histórico/endereço |
| Calculadora | Operações básicas, teclado, limpar/backspace e divisão por zero |
| Terminal | HELP DIR CLS CD TYPE DATE TIME VER EXIT, dados virtuais, sem comandos reais |
| Jogos | Campo Minado (3 níveis/bandeiras/timer/finais); Snake (teclado/touch na tela, pausa, aceleração, recorde); Klondike (regras, sequências, fundações, vitória, reinício e desfazer) |
| Nostalgia | Lan house, recados, disquete escolar, CD fictício, contador e mensagens próprias em português |
| Áudio | Síntese original, mute e volume persistidos; catálogo de inicialização, clique, erro, notificação, disquete, janela e desligamento |

Segredos descobríveis: menu “botão turbo” no desktop; lixeira; SEGREDO.TXT no disquete; TYPE SEGREDO.TXT no terminal; página em construção; /nudge no bate-papo. Não há apostas nem dinheiro real.

## Parcial e limites reais

- A fidelidade visual é uma recriação original, não uma cópia pixel a pixel de Windows 98. O sistema de janelas, controles, cores, relevo, menus, cantos e taskbar muda globalmente; as funções não são desativadas. Fontes e alguns comportamentos nativos variam conforme navegador/SO. Os ícones usam o mesmo conjunto original em grade nos três temas.
- A coleção de disquetes tem um volume inicial; não há importador de coleções. O explorador não oferece edição geral de árvore, operações de excluir/renomear/mover ou lixeira real.
- O player toca formatos que o navegador decodifica; a playlist não sobrevive ao reload. A animação de barras não analisa frequências reais. Não foi feita validação auditiva do timbre dos efeitos.
- O Paint exporta, mas não salva projeto editável nem restaura desenho após fechar/recarregar; minimizar preserva a tela. O wallpaper é selecionado entre quatro opções originais, sem upload de imagem.
- Bate-papo é um bot local, e livro de visitas é local. O contrato social é um ponto inicial, não um backend pronto.
- A função de síntese possui todos os tipos previstos; nem toda mensagem de erro da aplicação aciona um som. O som automático de boot depende de interação/autoplay: pular a inicialização pode tocar o som se habilitado.
- Validação de navegador foi feita em Edge. Chrome/Firefox e aparelhos touch físicos não foram executados nesta entrega. Não há auditoria formal WCAG ou benchmark de memória.

## Não implementado

Backend, login, contas, amigos reais, presença online, comunidades, ranking global, compartilhamento remoto, IndexedDB para mídia, service worker, Pinball/FreeCell/memória/quebra-cabeças e protetor de tela. Não há hospedagem em produção. Esses itens estão organizados em docs/BACKLOG.md.

## Segurança e autoria

Texto renderizado como texto React, sem dangerouslySetInnerHTML ou eval. O terminal é um switch de comandos virtuais. Arquivos do player são tratados como mídia e limitados a 50 MB por arquivo. TXT limita tamanho e nomes. URLs de Blob são liberadas ao fechar o player e após downloads. A imagem do disquete usa um identificador conhecido para um SVG original estático; o explorador não renderiza SVG/HTML arbitrário vindo dos dados.

O aplicativo não acessa discos reais, executa EXE, baixa scripts de terceiros nem redistribui Windows. Dependências open source vêm do registro de pacotes e mantêm suas licenças em node_modules. Assets próprios estão em src/components/Icon.tsx e public/assets/; wallpaper em CSS e áudio em src/services/audio.ts.

## Validação e execução

Ver TEST-REPORT.md para os resultados e limitações de teste. Código e scripts ficam nesta pasta. README.md contém execução Windows, teclas e instruções dos aplicativos. docs/ARCHITECTURE.md registra as decisões e docs/BACKLOG.md descreve a próxima missão.
