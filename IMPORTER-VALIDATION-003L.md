# Importação real — 003L

Fluxo: arquivo local → inspectPackage → storeGamePackage (transação concluída) →
metadados → biblioteca → DosGame → releitura/verificação SHA256 → validação do pacote
→ postMessage restrito ao iframe da mesma origem → criação de arquivos no FS DOS →
ci.shell(executávelDOS8.3). Nenhum código do pacote é avaliado como JavaScript.

Limites: 32MiB comprimidos, 64MiB expandidos, 512 entradas, razão máxima200× com
piso de1KiB. ZIP64, múltiplos discos, criptografia, symlink e métodos fora de
store/deflate são recusados. Cabeçalhos local/central, limites e CRC são verificados.
Descompressão é lida em chunks e interrompida acima do tamanho declarado/limite.
Path traversal, nomes duplicados sem distinção de caixa, caminhos absolutos,
nomes reservados e scripts ativos são recusados. COM tem limite64KiB; EXE exige MZ
e recusa assinatura PE/NE/LE/LX. Executável de entrada deve usar caminho DOS8.3
sem espaços/metacaracteres, selecionado entre os arquivos realmente validados.

O teste importa ZIP deflate contendo o COM original MIT, verifica SHA256 do pacote
armazenado, executa com download do jogo bloqueado, controla o jogo e reabre o
navegador. Não basta o wizard mostrar “Concluído”. Os casos negativos cobrem ZIP
corrompido, CRC, traversal, duplicados, bomb declarada, BAT, quota insuficiente,
interrupção/cancelamento, corrupção do IndexedDB e metadados antigos/malformados.
Quota insuficiente é simulação explícita da API estimate, não disco físico cheio.

Remoção só opera sobre gameId importado, preserva saves por padrão e não toca no
VFS ou no banco de outro jogo. Falha ao gravar metadados provoca rollback do pacote.
Pacotes com nomes iguais têm IDs independentes. Interrupção entre commits de
IndexedDB e localStorage ainda pode deixar pacote órfão se o processo morrer nessa
janela; não se declara transação atômica entre as duas APIs. Não gera entrada jogável
sem bytes no fluxo normal; recuperação de órfãos fica no backlog.

Compatibilidade é por executável. Dados podem passar validação e falhar no DOS;
isso é relatado, não convertido automaticamente em homologação. Batch atual processa
um pacote por operação; não há importação massiva eXoDOS nem downloads automáticos.
