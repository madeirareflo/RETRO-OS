# Segurança 003D — NO-GO para produção

Controles novos testados: perfis privados e entre amigos com três identidades, bloqueio bilateral de perfil, visibilidade inválida, objetos JSON inválidos, limite SSE e autenticação; Batalha Naval verifica participante, aceite pelo destinatário, geometria, sobreposição, turno, repetição de tiro, término e segredo de frota. Integração anterior continua validando mensagens, amizade, CSRF, tamanho e isolamento de salas.

Visibilidade refere-se à biografia/perfil detalhado, não anonimato: apelidos continuam visíveis no diretório do Messenger e em partidas. Participação em comunidades também não ganhou privacidade granular. GET /api/naval só retorna jogos próprios; ranking mostra apelidos e agregados. SSE transmite sinais, não conteúdo de conversas. SQLite usa parâmetros, React escapa texto. Sem uploads de avatar nesta versão.

Riscos bloqueadores: scrypt síncrono; limite por IP em memória não distribuído; ausência de moderação operacional e administração protegida, exclusão de conta, recuperação de senha, retenção implementada e auditoria operacional. Conta pode criar partidas e desistir para inflar estatísticas: ranking não competitivo. Limite SSE quatro conexões pode exigir fechar aplicativos sociais excedentes. Backend somente localhost; cookies não Secure neste ambiente HTTP. Origem HTTP compara Host; configuração de HTTPS/proxy não homologada. Limpeza de sessões ocorre a cada minuto, validação SSE a cada segundo.

Nenhum segredo/SQLite foi adicionado ao Git. A inspeção de arquivos rastreados e padrões é uma triagem, não auditoria independente completa de histórico/dados pessoais. Preservar NO-GO público até revisão e nova autorização. Dados reais e credenciais de produção não usados nos testes.
