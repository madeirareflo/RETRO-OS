# Executar e recuperar — RETRO OS 003K WORK

Desenvolvimento privado. Não fazer push/deploy. Node.js 22.12+ ou 24.

Na pasta source ou no worktree RETRO-OS-003K-VISUAL:

    powershell -NoProfile -File scripts/install.ps1
    npm run dev

Preferir pnpm install --frozen-lockfile quando pnpm estiver disponível.
A prévia desta missão usa http://127.0.0.1:4276, diferente da 003F (4186).
O servidor é só de arquivos da aplicação, sem backend social.

Cada origem/porta tem localStorage e IndexedDB próprios. A porta 4276 não lê
automaticamente os documentos da 4186: eles não foram apagados. Para transportar
seus arquivos, exporte pelo aplicativo Backup e Restauração na versão antiga e
importe o backup na nova, conferindo o resultado antes de alterar a cópia antiga.
Nenhum banco de usuários do servidor é incluído na entrega.

    node scripts/validate-003k-work.mjs
    node scripts/audit-003k-work.mjs

O validador gera logs em evidence/003k. Requer Chrome/Edge instalados. Firefox
possui projeto separado na configuração original, com tentativa registrada.

Build: npm run build. Prévia de produção: npm run preview. Abra
http://127.0.0.1:4277/RETRO-OS/ (base estática preservada).
Não usar file:// para iniciar a aplicação; WASM e módulos precisam de HTTP.
A galeria evidence/003k/comparison.html pode ser aberta diretamente como arquivo.

Recuperação do bundle, sempre em OUTRA pasta:

    git clone --branch development/retro-os-003k-visual RETRO-OS-003K-WORK-PRIVATE.bundle RETRO-OS-003K-RESTORED
    cd RETRO-OS-003K-RESTORED
    git log -1
    git fsck --full

O --branch evita depender do HEAD implícito do bundle. Não executar reset/clean
nos diretórios do Anti ou da versão principal. Fonte, dist, testes e portas desta
missão são independentes. O Launcher não está integrado nesta branch.
