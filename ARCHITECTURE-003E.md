# Decisões 003E

Preservada a arquitetura React/TypeScript/Vite e o VFS existente. Sem nova dependência. Game Center usa JSON editorial versionado; app só é executável se houver app id registrado. Instalado é biblioteca virtual; ficha não implica binário. Favoritos, atalhos, histórico e playlists são preferências locais. Modelo diferencia plataforma original de relançamento e registra conferência pendente.

Governance mantém autorização e apagamento no servidor, sem papel concedido por HTTP. CLI local concede papel para conta existente. Ledger results usa chave (kind,game) e transação junto à jogada; agrega todo o histórico elegível em SQL, limitando somente linhas exibidas e histórico pessoal. Semana começa segunda-feira UTC. Não houve pontuação retroativa de partidas antigas.

Migrações são aditivas/idempotentes por PRAGMA table_info para preservar 003D. Match legado tem status playing por compatibilidade; novo desafio exige aceite. Comunidades têm moderadores e posts com parent validado na mesma comunidade e profundidade limitada. Remoção usa árvore recursiva. Segurança de conteúdo é texto React e avatares enumerados.

Seleção de arquivos é local à janela. Transferência em lote calcula estado antes de um commit; compatível com clipboard antigo de um caminho. Drop usa MIME application/x-retro-files e valida origens no VFS. FileDialog é reutilizável, integrado somente ao Notepad nesta etapa. Evento cancelável retro:before-close permite confirmação sem acoplar Desktop ao estado textual. Paint ainda precisa aderir ao contrato.

M3U é dados de referências para arquivos locais, sem fetch de URLs importadas. Demo WAV é gerada localmente. Skins alteram CSS; equalizador permanece visual. Downloads 56K são animações opcionais, sem limitar rede real.

Dívida: serialização/apagamento multi-recurso exige revisão independente; migrações formais versionadas, paginação, trilha de operador, adaptadores sociais centrais e distribuição de presença/rate limit continuam pendentes. Não escalar este SQLite para vários processos sem projeto de concorrência. Ver proposta de hospedagem preservada em DEPLOYMENT-PLAN-003D.md; nenhum passo de implantação foi executado.
