# RETRO OS 004H — relatório final privado

**PARCIAL — CONDITIONAL GO para avaliação privada do proprietário. Publicação: NO-GO, não autorizada.**

Base privada confirmada: be6f9ad211d4298afbc20f0d6e5fc175ae95985d. Público confirmado por ls-remote antes e após o trabalho: dfaa95db1f256a2865c3431707a20b17f5dcdf6e. Worktree isolada RETRO-OS-004H-ANTI; branch development/retro-os-004h-game-launcher-qa. Não houve push, deploy, alteração da main ou de outras worktrees.

## Respostas às 20 perguntas

| Pergunta | Resposta auditada |
|---|---|
| 1. Quantos títulos? | 83 registros/83 IDs, com variantes; 37 perfis históricos solicitados, não 83 títulos comerciais distintos. |
| 2. Quantos com arquivos? | Oito ZIPs incluídos: cinco variantes dos 37 e três extras (Freedoom, Ken e SkyRoads). Disquete Perdido original é um COM adicional separado. |
| 3. Quantos iniciaram? | Oito pacotes foram iniciados no Chrome. No Edge há provas específicas de Prince, Quake, DOOM e Heretic; não inferir os oito nele. |
| 4. Gameplay comprovado? | Sete com movimento e ação relevante; Ken PARTIAL, com deslocamento real mas ação de combate ainda não comprovada. Nenhum A. |
| 5. Áudio funcional? | Quatro produziram PCM não nulo: Quake, Freedoom, Prince e SkyRoads. Quatro silenciosos no teste atual. Zero com escuta física. |
| 6. Controles? | Sete com controles representativos de movimento/ação; Ken parcial. Todos os atalhos, mouse relativo contínuo e ações reservadas físicas do OS não foram homologados. |
| 7. Save/load? | Três com recuperação nativa observada: DOOM/Heretic Chrome e Edge; Quake somente Chrome, limitado. Duke/Freedoom parciais; Ken e recordes de SkyRoads não testados; não prometer saves completos na demo Prince. |
| 8. Exigem importação? | Dez perfis D, relacionados abaixo. Arquivos completos das edições comerciais não foram obtidos. |
| 9. Novo motor? | Sete E, relacionados abaixo; nenhum motor novo integrado. |
| 10. Museu? | Quinze F, relacionados abaixo. Ficha não é instalação. |
| 11. Restrição legal? | Prince, DOOM e Duke sem base suficiente para nova publicação; Quake/Heretic condicionados à revisão de termos/completude. Freedoom/Ken/SkyRoads têm condições/notices a preservar. Nenhuma publicação autorizada. |
| 12. Ctrl+K Prince? | Preservado, restrito ao preset/iframe; movimento, minimizar/restaurar, alternar Notepad e salto nativo verificados Chrome/Edge. Não há captura global. |
| 13. Quake/Heretic homologados? | Não integralmente; ambos B. Gameplay real e save limitado Quake comprovados; Heretic save nos dois, áudio silencioso. |
| 14. Regressão desktop? | Nenhuma crítica observada nos fluxos executados; testes de janelas/temas/editor/Paint/calculadora/jogos locais passaram. Sem garantia de toda combinação de atalhos. |
| 15. Regressão internet 004F? | Jornadas executadas passaram, incluindo LAN House → Launcher, laboratório, busca, VFS e snapshots. Messenger offline não recebeu QA gráfico dedicado profundo novo. |
| 16. Testes? | 137 unitários; 44 E2E completos; 2 E2E adicionais de salto; TypeScript/lint/build aprovados. Preview e servidor portátil nos dois browsers; 40 capturas de interface. Firefox bloqueado ao iniciar. |
| 17. Commit final? | Valor exato no 004H-DELIVERY-MANIFEST.json e histórico do bundle; último checkpoint 004H-13, sem push. |
| 18. SHA-256 bundle? | Valor completo no manifesto e no arquivo .sha256 em 12-BUNDLE. Gerado após o commit final para evitar referência circular. |
| 19. Testes humanos? | Áudio físico/configuração, pointer lock e mouse relativo, longas sessões, saves restantes, importações comerciais legítimas, Firefox e dispositivos físicos. |
| 20. Parecer? | CONDITIONAL GO somente para revisão privada; missão PARCIAL. Não são 37 jogáveis nem oito integralmente homologados. |

## Estados dos 37 e distinção de edição

