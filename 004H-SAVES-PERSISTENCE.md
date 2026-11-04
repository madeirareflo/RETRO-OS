# Saves e persistência — 004H

## Comprovado com arquivos produzidos pelos jogos

| Jogo | Chrome | Edge | Evidência nativa |
|---|---|---|---|
| DOOM shareware | PASS | PASS | DOOMSAV0.DSG, 25.350 bytes; cena e munição 49 após reinício real |
| Heretic shareware | PASS | PASS | HTICSAV0.HSG, 47.796 bytes; cena e munição 49 após reinício real |
| Quake shareware | PASS limitado | NOT TESTED | console nativo carregou ID1/H004Q.SAV e retornou munição 24; pose serializada não comparada |
| Duke shareware | PARTIAL | NOT TESTED | GAME0.SAV observado; tentativa de retorno não comprovou cena salva |
| Freedoom/FastDoom | PARTIAL | NOT TESTED | FD1SV0.DSG observado; recuperação após reinício pendente |
| Ken | NOT TESTED | NOT TESTED | menu save/load exige teste específico |
| SkyRoads | NOT TESTED | NOT TESTED | sem save de meio de corrida homologado; recordes/progresso não testados |
| Prince demo | NOT APPLICABLE à promessa de save completo | NOT APPLICABLE | não afirmar que a demo possui os recursos da edição completa |

Nenhum arquivo artificial substituiu um save de jogo. Perfis 004H são isolados dos dados do proprietário. Ver session-log.json (hash e tamanho de cada snapshot), capturas native-saved/native-different-pose/native-restored e relatórios individuais. DOOM Chrome SHA: 7168093654b06913853c7c545c3d9313d79a8165813c67e73adad82604891ee4; Edge: 1f4b825c3af306057b83a8a14e45ffdcbc2b5eb216e8cbc893849e0f52ad340c.

## Corrigido

O fallback localStorage podia falhar por quota e impedir o envio ao IndexedDB. Agora o envio da gravação principal ocorre mesmo se a cópia auxiliar falhar. O botão Sair espera um requestId confirmado **após** as transações de gravação, com timeout de oito segundos mantendo a janela aberta em caso de falha. Retirada a espera fixa de 100 ms, que permitia corrida. Snapshots malformados ou com mais de 64 arquivos não recebem confirmação silenciosa.

Restauração dá preferência ao arquivo mais recente entre IndexedDB e fallback; fallback antigo não sobrescreve progresso recente. Caminhos ativos/scripts são ignorados na restauração. Testes unitários cobrem os dois comportamentos. E2E save-quota usa progresso real do Disquete Perdido, com falha de quota **simulada apenas no fallback**, para verificar IndexedDB e reabertura. Isso não é teste de quota física do disco nem save de jogo comercial.

## Limites

Não há garantia de snapshot transacional de múltiplos arquivos enquanto o jogo está escrevendo. Aguarde o próprio jogo terminar de salvar antes de sair. Fechar pelo X do gerenciador ou matar o navegador não passa pelo ACK do botão Sair; usa captura periódica/fallback existente. Não houve migração de schema, limpeza de saves, teste de falha física de disco ou de todos os slots/edições. Continuam pendentes import/export roundtrip para todas as edições, concorrência entre abas e longa duração.
