# Executar RETRO OS 003F no Windows

Versão privada/local. Não fazer push ou deploy. Node.js 22.12+ ou 24 com npm.

Abra PowerShell nesta pasta e execute:

    powershell -NoProfile -File scripts/install.ps1
    .\INICIAR-PRIVADO.cmd

Abra http://127.0.0.1:4186 no Edge ou Chrome. Sem backend social.
Alternativa: npm install e npm run dev -- --port 4186.

Game Center → pesquise Disquete Perdido → Jogar demonstração DOS → Iniciar jogo DOS.
Setas/WASD movem, P pausa, R reinicia, Esc devolve foco ao desktop. Áudio começa
silenciado; botão ativa. Saves ficam na origem deste navegador.

Validação: node scripts/validate-003f.mjs. Requer Edge/Chrome instalados. Firefox:
npx playwright install firefox e ambiente compatível.

Build: npm run build. Prévia estática:
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4187
Abra http://127.0.0.1:4187/RETRO-OS/ . dist contém arquivos estáticos. Não usar file://.

Recupere código sempre em OUTRA pasta, sem sobrescrever a atual:

    git clone --branch development/retro-os-003f RETRO-OS-003F-PRIVATE.bundle RETRO-OS-003F-RESTORED
    cd RETRO-OS-003F-RESTORED
    git log -1

--branch é necessário pois o bundle pode não ter HEAD para checkout automático.
Bundle contém histórico Git de código; não node_modules, SQLite ou arquivos do
visitante. Use o aplicativo de backup local para documentos pessoais. Recuperação
do backend antigo deve usar branch/bundle 003E em pasta separada, sem reativá-lo
no museu. Instruções antigas arquivadas não representam o runtime 003F.
