# Testes 003K WORK

Resultado final: TypeScript PASS, lint PASS, build PASS, **47 unitários PASS**,
**102 regressão Edge/Chrome PASS**, **66 QA PASS**, **2 build estática PASS**.
Baseline anterior: 24 casos visuais PASS. Não somar baseline como funcionalidade nova.
Os 66 QA incluem 24 matriz, 30 comportamento, 12 safety (dois checks sem browser).

Reprodução: `node scripts/validate-003k-work.mjs`.
Logs por etapa em evidence/003k. Tentativa Firefox separada:
`firefox-attempt.log`: 1 falhou ao lançar navegador, 1 não executado,
`browserType.launch: spawn UNKNOWN`. Nenhuma homologação Firefox.

Foram testados janelas, foco, menus/cascatas/teclado, mover e dimensionar,
restauração, Explorer/árvore/seleção, Abrir/Salvar, formato inválido e sobrescrita,
reload de arquivos e preferências, rollback sem apagar alterações de outro app,
Paint/exportação, jogos locais, Disquete, museu e dependência social ausente.
As capturas visuais abrangem 3 temas × 4 resoluções × 2 navegadores antes e depois.
Métricas medem o DOM do RETRO OS, não pixels de um Windows original.

Houve falhas intermediárias: 2 por label Pastas ausente no modo icon-only (corrigido),
e 6 seletores antigos ambíguos após a nova interface (escopados aos diálogos/menus).
Logs intermediários preservados como diagnóstico; a suíte completa foi reexecutada
após as últimas mudanças e passou. Não há falha Edge/Chrome pendente conhecida.

Não executado: dispositivos físicos, Firefox funcional, DPI/zoom, todas as skins,
QA integrado dos jogos Anti. Seus 18 testes são alegados pelo relatório do Anti,
não contados entre os aprovados WORK. Saves/importação nativa exigem evidências
adicionais, conforme plano de integração.

Auditoria: `node scripts/audit-003k-work.mjs`. Veja JSON e relatório de segurança.
O bundle final é verificado e restaurado em clone independente; hashes ficam no
manifesto de entrega. Screenshots geradas por suites antigas foram arquivadas em
003k/regression, preservando os arquivos de evidência históricos no source.
