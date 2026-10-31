# RETRO OS 002 — relatório de entrega

Data: 30/10/2026. Evolução do projeto existente RETRO-OS, sem recriação. Base de recuperação: **tag retro-os-001 / commit 49137ac**. Repositório privado: [madeirareflo/RETRO-OS](https://github.com/madeirareflo/RETRO-OS). Destino da entrega: **G:\Meu Drive\WORKGPT\RETRO-OS**. Não houve publicação em produção.

## Resultado por critério

| Critério | Entrega e evidência |
| --- | --- |
| Windows 98 mais fiel | Menu vertical/cascata com faixa lateral, taskbar 28 px, títulos 18 px, ícones 32 px e grade compacta, bevels, controles, glifos CSS e estados desabilitados |
| Windows XP mais fiel | Taskbar 30 px, Iniciar verde, Luna, menu de apps à esquerda e atalhos à direita, Todos os programas, painel de tarefas do explorador, cores oliva/prata |
| Fidelidade global | Opção visível FIDELIDADE 100% — WINDOWS 98 CLÁSSICO, aplicação global sem apagar dados ou fechar apps, escolha persistida |
| Discagem | Janela, provedor, credenciais demonstrativas, fases, som sintetizado opcional, erro de linha ocupada, desconexão e sessionStorage; sem ligação real ou limitação de rede |
| Internet | 11 destinos internos navegáveis, busca, escola interativa, portal, homepage, recados, contador persistente, animações, jogos, download lento fictício e diretório |
| Protetores | Estrelas, texto e relógio completos; canos com volume visual em Canvas 2D. Seleção, prévia, pausa da prévia, inatividade, ativação manual e saída por ponteiro/teclado |
| Arquivos | Criar pasta, renomear árvore, copiar, recortar, colar, excluir para Lixeira, restaurar sem sobrescrever conflito, propriedades, contexto e lista/ícones |
| Persistência | Textos 001 preservados; editor salva/reabre; desenhos PNG em IndexedDB e abertura por associação no explorador |
| Backup | JSON com SHA-256, limites, validação de caminhos/formato/PNG, importação aditiva e novos IDs de imagem para proteger desenhos existentes |
| Disquete/CD | Dois volumes de disquete, leitura animada, som, segredos, erro lúdico; CD com inserir/ejetar, AutoRun e instalação simulada de apps existentes |
| Máquina do Tempo | 1998/2001/2003/2006 alteram sugestões, homepage, conteúdo, wallpaper e segredo; ano e tema são independentes |
| Paint | Salvar/reabrir, exportar, desfazer/refazer, ferramentas existentes preservadas e coordenadas limitadas ao canvas |
| Player | Áudio local, reprodução/progresso/volume/skin, metadados persistentes, aviso de indisponibilidade e reanexação; equalizador explicitamente visual |
| Janelas | Núcleo preservado, glifos estáveis, drag/resize com cancelamento de ponteiro, foco anterior recuperado ao restaurar, modais com foco e Escape |
| Regressão | 16 testes unitários originais preservados + 10 novos; 11 fluxos E2E originais preservados e estendidos com as novas verificações |
| Visual real | Antes/depois nos três temas e quatro resoluções, inspeção de PNGs reais do Edge; capturas de compatibilidade Edge/Chrome e quatro protetores |

## Auditoria e referências

O inventário foi escrito antes das mudanças em [VISUAL-AUDIT-002.md](docs/VISUAL-AUDIT-002.md). Foram estudados o conteúdo público de [TheBomb](https://www.thebomb.com/), a [galeria Windows 98](https://guidebookgallery.org/screenshots/win98/), um [tutorial universitário da época](https://www.cs.montana.edu/courses/spring2007/150/cs/150windows/start.htm) e [capturas históricas do Luna](https://www.activewin.com/articles/whistler/article_2.shtml). As capturas históricas de desktop 98 e menu XP foram baixadas apenas em pasta temporária para inspeção, sem inclusão no repositório ou pacote.

O navegador visual conectado do Work permaneceu indisponível. A inspeção da aplicação local foi realizada com capturas de navegador real via Playwright, conforme pedido, abertas e examinadas visualmente. A comparação demonstra mudanças observáveis; não representa uma medição de equivalência pixel a pixel. Ícones, wallpaper, efeitos e conteúdo são originais. Não foram importados recursos Windows ou código/arquivos TheBomb.

Compare em [evidence/002/comparison.html](evidence/002/comparison.html). Há 24 capturas de antes e 24 de depois: 3 temas × 4 resoluções × 2 tarefas (Iniciar e explorador). Arquivos de compatibilidade usam nome do navegador, largura e tema. Capturas dos protetores estão em evidence/002/savers.

## Dados e segurança

Não há migração destrutiva da 001. Textos e preferências mantêm chaves retro.*; os novos desenhos usam retro-os-media no IndexedDB. A Lixeira conserva árvores removidas. Importação de backup preserva a versão atual e renomeia conflitos mantendo extensões. Conteúdos são renderizados como texto ou bitmaps validados. O comando de terminal é isolado; nenhum EXE ou script de usuário é executado.

Backups incluem desenhos, arquivos e Lixeira. Preferências/playlist constam do envelope, mas a restauração atual não os aplica automaticamente. Áudio real nunca é enviado ao servidor ou embutido no backup. Trocar disquetes não apaga seus arquivos. A Wayback usa link externo para domínio fixo e não executa páginas históricas dentro da aplicação.

## Limitações importantes

- Firefox não iniciou neste ambiente Windows por erro lado a lado / mozglue; compatibilidade não validada. Ver [relatório de compatibilidade](docs/COMPATIBILITY-002.md).
- Canos é aproximação com volume simulado em 2D, não 3D real. Labirinto não implementado. Os três outros protetores são funcionais.
- Não há promessa de “100%” literal: o nome identifica o modo clássico. Ícones próprios, fonte de fallback, wallpaper estilizado, alguns layouts simplificados e controles podem diferir do original.
- Explorer tem clique para prévia e botão para abrir, sem seleção múltipla/drag-and-drop de arquivos. Propriedades mostram metadados, sem um diálogo completo de permissões/dimensões.
- Não há galeria com camadas/histórico persistente do Paint nem armazenamento permanente do áudio. Algumas preferências ainda não tratam quota visualmente; blobs antigos podem ficar órfãos após muitas gravações.
- Não houve teste físico de touch, auditoria completa de acessibilidade, benchmark de longo prazo ou audição humana dos efeitos.
- Sem backend social, login, amigos reais, rankings online ou hospedagem. Esses itens não são apresentados como disponíveis.

Lista completa em [BACKLOG-003.md](docs/BACKLOG-003.md), decisões em [ARCHITECTURE-002.md](docs/ARCHITECTURE-002.md), segredos em [EASTER-EGGS-002.md](docs/EASTER-EGGS-002.md).

## Executar e desenvolver

Na pasta do projeto: `npm install`, depois `npm run dev`. O ambiente de desenvolvimento desta missão já tem dependências instaladas; `INICIAR.cmd` inicia o Vite. Na cópia WORKGPT e no ZIP de fonte, instale as dependências primeiro. O build está em dist; serve apenas por HTTP, conforme README.

`npm run typecheck`, `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e` executam as verificações locais. `test:e2e:all` inclui o Firefox bloqueado neste Windows. Os resultados e falhas intermediárias estão em [TEST-REPORT-002.md](TEST-REPORT-002.md).

O código, documentação, capturas e comparação visual pertencem ao repositório. A cópia WORKGPT inclui também build e pacote ZIP/SHA-256 em entrega/. As dependências e caches de teste não são sincronizados para o Drive. O commit final é informado na resposta de entrega e pode ser consultado com `git log -1`.
