export interface HistoricalSnapshot {
  year: number;
  title: string;
  summary: string;
  contentExcerpt: string;
}

export interface WebPageMeta {
  id: string;              // ex: 'portal', 'lanhouse', 'blog/leo', 'secreto/lab1999'
  url: string;             // ex: 'retro://lanhouse'
  title: string;           // ex: 'CyberSpace LAN House & Games'
  category: 'portal' | 'blog' | 'fotolog' | 'forum' | 'social' | 'games' | 'search' | 'secret' | 'personal' | 'tools' | 'archive';
  year: number;            // Ano de criação/lançamento oficial
  availableEras: number[]; // Anos em que está ativo na Máquina do Tempo: 1998, 2000, 2002, 2004, 2006, 2008
  description: string;     // Resumo exibido na busca e diretório
  keywords: string[];      // Termos para o buscador retrô com pontuação
  internalLinks: string[]; // Links de saída no grafo de navegação
  snapshots?: HistoricalSnapshot[]; // Versões salvas para o Arquivo Histórico Web
}

export const LIVING_WEB_REGISTRY: Record<string, WebPageMeta> = {
  // --- PORTAIS E BUSCADOR ---
  'portal': {
    id: 'portal',
    url: 'retro://portal',
    title: 'Portal Conexão 2000',
    category: 'portal',
    year: 2000,
    availableEras: [2000, 2002, 2004, 2006, 2008],
    description: 'O grande portal da internet discada brasileira dos anos 2000. Notícias, canais temáticos, esportes e tecnologia.',
    keywords: ['portal', 'noticias', 'conexao', 'brasil', 'inicio', 'internet', 'discada', 'tecnologia', 'informatica'],
    internalLinks: ['busca', 'links', 'downloads', 'jogos', 'lanhouse', 'forum', 'recreio', 'pessoal', 'escola', 'musica', 'arquivo'],
    snapshots: [
      { year: 2000, title: 'Conexão 2000 - Edição de Lançamento', summary: 'Chegamos ao novo milênio! Conecte-se após a meia-noite gastando apenas um pulso.', contentExcerpt: 'Bem-vindo ao Portal Conexão 2000! Notícias sobre o Bug do Milênio superado com sucesso e os novos modems de 56K.' },
      { year: 2004, title: 'Conexão 2000 - A Febre das LAN Houses', summary: 'O crescimento vertiginoso das redes locais e as salas de bate-papo lotadas.', contentExcerpt: 'Cobertura especial: o campeonato de Counter-Strike na CyberSpace LAN House e a ascensão dos diários virtuais.' },
      { year: 2008, title: 'Conexão 2000 - A Era da Banda Larga', summary: 'Adeus aos barulhos de discagem: a internet 2.0 chega aos lares.', contentExcerpt: 'Novos serviços multimídia, streaming de vídeos em 360p e a transição para redes sociais de fotos.' }
    ]
  },
  'portal-praca': {
    id: 'portal-praca',
    url: 'retro://portal-praca',
    title: 'Portal da Praça 1998',
    category: 'portal',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'O portal pioneiro com notícias da comunidade, previsão do tempo e links da Web 1.0.',
    keywords: ['portal', 'praca', '1998', 'web1', 'noticias', 'cidade', 'antigo'],
    internalLinks: ['busca', 'downloads', 'forum', 'pessoal', 'discador', 'arquivo'],
    snapshots: [
      { year: 1998, title: 'Portal da Praça - Edição Inaugural', summary: 'A praça central da nossa cidade agora tem uma página oficial na grande teia mundial.', contentExcerpt: 'Horários dos ônibus, previsão do tempo para a semana e mural de recados comunitário.' },
      { year: 2002, title: 'Portal da Praça - Reformulação', summary: 'Agora com contador de visitas em CGI e livro de visitas com mais de 500 mensagens.', contentExcerpt: 'Atualização das fotos da praça e link para o laboratório de informática da escola.' }
    ]
  },
  'portal-ponto': {
    id: 'portal-ponto',
    url: 'retro://portal-ponto',
    title: 'PontoBR Tecnologia',
    category: 'portal',
    year: 2000,
    availableEras: [2000, 2002, 2004, 2006, 2008],
    description: 'Guia de informática, hardwares modernos, placas aceleradoras e provedores de acesso.',
    keywords: ['pontobr', 'tecnologia', 'hardware', 'computador', 'windows', 'placas', 'internet'],
    internalLinks: ['forum', 'programas', 'lanhouse', 'downloads', 'escola', 'arquivo'],
    snapshots: [
      { year: 2000, title: 'PontoBR - Análise dos Novos Processadores', summary: 'Pentium III vs Athlon: a batalha dos gigahertz esquenta no mercado nacional.', contentExcerpt: 'Testamos a estabilidade com 128 MB de memória RAM rodando Windows 98 Second Edition e Windows 2000.' },
      { year: 2004, title: 'PontoBR - Placas Aceleradoras 3D', summary: 'Como escolher sua placa AGP para rodar jogos de tiro com taxas fluidas de quadros.', contentExcerpt: 'Guia de drivers e configuração de overclock moderado sem queimar a fonte de alimentação.' }
    ]
  },
  'busca': {
    id: 'busca',
    url: 'retro://busca',
    title: 'Buscador Retrô Cadê a Página?',
    category: 'search',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Encontre tudo na web brasileira dos anos 2000 por palavras-chave com relevância instantânea e filtros temporais.',
    keywords: ['busca', 'buscador', 'cade', 'pesquisa', 'procurar', 'links', 'sites', 'encontrar'],
    internalLinks: ['portal', 'links', 'arquivo']
  },
  'arquivo': {
    id: 'arquivo',
    url: 'retro://arquivo',
    title: 'Arquivo Histórico da Web Retrô',
    category: 'archive',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'A máquina de preservação digital da internet brasileira: acesse snapshots históricos arquivados de 1998 a 2008.',
    keywords: ['arquivo', 'wayback', 'maquina', 'tempo', 'historico', 'snapshots', 'preservacao', 'museu'],
    internalLinks: ['portal', 'busca', 'lanhouse', 'secreto/lab1999', 'fotolog', 'recreio']
  },
  'links': {
    id: 'links',
    url: 'retro://links',
    title: 'Diretório Amarelo de Links',
    category: 'tools',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'O mapa organizado da internet retrô: navegue por categorias selecionadas a dedo.',
    keywords: ['diretorio', 'links', 'amarelo', 'categorias', 'mapa', 'guia'],
    internalLinks: ['portal', 'pessoal', 'downloads', 'jogos', 'forum', 'lanhouse', 'arquivo']
  },
  'downloads': {
    id: 'downloads',
    url: 'retro://downloads',
    title: 'Baixe Mais: Central de Downloads e Arquivos',
    category: 'tools',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Arquivos essenciais, manuais em TXT, táticas de jogos e utilitários salvos diretamente em Meus Documentos.',
    keywords: ['downloads', 'arquivos', 'disquete', 'salvar', 'programas', 'vfs', 'manuais'],
    internalLinks: ['portal', 'programas', 'discador']
  },

  // --- COMUNIDADE, LAN HOUSE & JOGOS ---
  'lanhouse': {
    id: 'lanhouse',
    url: 'retro://lanhouse',
    title: 'CyberSpace LAN House & Games',
    category: 'games',
    year: 2000,
    availableEras: [2000, 2002, 2004, 2006, 2008],
    description: 'A lendária LAN House do bairro: 16 computadores em rede, corujão de sexta e sábado, torneios e salgadinho.',
    keywords: ['lanhouse', 'cyberspace', 'jogos', 'rede', 'corujao', 'campeonato', 'balcao', 'maquina 07', 'táticas'],
    internalLinks: ['forum/jogos', 'blog/leo', 'fotolog', 'downloads', 'recreio/leo', 'arquivo'],
    snapshots: [
      { year: 2000, title: 'CyberSpace LAN House - Grande Inauguração', summary: 'Acabamos de abrir com 8 máquinas Pentium III e conexão dedicada!', contentExcerpt: 'Venha conhecer o futuro dos jogos multiplayer em rede local. R$ 2,50 a hora de lançamento!' },
      { year: 2004, title: 'CyberSpace LAN House - Noite do Corujão', summary: '16 máquinas lotadas, refrigerante gelado e a grande final do torneio municipal.', contentExcerpt: 'Clã Sniper Alpha vence na prorrogação! Táticas salvas para download dos membros.' },
      { year: 2008, title: 'CyberSpace LAN House - Memorial & Despedida', summary: 'Com a chegada da banda larga em todas as casas, fechamos nosso ciclo com orgulho.', contentExcerpt: 'Obrigado a todos os corujões, pizzas na madrugada e amizades eternas que nasceram aqui. Passa-se o ponto.' }
    ]
  },
  'recreio': {
    id: 'recreio',
    url: 'retro://recreio',
    title: 'Rede Social Recreio Online',
    category: 'social',
    year: 2004,
    availableEras: [2004, 2006, 2008],
    description: 'Perfis dos amigos da turma, scraps, depoimentos, fotos e comunidades nostálgicas.',
    keywords: ['recreio', 'amigos', 'depoimentos', 'recados', 'scraps', 'turma', 'social', 'perfil'],
    internalLinks: ['fotolog', 'blog/bia', 'blog/leo', 'blog/rafa', 'forum', 'arquivo']
  },
  'recreio/bia': {
    id: 'recreio/bia',
    url: 'retro://recreio/bia',
    title: 'Perfil da Bia na Rede Recreio',
    category: 'social',
    year: 2004,
    availableEras: [2004, 2006, 2008],
    description: 'Perfil oficial de Bia: fotos de colégio, poemas e links para seu blog sentimental.',
    keywords: ['bia', 'perfil', 'recreio', 'amiga', 'fotos', 'recados'],
    internalLinks: ['recreio', 'blog/bia', 'fotolog']
  },
  'recreio/leo': {
    id: 'recreio/leo',
    url: 'retro://recreio/leo',
    title: 'Perfil do Léo na Rede Recreio',
    category: 'social',
    year: 2004,
    availableEras: [2004, 2006, 2008],
    description: 'Perfil de Léo da máquina 07: táticas de clã, ranking de jogos e fotos da LAN House.',
    keywords: ['leo', 'perfil', 'recreio', 'gamer', 'lanhouse', 'clã'],
    internalLinks: ['recreio', 'lanhouse', 'blog/leo']
  },
  'recreio/rafa': {
    id: 'recreio/rafa',
    url: 'retro://recreio/rafa',
    title: 'Perfil do Rafa na Rede Recreio',
    category: 'social',
    year: 2004,
    availableEras: [2004, 2006, 2008],
    description: 'Perfil de Rafa do CD-R: colecionador de trilhas sonoras, Winamp skins e consertos de PC.',
    keywords: ['rafa', 'perfil', 'recreio', 'musica', 'cd-r', 'mp3'],
    internalLinks: ['recreio', 'blog/rafa', 'musica']
  },
  'recreio/nina': {
    id: 'recreio/nina',
    url: 'retro://recreio/nina',
    title: 'Perfil da Nina na Rede Recreio',
    category: 'social',
    year: 2004,
    availableEras: [2004, 2006, 2008],
    description: 'Perfil de Nina: pioneira da programação web, comandos de terminal e mistérios da internet antiga.',
    keywords: ['nina', 'perfil', 'recreio', 'programacao', 'laboratorio', 'hacker'],
    internalLinks: ['recreio', 'blog/nina', 'secreto/lab1999', 'arquivo']
  },
  'fotolog': {
    id: 'fotolog',
    url: 'retro://fotolog',
    title: 'Fotolog da Galera do Laboratório',
    category: 'fotolog',
    year: 2002,
    availableEras: [2002, 2004, 2006, 2008],
    description: 'Uma foto por dia: a rotina do colégio, as tardes de disquetes e as sessões de jogos registradas em 320x240.',
    keywords: ['fotolog', 'fotos', 'album', 'amigos', 'laboratorio', 'camera', 'digital', 'galera'],
    internalLinks: ['recreio', 'blog/bia', 'lanhouse', 'arquivo'],
    snapshots: [
      { year: 2002, title: 'Fotolog - Primeira Foto do Ano', summary: 'Estreando a nova câmera digital no laboratório da escola.', contentExcerpt: 'Foto 01: Turma reunida em volta do monitor CRT de 15 polegadas salvando a maquete de história.' },
      { year: 2004, title: 'Fotolog - O Corujão de Inverno', summary: 'A fila do corujão da CyberSpace debaixo de garoa fria.', contentExcerpt: 'Foto 12: Todos de casaco esperando a meia-noite chegar para abrir as portas da LAN House.' }
    ]
  },
  'forum': {
    id: 'forum',
    url: 'retro://forum',
    title: 'Fórum do Gabinete Bege',
    category: 'forum',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'O maior fórum de informática retrô brasileira: 6 categorias ativas, dúvidas de hardware, internet discada e segredos.',
    keywords: ['forum', 'comunidade', 'duvidas', 'computador', 'topicos', 'discussao', 'pistas'],
    internalLinks: ['forum/geral', 'forum/hardware', 'forum/windows', 'forum/internet', 'forum/jogos', 'forum/offtopic', 'arquivo']
  },
  'forum/geral': {
    id: 'forum/geral',
    url: 'retro://forum/geral',
    title: 'Fórum: Seção Geral & Notícias',
    category: 'forum',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Discussões gerais sobre o início da internet, novidades da informática e regras do fórum.',
    keywords: ['forum', 'geral', 'noticias', 'regras'],
    internalLinks: ['forum', 'forum/offtopic']
  },
  'forum/hardware': {
    id: 'forum/hardware',
    url: 'retro://forum/hardware',
    title: 'Fórum: Hardware, Peças & Overclock',
    category: 'forum',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Dúvidas de instalação de placas, ventoinhas de cobre, memórias DIMM e fontes de alimentação.',
    keywords: ['hardware', 'pecas', 'placas', 'memoria', 'cooler', 'overclock'],
    internalLinks: ['forum', 'portal-ponto', 'blog/leo']
  },
  'forum/windows': {
    id: 'forum/windows',
    url: 'retro://forum/windows',
    title: 'Fórum: Dicas de Windows & Produtividade',
    category: 'forum',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Atalhos essenciais: Alt+Tab, Ctrl+A, duplo clique na barra de título e personalização de temas.',
    keywords: ['windows', 'dicas', 'atalhos', 'alt+tab', 'ctrl+a', 'sistema', 'temas'],
    internalLinks: ['forum', 'programas']
  },
  'forum/internet': {
    id: 'forum/internet',
    url: 'retro://forum/internet',
    title: 'Fórum: Internet Discada & Provedores',
    category: 'forum',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Truques de negociação de modems 56K, regras de pulso telefônico único e aceleração de downloads.',
    keywords: ['internet', 'discada', 'provedores', 'modem', 'pulso', '56k'],
    internalLinks: ['forum', 'discador', 'downloads']
  },
  'forum/jogos': {
    id: 'forum/jogos',
    url: 'retro://forum/jogos',
    title: 'Fórum: Jogos, Estratégias & LAN Houses',
    category: 'forum',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Estratégias de clãs, mapas secretos, torneios de sábado e dicas para os 8 jogos clássicos.',
    keywords: ['jogos', 'games', 'estrategias', 'lanhouse', 'clans', 'segredos'],
    internalLinks: ['forum', 'lanhouse', 'jogos', 'fanzine']
  },
  'forum/offtopic': {
    id: 'forum/offtopic',
    url: 'retro://forum/offtopic',
    title: 'Fórum: Cantinho Off-Topic & Mistérios',
    category: 'forum',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Histórias do laboratório abandonado, refrigerantes do corujão e pistas sobre o Laboratório de 1999.',
    keywords: ['offtopic', 'misterios', 'historias', 'laboratorio 1999', 'segredos'],
    internalLinks: ['forum', 'secreto/lab1999', 'blog/monitor']
  },

  // --- BLOGS PESSOAIS ---
  'blog': {
    id: 'blog',
    url: 'retro://blog',
    title: 'Rede de Blogs & Diários Virtuais',
    category: 'blog',
    year: 1999,
    availableEras: [2000, 2002, 2004, 2006, 2008],
    description: 'O universo dos blogs pessoais dos anos 2000: relatos do monitor, reflexões de Bia, testes de Léo e músicas do Rafa.',
    keywords: ['blogs', 'diarios', 'cronicas', 'textos', 'historias', 'memorias'],
    internalLinks: ['blog/monitor', 'blog/leo', 'blog/bia', 'blog/rafa', 'blog/nina', 'fotolog', 'recreio', 'arquivo']
  },
  'blog/monitor': {
    id: 'blog/monitor',
    url: 'retro://blog/monitor',
    title: 'Diário do Monitor: Arquivos do Acervo',
    category: 'blog',
    year: 1999,
    availableEras: [2000, 2002, 2004, 2006, 2008],
    description: 'Relatos do zelador do laboratório de informática: lembranças dos pioneiros e pistas do arquivo de 1999.',
    keywords: ['monitor', 'diario', 'acervo', 'laboratorio 1999', 'pistas'],
    internalLinks: ['blog', 'secreto/lab1999', 'forum/offtopic']
  },
  'blog/leo': {
    id: 'blog/leo',
    url: 'retro://blog/leo',
    title: 'Bancada do Léo: LAN & Overclock',
    category: 'blog',
    year: 2001,
    availableEras: [2002, 2004, 2006, 2008],
    description: 'Diário de um viciado em LAN houses: manutenção da máquina 07, táticas de tiro e noites sem dormir.',
    keywords: ['leo', 'bancada', 'lanhouse', 'overclock', 'jogos'],
    internalLinks: ['blog', 'lanhouse', 'forum/jogos']
  },
  'blog/bia': {
    id: 'blog/bia',
    url: 'retro://blog/bia',
    title: 'Caderno da Bia: Disquetes e Poemas',
    category: 'blog',
    year: 2001,
    availableEras: [2002, 2004, 2006, 2008],
    description: 'Crônicas adolescentes da era discada: etiquetas azuis, fotos no fotolog e desabafos de colégio.',
    keywords: ['bia', 'caderno', 'poemas', 'disquetes', 'escola', 'sentimentos'],
    internalLinks: ['blog', 'fotolog', 'recreio/bia']
  },
  'blog/rafa': {
    id: 'blog/rafa',
    url: 'retro://blog/rafa',
    title: 'CD-R Express: O Zine Sonoro do Rafa',
    category: 'blog',
    year: 2001,
    availableEras: [2002, 2004, 2006, 2008],
    description: 'A arte de gravar CD-Rs perfeitos a 8x, ripar faixas em MP3 e desenhar capas no Paint.',
    keywords: ['rafa', 'cd-r', 'musica', 'mp3', 'gravador', 'colecao'],
    internalLinks: ['blog', 'musica', 'downloads']
  },
  'blog/nina': {
    id: 'blog/nina',
    url: 'retro://blog/nina',
    title: 'Console da Nina: Scripts, Redes & Arqueologia',
    category: 'blog',
    year: 2000,
    availableEras: [2000, 2002, 2004, 2006, 2008],
    description: 'Anotações técnicas da programadora da turma: CGI em Perl, modens e a preservação do Laboratório de 1999.',
    keywords: ['nina', 'console', 'scripts', 'programacao', 'laboratorio 1999', 'rede'],
    internalLinks: ['blog', 'secreto/lab1999', 'arquivo', 'forum/windows']
  },

  // --- ARQUIVOS SECRETOS & MEMÓRIAS ---
  'secreto/lab1999': {
    id: 'secreto/lab1999',
    url: 'retro://secreto/lab1999',
    title: 'Arquivo Secreto dos Fundadores de 1999',
    category: 'secret',
    year: 1999,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'O lendário servidor da garagem dos pioneiros: regras originais, o manifesto esquecido e downloads confidenciais.',
    keywords: ['secreto', 'lab1999', 'fundadores', 'pioneiros', 'regras', 'manifesto', 'misterio'],
    internalLinks: ['portal', 'lanhouse', 'forum', 'downloads', 'arquivo']
  },
  'pessoal': {
    id: 'pessoal',
    url: 'retro://pessoal',
    title: 'Homepage Pessoal dos Anos 2000',
    category: 'personal',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'A clássica página hospedada em servidor gratuito com contador de visitas, GIFs cintilantes e links favoritos.',
    keywords: ['homepage', 'pessoal', 'geocidades', 'contador', 'gifs', 'amigos'],
    internalLinks: ['portal', 'construcao', 'visitas', 'links', 'arquivo']
  },
  'construcao': {
    id: 'construcao',
    url: 'retro://construcao',
    title: 'Página em Eterna Construção',
    category: 'tools',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'A clássica plaquinha de operário trabalhando que acompanhou milhares de páginas esquecidas na web.',
    keywords: ['construcao', 'obras', 'operario', 'em breve', 'reforma'],
    internalLinks: ['portal', 'pessoal', 'gifs']
  },
  'visitas': {
    id: 'visitas',
    url: 'retro://visitas',
    title: 'Livro de Visitas Virtual (Guestbook)',
    category: 'social',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Deixe sua mensagem gravada localmente com carimbo de data e hora para os próximos navegadores.',
    keywords: ['visitas', 'guestbook', 'recados', 'mensagens', 'livro'],
    internalLinks: ['portal', 'pessoal']
  },
  'jogos': {
    id: 'jogos',
    url: 'retro://jogos',
    title: 'Arcade Central & Portal de Jogos',
    category: 'games',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'O centro de diversão do RETRO OS com catálogo completo dos 8 jogos DOS originais e atalhos de partida.',
    keywords: ['jogos', 'arcade', 'shareware', 'partidas', 'fichas', 'dos'],
    internalLinks: ['lanhouse', 'fanzine', 'forum/jogos']
  },
  'escola': {
    id: 'escola',
    url: 'retro://escola',
    title: 'Laboratório de Informática da Escola 2000',
    category: 'tools',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Aulas de digitação, regras de uso do laboratório e a lenda do trabalho_final_agora_vai.doc.',
    keywords: ['escola', 'laboratorio', 'aulas', 'digitacao', 'trabalho', 'regras'],
    internalLinks: ['portal', 'programas', 'forum']
  },
  'musica': {
    id: 'musica',
    url: 'retro://musica',
    title: 'Música, MP3 e Playlists Nostálgicas',
    category: 'tools',
    year: 1999,
    availableEras: [2000, 2002, 2004, 2006, 2008],
    description: 'A prateleira com faixas instrumentais nostálgicas e integração direta com o player RETROAMP.',
    keywords: ['musica', 'mp3', 'player', 'retroamp', 'playlist', 'som'],
    internalLinks: ['portal', 'blog/rafa', 'programas']
  },
  'humor': {
    id: 'humor',
    url: 'retro://humor',
    title: 'Humor em Pixels & Piadas de Informática',
    category: 'tools',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Tirinhas em texto puro no terminal satirizando os perrengues clássicos dos gabinetes beges.',
    keywords: ['humor', 'piadas', 'tirinhas', 'ascii', 'gabinete'],
    internalLinks: ['portal', 'blog', 'forum']
  },
  'fanzine': {
    id: 'fanzine',
    url: 'retro://fanzine',
    title: 'Clube do Disquete Perdido: Fanzine Retrô',
    category: 'games',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Fã-clube oficial de aventuras DOS originais com dicas para encontrar itens secretos.',
    keywords: ['fanzine', 'fa-clube', 'disquete', 'jogos', 'aventura', 'mapa'],
    internalLinks: ['jogos', 'secreto/lab1999', 'forum/jogos']
  },
  'programas': {
    id: 'programas',
    url: 'retro://programas',
    title: 'Museu dos Programas e Utilitários',
    category: 'tools',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Histórico dos programas essenciais de desktop com atalhos diretos para os apps do RETRO OS.',
    keywords: ['programas', 'utilitarios', 'bloco de notas', 'paint', 'terminal', 'messenger'],
    internalLinks: ['portal', 'downloads']
  },
  'discador': {
    id: 'discador',
    url: 'retro://discador',
    title: 'Provedor Saudade: Central do Usuário',
    category: 'tools',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Instruções para configurar a conexão discada após a meia-noite gastando apenas um pulso telefônico.',
    keywords: ['discador', 'provedor', 'saudade', 'conexao', 'pulso', 'telefone', 'modem'],
    internalLinks: ['portal-praca', 'forum/internet']
  },
  'gifs': {
    id: 'gifs',
    url: 'retro://gifs',
    title: 'Galeria de Animações & GIFs Originais',
    category: 'tools',
    year: 1998,
    availableEras: [1998, 2000, 2002, 2004, 2006, 2008],
    description: 'Animações clássicas em CSS sem dependências externas prontas para decorar sua página fictícia.',
    keywords: ['gifs', 'animacoes', 'graficos', 'envelope', 'estrelas'],
    internalLinks: ['portal', 'construcao']
  }
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function searchWebRegistry(query: string, eraFilter?: number, categoryFilter?: string): WebPageMeta[] {
  const q = normalizeText(query.trim());
  const terms = q ? q.split(/\s+/).filter(Boolean) : [];

  const scored = Object.values(LIVING_WEB_REGISTRY).map(page => {
    // Filtro temporal opcional
    if (eraFilter && page.availableEras && !page.availableEras.includes(eraFilter) && page.year > eraFilter) {
      return { page, score: 0 };
    }

    // Filtro de categoria opcional
    if (categoryFilter && categoryFilter !== 'all' && page.category !== categoryFilter) {
      return { page, score: 0 };
    }

    let score = terms.length === 0 ? 1 : 0;
    const titleNorm = normalizeText(page.title);
    const descNorm = normalizeText(page.description);
    const idNorm = normalizeText(page.id);
    const keywordsNorm = page.keywords.map(normalizeText);

    for (const term of terms) {
      if (titleNorm.includes(term)) score += 10;
      if (idNorm.includes(term)) score += 8;
      if (keywordsNorm.some(k => k.includes(term))) score += 5;
      if (descNorm.includes(term)) score += 3;
    }

    return { page, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.page);
}
