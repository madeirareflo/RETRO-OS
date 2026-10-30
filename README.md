# RETRO OS 001

Um computador brasileiro de boas memórias, dentro do navegador. Projeto Davi. React + TypeScript + Vite. Não é uma instalação de Windows nem um emulador de executáveis.

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
- Paint: escolha ferramenta/cor, desenhe, desfaça ou exporte PNG. Limite de 20 etapas de desfazer. A tela é 720 × 440 e se ajusta visualmente à janela.
- Player: abra seus arquivos locais (até 50 MB por arquivo); play, pause, progresso, volume e skins. A playlist é temporária. Nenhuma música comercial acompanha o projeto.
- Paciência: selecione carta/sequência e clique no destino; duplo clique envia carta válida para uma fundação. Compra de uma carta, reciclagem ilimitada, cores alternadas em ordem decrescente; colunas vazias exigem Rei. As fundações vão de Ás a Rei por naipe. Há desfazer e verificação de vitória.
- Campo Minado: primeiro clique seguro, botão direito para bandeiras ou botão “Modo bandeira” no touch. Três dificuldades. Snake: setas, espaço para pausar ou controles na tela. O jogo pausa quando perde o foco virtual.
- Terminal: HELP, DIR, CLS, CD, TYPE, DATE, TIME, VER, EXIT. Exemplo: `CD A:` e `TYPE SEGREDO.TXT`.

## Dados e limites

Preferências, posições, textos, rascunho, recorde de Snake e mensagens locais usam localStorage com prefixo `retro.`. Limpar os dados do navegador remove esses dados. Use as exportações para guardar textos e desenhos. Não há sincronização entre dispositivos. Evite mudar a porta do servidor ao procurar dados de uma visita anterior: o armazenamento é por origem.

O explorador oferece unidades e pastas virtuais, textos e uma imagem original, com propriedades; não é um gerenciador de arquivos do Windows. Os arquivos do computador só são acessados quando selecionados explicitamente no player. Nenhum EXE, script, HTML arbitrário ou código remoto é executado.

No celular, janelas novas ocupam a área útil; o botão ao lado de Iniciar mostra a área de trabalho. Paciência permite rolagem horizontal para manter as cartas utilizáveis. A experiência principal é desktop.

## Desenvolvimento e verificações

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run preview
```

`scripts/check.ps1` executa a sequência. O Playwright sobe um servidor temporário na porta 4186 e usa o Edge instalado, sem baixar um navegador. Não use essa porta para outro processo durante os testes. Capturas vão para `evidence/`; relatório HTML para `playwright-report/` (gerado localmente, ignorado no Git).

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

Consulte [relatório técnico](RETRO-OS-001-REPORT.md), [testes](TEST-REPORT.md), [decisões](docs/ARCHITECTURE.md) e [pendências / RETRO OS 002](docs/BACKLOG.md).
