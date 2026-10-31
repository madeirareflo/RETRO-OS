# Proposta futura de implantação — sem execução

Frontend pode permanecer em GitHub Pages. Backend Node precisará de serviço HTTPS de longa duração, proxy com SSE sem buffering, cookies Secure e política explícita de origens. Preferir frontend/API sob mesma origem ou BFF; cookies cross-site e CORS exigem projeto próprio, não copiar a configuração localhost.

Antes de múltiplas instâncias, migrar SQLite para PostgreSQL com migrações, transações de jogadas e índices; distribuir presença/rate limiting com armazenamento compartilhado. Hosting gerenciado com suporte SSE e backups PostgreSQL é candidato; verificar suspensão/limites de conexão antes de escolher plano gratuito. Não foram pesquisadas cotações vigentes nem estimados custos financeiros nesta etapa.

Operação: backups cifrados, teste de restauração, retenção e exclusão documentadas, monitoramento sem mensagens/senhas, alertas de erro/abuso e procedimento de incidentes. Definir RPO/RTO antes da contratação. Nenhuma contratação, domínio ou serviço foi criado. Publicar somente após fechar bloqueadores, revisar segredos e dados inclusive histórico Git e obter autorização nova.
