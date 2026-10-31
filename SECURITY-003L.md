# Segurança 003L

Escopo: aplicação estática local; sem API social, contas, banco de perfis/mensagens reais,
SQLite de usuários, credenciais ou código remoto novo. Nenhum push/deploy.

Fronteira de dados: importador trata arquivos como dados DOS, não HTML/JS; valida
ZIP e assinaturas, limita tamanho/arquivos/expansão e não aceita BAT. Execução somente
em WebAssembly. Não se invoca executável do Windows nem shell hospedeiro. URL do
iframe e runtime são locais/fixos; entrada vem de arquivos validados, não de comando
livre. postMessage confere source/origin; montagens são revalidadas no iframe.
O iframe allow-scripts+allow-same-origin hospeda código próprio confiável: não se
apresenta isso como isolamento de script hostil arbitrário. Scripts de pacotes não
são executados no navegador. Vulnerabilidades desconhecidas do runtime legado não
são descartadas por testes funcionais.

Persistência: conexão IndexedDB fecha ao concluir transação; schema2 conserva stores
v1. Hash na instalação/releitura; paths e saves limitados por jogo/arquivo. Delete
não remove outros jogos e preserva saves por padrão. Export/restauração de save é
associada explicitamente ao arquivo selecionado. Backup VFS existente continua só
para documentos/desenhos; não se promete que ele exporte pacotes do Launcher.

Testes negativos e limites reais estão em IMPORTER-VALIDATION-003L.md. Quota é
simulada de forma explícita. Não foi feito pentest formal, fuzzing exaustivo,
medição de sandbox escape ou simulação de corte de energia. Há janela não atômica
entre IndexedDB e localStorage que pode deixar órfão em crash; ver backlog.

Auditoria automatizada: scripts/audit-003l.mjs, resultados em evidence/003l.
Verifica build, nomes/paths, hashes do original, histórico da branch entregue e
padrões de credenciais. Não escaneia outras branches como se fossem distribuídas;
bundle final inclui somente ancestralidade003L, excluindo Anti com mídias pendentes.
Padrões de texto não provam ausência absoluta de dados pessoais em qualquer formato.
Licenças/inventário em GAMES-COMPATIBILITY e THIRD-PARTY-LICENSES-003L.md.

Logs técnicos podem conter caminhos locais/nome de perfil do desenvolvedor, inclusive
no histórico privado herdado. Não se declara ausência absoluta de identificadores
pessoais em toda evidência; revisar/remover esses caminhos antes de qualquer
publicação futura. Nenhum perfil real de visitante ou SQLite social foi exportado.
