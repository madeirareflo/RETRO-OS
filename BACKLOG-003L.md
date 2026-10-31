# Backlog RETRO OS 003L

## P0 — integração controlada e homologação

1. Handoff 003K-ANTI recebido e bundle verificado; concluir revisão independente e corrigir gates de save/importação. Não presumir que 003J já esteja
   integrado. Resolver os conflitos Desktop/Explorer/AppHost/registry manualmente.
2. Implementar/homologar a interface real das engines, normalizar appIds de foco,
   provar persistência de atalhos e aplicação efetiva de perfis. Ver plano 003K.
3. Auditar mídias/licenças/importação, limites descomprimidos, caminhos, quotas e
   save por jogo antes de incluir qualquer pacote. Não importar eXoDOS comercial.
4. Regressão combinada nos três temas e nas quatro resoluções, com partidas reais,
   minimização, foco, áudio, saves e encerramento — não só abertura de modais.
5. Testar Firefox em ambiente capaz de iniciar seu executável e dispositivos físicos.
   Nova autorização explícita antes de qualquer push/deploy.

## Fidelidade ainda parcial

- Aferição independente de Windows 98 SE: a referência consultada é Windows 98,
  sem comprovação de todas as diferenças específicas da edição SE.
- Rasterização GDI/bitmap original não é reproduzida pelo browser. Fontes locais e
  fallback variam; nenhum arquivo Microsoft foi redistribuído.
- Ícones são próprios, não cópias pixel a pixel. Aperfeiçoar os ícones secundários,
  seleções de ícones e navegação espacial por setas no desktop.
- Completar menus do Explorer e todos os comandos originais, sem botões fictícios.
  Pastas/tarefas e seleções já funcionam; Localizar ainda direciona a apps existentes.
- Separar Painel de Controle e applets em janelas independentes: por compatibilidade,
  o app atual inicia em Aparência e oferece cinco itens reais, não o catálogo inteiro
  do Windows. Sobre/AppHost conserva a identificação da base 003F nesta branch.
- Arrastar e menu de sistema dos diálogos filhos; testar ordem modal/acessibilidade
  por leitor de tela e atalhos reservados pelo sistema hospedeiro.
- Mais resoluções, DPI/zoom, esquemas oliva/prateado e estados de controles em todos
  os apps. A matriz atual de screenshots usa Luna azul e DPR padrão.
- Cache/PWA offline opcional, sem reativar backend social.

Essas pendências não autorizam remover o museu ou substituir os dados do usuário.

