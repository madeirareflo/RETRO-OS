# Estados transparentes — 004H

| Estado | Significado | Ação |
|---|---|---|
| A | Gameplay homologado no escopo definido | Não concedido automaticamente a nenhum pacote desta missão |
| B | Inicia, mas tem pendências documentadas | Iniciar teste, após conferir pacote e motor |
| C | Pronto para teste humano | Iniciar teste, sem selo de homologação |
| D | Faltam arquivos legítimos da edição | Importar; sem execução prometida |
| E | Motor/perfil pendente | Estudo/ficha; importação individual desabilitada |
| F | Museu | Ficha histórica; sem execução |
| G | Bloqueio técnico/documental concreto | Falha de integridade/arquivo ausente bloqueia iniciar |

Não se classifica A por engine-ready, isInstalled, botão ou imagem de menu. Labels novos e aviso estão em pt-BR/en/es; a tradução integral dos textos legados do Launcher não foi concluída nesta missão. Cores distinguem estados; a letra e o texto permitem distinguir sem depender de cor. `gameQaState` resolve o perfil técnico, inclusive quando a ficha histórica possui engineId none e há um perfil DOS separado.

A seleção e o duplo clique verificam os bytes locais ou incluídos; pacotes incluídos são conferidos por SHA-256. Falha bloqueia a execução e aparece como G. O catálogo não faz downloads externos automáticos de jogos. Somente os arquivos já incluídos são lidos do mesmo host. Entradas importadas novas ficam C e precisam teste da própria edição. O filtro legado Jogáveis significa capazes de iniciar um teste; não é lista de A.

A edição completa e a demo/shareware são registros separados: DOOM completo pode ser D enquanto a edição shareware incluída é B. A contagem dos 37 no relatório escolhe a edição disponível e informa seu nome. A ficha não é marcada instalada por clicar em +Adicionar; não se apagam registros/favoritos antigos para esconder a distinção.

Limites: mudanças em arquivos durante uma sessão ainda exigem nova verificação ao iniciar; os tiles não leem todos os ZIPs simultaneamente. Erros concretos de pacote são mostrados na seleção/abertura, não inferidos pela simples presença de um ID no catálogo. Status técnico e direito de redistribuição são dimensões separadas; B não autoriza publicar.
