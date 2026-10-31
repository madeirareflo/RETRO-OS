# Importação local 003N
Reutilizados inspectPackage, storeGamePackage, storageManager, catalogStore, DosGame e o mesmo IndexedDB RetroOS_GamesStorage v2. Não foi criado backend ou banco paralelo. Campos opcionais preparedProfileId e packageFileNames mantêm compatibilidade com metadados antigos.

Fluxo: escolher perfil → selecionar ZIP/EXE/COM local → validar tamanho/ZIP/CRC/paths/formato → reconhecer executável e dados ao lado → escolher executável → confirmar direito de uso → persistir bytes/SHA-256 → registrar metadados → botão Jogar abre dos-imported → confirmar Iniciar jogo DOS. Ao iniciar, hash e perfil são revalidados. Nenhum upload.

Limites existentes: 32 MB comprimido, 64 MB expandido, 512 entradas, razão 200; ZIP64/multivolume/criptografado/link/traversal e CRC inválido recusados. EXE/COM isolados só servem quando contêm os dados necessários; para estes três perfis a ausência dos arquivos mínimos produz erro.

Exceção controlada de formato DOS protegido: somente perfis DOOM/Duke podem aceitar LE/LX nos nomes conhecidos (executável principal, SETUP.EXE e DOS4GW.EXE, inclusive em pasta pai) e exigem identificação DOS/4G no stub. PE/NE continuam recusados. O importador genérico não ganha essa exceção. A identificação do stub não é certificado de origem nem garantia de comportamento: tudo permanece isolado no DOSBox, jamais executado no host.

BATs são validados como entradas ZIP e ignorados na montagem de perfis. Não são interpretados, executados ou alterados no arquivo original armazenado. Scripts ativos de outros tipos continuam recusados. Não se aceita comando livre do usuário ou scripts dos perfis eXoDOS. Dados pessoais e arquivos de outros jogos não são apagados.

Novo UUID por importação; avaliação vinculada ao ID do pacote, separada dos bytes e saves. Remoção usa o mecanismo existente que preserva saves por padrão; a avaliação não é aprovação automática de uma futura reimportação. Não houve migração destrutiva ou troca de chaves existentes.

Testes de formato incluem fixtures sintéticas explicitamente identificadas como não sendo jogos: comprovam validação/armazenamento/ligação com AppHost, não funcionamento de Prince/DOOM/Duke. Jogabilidade desses candidatos depende dos dados legítimos do proprietário e de teste humano.
