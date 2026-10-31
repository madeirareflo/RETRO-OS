# Testes da versão integrada003L

Parecer: CONDITIONAL GO privado; publicação NO-GO. Resultados desta aplicação
integrada, não reaproveitados das003K:

| Etapa | Resultado |
|---|---|
| TypeScript | PASS |
| ESLint src | PASS |
| Build produção | PASS |
| Vitest | 66/66 PASS |
| Regressão completa Edge/Chrome | 102/102 PASS |
| QA WORK visual/comportamental/guard | 66/66 PASS (inclui2 verificações estáticas) |
| Integração Launcher/pacotes/saves/matriz | 52/52 PASS |
| Build estática Edge/Chrome | 4/4 PASS |
| Firefox | BLOQUEADO antes de abrir página: spawn UNKNOWN |

Logs por etapa em evidence/003l. Reproduzir `node scripts/validate-003l.mjs`.
A configuração usa exclusivamente4376/4377; nunca build ou workspace do Anti.
Correção final de contraste e proteção contra estado genérico tiveram novo build,
typecheck/lint/unitários e regressão completa. A matriz integrada usa o código final.
Oito capturas NT foram atualizadas com papel de parede padrão clássico após a suíte,
com teste separado em nt-default-visual.log; não é funcionalidade nova.

## Cobertura

Boot, janelas/foco/drag/resize/min/max/restaurar, menus/teclado, quatro temas,
Explorer/clipboard/multisseleção, Paint/exportação, Notepad/reload, navegador,
Messenger/Rede Recreio/LAN offline, Máquina do Tempo e jogos locais. Launcher:
pesquisa, ficha, importação real, quota, corrupção, cancelamento, duplicados,
atalhos Explorer/Desktop, biblioteca compartilhada, migração v1→v2 e remoção
isolada. Execução em subpasta e pacote genérico sem controles/contadores falsos.

Teste nativo independente fecha aba e processo do navegador, reabre o mesmo perfil,
compara todos os8bytes/hash de SAVE.DAT e observa1/5 no jogo, versus0/5 em perfil novo.
Não injeta save. Fixtures artificiais de migração/erros não são usadas como prova
de progresso. Variante MIT do binário no teste genérico serve apenas para validar
que identidade por SHA256 não é substituída por nome/tamanho; não é jogo novo.

Matriz:32 combinações (4 temas×4 resoluções×2 browsers),6 regiões por combinação:
192PNGs desktop/Launcher/importação/Game Center/jogo/saves. Galeria local validada
em Edge com seletor de tema e seis imagens carregadas. Inspeção gráfica em capturas
representativas; não se afirma revisão pixel a pixel de todos os pixels.

## Falhas intermediárias, todas diferenciadas do resultado final

- Reabertura DOS falhou porque snapshot incluía configuração interna do emulador;
  corrigido filtro de caminhos, com nova prova nativa e regressão.
- Dois casos de vitória na rota direta player.html falharam após boot controlado;
  restaurado boot legado fixo original e partida até vitória passou.
- Entrada duplicada no Launcher por callback+evento; deduplicação corrigida.
- Atalho MIX e Escape pós-seletor de arquivos falharam; corrigidos clique/foco.
- Helper de teste criou DBv1 sem stores e aguardou indefinidamente; corrigido helper
  com tratamento de erro e aplicação passou a migrar não destrutivamente para schema2.
- QA WORK encontrou porta própria em uso: reuseExistingServer configurado para o
  servidor exclusivo já iniciado. Não foi regressão da aplicação.
- Firefox falhou no lançamento do executável do Playwright, sem executar aplicativo.

Logs iniciais preservados com nomes first/initial/second como diagnóstico; não
confundir esses resultados com logs finais sem sufixo. Não houve teste físico
mobile, corte real de energia, disco realmente cheio, pentest ou homologação dos
três jogos históricos Anti. Especificações não comprovadas permanecem no backlog.

Build emitiu aviso de chunk JS maior que500kB: cerca521.29kB/146.77kB gzip no log.
Não é falha de build; não foi ocultado. Code splitting é pendência de desempenho.
Restauração do bundle e hashes finais constam no manifesto externo de entrega.
