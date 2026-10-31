# RETRO OS 003N — Pronto para teste manual
Parecer: CONDITIONAL GO. Três perfis adicionais conectados à importação e ao AppHost; os dados dos candidatos estão ausentes. Não são jogos novos embutidos ou homologados. A alternativa de importação guiada autorizada pela missão foi utilizada.

## Origem e isolamento
Base 5d51807408240cf2494c754126a1d41b327fa8c6 (003M). Branch development/retro-os-003n-games, worktree RETRO-OS-003N. O gerenciador do app não aceitou sourceRoot aninhado; o worktree foi criado com Git, sem alterar a base ou main. Backup completo 003M verificado. Pesquisa Anti consultada em G:/Meu Drive/WORKGPT/RETRO-OS/entregas-privadas/003M-ANTI-RESEARCH; nenhum código/mídia copiado do eXoDOS.

## Entregue
- Painel discreto Teste manual / perfis 003N no Launcher, acessível também pelo Game Center → Game Launcher.
- Prince DOS 1990, DOOM shareware v1.9 e Duke 3D shareware v1.3d: configurações limitadas ao que o adaptador efetivamente aplica, arquivos mínimos, controles, saves e pendências descritos.
- Importação ZIP/EXE/COM pelos validadores existentes; persistência dos bytes e SHA-256 no banco anterior; seleção de executável e normalização de pasta somente na montagem virtual.
- Reconhecimento de DOS/4GW LE/LX limitado aos perfis, sem liberar PE/NE ou o importador genérico. BATs ignorados, nunca executados.
- Botão Jogar somente após arquivo presente/reconhecido. Instalação abre o mesmo dos-imported; não há biblioteca paralela.
- Avaliação local Ainda não testado/Funcionou/Não funcionou/Apresentou problemas, observações e confirmação explícita opcional de homologação. Chave por pacote; nova importação não herda aprovação.
- Jogos autorizados 003M mantidos integralmente, sem alteração de pacotes, saves/VFS ou temas históricos. Campos novos são opcionais e não exigem migração destrutiva.

## Limites e correções à pesquisa
Shareware e abandonware não foram tratados como autorização irrestrita. Código Apple II de Prince não é licença do pacote DOS; arquivos comerciais não foram baixados/embutidos. Os três candidatos aguardam arquivos legítimos do proprietário. Diablo Spawn e Full Throttle requerem engines próprias, não implementadas. Não foram criadas novas funções sociais ou emuladores Win32.

6000/20000 ciclos são estimativas, não calibração humana. Memory/machine/scaler não são prometidos como aplicados. Nomes de arquivos e assinatura de stub não autenticam uma edição comercial. Nenhum jogo é declarado perfeito ou homologado por build. Save e gameplay serão avaliados pelo proprietário.

## Validação e entrega
TypeScript/lint/build aprovados; 16 unitários; seis smokes dev e seis estáticos em Chrome/Edge. Só quatro screenshots. TEST-REPORT-003N.md explica testes e limites. Código completo, build estática, commit local, bundle verificável e restauração independente devem acompanhar a entrega; SHA e hashes finais estão no DELIVERY-MANIFEST.json externo.

Destino: G:/Meu Drive/WORKGPT/RETRO-OS/entregas-privadas/003N. Preview privado: http://127.0.0.1:4576/. Instruções: EXECUTAR-003N.md; checklist: MANUAL-TEST-CHECKLIST-003N.md.
A porta 4476 mantém a 003M e seus dados. Origem 4576 é isolada: dados antigos não são apagados nem migrados automaticamente. Em mesma origem, o schema anterior é preservado. Não houve push/deploy/main alterada; versão pública 002 intacta.
