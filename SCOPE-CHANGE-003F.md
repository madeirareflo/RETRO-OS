# Mudança de escopo — RETRO OS 003F

Data de referência: 31/10/2026, America/Sao_Paulo. Desenvolvimento privado.

O produto passa a ser um museu interativo local de informática e internet de
1998–2008. Não é uma rede social nem um serviço multiplayer online. O visitante
não precisa de conta. Perfis, avatares, recados, comentários e presenças são
personagens e roteiros fictícios explicitamente identificados.

## Preservação

- Base: 10cca3fd716a73b72f46652be1509cc17252197c, branch development/retro-os-003e.
- d1f626d é checkpoint de implementação; 1a4919f acrescentou relatórios;
  10cca3f corrigiu recuperação. Não são commits equivalentes.
- Branch atual: development/retro-os-003f. Nenhum push ou deploy.
- Backend, testes HTTP/sociais, telas de contas/admin/ranking e contratos antigos
  em archive/social-003e; recuperação executável pelo checkout 003E separado.
- Banco local foi movido com o servidor, ignorado pelo Git, sem apagamento.
  Bancos, sessões e dados reais não entram em ZIP/bundle de código.
- Bundle PRE-003F criado e verificado antes das alterações; bundles anteriores
  permanecem preservados. O catálogo JSON original de 74 entradas não foi alterado.
- A versão pública 002 e o branch main não foram modificados.

## Arquitetura atual

React/TypeScript/Vite e armazenamento local continuam. Não há proxy /api no Vite,
imports do servidor nem inicialização de Node/SQLite no desktop. O servidor Vite
serve arquivos durante desenvolvimento; a build final é estática.

MuseumSocial/HistoricalPage são chunks sob demanda. DOSBox só é carregado no
iframe ao iniciar o jogo; arquivos de runtime, programa e save são locais à origem.
A bridge aceita mensagens apenas do pai e origem esperados e carrega um único
programa próprio. Sem upload de executáveis, execução de HTML de visitantes,
publicação, telemetria ou contas. Links externos exigem ação do visitante.

Arquivos pessoais legados e preferências mantêm suas chaves e IndexedDB. Tokens
sociais antigos não são usados ou transmitidos; não foram apagados automaticamente.
O museu não é um PWA: sem internet funciona enquanto os recursos locais estiverem
servidos/carregados, mas não promete cache offline após fechar o navegador.
