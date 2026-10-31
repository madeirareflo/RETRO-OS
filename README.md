# RETRO OS 002

Um computador brasileiro de boas memórias, dentro do navegador. Projeto Davi. React + TypeScript + Vite. Não é uma instalação de Windows nem um emulador de executáveis.

Código: [repositório privado madeirareflo/RETRO-OS](https://github.com/madeirareflo/RETRO-OS). O site não foi publicado em produção.

A versão 001 está preservada na tag `retro-os-001` (commit `49137ac`). A 002 evolui o mesmo projeto, com menu clássico em cascata, menu XP com aplicativos e atalhos, proporções históricas e novos recursos locais. A entrega também é organizada em `G:\Meu Drive\WORKGPT\RETRO-OS`.

## Iniciar no Windows

Requisito: Node.js 22.12+ (ou 24 LTS), com npm; para os testes E2E, Microsoft Edge instalado. Abra um terminal **nesta pasta**:

```powershell
npm install
npm run dev
```

Abra o endereço Local que o Vite imprimir (normalmente http://127.0.0.1:5173). **Não abra index.html por duplo clique**. Uma alternativa é executar `scripts/install.ps1` e depois `scripts/start.ps1` pelo PowerShell, ou `INICIAR.cmd` após instalar. Se usar pnpm, `pnpm install --frozen-lockfile` usa a resolução reproduzível de `pnpm-lock.yaml`. O ambiente desta entrega foi instalado com pnpm 11.25.

Neste workspace, as dependências já foram instaladas. O npm não estava no PATH do ambiente de execução; os scripts PowerShell reconhecem o pnpm fornecido pelo runtime do Codex como alternativa.

## Usar

- Aguarde a inicialização de 2,6 segundos ou clique em **Pular inicialização**. O som começa silenciado; ative-o nas configurações. Autoplay depende do navegador e de interação do usuário.
- Clique para selecionar um ícone, duplo clique ou Enter para abrir. Arraste ícones para organizar; botão direito abre o menu de contexto. Alt + setas move o ícone selecionado.
- Arraste a barra de título e as bordas das janelas. Use os botões para minimizar, maximizar/restaurar ou fechar. A barra de tarefas recupera janelas minimizadas sem perder seu conteúdo.
- Ctrl + Esc abre o Iniciar; Alt + Tab alterna janelas dentro do sistema se o navegador repassar o atalho; Alt + F4 fecha a janela virtual se o navegador repassar o atalho. Esses dois últimos podem ser interceptados pelo Windows. Os controles também são acessíveis por Tab/Enter.
- **Iniciar → Configurações → Aparência → Fidelidade 100%** ativa o tema clássico. A bandeja do sistema oferece o mesmo atalho. Aplicativos e dados continuam disponíveis.
- Bloco de Notas: nome terminado em `.txt`, Salvar, Novo, Abrir. Ctrl + S salva. Exportar TXT gera uma cópia no computador.
- Paint: escolha ferramenta/cor, desenhe, desfaça/refaça, salve no disco virtual ou exporte PNG. “Abrir desenho” e o explorador reabrem imagens salvas. Limite de 20 etapas de desfazer. A tela é 720 × 440 e se ajusta visualmente à janela.
- Player: abra seus arquivos locais (até 30 faixas, 50 MB por arquivo); play, pause, progresso, volume, skins e equalizador visual. A playlist persiste os metadados; após reiniciar, selecione os arquivos locais novamente para torná-los disponíveis. Nenhuma música comercial acompanha o projeto. O equalizador muda a animação, não o áudio.
- Paciência: selecione carta/sequência e clique no destino; duplo clique envia carta válida para uma fundação. Compra de uma carta, reciclagem ilimitada, cores alternadas em ordem decrescente; colunas vazias exigem Rei. As fundações vão de Ás a Rei por naipe. Há desfazer e verificação de vitória.
- Campo Minado: primeiro clique seguro, botão direito para bandeiras ou botão “Modo bandeira” no touch. Três dificuldades. Snake: setas, espaço para pausar ou controles na tela. O jogo pausa quando perde o foco virtual.
- Terminal: HELP, DIR, CLS, CD, TYPE, DATE, TIME, VER, EXIT. Exemplo: `CD A:` e `TYPE SEGREDO.TXT`.

## Dados e limites

Preferências, posições, textos, pastas, Lixeira, rascunho, recorde de Snake, playlists e mensagens locais usam localStorage com prefixo `retro.`. Desenhos PNG usam IndexedDB (`retro-os-media`). Limpar os dados do navegador remove esses dados. Use **Iniciar → Todos os programas → Backup e Restauração** para exportar um JSON com integridade SHA-256 e desenhos incluídos. A restauração é aditiva, preserva arquivos atuais e renomeia conflitos; não substitui suas preferências atuais nem reanexa áudio local. Não há sincronização entre dispositivos. O armazenamento é por origem/porta.

O explorador permite criar pasta, renomear, copiar, recortar, colar, excluir e restaurar pela Lixeira, além de lista/ícones e propriedades. Clique num arquivo para pré-visualizar e use “Abrir no aplicativo” para editar. O menu de contexto oferece as operações; F2, Delete e Ctrl+C/X/V também funcionam. Os arquivos do computador só são acessados quando selecionados explicitamente no player ou no importador de backup. Nenhum EXE, script, HTML arbitrário ou código remoto é executado.

## Novos passeios

- **Conectar à Internet:** provedor fictício, discagem e erro de linha ocupada opcional. O estado dura a sessão da aba. Não faz ligações nem limita a internet real. As páginas internas continuam acessíveis em cache offline.
- **Máquina do Tempo:** 1998, 2001, 2003 e 2006 alteram conteúdo, sugestões e wallpaper, mantendo a aparência independente.
- **Protetor de Tela:** em Todos os programas ou Configurações → Proteção de tela. Estrelas, texto, relógio e canos com volume simulado em Canvas 2D. Escolha prévia, inatividade ou ativação manual. Mouse, toque ou teclado encerram. “Canos” não é um motor 3D; labirinto ainda não foi implementado.
- **Central de Discos:** dois disquetes colecionáveis e CD virtual com inserção/ejeção, menu AutoRun, sons originais e instalação fictícia de atalhos para apps já existentes.
- **Internet:** 11 páginas internas, busca, escola, recados, contador persistente, animações e downloads lúdicos. A Wayback é um link opcional externo, sujeito à disponibilidade do arquivo.

No celular, janelas novas ocupam a área útil; o botão ao lado de Iniciar mostra a área de trabalho. Paciência permite rolagem horizontal para manter as cartas utilizáveis. A experiência principal é desktop.

## Desenvolvimento e verificações

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run test:e2e:all
npm run preview
```

`scripts/check.ps1` executa a sequência com Edge e Chrome instalados. O Playwright sobe um servidor temporário na porta 4186. Não use essa porta para outro processo durante os testes. `test:e2e:all` inclui Firefox; instale o build de teste com `npx playwright install firefox`. Neste computador, esse Firefox não iniciou por erro de configuração lado a lado / mozglue no Windows. A compatibilidade Firefox permanece não validada. Capturas por navegador vão para `evidence/002/compat/`; relatório HTML para `playwright-report/` (ignorado no Git).

O build está em `dist/`. Publicar os arquivos de dist requer autorização do responsável; nenhuma publicação foi feita nesta missão.

## Organização

| Pasta | Responsabilidade |
| --- | --- |
| `src/core/` | Registro de apps, IDs, preferências, contratos sociais futuros |
| `src/desktop/` | Inicialização, ícones, Iniciar, bandeja, coordenação de janelas |
| `src/window-manager/` | Moldura, gestos, foco e limites de geometria |
| `src/apps/` | Aplicativos e integração no AppHost |
| `src/games/` | Modelos puros e interfaces dos três jogos |
| `src/storage/` | Arquivos virtuais, preferências, downloads |
| `src/services/` | Áudio sintetizado |
| `src/styles/` | Tokens dos três temas e controles clássicos |
| `src/components/`, `public/assets/` | Ícones e ilustração originais |
| `src/tests/`, `e2e/` | Testes unitários, integração de armazenamento e navegador |
| `docs/`, `evidence/` | Decisões, pendências, relatórios e screenshots |

Para adicionar um app, registre o metadado em `src/core/registry.ts`, crie seu componente em `src/apps/` e conecte-o em `AppHost.tsx`. O núcleo de janelas não muda. Mantenha I/O como dados; novos recursos sociais devem implementar `SocialAdapter`.

Consulte [relatório 002](RETRO-OS-002-REPORT.md), [testes 002](TEST-REPORT-002.md), [auditoria visual](docs/VISUAL-AUDIT-002.md), [comparação antes/depois](evidence/002/comparison.html), [compatibilidade](docs/COMPATIBILITY-002.md) e [pendências / RETRO OS 003](docs/BACKLOG-003.md). Os relatórios da 001 foram preservados como documentação histórica.


## Desenvolvimento privado 003E

A versão 003E está em branch local, sem publicação. Leia EXECUCAO-003E.md e RETRO-OS-003E-REPORT.md. Novo início local: INICIAR-PRIVADO.cmd. Não enviar esta branch ao repositório público. O site público continua na linha estável 002.
