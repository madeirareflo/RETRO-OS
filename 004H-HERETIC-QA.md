# Heretic shareware 1.2 — QA 004H

**B — inicia, com pendência de áudio.**

Chrome e Edge: início de episódio, movimento, disparo e queda da munição de 50 para 49. Save produzido pelo jogo via F2, nome de slot inserido no menu, fechamento do aplicativo e do navegador, nova execução e F3/carregar. A cena e munição 49 foram verificadas visualmente nas capturas saved/restored, não somente por existência de arquivo.

Arquivo nativo correto: **HTICSAV0.HSG**, não .DSG. A ajuda e perfil foram corrigidos. Chrome: 47.796 bytes, SHA-256 `5c4a23c71ac59c0e3ba3dcc16ca7c91554e0493fc6aba80f0c91057ad54f8b9c`. Edge: 47.796 bytes, SHA-256 `2acd6e98723b3280d2b98f964fbbb787c32309ca6903574f9489122029e5a75f`. As duas partidas são independentes; hashes não precisam coincidir.

Uma tentativa inicial de restart falhou ao exportar trace e **não foi contada como fechamento de navegador**. A recuperação posterior foi feita em um processo novo, com o mesmo perfil de teste isolado; o Edge repetiu o ciclo completo. Falhas intermediárias estão nos logs.

O AudioContext pôde ser ativado, mas o PCM observado permaneceu zero com a configuração atual. Isso não é PASS de áudio. Necessário testar SETUP nativo/configuração compatível e escuta física. Não foi forçada configuração binária. Licença eletrônica comprimida tem condições; ver auditoria, sem autorização de publicação.

Evidências: evidence/004h/playability/{chrome,edge}/heretic-*.png, session-log.json e edge/native-save-results.json. Testes longos, outros slots e Firefox pendentes.
