# Limitações e propostas para RETRO OS 003

## Limitações assumidas da 002

- Canos tem volume simulado em Canvas 2D, não geometria 3D. Labirinto não foi implementado. Estrelas, texto e relógio são os três protetores completos adicionais.
- Firefox não pôde ser iniciado neste Windows; compatibilidade não validada. Sem aparelho touch físico, Safari ou auditoria WCAG completa.
- A aparência é mais próxima das referências, mas não é uma réplica pixel a pixel. Ícones são próprios; fontes dependem do SO; wallpaper é uma paisagem estilizada original, não fotografia de Windows. O Painel de Controle se concentra nas Propriedades de Vídeo/Sons, sem reproduzir todos os applets históricos.
- O explorador mantém o padrão da 001 de clique para prévia e botão para abrir no app, com operações de arquivo e contexto. Não há drag-and-drop de arquivos entre pastas, seleção múltipla ou atalhos .lnk.
- Backup restaura arquivos/desenhos/Lixeira de modo aditivo. Não restaura automaticamente aparência, posições ou playlist; músicas reais não entram no backup. Não há criptografia ou autenticação da origem.
- PNGs são persistidos, mas não há salvamento de histórico de undo, camadas, região selecionada ou texto editável no Paint. O histórico tem 20 etapas.
- IDs antigos de desenhos podem deixar blobs órfãos após muitas gravações ou importações recusadas. Falhas de quota nos arquivos são mostradas; alguns registros de preferências e recados ainda não têm aviso uniforme.
- Playlists guardam nome/tamanho/data; o usuário precisa reanexar os arquivos após reiniciar. O equalizador altera a animação, não frequências do áudio.
- Coleção atual: dois disquetes, um CD. “Instalar” apenas registra/abre apps já existentes. Nenhum EXE é instalado. Não há AutoRun de arquivos externos.
- Wayback é um link opcional externo para um domínio fixo, sem proxy de páginas antigas, incorporação ou garantia de disponibilidade.
- Jogos preservados e exercitados por testes de regras e jogadas; sem teste completo de vitória de partidas aleatórias pela UI.
- Sem benchmark formal de CPU/GPU/memória em sessões prolongadas. Teste de doze janelas é funcional.
- Recursos sociais permanecem locais. Não houve hospedagem em produção.

## Próxima missão

1. Diagnosticar o runtime Firefox e concluir a matriz em Firefox atual e dispositivos móveis reais.
2. Canos com WebGL e labirinto navegável como protetores opcionais; medir consumo em máquinas fracas.
3. Coleta de blobs órfãos, transações/migrações unificadas e restauração opcional de preferências/desktop.
4. Seleção múltipla, arraste de arquivos, menu Arquivo/Edit/Exibir completo e propriedades com tamanho real de bitmaps.
5. Paint com seleção, texto, zoom, projetos editáveis e galeria.
6. Mais disquetes/CDs originais, Pinball original, FreeCell, memória e quebra-cabeças.
7. Acessibilidade e baselines visuais automatizadas por navegador/escala, além de testes de sessões longas.
8. Backend mínimo e consentido para contas, amigos, mensagens, comunidades e rankings. Nada disso deve ser apresentado como disponível antes de existir.
