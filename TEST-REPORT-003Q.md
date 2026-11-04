# Testes — conclusão 003Q sobre 004F

## Resultado
- TypeScript: aprovado (typecheck.log sem erros).
- ESLint src: aprovado (lint.log sem erros).
- Build Vite: aprovado; aviso de tamanho do chunk principal mantido, sem erro de build.
- Vitest completo: 25 arquivos, 127 testes aprovados, incluindo Lost Internet 004F, biblioteca de oito jogos, fronteira de ZIP, perfis, geometria e manuais.
- Chrome e Edge: os 3 cenários por navegador foram validados. Os dois casos de registros/preservação e inicialização estão aprovados em e2e-final.log; os dois casos de importação corrigidos estão aprovados em imports-final.log. Total de seis cenários válidos. Não se afirma que a primeira execução integral passou: ela teve quatro aprovações e duas falhas de expectativa do teste, mantidas nos logs.

## Cenários gráficos reais
1. Oito registros de jogos DOS disponíveis, IDs únicos; 37 opções; jogos sem arquivos e motores pendentes sem botão Jogar; reabrir não baixa/reinstala os cinco pacotes; favorito e bytes de teste preservados.
2. Importação individual de Heretic e lote de Quake preparado, ambos ZIPs reais; arquivos gravados no IndexedDB com SHA256; reload e reabertura; ZIP corrompido recusado para um perfil vazio.
3. Heretic e Quake iniciados brevemente no DOSBox, ajuda aberta/fechada e saída para o desktop; sem pageerror. Heretic mostra a abertura; Quake chega à tela de inicialização/aviso de música de CD ausente e pede uma tecla. Isso não é homologação de gameplay.

## Falhas encontradas e tratamento
O primeiro ensaio sobre a 004F revelou duplicações por ID entre pacotes estáticos e registros pessoais: corrigido preferindo a entrada pessoal do mesmo ID. O cache externo antigo do Quake inclui DLLs Windows auxiliares e foi corretamente recusado; o caso válido usa o ZIP DOS preparado e já incluído na base. Um teste tentava esperar CRC inválido depois de selecionar um perfil já instalado: o produto recusou a substituição antes disso. O teste agora usa um perfil vazio para exercitar corrupção; o bloqueio de substituição foi preservado. As primeiras falhas de sintaxe/assert da suíte nova foram corrigidas, e os 127 unitários passaram depois.

## Limites
O arquivo QA.DAT criado em contexto isolado comprova transporte/preservação de bytes somente. Não é save nativo nem retomada real de progresso. Não foram acessados os dados do perfil real do proprietário. Não houve partidas longas, novos testes físicos, certificação Firefox ou repetição de todas as jornadas gráficas da 004F. Fonte/ativos da 004F, oito pacotes, temas e Ctrl+K foram preservados pelo diff e hashes.

## Segurança
Auditoria de padrões e nomes nos arquivos textuais atuais e nos blobs textuais ancestrais, sem credenciais dos padrões pesquisados; números completos em security-audit.json. Sem novos binários, sem SQLite no histórico entregue, sem alteração de public. Isso não é pentest nem garantia absoluta sobre metadados em imagens/arquivos compactados. Histórico da branch e árvore atual foram verificados; o commit final acrescenta somente o conjunto auditado.

## Reprodução
Instale dependências com pnpm install --frozen-lockfile. Execute pnpm typecheck, pnpm lint, pnpm test e pnpm build. A suíte curta usa playwright.003q-final.config.ts e servidor local 4976; a execução do proprietário usa 4676. O script INICIAR-LOCAL.cmd da entrega aponta para a worktree final. Não limpar localStorage/IndexedDB para testar.
