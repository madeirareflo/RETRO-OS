# Progresso nativo 003M
Provas realizadas antes da orientação posterior do usuário para assumir os testes de jogos. Não foram gerados bytes artificiais de save nem injetados arquivos para substituir progresso.

| Navegador | Jogo | Arquivo nativo | Bytes | SHA-256 | Estado recuperado |
|---|---|---|---:|---|---|
| chrome | freedoom | FD1SV0.DSG | 65538 | 94c234f820e0f4a62362873dcaad47b841d4d6551a104a00982d44d488e97f7a | Confirmado |
| chrome | klab | SAVGAME0.DAT | 8604 | 081a1300e9076bbae8ae05b1f4f34621f31758df204d6b9c9c894cb66fe924a0 | Confirmado |
| msedge | freedoom | FD1SV0.DSG | 65538 | 168eef4a1ae41759fafc2fffd31d7da0ff5e819a2d7b10cd0087de2e585201b4 | Confirmado |
| msedge | klab | SAVGAME0.DAT | 8604 | 80bf415ca89bc794adf302cb6fe6191a5f98bf51908044a876847f167c59daa8 | Confirmado |

## Método
qa003m/saves.spec.ts abre perfil persistente independente. Jogo novo, movimento/disparo por teclado, save pelo menu nativo (Freedoom F2; Ken Esc/Save). Lê arquivo efetivamente alterado da persistência, registra tamanho/SHA-256, fecha janela, aba e processo do navegador. Relança o processo no mesmo perfil, inicia partida nova para controle, carrega save por menu nativo e compara região do framebuffer com a do progresso salvo. Região recuperada coincide com o save e difere da partida nova; bytes persistidos também coincidem.
JSONs incluem freshPatch, progressPatch, newGameBeforeLoadPatch e restoredPatch. Screenshots fresh/saved/restored para cada jogo e navegador, em evidence/003m. O recorte Freedoom usa munição alterada; Ken usa região da sala após movimento. Isso prova esses estados/slots, não compatibilidade universal de saves nem partida completa.
O log gates-resumed.log contém quatro provas de save aprovadas e duas falhas anteriores do teste de entrada SkyRoads. Estas foram resolvidas em behavior-verified.log, não ocultadas.

Nenhum snapshot de CPU foi usado. Configuração, snapshot e arquivo nativo são conceitos distintos. SkyRoads teve corrida/áudio e reabertura, mas progresso salvo não foi homologado. Ken não apresentou áudio na configuração testada. Novos cenários de jogo ficam a cargo do usuário conforme orientação posterior.
