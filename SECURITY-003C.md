# Segurança 003C — NO-GO de produção

Preserva SECURITY-003B.md. Integração com três contas confirmou: isolamento de conversas; amizade exigida; bloqueio; recusa de aceite indevido; origem maliciosa; corpo excessivo; cooldown; publicação de comunidade só para membro; recado só pode ser removido por autor/destinatário; sala privada exige convite; chat só para participante; Jogo da Velha só admite jogadores e turno/casa válidos. Vitória é decidida pelo servidor, não por pontuação fornecida pelo cliente.

Novos esquemas usam SQL parametrizado e texto React. Biografias limitadas a 500 caracteres, comunidades a 80/500, publicações/recados 2000, mensagens de sala 1000 e salas 8 lugares. Dados de sala e partidas são filtrados pela identidade. Eventos SSE informam atualização, sem transmitir mensagens privadas em broadcasts. Banco temporário exclusivo nos testes gráficos, evitando misturar fixtures e dados locais.

Impedimentos: privacidade granular de perfis ausente; exclusão de conta, retenção, recuperação e administração incompletas; scrypt síncrono; rate limit genérico e mapas sem coleta; limites de SSE pendentes; desafios ainda não exigem aceite explícito; salas/membros persistem como reservas mesmo desconectados; moderação de comunidades/recados e denúncias novas incompletas. Perfil público não deve receber dados sensíveis. Não usar com público real. A operação humana de moderação não existe.

Nenhum push público. Banco server/data é ignorado. Histórico e dados pessoais precisam de auditoria independente antes de pedir autorização para publicação. Esta documentação não certifica ausência de vulnerabilidades.
