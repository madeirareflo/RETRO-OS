# Testes 003N-FIX-B

## Resultado final
- TypeScript: aprovado (typecheck.log vazio, código de saída zero).
- ESLint src: aprovado (lint.log vazio, código de saída zero).
- Build Vite: aprovado, sem mudança de dependências. Bundle principal ~549 KB; não é uma nova falha crítica.
- Vitest: 26/26 (4 manuais, 6 perfis 003N, 16 core).
- Playwright Chrome: 3/3; Edge: 3/3. Total 6/6 em controls-verified.log, nesta versão.
- Cenários: clique na imagem transfere foco ao engine; movimento direito breve de Prince depois de Ctrl+K; keydown/keyup; liberação por Shift+Esc; saída ao desktop; manuais dos três jogos; fechamento/retomada de foco; aviso por jogo persiste ao reabrir Prince.

## Evidências
chrome/edge-movement.json registram coordenada média dos pixels claros do personagem, keydown/keyup e teclas soltas; não alteram o programa ou seus saves. A medição só comprova deslocamento breve junto às capturas, não a conclusão do jogo. chrome/edge-fixed-before.png e -fixed-after.png são capturas reais. chrome/edge-help-Prince.png, -DOOM.png e -Duke.png documentam os diálogos.

## Falhas intermediárias e correções
Os logs de sondagem e das primeiras tentativas foram preservados. Desativar joystick isoladamente não produziu movimento no teste inicial; a combinação final usa o comando nativo Ctrl+K após iniciar e aguarda a animação. O fechamento inicial da ajuda devolvia foco na ordem errada; agora o foco volta ao botão explícito Focar no jogo. O primeiro teste do aviso reabria Duke (seleção mudada pelo instalador privado assíncrono), em vez de Prince; o teste corrigido seleciona expressamente o mesmo jogo e confirma também a chave localStorage. Essas falhas não foram ocultadas nem contadas como aprovação.

## Escopo não executado
Sem partidas extensas de DOOM/Duke ou dos cinco títulos aprovados pelo proprietário; sem teste de save nativo nesta missão; sem nova matriz de resoluções/Firefox/mobile. Temas e bibliotecas de engine permaneceram idênticos à base. Os diálogos usam componentes e tokens existentes; não se afirma certificação visual completa dos três temas.

## Segurança e integridade
Auditoria por padrões em texto e nomes de arquivos atuais/histórico da branch entregue; não é pentest nem garantia absoluta sobre dados em arquivos binários. Não há migração nem remoção de pacotes ou saves. Auditoria JSON e verificações do bundle acompanham a entrega. O backup não inclui o cache privado dos três jogos nem node_modules. main e Anti preservados.

## Rechecagem final do manual
Uma captura adicional revelou corrida com a instalação privada assíncrona: a seleção mudava para Duke durante a consulta do manual. O diálogo agora guarda a ficha escolhida ao abrir, sem trocar seu conteúdo quando o catálogo atualiza. O teste aguarda a instalação terminar antes de selecionar os títulos. Logs manual-final.log preservam a falha anterior; manual-stable.log registra a rechecagem Chrome/Edge após esse ajuste, sem gameplay adicional.
