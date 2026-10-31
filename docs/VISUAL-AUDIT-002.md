# Auditoria visual 002 — antes de implementar

Checkpoint: tag retro-os-001, commit 49137ac. Capturas da aplicação real no Edge: evidence/002/before, três temas em 800×600, 1024×768, 1366×768 e 1920×1080, com menu e explorador. As referências históricas são observadas, não redistribuídas.

Referências consultadas: [Windows 98 no GUIdebook](https://guidebookgallery.org/screenshots/win98/), [tutorial universitário de Windows 98](https://www.cs.montana.edu/courses/spring2007/150/cs/150windows/start.htm), [capturas históricas de Luna](https://www.activewin.com/articles/whistler/article_2.shtml), [TheBomb](https://www.thebomb.com/). Alguns links relativos da galeria retornam 404; isso não é evidência visual. A ferramenta de navegação visual está desativada no Work; a aplicação local é capturada e inspecionada em navegador real via Playwright conforme solicitado.

| Área | Diferença da 001 | Correção planejada |
| --- | --- | --- |
| Desktop | Ícones de 38 px, passo vertical 96 px; assinatura grande | Ícones 32 px, grade 75 px no clássico e 86 px no XP; marca discreta |
| Taskbar | 40 px nos três modos, botões e tray altos | 28 px clássico, 30 px XP; botões compactos, separadores e bandeja recuada |
| Iniciar | Mesmo menu de duas colunas em todos os temas | Clássico vertical com faixa lateral e submenu em cascata; XP duas colunas branca/azulada |
| Janelas | Close/max como caracteres variáveis por fonte | Glifos CSS próprios; título 18 px clássico, Luna 26 px; botões dimensionados |
| Explorador | Grade branca sem seleção, contexto ou operações | Menus, barra de navegação, painel XP, lista/detalhes e operações reais |
| Painel | Tela genérica com cartões e abas decorativas | Abas operacionais em diálogo Propriedades, grupos compactos, preview de monitor |
| Notepad | Toolbar ampla de nome de arquivo | Menus compactos, título de documento, fonte monoespaçada e controles de arquivo |
| Paint | Ferramentas só em texto e controles de documento ausentes | Barra lateral compacta, toolbox com símbolos originais, salvar/abrir e refazer |
| Calculadora | Teclado largo e moderno para sua janela | Layout compacto de calculadora padrão com botões em relevo |
| Jogos | Wrappers e margens genéricos | Controles compactos herdados por tema, sem alterar regras |
| Diálogos | Mensagens espalhadas no conteúdo | Modal com barra de título, OK/Cancelar, foco retido e Escape |
| Contexto | Menu genérico, sem operações de arquivos | Contexto quadrado com divisores, estados habilitados e comandos reais |

Não haverá afirmação de fidelidade pixel a pixel. Fontes, escala do sistema e controles de navegador podem variar. Meta: geometria e padrões históricos substancialmente mais próximos, demonstrados por antes/depois.

## Resultado inspecionado

Foram abertas e examinadas as capturas reais do menu clássico 800×600, explorador clássico 800×600 e 1024×768, menu XP 800×600, explorador XP 1024×768 e menu MIX 1366×768. As demais resoluções constam da matriz automatizada e da comparação. As capturas históricas públicas de desktop 98 e menu Luna foram inspecionadas em arquivos temporários, sem inclusão na entrega.

O menu clássico agora tem geometria vertical e submenu externo; o XP tem aplicativos à esquerda e atalhos à direita. Barra, títulos e glifos ficaram menores e mais estáveis. O explorador XP ganhou painel de tarefas e o clássico usa controles em relevo, estados desabilitados e status de unidades coerente. A versão 001 permanece nas 24 imagens de before; after tem 24 imagens correspondentes. comparison.html permite alternar tema, resolução e tarefa.

Ainda diferem: ícones originais e não Microsoft, wallpaper estilizado, métrica de fonte dependente do SO, menus de aplicativos simplificados e Painel de Controle focado em vídeo/sons. As evidências sustentam evolução visual, sem sustentar fidelidade absoluta.
