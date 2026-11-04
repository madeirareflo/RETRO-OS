# Importação legítima — 004H

Fluxo validado pelo navegador: UI 37 clássicos → perfil Heretic → ZIP shareware já presente na base privada → validação → bytes reais no IndexedDB → SHA-256 → reimportação idempotente → ZIP corrompido recusado sem perder bytes → reload e hash igual. Repetido em Chrome e Edge; ver *-import.json e capturas.

2890661 bytes, SHA-256 50170e162b653619d266ecaf719f9a0fe9df04b88e3c30a37e436b42df5640f2. O teste não chama Concluído como prova suficiente: lê os bytes persistidos e calcula o digest. Trata-se de instalação em perfis de teste, não nova redistribuição nem download. Gameplay e save dessa edição foram testados separadamente. Inicialização da **entrada recém-importada** no mesmo cenário ainda precisa de teste específico end-to-end; não confundir a prova do pacote com a execução dessa entrada.

Unitários executados novamente verificam CRC, path traversal, BAT, Win32/PE, ZIP truncado, criptografia, tipo arbitrário e expansão declarada excessiva. Esses testes são de segurança de formato, não de jogabilidade. Imports de edições comerciais completas ausentes: BLOCKED por falta de arquivos legítimos fornecidos; não homologados.

PARTIAL/NOT TESTED: UI para pacote grande, quota física/IndexedDB cheia, cancelamento/fechamento em todas as etapas, importação de pasta ampla, versões comerciais distintas, nomes duplicados não idênticos e todas as edições dos dez perfis D. Nenhum arquivo comercial foi buscado. Motor ausente não habilita Jogar apenas com bytes.
