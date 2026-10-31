# RETRO OS 002 — relatório de testes

Data: 30/10/2026. Windows, Node 24.22.1, React 19.3.1, TypeScript 5.9.3, Vite 7.3.7, Vitest 3.2.7 e Playwright 1.64.1.

## Rodada completa aprovada

| Verificação | Resultado |
| --- | --- |
| TypeScript estrito | Passou |
| ESLint | Passou |
| Vitest | **26 testes passaram** (16 originais + 10 novos) |
| Build de produção | Passou; aproximadamente 323 KB JS / 47 KB CSS antes de gzip |
| E2E Edge | **27 testes passaram** |
| E2E Chrome | **27 testes passaram** |
| Rodada completa Edge + Chrome | **54 passaram, zero falhas, aproximadamente 1,2 minuto** |
| Firefox | **23 tentativas bloqueadas na inicialização do navegador** na primeira matriz; nenhum fluxo da aplicação validado |

Depois do ajuste final de leitura animada do disquete e contagem de unidades, os quatro testes afetados (explorador/CD, Edge e Chrome) foram repetidos e passaram. TypeScript, lint, 26 unitários e build também foram repetidos com sucesso. A comparação interativa foi aberta nos dois navegadores e a troca de tema/resolução foi verificada; as capturas dos protetores foram atualizadas após 1,5 segundo de animação. A aplicação continua sem publicação em produção.

## Cobertura executada

Os testes 001 foram preservados: boot, abrir/fechar, arraste, resize, minimizar/restaurar, maximizar, taskbar, temas/persistência, TXT, PNG, primeiras jogadas dos três jogos, terminal, calculadora, links, viewport móvel, WAV local, ícones persistidos, doze janelas e imagem/propriedades do explorador. Dois seletores de ícones passaram a exigir nome exato porque “Internet” e “Conectar à Internet” agora coexistem; as asserções de comportamento foram mantidas.

Novos testes unitários cobrem criação/renomeação de árvore, cópia/corte, exclusão/restauração, conflito e falha de quota, ciclos/caminhos inválidos, integridade de backup, limite de tamanho, caminho malicioso com checksum recalculado e importação aditiva com extensão preservada.

Novos testes de navegador cobrem discagem/linha ocupada, persistência de sessão/desconexão, época independente de tema, associação TXT, renomear/copiar/recortar/excluir/restaurar, lista de arquivos, PNG em IndexedDB após reload, desfazer/refazer, backup TXT e PNG com conflito, recusa de integridade inválida, quatro protetores com pixels não pretos, ativação manual/inatividade e saída, playlist persistida/indisponível/reativada, escola/buscador/GIFs/contador, disquete 002, CD, instalação simulada, retorno de foco e geometria/console nos três temas.

Resoluções reais de browser: 800×600, 1024×768, 1366×768 e 1920×1080. Emulação móvel: 390×844, com testes da 001 em ambos os navegadores. Não houve celular físico.

## Falhas encontradas e tratamento

1. **Menu Iniciar mudava de altura no hover**, deslocando o alvo de clique. Corrigido com dimensões estáveis; menu XP foi refinado para apps/atalhos e Todos os programas.
2. **Recortar/excluir comparava identidade de objetos** retornados por leituras JSON diferentes. Os novos unitários detectaram a falha; corrigido para comparar caminhos. Testes de árvores e restauração passaram.
3. **Status do Paint não tinha semântica acessível**. Adicionado role=status.
4. **Codificação PNG assíncrona apresentou atraso intermitente**, detectado em gravação sob execução paralela. A tela 720×440 agora é codificada diretamente para PNG no salvamento local; os testes de reload, conteúdo do bitmap e restauração passaram depois da correção.
5. **Firefox não lançou**. Pacote oficial Playwright 157.0 instalado; CLI e execução direta falharam antes de visitar a página. Eventos SideBySide apontaram mozglue. Não é registrado como teste aprovado nem como bug confirmado da aplicação.

A primeira matriz teve falhas do runtime Firefox e a falha intermitente do Paint. Não são omitidas. Rodadas posteriores aprovadas no Edge/Chrome substituem o resultado dos fluxos corrigidos. O Firefox permanece pendente, detalhado em docs/COMPATIBILITY-002.md.

## Evidências e limites

- evidence/002/before e after: mesma cena/tema/resolução no checkpoint 001 e 002.
- evidence/002/comparison.html: comparação local selecionável.
- evidence/002/compat: navegador, largura e tema no nome.
- evidence/002/savers: canos, estrelas, texto e relógio de ambos os navegadores.
- evidence/paint-export.png: PNG real exportado no fluxo de teste.

As capturas da aplicação foram abertas e revisadas visualmente; não há baseline automático de diferenças em pixels. Sem benchmark formal, auditoria WCAG completa, teste de vitória aleatória completa dos jogos pela UI, audição humana dos efeitos ou teste em dispositivo físico. O WAV é original, gerado em memória pelo teste; reprodução é confirmada por play/pause e avanço de tempo.

Scripts: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run test:e2e`. Para Firefox, `npm run test:e2e:all`. Relatório HTML temporário em playwright-report/ (não versionado); fontes dos testes e resultados resumidos deste relatório são entregues.
