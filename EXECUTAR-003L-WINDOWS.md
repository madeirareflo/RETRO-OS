# Iniciar RETRO OS003L no Windows

Node22.12+ ou24. Extraia RETRO-OS-003L-SOURCE.zip numa pasta source, ou use
o worktree RETRO-OS-003L-INTEGRATION. Dentro dessa pasta:

    powershell -NoProfile -File scripts/install.ps1
    npm run dev

Porta exclusiva: http://127.0.0.1:4376. Sem backend social.
Preferir pnpm install --frozen-lockfile quando disponível; instalação desta missão
usou cache offline,208 pacotes, sem dependências novas.

    npm run build
    npm run preview

Preview: http://127.0.0.1:4377/RETRO-OS/. Não abrir a aplicação por file://.

    node scripts/validate-003l.mjs
    node scripts/audit-003l.mjs

QA requer Chrome/Edge instalados. Firefox é tentativa separada.
Importe somente pacotes DOS autorizados: Launcher →Adicionar Jogo →ZIP/COM/EXE →
executável →engine/ciclos →Instalar →Iniciar Jogo. Saves automáticos dependem do jogo.
Disquete Perdido incluído é original: mover com setas, coletar itens, progresso local.

Cada porta/origem possui armazenamento separado. Dados de4186/4276 continuam lá;
não são automaticamente lidos por4376. Backup VFS exporta textos/desenhos, não pacotes
ou músicas. Gerenciador de Saves exporta arquivos individuais. Não apagar origens antigas.

Recuperação do bundle em OUTRA pasta:

    git clone --branch development/retro-os-003l-integration RETRO-OS-003L-PRIVATE.bundle RETRO-OS-RECUPERADO
    git -C RETRO-OS-RECUPERADO fsck --full

O bundle traz a ancestralidade da branch003L e não depende de referências remotas.
Consultar DELIVERY-MANIFEST.json para commit/hashes/resultado. Sem push/deploy.
