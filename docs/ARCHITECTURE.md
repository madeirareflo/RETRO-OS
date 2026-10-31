# Registro de decisões — RETRO OS 001

## ADR 001 — SPA local, sem backend

React 19, TypeScript estrito e Vite 7. A maior parte da interação é estado de interface. Um backend agora adicionaria autenticação, custos e riscos sem melhorar os aplicativos locais. Bate-papo e livro de visitas informam explicitamente que são locais. Não são multiusuário.

O contrato `SocialAdapter` separa perfil, amigos, mensagens, ranking e compartilhamento de desenhos do estado do desktop. Uma versão posterior precisará completar contratos de comunidades, autenticação e sincronização; a interface atual não representa uma infraestrutura social pronta.

## ADR 002 — Estado de janelas no coordenador do desktop

Uma instância por aplicativo. Cada janela tem ID, retângulo, z-index, minimização e maximização. O componente Window implementa gestos com Pointer Events e captura do ponteiro, incluindo oito bordas. `clampRect` limita dimensões e coordenadas à área útil após cada gesto e resize da viewport. Maximização usa geometria separada e preserva o retângulo anterior.

Minimizar usa display:none sem desmontar o aplicativo; fechar desmonta. Desenhos e jogos permanecem ao minimizar e reiniciam ao fechar. Rascunhos do editor persistem independentemente. Jogos com timer pausam sem foco; o player pode continuar ao minimizar.

Não foi adicionada uma biblioteca de estado externa: o escopo comporta estado React, modelos puros e armazenamento separado. O relógio atualiza o coordenador uma vez por segundo; memoização fina e lazy loading serão considerados quando houver medições que justifiquem.

## ADR 003 — Persistência simples e limitada

localStorage para preferências, posições, pequenos arquivos TXT, rascunho, recordes e histórico local. Arquivos iniciais são dados tipados. Textos têm limite de 500.000 caracteres e nomes restritos em C:/Meus Documentos. Caminhos são virtuais e não chegam ao sistema de arquivos real. Falhas de armazenamento de documentos são mostradas ao usuário. Preferências e histórias locais ainda não têm tratamento visual de quota.

IndexedDB foi adiado: o player usa URLs de Blob temporárias, não persiste áudio, e o Paint exporta PNG. Quando houver galeria, upload e muitos desenhos, os blobs devem migrar para IndexedDB, com versionamento e backup. Não usar localStorage para mídia grande.

## ADR 004 — Temas globais, identidade própria

Tokens CSS e overrides de geometria, fonte, menus, taskbar, molduras e controles. O clássico tem cinza #c0c0c0, título #000080, fundo #008080, cantos retos, relevos e sliders/checkboxes/scrollbars próprios. O XP tem barra azul, Iniciar verde, título arredondado e variações oliva/prata. O MIX combina wallpaper de colinas original com controles discretos.

“Fidelidade 100%” é o nome do modo solicitado; é uma recriação de linguagem visual, sem arquivos Microsoft, fontes proprietárias redistribuídas ou promessa de equivalência pixel a pixel em todos os SOs. Tahoma, MS Sans Serif e fontes de fallback dependem das fontes instaladas.

Ícones SVG desenhados em grade e cartão do disquete são originais. O wallpaper usa CSS original. Efeitos são notas sintetizadas com Web Audio; nenhum áudio de Windows ou música comercial foi incluído. O visualizador é uma animação simples vinculada ao estado play, não uma análise espectral da música.

## ADR 005 — Modelos de jogos puros e seguros

Campo Minado protege uma vizinhança 3 × 3 no primeiro clique, gera minas sem repetição, expande casas vazias e separa bandeiras de revelação. Snake valida parede, corpo e entrada na cauda móvel. Paciência é Klondike com compra de uma carta, valida sequências, cor, naipe e transferência de pilhas; revela cartas cobertas e detecta quatro fundações completas. Nada usa eval ou executa conteúdo de usuário.

## ADR 006 — Registro extensível

O registro contém identidade, ícone e grupo. AppHost resolve componentes na camada de aplicativos, sem conhecer os detalhes do gerenciador de janelas. Um novo aplicativo altera o registro e AppHost, sem editar Window ou algoritmos do desktop. Futuramente o registro pode receber loaders dinâmicos e permissões por app.

## ADR 007 — Entrega local e rastreável

Pasta independente RETRO-OS, Git próprio e scripts Windows. Nada em sources foi alterado. A pasta central do Drive foi consultada em modo leitura. O conector GitHub identificou a conta madeirareflo e não encontrou repositório RETRO OS; como o conector não oferece criação de repositório, foi usado o CLI autenticado fora do sandbox para criar e enviar o código ao repositório privado https://github.com/madeirareflo/RETRO-OS. Não foi criado Site hospedado nem feita publicação em produção. O workflow Sites foi usado apenas no modo local autorizado pelo pedido.
