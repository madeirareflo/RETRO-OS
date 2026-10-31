# RETRO OS 003D — entrega PARCIAL privada

Continuação de 0d87b09, sem reconstrução. A versão pública 002 e main/23096cd foram preservadas. Não houve push nem exposição do backend.

## Implementado nesta execução
- Explorer: árvore de pastas, voltar/avançar, endereço editável validado, busca na pasta e ordenação por nome/data. Operações anteriores preservadas.
- Bloco de Notas: localizar com seleção real e retorno ao início, substituir todas as ocorrências, quebra de linha, indicação de alterações não salvas e Salvar como orientado pelo campo de nome.
- Gerenciador de Tarefas: janelas reais do ambiente virtual, estado minimizado/aberto e encerramento de apps. Nenhum acesso a processos do Windows.
- Perfis: visibilidade público/amigos/somente eu aplicada no servidor e respeitando bloqueios. Migração aditiva de SQLite. Preferência e biografia carregadas ao abrir o aplicativo.
- Segurança: máximo de quatro streams SSE por conta, limite de 12 tentativas de autenticação/IP/minuto, limpeza de mapas e sessões expiradas, validação de objeto JSON.
- Batalha Naval original 8×8: convite com aceite/recusa; navios de 4/3/2 casas; posicionamento horizontal/vertical sem sobreposição; turnos, tiros, acertos, afundamentos, vitória e desistência; persistência e reconexão. Frota adversária nunca incluída na resposta. Histórico e totais gerais derivados do servidor.
- Refinamento da apresentação clássica do Explorer e Windows 2000.

## Parcial ou ausente
Fidelidade visual extrema NÃO demonstrada. Novos controles e apps ainda têm diferenças históricas relevantes. Avatares, exclusão de conta, moderação operacional/admin protegida, tópicos hierárquicos e retenção completa ausentes. LAN e Jogo da Velha preservados sem todos os refinamentos pedidos. Ranking naval é histórico estatístico, sem antifraude competitivo nem semanal; ranking da Velha pendente. Paint/MP3/Terminal/Calculadora mantêm o escopo anterior. Explorer ainda não possui multisseleção, arraste entre janelas ou diálogos universais. Salvar como não possui diálogo compartilhado; fechar editor não confirma descarte. Não homologado.

## Executar
Node 24. Dois terminais na pasta do projeto: node server/social.mjs e node node_modules/vite/bin/vite.js --host 127.0.0.1. Abra o endereço local informado. Backend somente loopback 4190. Use Iniciar → Executar → Batalha Naval / Gerenciador de Tarefas / Retro Messenger / Comunidades e Perfis. Não há backend público.

Resultados e limites em TEST-REPORT-003D.md, SECURITY-003D.md e VISUAL-FIDELITY-003D.md. Código completo na branch local; bundle separado não inclui SQLite/node_modules. Recuperação: git clone RETRO-OS-003D-PRIVATE.bundle RETRO-OS-recuperado, instalar dependências com pnpm install --frozen-lockfile. Backup Git não substitui backup privado do banco, caso existam dados importantes.

## Homologação por critério
| Critérios da missão | Estado |
|---|---|
| 1–3 Fidelidade histórica 98/2000/XP | Parcial, sem medição de alta fidelidade |
| 4 Janelas estáveis | Suítes executadas aprovadas |
| 5 Explorer completo | Parcial: faltam multisseleção, arraste e diálogos universais |
| 6 Painel expandido | Parcial, módulos novos pendentes |
| 7 Apps sem regressões observadas | Matriz final aprovada; melhorias completas pendentes |
| 8 Messenger real | Validado em sessões locais independentes |
| 9 Perfis/privacidade | Biografia e visibilidade funcional; avatar e exclusão ausentes |
| 10 Comunidades/recados | Básico funcional; hierarquia/moderação incompletas |
| 11 LAN real | Salas/chat reais locais; recursos adicionais pendentes |
| 12 Velha | Funcional, teste gráfico completo até vitória |
| 13 Naval | Regras completas testadas; UI validada até reconexão |
| 14 Rankings persistentes | Estatísticas navais gerais; competitivo/semanal e Velha pendentes |
| 15 Moderação essencial | Bloqueador pendente |
| 16 Testes negativos | Aprovados para recursos cobertos |
| 17 Regressão final | 60 Edge/Chrome aprovados |
| 18 TypeScript/lint/build | Aprovados |
| 19 Sem bloqueadores para produção | Não atendido |
| 20 Versão pública intacta | Main local preservada; nenhum push/deploy |
