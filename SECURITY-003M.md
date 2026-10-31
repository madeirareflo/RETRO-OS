# Segurança 003M
Privado, sem push/deploy. Branch baseada em 991abc7; main e a versão pública 002 não foram alteradas. Nenhum backend social foi reativado. Só arquivos licenciados explicitamente descritos no manifesto foram incorporados; eXoDOS não foi usado como fonte de mídia.

## Fronteiras revisadas
- Pacotes fornecidos: mesma origem + hash SHA-256 fixo antes de inspeção e montagem. Não há download externo do jogo durante execução.
- Importação pessoal: ação explícita; limites de pacote/expansão/contagem, paths seguros, validação de executável e recusa de PE/NE/LE não revisado continuam ativos. Os testes negativos existentes cobrem ZIPs malformados e traversal. Novos unitários verificam exceção LE restrita ao pacote conhecido sem liberar PE.
- O binário DOS roda dentro do DOSBox/WebAssembly no navegador, não no Windows hospedeiro. Scripts BAT não são executados; CLI Freedoom é fixa.
- Saves por gameId/nome; limites de tamanho e validação de bytes preservados. Sem migração destrutiva de VFS/IndexedDB. Retomada nativa comprovada em dois jogos/duas famílias de navegador; outros estados não homologados.
- O adaptador exclui mídia imutável grande do polling; configuração e saves continuam observáveis. Não é garantia contra exaustão em todo arquivo arbitrário.

## Auditoria
scripts/audit-003m.mjs verifica padrões de credenciais nos textos atuais e em blobs de texto alcançáveis por HEAD, bancos rastreados, arquivos soltos proibidos na build, payloads não permitidos e integridade do Disquete original. Antes do commit: zero achados de padrões, zero bancos, zero payloads inesperados e paths protegidos sem alteração. Após o commit, executar novamente e registrar resultado externo com HEAD exato.
ZIPs autorizados são exceções nominativas do guard; unitários conferem SHA-256 e executáveis, manifesto enumera todos os componentes. Não foi simplesmente aceito qualquer ZIP novo. Fontes FastDoom possuem notices próprios; revisão de toolchain anterior à publicação continua pendente.

Limitações: análise de padrões não é pentest nem prova absoluta de ausência de PII em imagens/arquivos binários. Credenciais privadas do usuário não foram coletadas. Créditos autorais de software são mantidos por obrigação de licença. Sem exclusão de contas/moderação porque esta edição é offline. Publicação permanece não autorizada.
