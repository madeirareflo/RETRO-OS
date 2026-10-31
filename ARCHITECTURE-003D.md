# Decisões arquiteturais 003D

Registro de aplicativos preservado; Naval e TaskManager registrados sem outro gerenciador de janelas. TaskManager consome eventos tipados de snapshot/encerramento; Desktop valida id no registro e impede autoencerramento por esse canal. Não são processos de sistema.

server/naval.mjs concentra validação de frota e ações autoritativas. SQLite guarda partidas, frotas e tiros; cliente recebe apenas frota própria e tiros públicos. GET reconstitui o estado após reconexão; SSE invalida snapshots e polling cinco segundos é fallback. Processamento SQLite síncrono no único processo evita interleaving entre validação e escrita, mas não foi projetado para múltiplas instâncias.

Migração idempotente adiciona profiles.visibility sem remover conteúdo antigo. Privacy é aplicada no servidor. Não se usa HTML arbitrário. Explorer usa histórico local por janela e VFS anterior; busca restrita à pasta. Aplicativos minimizados continuam montados.

Dívida: componentes antigos compactados, contratos comunitários ainda amplos, ausência de migrações versionadas formais, transações e paginação robustas. Separar domínio/autorização/adaptadores antes de produção.
