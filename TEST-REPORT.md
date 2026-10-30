# RETRO OS 001 — relatório de testes

Ambiente: Windows, Node 24.22.1 (runtime local), pnpm 11.25.0; Edge instalado via channel msedge, headless, Playwright 1.64.1. Data: 30/10/2026. Viewports: 1366 × 900 e 390 × 844.

## Resultados

| Verificação | Resultado |
| --- | --- |
| Instalação pnpm | Passou; scripts de build permitidos somente para esbuild |
| TypeScript estrito, tsc --noEmit | Passou |
| ESLint | Passou |
| Vitest | 16 testes passaram |
| Build Vite | Passou |
| Playwright | 11 testes passaram em 17,3 s; zero falhas na rodada final |
| Inspeção visual | Capturas MIX, XP, clássico e celular abertas e revisadas |

Unitários/integração: limites de janela; salvar/reabrir documentos sem perder arquivos iniciais; bloqueio de nomes/caminhos inválidos; preferências corrompidas e quota; quantidade de minas e proteção do primeiro clique em todas as 81 casas; flood fill de vazios/bandeiras; colisão, crescimento e cauda móvel do Snake; distribuição de 52 cartas únicas, compra e reciclagem, cor/sequência/Rei, revelação, fundações e vitória do Klondike; operações da calculadora e comandos virtuais do terminal.

E2E: BIOS, abertura/fechamento, arrastar, resize real pelas bordas, maximizar/restaurar, minimizar/taskbar, múltiplas janelas; salvar/recarregar/reabrir TXT; Iniciar/configurações, todos os temas e persistência; desenhar/exportar PNG; primeiras jogadas nos três jogos; terminal/calculadora/links internos; celular; WAV original gerado no próprio teste, tempo de reprodução, pause e skin; posição de ícones persistida e reorganização; mudança de tema preservando texto aberto; cenário de doze janelas e console; imagem original e propriedades do explorador.

## Ocorrências corrigidas durante a execução

- O npm não estava no PATH; foi usado pnpm do runtime. A primeira tentativa de instalação encontrou EPERM no sandbox. A execução autorizada instalou os pacotes; o allowlist de esbuild concluiu a instalação com exit 0.
- O socket localhost estava bloqueado no sandbox. Após autorização, testes foram executados fora dele. Uma porta de teste inicialmente ocupada foi trocada por 4186.
- Primeiro teste identificou símbolo decorativo no nome acessível do Iniciar. Foi definido aria-label estável.
- Um teste de resize usava dragTo com coordenadas fora do próprio handle; foi corrigido para gesto real de mouse e asserção da mudança de largura. Não foi mascarado como falha do produto.
- O atalho de mostrar desktop estava oculto no CSS mobile; passou a ficar disponível.
- O seletor do tema no teste dependia de uma descrição ocultada no celular. Foram adicionados rótulos acessíveis explícitos e o teste foi atualizado.

## Evidências

- `evidence/retro-mix.png`
- `evidence/xp-nostalgia.png`
- `evidence/fidelidade-100.png`
- `evidence/mobile-classic.png`
- `evidence/paint-export.png` — download real produzido pelo Paint
- `evidence/multitarefa.png`
- `evidence/disquete.png`

O Playwright gera seu relatório HTML e screenshots de falha em diretórios ignorados no Git. Os testes são reproduzíveis com `npm run test:e2e` ou o CLI Node descrito nos scripts.

## Limites da validação

Sem sessão visual interativa na referência TheBomb devido à configuração de navegação. Não foram executados Chrome, Firefox, Safari ou aparelhos móveis físicos. As capturas são evidências visuais, sem comparação automatizada com baselines. Não foi concluída uma partida aleatória inteira de cada jogo pelo navegador: regras e condição de vitória são testadas nos modelos, e jogadas reais são verificadas na UI. Som de mídia foi validado por eventos e avanço de tempo; não houve audição humana dos efeitos. Sem benchmark de CPU/memória ou auditoria completa de acessibilidade.
