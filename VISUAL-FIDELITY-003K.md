# Fidelidade visual 003K WORK

Status: melhorias validadas, fidelidade histórica **parcial**, sem alegação pixel a pixel.

## Referências estudadas

GUIdebook: https://guidebookgallery.org/screenshots/win98/,
https://guidebookgallery.org/screenshots/win2000pro/ e
https://guidebookgallery.org/screenshots/winxppro/.
Explorer, Executar, Propriedades de Vídeo e Painel de Controle foram inspecionados.
São referências documentais, não ativos licenciados do produto; imagens foram vistas
em diretório temporário, sem redistribuição. A referência 98 não prova edição SE.

Fontes: Microsoft https://learn.microsoft.com/en-us/windows/win32/Intl/using-ms-shell-dlg-and-ms-shell-dlg-2,
https://learn.microsoft.com/en-us/windows/win32/uxguide/vis-fonts e
https://learn.microsoft.com/en-us/typography/font-list/trebuchet-ms.
Guia XP original Microsoft preservado em espelho:
https://www.retrospace.net/download/WebApplications/WindowsXPDesignGuidelines/fonts.htm.
CSS usa apenas fontes locais com fallback; não distribui arquivos de fontes.

## Comparação e medidas

Abrir evidence/003k/comparison.html: seletor de tema, resolução, navegador e região.
PNGs originais vinculados; antes/depois em resolução real. 24 conjuntos por fase,
6 áreas por conjunto (desktop, Iniciar, Explorer, aparência, Painel, Salvar).
Métricas completas em metrics-comparison.json e tabela metrics-comparison.md.

Em Edge 1366×768, endereço Explorer passou de 34/34/32 para 26 CSS px nos temas
98/2000/XP; painéis laterais de 145/145/155 para 170/190/184. XP container do ícone
78×70 para 75×70, com desenho 32×32. Coordenadas fracionárias da janela passaram
a inteiras (exemplo título x277.1875 →277). Taskbars 28/28/30 e títulos18/18/26
foram preservados: não havia motivo para alterar toda medida indiscriminadamente.
Fonte declarada do título XP: Tahoma13px →Trebuchet MS bold10pt; clássico passa
priorizar MS Sans Serif; NT mantém Tahoma11px.

98: cinza/relevo, barra azul, menu vertical, controles quadrados, webview amplo.
2000: cinza NT distinto, menu mais compacto, controles e webview com outro cabeçalho,
Tahoma, toolbar compacta e lugares nos diálogos. Não é só mudança de cor.
XP: Luna, duas colunas, grupos no Explorer, títulos Trebuchet, controles e bandeja,
seleção e lugares nos diálogos, barra e Iniciar próprios.

## Inspeção e limites

Capturas reais foram inspecionadas: corrigidos recuo que escondia ícones no menu
clássico, disposição de unidades XP e barra de lugares NT. Inspeção final de Iniciar
98, Explorer2000 e Salvar XP confirma composição funcional sem escurecimento moderno
no diálogo. Testes verificam limites em800×600, teclado, estado e persistência.

Ícones próprios não são cópias exatas Microsoft; alguns aplicativos ainda têm emoji.
Fontes renderizadas/GDI, wallpapers, texto de marca, dimensões de todos os applets,
menus nativos completos, tema XP Olive/Silver na matriz, DPI e monitores físicos
continuam discrepâncias. Painel clássico usa applets internos existentes e não
replica todos os nativos. Melhoria visual não equivale a emulação do sistema real.
