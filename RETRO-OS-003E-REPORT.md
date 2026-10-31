# RETRO OS 003E — A Era de Ouro do PC

## Decisão: PARCIAL, privada, NO-GO de publicação
Continuação do checkpoint 8ca62b5, branch development/retro-os-003e. Primeiro checkpoint funcional desta missão: ffe926c. Nenhum push, deploy, serviço pago ou exposição do backend foi executado. Main local permanece em 23096cd; o checkpoint 002 e bundles anteriores foram preservados.

## Implementado e integrado
- Retro Game Center com 74 fichas (69 registros editoriais e 5 jogos originais), busca, gêneros/plataformas/períodos, favoritos, biblioteca virtual persistente, histórico de execução e atalhos de fichas no desktop. LAN e Máquina do Tempo acessíveis. Jogos comerciais são Museu, com referências e links de distribuição apenas quando consultados. Não há botão Jogar em fichas sem implementação. Arte das fichas é editorial original, não screenshot comercial.
- Todos os títulos enviados foram incluídos. Medal of Honor tem origem em console e fichas de Allied Assault, expansões, Pacific Assault e Airborne. Dungeon Siege III está separado em 2011. Prince of Persia informa Apple II original e port DOS; GTA III informa PS2 original e Windows posterior. Diablo adota o aniversário oficial de 31/12/1996 com nota sobre distribuição de 1997.
- Minha Conta: exportação JSON sem hash/salt/tokens e exclusão autenticada por senha e confirmação EXCLUIR. Revoga sessões, apaga relações e dados sociais associados, salas/comunidades próprias e partidas/resultados. Arquivos locais do desktop não são apagados pelo pedido social, conforme aviso da interface.
- Administração Social separada e autorizada no servidor. Papel concedido somente por ferramenta local. Denúncias de mensagens, posts, recados e chat; remoção/arquivamento; suspensão/reativação; histórico mínimo. Denúncias antigas do Messenger são migradas.
- Avatares vetoriais originais predefinidos, privacidade de biografia, permissões de recados, regras de comunidades, nomeação de moderadores participantes, edição e respostas com profundidade limitada. Sem upload arbitrário ou HTML de usuários.
- Rankings de Velha e Naval: geral e semana UTC, vitórias/derrotas/empates, histórico pessoal e identificador. Registro único por partida, resultado derivado no servidor; abandonos não pontuam; uma partida elegível por dupla/jogo em 24h. NÃO são rankings certificados contra múltiplas contas/conluio.
- Novos desafios de Velha exigem aceite/recusa. Salas permitem expulsão pelo dono e recusa de convite. LAN ganhou atalhos de catálogo/placares/Naval e identidade Corujão, sem bots fingindo usuários.
- Explorer: Ctrl/Shift, desmarcação, cópia/recorte/colagem e exclusão em lote, operações de transferência com um commit local, drop de arquivos virtuais entre janelas. Mantém formato antigo e clipboard anterior. Árvore corrigida nos temas clássico e MIX.
- FileDialog compartilhável, usado em Salvar como do Notepad; valida nome e sobrescrita. Notepad confirma descarte ao fechar, abrir outro arquivo e Novo; restaura foco ao pedir confirmação. Não é integração universal em todos os aplicativos.
- RETROAMP: M3U local sem seguir URLs remotas, reanexação, arraste de áudio, sete novas skins próprias e demo WAV instrumental Coruja digital de quatro segundos.
- Navegador: favoritos/histórico persistentes, download fictício com pausa/retomada/erro e modo lento opcional. Página Música e MP3 com seleção editorial de artistas, sem gravações comerciais. Modem com contador de tempo. Máquina do Tempo com quatro períodos e 2008, filtragem de catálogo sem ocultar arquivos pessoais.
- Tema clássico: ícones 32px, grade 75px, controle de Sistema; medições e capturas de quatro temas em cinco estados. Windows 2000 mantém fundo e controles distintos. Não foi alcançada equivalência histórica extrema.

## O que permanece parcial ou ausente
P0 não está integralmente concluído: metadados históricos possuem revisão individual pendente e requisitos originais não foram auditados para todos os jogos; moderação é funcional localmente, mas falta maturidade operacional, paginação/recursos, revisão independente e gestão de backups/dados; fidelidade visual é parcial; confirmação de descarte ainda não cobre Paint e todos os caminhos de desligamento/reinício; diálogos universais não foram integrados a todos os apps. Arraste foi testado por eventos DataTransfer reais do navegador sintetizados pelo teste, não por matriz completa de gestos físicos.

Não implementados nesta missão: Retro Writer, Sheets, Slides, Archiver, Burner, Homepage Builder; Retro Artillery, Dungeon, Platformer, RTS e FPS. Nenhum desses foi apresentado como jogo/aplicativo funcional. Música é seleção editorial inicial, não enciclopédia biográfica completa. Não há integração autorizada de jogos comerciais. Sem validação mobile física ou Firefox funcional.

## Critérios P0
| Item | Situação |
|---|---|
| Auditoria/checkpoint | Confirmado, bundle 003D íntegro |
| Segurança/moderação | Controles funcionais e testes reais; homologação de produção pendente |
| Exclusão de conta | Funcional, senha e revogação testadas, com limites descritos em SECURITY |
| Rankings Velha/Naval | Funcionais, geral/semana e controles básicos; sem antifraude completo |
| Catálogo completo | Cobertura editorial completa; pesquisa por campo PARCIAL |
| Game Center utilizável | Validado em Edge/Chrome |
| Explorer essencial | Seleção/lotes/drop implementados; universalização parcial |
| Evidências visuais | Capturas e métricas reais; sem certificação pixel a pixel |
| Testes/backup | Ver TEST-REPORT e recibo de entrega |

Execução e administração em EXECUCAO-003E.md. Evidências: evidence/003e/index.html. Código completo na branch local e ZIP; bundle Git privado separado não inclui SQLite nem node_modules. Consultar BACKLOG-003F.md antes da próxima etapa.

Checkpoint final de implementação validada: d1f626d. Resultado final: 36 Vitest, 8 servidor, 78 Edge/Chrome e 6 fluxos sociais aprovados; TypeScript/lint/build aprovados. Firefox não iniciou. O recibo externo da entrega identifica o commit final de documentação e o hash do bundle.
