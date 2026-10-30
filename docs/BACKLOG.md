# Pendências e proposta RETRO OS 002

## Refinamentos da 001

- Testar em Chrome e Firefox reais; a validação automatizada desta entrega usa Edge. Testar também Android/iOS e gestos touch físicos.
- Expandir acessibilidade com auditoria de leitor de tela, atalhos configuráveis e restauração de foco ao fechar janelas. Alt + Tab e Alt + F4 podem ser interceptados pelo Windows.
- Persistir desenhos, sessões, playlists e partidas; acrescentar backup/importação de dados e migração versionada em IndexedDB.
- Adicionar operações de criar/renomear/mover/excluir arquivos e lixeira recuperável. O explorador atual navega, lê e exibe propriedades; salvar TXT é tarefa do Bloco de Notas.
- Adicionar upload validado de wallpaper (a 001 oferece quatro opções originais), seleção de regiões e salvar projetos editáveis no Paint.
- Expandir coleção de disquetes com um manifesto de dados e importação validada. A 001 inclui o volume 001, pastas, mensagens e cartão original.
- Aprimorar realismo dos ícones com variantes distintas por tema, focar validação visual de todos os aplicativos no modo clássico e testar fontes de fallback em outros sistemas.
- Protetor de tela original, discagem animada interativa, download simulado com cancelamento e diálogos de erro adicionais.
- Ampliar testes dos jogos até finais completos pela UI, testes de estatística do embaralhamento, regras avançadas opcionais de Paciência e regressão visual com baselines. Hoje há testes de regras, vitória no modelo e jogadas reais na UI.
- Tratar quota/armazenamento desativado para preferências, recados e recordes com feedback visual uniforme.
- Medir CPU/memória com sessões longas, mais janelas, importações grandes e áudio contínuo. Doze janelas foram testadas funcionalmente, sem benchmark formal de desempenho.

## RETRO OS 002

1. Galeria local de Paint e coleção de disquetes com IndexedDB e backup ZIP.
2. Pinball com física e mesas originais; FreeCell, memória e quebra-cabeças.
3. Backend mínimo para login, perfis, desktop sincronizado, amigos, comunidades, mensagens e livro de visitas compartilhado.
4. Rankings com validação de partidas e prevenção de abuso; separação entre recordes locais e online.
5. Compartilhamento de desenhos com moderação, limites, validação de imagens e consentimento explícito.
6. Service worker e modo offline instalável após definir política de atualização e migração.

Nenhum desses serviços online existe na 001. Exigem backend: autenticação, perfis remotos, sincronização, presença, mensagens entre pessoas, comunidades, placares globais e compartilhamento público persistente.
