# RETRO OS 003L — integração privada

Parecer: **CONDITIONAL GO** para uso privado da aplicação consolidada; publicação
permanece **NO-GO por decisão do usuário**. A integração é parcial quanto aos jogos
históricos e compatibilidade genérica; não é homologação de todo jogo DOS.

Base visual WORK: 0d43f13c0daa33251ce19d826fe212959bfc13a0.
Origem funcional Anti: df29402832e8ff143d5c11ab20dcb6636fa6a081.
Ancestral comum: 7c26450fb8f08229ec5fef870271dc8af3353fda.
Branch: development/retro-os-003l-integration, worktree RETRO-OS-003L-INTEGRATION.
Commit final, hashes e restauração constam no DELIVERY-MANIFEST.json externo.

## Resultado funcional

- Retro Game Launcher integrado ao registry, AppHost, Desktop, menu e Game Center.
- Layout herdado do Anti adaptado ao chrome 98/2000/XP/MIX do Work, sem substituir
  StartMenu, ícones históricos, CSS histórico ou modelos de janelas por versões antigas.
- Importação de ZIP/COM/EXE DOS real, validação estrutural/CRC/assinaturas, armazenamento
  de bytes no IndexedDB, configuração e montagem local no DOSBox WebAssembly.
- Assistente deixou de declarar compatibilidade por timeout: instalação só sucede após
  validar e gravar o pacote. “Instalado” não significa compatibilidade universal.
- Execução independente de servidor de jogos. Testes bloqueiam download do COM original
  e /games/ durante a execução importada; apenas o runtime local precisa ser carregado.
- Progresso nativo de Disquete Perdido produzido pelo executável original, retomado
  após fechamento completo e reabertura do navegador com perfil persistente.
- Saves por gameId/arquivo, gerenciador de exportação e restauração associada, exclusão
  de pacote preservando saves, verificação SHA256 e migração IndexedDB v1→v2.
- Atalhos reais no Desktop e VFS/Explorer, fichas históricas separadas de pacotes do
  usuário, favoritos compartilhados e Game Center consultando importados da mesma origem.
- Conversor eXoDOS mantido como análise documental; não executa AUTOEXEC/BAT nem aplica
  opções que o player não suporta. Importação atual é um pacote por operação.

## Defeitos encontrados e corrigidos

Wizard marcava jogável sem arquivos; duplicação por callback+evento; appId de foco
inválido; pacote customizado compartilhando rota com Disquete; saves sem vínculo
real ao arquivo DOS; rastreamento capturando configuração interna do emulador;
rota direta player.html sem boot; canvas espelhado deslocado; atalho MIX perdendo
segundo clique; foco do importador após seletor nativo; legado malformado derrubando
catálogo; favoritos customizados sem persistência coerente. Ver auditoria e testes.

## Preservação e limites

Sem backend social, contas, multiplayer real, push, deploy ou mudança de main.
Museu, aplicativos, VFS, dados antigos e binário DOS original preservados.
SkyRoads, Ken's Labyrinth e Freedoom/FastDoom do Anti **não estão na build nem no
histórico da branch entregue**. Seus metadados e licenças foram revisados; não se
reaproveitou a alegação anterior de homologação. Ver GAMES-COMPATIBILITY-003L.md.
O único payload incluído é Disquete Perdido original MIT. O importador permite ao
usuário testar pacotes autorizados; não executa arquivos diretamente no Windows.

Saves nativos foram comprovados para esse jogo original, não para os três títulos
históricos. Jogos genéricos podem exigir outros mecanismos de save, controles e
configuração; suporte a scripts BAT deliberadamente não foi habilitado.
Fidelidade visual continua aproximação histórica com arte própria, sem igualdade
pixel a pixel. Firefox e dispositivos físicos dependem dos resultados/limites de QA.

## Entrega e execução

G:\Meu Drive\WORKGPT\RETRO-OS\entregas-privadas\003L
Fonte, build estática, bundle completo verificável, relatórios, screenshots e hashes.
Leia EXECUTAR-003L-WINDOWS.md; dev http://127.0.0.1:4376, preview4377/RETRO-OS/.
Os testes desta versão estão em TEST-REPORT-003L.md e evidence/003l; não são os
resultados reaproveitados das duas 003K.

## Evidência quantitativa final

66 unitários;102 regressão;66 QA WORK;52 integração;4 produção estática aprovados,
além de TypeScript/lint/build. Firefox bloqueado no launch. Progresso nativo de8bytes
teve SHA256 idêntico após reinício completo em Edge e Chrome, registrado nos JSONs.
Matriz de192PNGs. Aviso de chunk grande foi mantido no relatório, não ignorado.
Consultar TEST-REPORT-003L.md para falhas intermediárias e limitações.
