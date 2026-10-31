# Segurança 003E — desenvolvimento local, NO-GO público

## Evidência e correções
Testes HTTP com três contas, E2E em sessões independentes e testes de domínio/migração cobrem isolamento, papéis, suspensão, exportação/exclusão, blocos, moderação, resultados e frota secreta. A autorização administrativa existe no servidor; ocultar botões não é seu mecanismo. Não há conta admin nem senha administrativa embutida. O operador deve conceder papel a uma conta existente via server/admin.mjs.

Hashing passou a scrypt assíncrono, com até quatro trabalhos concorrentes. Permanecem limite geral 60 POST/min por identidade ou IP, 12 autenticações/min/IP, corpo JSON até 8192 bytes, senhas 12–128, cookie HttpOnly/SameSite Strict, comparação de Origin quando presente e SQL parametrizado. SSE tem quatro conexões por conta; streams encerrados são retirados antes de broadcasts. Um E2E descobriu queda write-after-end ao excluir conta com Messenger aberto: corrigida, reproduzida em teste HTTP com stream ativo e revalidada por E2E.

## Dados e retenção
Exportação usa exclusivamente uid da sessão e não retorna hashes, salts ou tokens. Inclui perfil, relações, conversas próprias, posts, recados, participações, salas próprias, chat próprio, partidas, frota própria, tiros próprios, resultados e denúncias próprias. Nunca exporta frota secreta adversária. A API não aceita escolher outra identidade para exportar/excluir.

Exclusão exige senha atual e texto EXCLUIR. Transação remove conta e relações; comunidades/salas próprias e partidas associadas são removidas, afetando o histórico de outros participantes dessas partidas. Tópicos do autor incluem suas respostas associadas. Sessões e streams são revogados. Arquivos do desktop são dados locais independentes da conta; devem ser apagados/exportados no navegador separadamente. Menções ao apelido escritas livremente por terceiros não são detectadas semanticamente. Backups externos anteriores não são apagados automaticamente. Não se certifica apagamento forense de discos/WAL/snapshots; PRAGMA secure_delete está ativado.

Sessões expiram em 24h e são coletadas a cada minuto. Audit registra ações sem texto de conversa nem senha e expira em 30 dias. Denúncias (inclusive fila aberta/legadas) expiram em 90 dias; a limpeza ocorre ao iniciar e no timer. Conversas/perfis ativos permanecem até exclusão; uma política de retenção de conteúdo mais granular e operação sobre backups ainda precisa ser aprovada antes de produção.

## Moderação e privacidade
Dono pode nomear moderador participante, editar regras e remover tópicos; moderador não pode nomear outros nem alterar dono. Respostas exigem participação e referência na mesma comunidade, com limite de profundidade. Dono de sala pode expulsar outro participante e revogar convite. Administrador pode remover conteúdo denunciado, arquivar denúncia e suspender/reativar contas; sessões de suspensos são revogadas. A fila administrativa mostra somente conteúdo denunciado; não existe ferramenta de leitura geral de todas as conversas. Filas/diretórios são limitados e ainda não têm paginação robusta.

Privacidade de perfil cobre biografia/detalhes. Apelidos, participações públicas e resultados não se tornam anônimos. Avatares são enumeração de arte própria, sem uploads. React apresenta texto sem HTML arbitrário. M3U nunca dispara requests a URLs importadas; áudio é Blob de arquivo selecionado/demonstração própria, com limites e decodificação pelo navegador. Nenhum EXE/script é executado.

## Riscos remanescentes
Proteções em memória e SQLite único processo não equivalem a proteção distribuída. Não há verificação de identidade, recuperação de senha, recurso de suspensão ou equipe humana de moderação. Logs mínimos não têm trilha detalhada por operador; papel de admin depende da segurança do computador local. Contra spam existem cotas gerais, sem detecção comportamental. Rankings limitam dupla por 24h e excluem abandono, mas múltiplas contas, conluio e exclusão/recriação de contas continuam possíveis. A origem/cookie HTTP localhost não foi homologada para proxy HTTPS/CORS.

Backend permanece em 127.0.0.1. Não usar com público real nem publicar com base neste relatório. Varredura por padrões conhecidos e inspeção de arquivos rastreados são triagem, não revisão independente integral do histórico Git ou garantia de ausência de segredos. Publicação exige revisão, fechamento de bloqueadores e nova autorização.
