# Fidelidade visual 003M
## Referências primárias de captura histórica
- Windows 98 SE: https://guidebookgallery.org/screenshots/win98se
- Windows 2000 Professional: https://guidebookgallery.org/screenshots/win2000pro
- Windows XP Professional: https://guidebookgallery.org/screenshots/winxppro
- Tipografia XP: https://www.retrospace.net/download/WebApplications/WindowsXPDesignGuidelines/fonts.htm (documentação histórica Microsoft preservada).
Foram examinadas capturas de desktop e Painel de Controle. Imagens históricas permanecem em pasta temporária externa e não são entregues. Os links são referências de estudo, sem autorização implícita para redistribuir ativos.

## Antes/depois por componente
Galeria própria: evidence/003m/COMPARACAO.html. Para cada tema/navegador/resolução: desktop, Iniciar, Explorer, propriedades de Vídeo, Painel de Controle e Salvar como. Matriz: 800×600, 1024×768, 1366×768 e 1920×1080, Chrome e Edge. São 24 cenários e 144 imagens novas, comparadas com 144 imagens anteriores.
As imagens anteriores vêm do checkpoint 003L; as métricas anteriores são as medições 003K mantidas naquele checkpoint, cuja camada visual foi preservada pela 003L. Não são novas execuções históricas. component-metrics.json contém objetos before/after; os campos novos startButton/tray/controlButtons só existem depois, sem valores antigos inventados.

| Componente | Alteração 003M | Medida/limite |
|---|---|---|
| Iniciar 98/2000 | Altura clássica explícita, menos padding, fonte por geração | Altura 22px, largura mínima 55px; largura final varia com texto e font fallback |
| Bandeja clássica | Compactada | Mínimo 82px; taskbar continua 28px |
| Desktop | Stack de fonte por tema; grid e ícones próprios preservados | Não redistribui fontes Microsoft; fallback depende do host |
| Painel 98 | Web view à esquerda, heading e lista limpa de ícones | Sidebar 165px; cinco applets reais |
| Painel 2000 | Heading menor, área informativa e Tahoma com fallback | Sidebar 180px; não é só recoloração do 98 |
| Painel XP | Painel azul, rótulos de categoria e duas colunas | Sidebar 160px; funções existentes preservadas |
| Seleção/foco | Clique seleciona, duplo clique/Enter abre, dotted focus | Pesquisa e modo Detalhes funcionais; menus sem ação ficam desabilitados |
| Launcher | Família sans-serif explícita em título | Integra janela e controles dos temas existentes |
| XP | Links principais Iniciar em negrito | Taskbar 30px e título 26px preservados |

Medições atuais em 1024×768: título 98/2000 18px; XP 26px. Raio clássico zero; XP mantém geometria Luna anterior. A fonte de heading do novo Painel foi corrigida após inspeção visual para não cair em serif quando Tahoma não estivesse disponível. As capturas finais substituem as intermediárias.

## Limitações
A referência histórica orientou proporções e estrutura; não houve registro de cada pixel de um Windows original nem comparação por diferença de pixels com ativo original. Não declaramos fidelidade pixel a pixel. Fontes, ícones recriados, papéis de parede, labels em português, quantidade de applets e notificações continuam diferenças. Explorer e diálogos compartilhados preservam o núcleo 003K/003L e foram recapturados, não reescritos. A janela do Painel ainda tem espaço vertical maior que seu conteúdo em algumas resoluções; não foram adicionados applets decorativos para preencher.
