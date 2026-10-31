# Firefox 003M
A falha anterior spawn UNKNOWN foi reproduzida com o executável do cache global firefox-1555. PE x64 e ACL foram inspecionados; Start-Process indicou configuração lado a lado incorreta. Evento SideBySide 33 identificou dependência mozglue ausente. Logs: firefox-spawn.json e firefox-side-by-side.log.

Foi instalado Firefox oficial do Playwright em cache isolado RETRO-OS-003M-BROWSERS ao lado do worktree. Nenhuma política de segurança foi desativada e o cache global permaneceu intacto. Não havia Firefox padrão em Program Files para teste manual independente.

Após a instalação, o smoke de BIOS/janelas passou. A regressão completa iniciou e terminou: 43 passaram, oito falharam. Quatro usavam seletor antigo do Painel de Controle, corrigido depois. As outras envolveram foco após sair do DOS, coordenadas de arraste, navegação no Game Center e timeout ao recarregar o discador. A execução ocorreu simultaneamente a outras suítes; carga concorrente pode afetar prazos, mas não foi usada como justificativa para considerar falhas aprovadas.

Não foi feita nova homologação completa Firefox após as correções finais. O navegador deixou de estar bloqueado na inicialização; compatibilidade total permanece pendente. Jogos e novos saves não serão retestados automaticamente nesta entrega por decisão posterior do usuário. Ver firefox-regression.log; não confundir falha de ambiente resolvida com os testes de aplicação ainda pendentes.
