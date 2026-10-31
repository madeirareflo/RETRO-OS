# Auditoria local — 31/10/2026

Estado: desenvolvimento privado, sem autorização para push público. main/Pages não foram alterados.

Validados por integração real: sessões distintas, mensagens privadas filtradas por identidade, amizade necessária, bloqueio bilateral, denúncia limitada a participante, recusa de aceite por terceiro, logout revogando token, login preservando histórico. Teste gráfico com dois contextos Edge passou: cadastro, amizade, aceite, mensagem/resposta sem refresh, chamada de atenção e bloqueio. Screenshots em evidence/003b.

Corrigidos nesta etapa: proxy do Vite preserva Host para a verificação de Origin; logout remove cookie; heartbeat SSE verifica sessão expirada/revogada a cada segundo; nudge exige amizade, respeita bloqueios e impõe intervalo de 15 segundos; recusa/remoção de amizade foi adicionada. A chamada de atenção ainda é uma mensagem de evento, sem animação/som específicos.

Controles existentes: scrypt com salt; comparação de hash constante; tokens aleatórios com hash no banco; cookie HttpOnly/SameSite; SQL parametrizado; limite de corpo e tamanho de mensagens; rate limit em memória; texto React sem HTML executável. Loopback por padrão. Não há chaves de provedor externo ou contas de produção.

Pendências impeditivas de produção: hashing síncrono pode bloquear o event loop; autenticação necessita limites específicos por IP e identidade; mapas de rate limit precisam coleta periódica; ausência de limites de SSE e revogação imediata (janela máxima aproximada de 1 s); controle de acesso a presença/listagem de usuários; recuperação e exclusão de contas; sessões múltiplas gerenciáveis; denúncias sem revisão administrativa; privacidade, retenção e moderação operacional incompletas. Origin ausente é aceito para clientes locais não browser; configuração para produção precisa ser revista. HTTP/cookie sem Secure é somente para localhost.

Não é auditoria independente nem homologação. Perfis, comunidades, recados, LAN House, multiplayer e rankings ainda não foram implementados. Histórico Git e dados pessoais precisam nova revisão antes de solicitar publicação. Nenhum push público deve ser feito com base neste relatório.
