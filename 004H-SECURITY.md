# Segurança — 004H

Desenvolvimento privado, sem push/deploy/merge na main e sem backend social. Nenhum pacote de jogo ou motor foi atualizado, baixado ou acrescentado: oito hashes intactos e nenhum diff em public/games ou public/vendor. Os perfis de teste são separados dos dados do proprietário.

## Validado

- Pacotes: CRC, limites de descompactação declarada, path traversal, criptografia, arquivos truncados, extensão indevida, BAT e Win32/PE recusados nos unitários reexecutados.
- Bytes reais importados conferidos por SHA; erro de ZIP não removeu instalação anterior. Motor ausente não cria execução.
- Origem e source das mensagens do iframe conferidas; scripts executados são somente os componentes confiáveis locais. Jogos DOS são dados executados dentro de WebAssembly, não processos do Windows hospedeiro.
- Input restrito ao iframe/canvas; Ctrl+K não foi globalizado. Listeners/teclas liberados. Nenhum código remoto de jogo carregado nesta alteração.
- Seleção/duplo clique conferem disponibilidade e digest do pacote incluído; pacote ausente bloqueia iniciar e informa estado G.
- Preview estático /RETRO-OS/: jogo original executado em Chrome e Edge, sem pageerror ou request externo nesse fluxo, sem serviço social.

## Varredura e limites

`evidence/004h/security-scan.json`: 3305 arquivos rastreados no momento da varredura; assinaturas comuns de chaves em textos atuais sem achados; nomes suspeitos de SQLite/DB/env/chaves no histórico alcançável sem achados. Hashes dos oito ZIPs conferidos. O scan não é busca exaustiva por entropia de todos os blobs históricos nem prova de ausência universal de segredos. Deve ser ampliado antes de qualquer publicação; não se concede GO público.

O inventário eXoDOS herdado contém metadados, não arquivos de jogos comerciais. Não foi copiado seu conteúdo para a build. Sem inclusão de SQLite social, perfil de navegador, cookies, credenciais ou node_modules no bundle. O bundle terá somente a branch privada com sua ancestralidade, não todas as refs/worktrees. Os dados dos jogos historicamente presentes continuam sujeitos ao relatório jurídico/documental; nenhum direito é inferido do termo shareware.

Não houve teste de intrusão completo, quota física, todos os cenários concorrentes de IndexedDB, todas as edições de importação ou todos os dados malformados possíveis. O iframe same-origin executa código confiável; não é anunciado como sandbox para JavaScript arbitrário. Uma falha do jogo ao gravar arquivo pode produzir snapshot incompleto; não há transação nativa de todos os arquivos do DOS. Saves preservados; fechamento pelo X/kill ainda depende de captura periódica.

Parecer de segurança de publicação: NO-GO até revisão específica, autorização e resolução das licenças. Parecer de avaliação técnica privada: condicionado às pendências listadas.
