# Testes 003E — validação final reproduzível

Fonte primária desta execução: evidence/003e/validation-summary.json e validation.log, produzidos por node scripts/validate-003e.mjs após as integrações finais. Todos os sete comandos encerraram com código zero.

| Verificação | Resultado final |
|---|---|
| TypeScript --noEmit | Aprovado |
| ESLint src | Aprovado |
| Vitest | 36 testes em 5 arquivos aprovados |
| Build Vite | Aprovado; JS 459,06 KB / gzip 125,83 KB; CSS 53,65 KB / gzip 12,66 KB |
| Servidor | 8 testes nomeados aprovados, combinando HTTP real, domínio e migrações |
| E2E Edge/Chrome completo | 78 aprovados, após as integrações |
| Social gráfico Edge | 6 aprovados, backend real e contextos independentes |
| Firefox | 3 tentativas falharam antes da aplicação, browserType.launch: spawn UNKNOWN |

## Cobertura e limites
Unitários incluem catálogo/cobertura de títulos, distinção entre museu/jogável, cronologia especial, VFS/seleções/lotes/rollback/quotas, backup e playlists/WAV. Servidor usa bancos temporários, três identidades e casos negativos: autorização admin e por recurso, sessões/suspensão, privacidade, mensagens/SSE/bloqueio, report/remoção, exportação sem credenciais, exclusão com SSE aberto, migração, retenção, aceite e resultados de partidas. Rankings de Velha e Naval foram validados por HTTP; ledger não duplica partidas, exclui abandonos e limita dupla por 24h. Teste de 5001 resultados confirma agregação geral sem truncamento. Também há teste de semana UTC e autorização contra terceiros.

Os seis testes sociais são boot automático, comunidade/perfil, três sessões com administração/exportação/exclusão, LAN/Velha até vitória e ranking semanal, Messenger/SSE/bloqueio e Naval com convite/aceite/tiros/reload. Naval até vitória é coberta por HTTP e domínio; o fluxo gráfico naval não joga até o último navio.

A matriz Edge/Chrome inclui 800×600, 1024×768, 1366×768 e 1920×1080 nos testes herdados, mobile emulado, diversas janelas, arquivos persistentes, Paint, player e demais apps 002. Capturas novas de quatro temas cobrem desktop/Iniciar/Explorer/Painel/Salvar como em ambos os navegadores. O drop entre janelas é exercitado com DataTransfer/eventos sintetizados do navegador; não foi teste físico de todos os gestos touch/mouse. Não houve aparelho mobile físico nem teste remoto entre PCs. Alguns testes herdados monitoram pageerror; isso não é auditoria global de todo console em todos os estados.

## Falhas intermediárias investigadas
- SQL/registro de resultados inicialmente tinha número incorreto de placeholders; corrigido e testado novamente.
- Alteração de SQL de convites teve erro de aspas; corrigido antes das suítes finais.
- E2E de exclusão com Messenger aberto revelou queda real ERR_STREAM_WRITE_AFTER_END; corrigida remoção de peers encerrados e acrescido teste HTTP com stream ativo. Fluxos completos finais passaram.
- Dois testes de ícones esperavam a antiga coordenada x=16 após organizar no clássico. Nova grade histórica usa x=0; expectativa foi atualizada, mantendo teste de arraste e persistência.
- Uma execução social paralela à matriz pesada aguardou Pular inicialização após o boot automático. O código já remove esse botão após 2,6s. Helper passou a aceitar BIOS ou desktop, exigindo Iniciar visível; foi adicionado teste específico de boot automático. Suíte sequencial final passou sem retries.
- Firefox continua bloqueado no executável firefox-1555. Não é alegação de incompatibilidade funcional comprovada, pois a aplicação não chegou a abrir.

Scripts de início privado foram revisados e tiveram sintaxe PowerShell conferida; o lançamento por duplo clique não foi testado. Os comandos frontend/backend equivalentes foram executados pelos testes. Não se afirma teste de recursos que não foram implementados.

## Recuperação privada
O teste adicional de clone identificou que o bundle de uma única branch não fornece HEAD remoto padrão. Guia corrigido para git clone --branch development/retro-os-003e. A entrega inclui recibo com HEAD e hash conferidos depois da restauração final em diretório temporário. Não houve instalação de dependências nem execução de dados locais nessa recuperação.