4 B + 1 C + 10 D + 7 E + 15 F. O estado agregado usa a edição disponível: DOOM/Quake/Heretic/Duke shareware, Prince demo. A ficha completa pode ser D e a variante B/C, com IDs diferentes, sem perda dos dados do usuário. Os três extras são contados somente na lista de oito pacotes, não outra vez nos 37.

**D:** DOOM II: Hell on Earth; Star Wars: Dark Forces; Descent; MDK; Eye of the Beholder; Eye of the Beholder II: The Legend of Darkmoon; Warcraft: Orcs & Humans; Warcraft II: Tides of Darkness; Grand Prix 2; Grand Theft Auto.

**E:** Quake II; Quake III Arena; Captain Claw; Full Throttle; The Dig; Diablo; Grand Theft Auto III.

**F:** Medal of Honor: Allied Assault; Medal of Honor: Pacific Assault; MDK 2; Commandos: Behind Enemy Lines; Commandos 2: Men of Courage; Diablo II; Dungeon Siege; Dungeon Siege II; Dungeon Siege III; Age of Empires; Age of Empires II: The Age of Kings; StarCraft; Grand Theft Auto 2; Max Payne; Max Payne 2: The Fall of Max Payne.

Dungeon Siege III (2011) é continuidade fora do recorte principal. Dados editoriais anteriores foram preservados; esta missão não reverificou toda a historiografia.

## NOVO / CORRIGIDO / VALIDADO

NOVO: classificação A–G em três idiomas, matriz por edição, conferência de pacotes incluídos antes de iniciar, provas individuais e estudo dos motores sem integrações novas.

CORRIGIDO: foco rápido que perdia a primeira tecla; encaminhamento do mouse do espelho ao engine; liberação de teclas/botões; Alt+Tab DOM sem cancelar o sistema; Quake sem prompts de joystick/CD usando switches documentados; espera por commit IndexedDB no botão Sair; falha de fallback localStorage sem impedir gravação principal; fallback antigo sem sobrescrever save mais novo; ajuda Heretic .HSG; alegações indevidas de redistribuição removidas.

VALIDADO: hashes dos oito intactos, nenhuma mudança em public/games/public/vendor; gameplay e persistência conforme matriz, não apenas menus; 44 E2E completos e 2 de salto, 137 unitários, TypeScript/lint/build; desktop e jornadas da internet, pacote corrompido/ausente bloqueado. Build estática sob /RETRO-OS/ e servidor portátil loopback, sem backend social.

PARCIAL: quatro configurações sem áudio; saves Duke/Freedoom; ações Ken; traduções legadas; atomicidade de snapshots multi-arquivo; fechar pelo X usa captura periódica, sem o ACK do botão Sair; performance sustentada e gameplays em todas as resoluções.

BLOQUEADO: dez edições sem arquivos legítimos, sete engines pendentes, Firefox spawn UNKNOWN e publicação/direitos ainda não resolvidos.

NÃO TESTADO: escuta física, mobile físico, todas as edições/slots, quota real de disco, concorrência entre abas, multiplayer/contas reais, longa duração. Sem novos jogos, engines, backend ou expansão de escopo.

## Entrega e reprodução

Destino privado: G:/Meu Drive/WORKGPT/RETRO-OS/entregas-privadas/004H-ANTI. Estrutura 01-BASELINE a 14-HANDOFF; bundle e SHA em 12; restauração independente em 13; build em 11; evidências em 09; relatório de testes e scripts em 10/14. O manifesto externo contém os hashes e resultados finais de restauração, que não podem estar dentro do próprio bundle com seu próprio hash.

Leia 004H-HANDOFF.md: Node 22+, pnpm install --frozen-lockfile, pnpm dev; porta padrão 4676 ou isolada 5076. Para build entregue: INICIAR-BUILD-PRIVADA.ps1, http://127.0.0.1:5080/RETRO-OS/. Somente loopback, sem publicação. Não usar file:// e não rodar workflows de deploy.

Evidências e limitações em 004H-PLAYABILITY-MATRIX, SAVES-PERSISTENCE, LICENSE-AUDIT, SECURITY, E2E-REPORT e TEST-REPORT. Falhas intermediárias foram mantidas; apenas rodadas finais indicadas contam como aprovadas. Nenhum segredo, SQLite social, perfil pessoal ou node_modules foi deliberadamente incluído. A varredura de assinaturas/histórico de caminhos não equivale a auditoria exaustiva de todos os blobs; publicação continua bloqueada.
