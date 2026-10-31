# Segurança e publicação — 003K WORK

Missão exclusivamente local/privada. Nenhum push, deploy, backend ou infraestrutura
foi ativado. main local preservado em 23096cd902c9aef9c4d358bf0c8b9165c6b89ba3.
A branch da aplicação continua independente do workspace do Anti.

## Verificações reproduzíveis

`node scripts/audit-003k-work.mjs` produz evidence/003k/security-audit.json:

- Confere diff e arquivos novos contra 7c26450 nos caminhos reservados ao Anti,
  emuladores, jogos, registry e AppHost. Esperado: listas vazias.
- Verifica dist contra bancos, .env, EXE, ROM, ISO, WAD, MP3 e COM inesperados.
- Confere o SHA256 de Disquete Perdido: f0c50f1717cd8a12ddbdd52addb675e79e9fb1b393ceb35a8af3f44bd3084726.
- Varre padrões de tokens GitHub, identificadores de acesso AWS e chaves privadas
  no código atual e nos blobs textuais alcançáveis por todos os refs Git locais.
  Registra arquivo/hash/regra, nunca o valor de uma possível credencial.
- Lista bancos rastreados no histórico e os ZIPs presentes na build.

A build contém apenas SOURCE.zip da engine já presente na 003F; nenhum pacote de
jogo do Anti ou do eXoDOS foi importado. O único programa DOS é a criação original
MIT. Licenças/fontes/notice do runtime 003F permanecem intactos e self-hosted.
Não foram acrescentadas bibliotecas ou fontes externas.

Os testes da aplicação bloqueiam /api nos fluxos do museu; a build estática é testada
em /RETRO-OS/ sem backend social ou recursos remotos no fluxo de emulação.
Sem cadastro, chat real ou publicação de dados. O arquivo social 003E é histórico,
fora do build; nenhum SQLite de usuário foi copiado para o worktree ou pacote.

## Dados e limites

localStorage/IndexedDB e VFS mantêm os formatos da 003F. A nova porta tem origem
própria; dados da porta antiga continuam lá. Prévia do Painel registra os campos
alterados por ele, preserva a época externa e restaura wallpaper explícito. Backup,
restauração e persistência são cobertos pelos testes.

A varredura usa padrões específicos, não prova ausência universal de segredos/PII.
Imagens e conteúdo dos arquivos compactados não foram examinados por OCR/antivírus.
Não houve pentest externo ou auditoria profunda do runtime legado. Não se homologa
o backend arquivado, o Launcher do Anti ou pacotes comerciais com estes resultados.
Antes de qualquer publicação futura: revisão de todo pacote e suas licenças,
segredos/dados pessoais no histórico, controles de importação e nova autorização.
