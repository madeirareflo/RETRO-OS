# Iniciar e testar — 003N-FIX
1. Abrir http://127.0.0.1:4676/.
2. Duplo clique em Retro Game Launcher. Na primeira abertura, aguardar a instalação local dos três pacotes pessoais.
3. Selecionar coleção Prince / DOOM / Duke. Cada título tem sua edição no nome; Prince é demo, os FPS são shareware.
4. Selecionar título → Iniciar Jogo → Iniciar jogo DOS → Focar no jogo. Esc fica no programa; Shift+Esc libera foco; Sair para o desktop encerra.
5. Áudio começa silenciado. Duke tem áudio desativado no CFG inicial; alterar pelo setup DOS e importar CFG/pasta se desejar testar outra configuração.
6. Registrar controles, desempenho, áudio e saves no painel Teste manual / perfis 003N. A avaliação não foi preenchida em seu nome.

Checklist de cada jogo: abriu / imagem / teclado / mouse se houver / áudio / consegui jogar / consegui fechar / voltei ao desktop / salvei se aplicável / reabri progresso. Não se promete save na demo Prince.

## Reiniciar o servidor privado
No worktree, executar PowerShell scripts/start-private-three-games.ps1. Por padrão localiza a pasta privada irmã; pode receber -PrivateDataDirectory com o caminho da instalação pessoal. A pasta contém manifest.json e os três ZIPs privados. Não mover para public ou dist.
Iniciar somente pnpm dev sem a variável privada permite importação guiada normal, mas não fornece os dados pessoais. Não executar dois servidores na porta 4676.

## Importação própria
No painel, selecionar ZIP ou pasta já extraída do instalador. Prince exige dados gráficos básicos além de LEVELS; DOOM exige EXE DOS e DOOM1.WAD; Duke exige GRP, três CONs e DUKE3D.CFG produzido pelo setup. A interface lista ausências; não é necessário editar TypeScript/JSON. Instaladores multipartes não são tratados como pacotes prontos.

Dados/saves continuam locais ao navegador e à origem. As versões 003M/003N e seus dados nas portas anteriores foram preservados. Não limpar o armazenamento se quiser manter saves.
