# Instalação privada atual: RETRO OS 003N-FIX

Três jogos com abertura técnica verificada: Prince demo DOS 1.0, DOOM shareware v1.9 e Duke shareware v1.3d. Dados ficam fora do código/build. [Relatório](RETRO-OS-003N-FIX-REPORT.md), [iniciar](MANUAL-TEST-INSTRUCTIONS.md), preview http://127.0.0.1:4676/. Iniciar via scripts/start-private-three-games.ps1 para carregar a pasta pessoal.

Histórico preservado abaixo.

# Checkpoint privado atual: RETRO OS 003N

Perfis DOS e importação guiada, sem redistribuição de novos dados comerciais. [Relatório](RETRO-OS-003N-REPORT.md), [execução Windows](EXECUTAR-003N.md) e [checklist manual](MANUAL-TEST-CHECKLIST-003N.md). Preview: http://127.0.0.1:4576/. Nenhum jogo novo homologado em nome do proprietário.

Documentação anterior preservada abaixo.

# Checkpoint privado atual: RETRO OS 003M

Continuação local da 003L, sem publicação. Leia [relatório 003M](RETRO-OS-003M-REPORT.md), [execução Windows](EXECUTAR-003M.md) e [roteiro manual dos jogos](HOMOLOGACAO-MANUAL-003M.md).

Dev: http://127.0.0.1:4476/ · Build: pnpm build · Verificação de interface: node scripts/validate-ui003m.mjs. Os testes adicionais de jogos ficam com o usuário por orientação posterior. Evidências já obtidas estão preservadas.

Documentação histórica preservada abaixo.

# RETRO OS 003F — museu offline

Continuação privada do RETRO OS, sem reconstrução. Desktop nostálgico com temas
98/2000/XP/MIX, arquivos locais, aplicativos, jogos próprios e internet fictícia
navegável. Não há contas ou visitantes conectados. A versão pública 002 permanece
preservada; nenhum push/deploy desta missão está autorizado.

Status de homologação: **PARCIAL**. Veja [relatório](RETRO-OS-003F-REPORT.md),
[testes](TEST-REPORT-003F.md), [mudança de escopo](SCOPE-CHANGE-003F.md) e
[pendências](BACKLOG-003G.md).

## Executar

Node.js 22.12+ ou 24, com npm. No PowerShell desta pasta:

    powershell -NoProfile -File scripts/install.ps1
    .\INICIAR-PRIVADO.cmd

Abra http://127.0.0.1:4186 . O desktop não inicia Node/SQLite social.
Alternativa: npm install e npm run dev -- --port 4186.
Detalhes e recuperação de backup: [Windows](EXECUTAR-003F-WINDOWS.md).

## Explorar

- Game Center: 74 fichas anteriores preservadas + Disquete Perdido DOS original,
  emulado de verdade com DOSBox/WASM. Fichas comerciais não têm botão Jogar.
- Máquina do Tempo: 1998–2008; Rede Recreio, fotodiário, portais e fórum fictícios.
- Messenger: escolhas e respostas de roteiro, avatares e status simulados.
- LAN House: seis estações, atalhos e Jogo da Velha local. Batalha Naval hotseat.
- Explorer/Notepad/Paint/player/calculadora/terminal e recursos anteriores mantidos.
  Paint e Notepad confirmam descarte; PNG/TXT podem ser salvos e reabertos.
- Temas em Painel de Controle → Aparência. Fidelidade 100% é o nome legado do
  modo clássico, não certificação de identidade visual com o Windows.

## Desenvolvimento e validação

    npm run typecheck
    npm run lint
    npm test
    npm run build
    node scripts/validate-003f.mjs

O último comando grava logs em evidence/003f e exige Edge e Chrome. Build estática
em dist, base /RETRO-OS/. Prévia: npm run preview -- --port 4187; abra
http://127.0.0.1:4187/RETRO-OS/ . Não usar file:// para módulos/WASM.

Arquitetura: src/core e registry registram apps, desktop/window-manager gerenciam
janelas, storage mantém VFS/localStorage/IndexedDB, museum contém roteiros e arte,
apps implementa programas, games jogos locais. public/emulation contém bridge e
binário próprio; public/vendor mantém engine/licenças/fontes sob demanda.

## Preservação e direitos

Backend social anterior em archive/social-003e, sem entrar na build. Para executá-lo,
recupere checkpoint 003E em outra pasta conforme README do arquivo. SQLite local
preservado e ignorado pelo Git; não distribuir dados ou sessões.

[Licenças novas](THIRD-PARTY-LICENSES-003F.md), [inventário anterior](THIRD-PARTY-LICENSES.md),
[pesquisa de engines](EMULATION-RESEARCH-003F.md), [PoC](EMULATION-POC-003F.md),
[compatibilidade](GAMES-COMPATIBILITY-003F.md), [internet](HISTORICAL-WEB-003F.md),
[auditoria visual](VISUAL-FIDELITY-003F.md) e [privacidade](SECURITY-003F.md).
Não foram incorporados jogos comerciais, assets Microsoft, ROMs ou músicas comerciais.

## Checkpoint privado 003K WORK

Desenvolvimento visual isolado sobre 003F, sem integração do Launcher Anti.
Leia RETRO-OS-003K-WORK-REPORT.md, EXECUTAR-003K-WINDOWS.md,
TEST-REPORT-003K-WORK.md e INTEGRATION-PLAN-003K.md.
Portas deste worktree: dev4276 / preview4277. Nenhum push/deploy autorizado.
