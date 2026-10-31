# Auditoria visual — 003F

Status: PARCIAL. Melhorias demonstradas; fidelidade extrema não homologada.

Capturas históricas de Explorer foram abertas e inspecionadas para Windows 98,
Windows 2000 Professional e Windows XP Professional no GUIdebook:
https://guidebookgallery.org/screenshots/win98/ ,
https://guidebookgallery.org/screenshots/win2000pro/ ,
https://guidebookgallery.org/screenshots/winxppro/ .
As imagens ficaram somente em TEMP; não são redistribuídas. Comparação qualitativa,
sem afirmar igualdade de pixels ou fontes proprietárias.

| Área | Antes 003E | Alteração 003F | Discrepância restante |
|---|---|---|---|
| Explorer | Menus escritos num span | Menus utilizáveis de Arquivo, Editar, Exibir, Favoritos, Ferramentas e Ajuda | Conjunto de comandos simplificado |
| 98 | Toolbar genérica | Menu compacto, popup cinza, botões planos com relevo no hover | Faltam toolbar de grandes ícones e painel web próprios da versão |
| 2000 | Aproximação clássica | Popup d4d0c8 e toolbar plana; título degradê e fundo 3a6ea5 preservados | Sidebar simplificada não equivale ao painel web histórico |
| XP | Sidebar genérica | Painéis azul-claro, toolbar creme, popup branco e realce azul | Faltam agrupamento de unidades e sidebar Luna completa |
| Janelas | Controles diretos | Menu no ícone: restaurar, minimizar, maximizar, fechar; Alt+Espaço e duplo clique no ícone | Mover/dimensionar por menu não implementados |
| Painel de Controle | Aparência direta | Visão adicional de itens com ícones e atalhos funcionais | Padrão continua em Aparência; não replica todo painel histórico |
| Diálogo | Salvar como de texto | Mesmo componente aceita PNG e confirma substituição; Paint protege descarte | Não é diálogo universal Win32 completo |

Evidências: evidence/003f/before contém capturas 003E extraídas do commit de base;
evidence/003f/visual contém Edge/Chrome dos quatro temas, desktop, Iniciar,
Explorer, menus, Aparência e diálogo, com métricas JSON. Barras de tarefas de
28 px em clássico/2000 e 30 px XP; títulos de 18 px e 26 px respectivamente.
As resoluções da regressão são viewports automatizados, não monitores/DPI físicos.

Ícones próprios não equivalem ao dithering original. Fontes usam Tahoma e fallbacks
locais, sem fontes Microsoft embutidas. Barra de ações/pesquisa do Explorer ocupa
espaço extra; a árvore não corresponde ao painel padrão de todas as versões.
Menu Iniciar e diálogos são recriações próprias. Wallpaper XP não é Bliss.
Esses limites impedem afirmar Windows definitivo ou 100% fiel, apesar do rótulo
legado Fidelidade 100%. A auditoria deve continuar na 003G.
