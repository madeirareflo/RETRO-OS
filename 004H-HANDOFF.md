# Handoff privado — 004H

Base be6f9ad211d4298afbc20f0d6e5fc175ae95985d. Branch development/retro-os-004h-game-launcher-qa. Checkpoints reais 004H-00 em diante no Git; identificação final, SHA-256 do bundle e verificação de restauração constam de 004H-DELIVERY-MANIFEST.json na entrega. Nenhuma main foi alterada. Publicação permanece proibida.

Entrega: G:/Meu Drive/WORKGPT/RETRO-OS/entregas-privadas/004H-ANTI. Pastas 01-BASELINE até 14-HANDOFF. O código completo e a ancestralidade estão no bundle de 12-BUNDLE; restauração independente em 13-BACKUP; build privada em 11-BUILD; capturas/traces em 09-EVIDENCE; relatórios nesta raiz e por assunto.

## Executar no Windows

Requisitos: Node 22+ e pnpm. Em uma pasta nova: `git clone -b development/retro-os-004h-game-launcher-qa <caminho-do-bundle> RETRO-OS-004H`; entrar na pasta; `pnpm install --frozen-lockfile`; `pnpm dev`. O script padrão usa 127.0.0.1:4676. Não inicie se outro checkout estiver usando essa porta: use `pnpm exec vite --host 127.0.0.1 --port 5076 --strictPort` como na QA.

Para a build fornecida: entrar em 11-BUILD e usar o script INICIAR-BUILD-PRIVADA.ps1 (servidor loopback, URL /RETRO-OS/). Não abrir index.html por file://. Não executar deploy nem GitHub Actions de publicação. O script não baixa dependências nem publica dados. A validação original usou Vite preview na porta 5077.

Revalidar: `pnpm typecheck`; `pnpm lint`; `pnpm test`; `pnpm build`; com dev 5076 ativo, `pnpm exec playwright test -c playwright.004h.config.ts`. Chrome/Edge instalados; Firefox está bloqueado por spawn UNKNOWN neste ambiente. Testes native-save.mjs reiniciam navegador em perfil QA separado; nunca apontar ao perfil pessoal.

## Revisão do proprietário

Não classificar os 37 como jogáveis. Oito pacotes iniciaram no Chrome, ações representativas foram capturadas; nenhum A. Testar áudio fisicamente, mouse relativo/lock, longas sessões, saves adicionais (Duke/Freedoom/Ken), recordes de SkyRoads e save Edge do Quake. As dez importações ausentes precisam de arquivos legítimos próprios; não copiar para Git/dist. As sete engines pendentes não foram integradas. Ver matriz por edição e auditoria de licenças antes de compartilhar qualquer pacote.

Pendências de produto: tradução integral dos textos legados; distinguir mais visivelmente ficha completa versus demo no catálogo; salvar antes de fechar pelo X; snapshots multi-arquivo atômicos/retentiva de versões; benchmark real de FPS/memória e validação física. Não expandir motores antes de concluir homologação dos existentes.
