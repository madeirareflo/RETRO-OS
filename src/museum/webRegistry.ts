export interface WebPageMeta {
  id: string;              // ex: 'portal', 'lanhouse', 'blog/leo', 'secreto/lab1999'
  url: string;             // ex: 'retro://lanhouse'
  title: string;           // ex: 'CyberSpace LAN House & Games'
  category: 'portal' | 'blog' | 'fotolog' | 'forum' | 'social' | 'games' | 'search' | 'secret' | 'personal' | 'tools';
  year: number;            // ex: 1999, 2001, 2004, 2006
  description: string;     // Resumo exibido na busca e diretório
  keywords: string[];      // Termos para o buscador retrô com pontuação
  internalLinks: string[]; // Links de saída no grafo de navegação
}

export const LIVING_WEB_REGISTRY: Record<string, WebPageMeta> = {
  // --- PORTAIS E BUSCADOR ---
  'portal': {
    id: 'portal',
    url: 'retro://portal',
    title: 'Portal Conexão 2000',
    category: 'portal',
    year: 2000,
    description: 'O grande portal da internet discada brasileira dos anos 2000. Notícias, canais temáticos, esportes e tecnologia.',
    keywords: ['portal', 'noticias', 'conexao', 'brasil', 'inicio', 'internet', 'discada', 'tecnologia', 'informatica'],
    internalLinks: ['busca', 'links', 'downloads', 'jogos', 'lanhouse', 'forum', 'recreio', 'pessoal', 'escola', 'musica']
  },
  'portal-praca': {
    id: 'portal-praca',
    url: 'retro://portal-praca',
    title: 'Portal da Praça 1998',
    category: 'portal',
    year: 1998,
    description: 'O portal pioneiro com notícias da comunidade, previsão do tempo e links da Web 1.0.',
    keywords: ['portal', 'praca', '1998', 'web1', 'noticias', 'cidade', 'antigo'],
    internalLinks: ['busca', 'downloads', 'forum', 'pessoal', 'discador']
  },
  'portal-ponto': {
    id: 'portal-ponto',
    url: 'retro://portal-ponto',
    title: 'PontoBR Tecnologia',
    category: 'portal',
    year: 2000,
    description: 'Guia de informática, hardwares modernos, placas aceleradoras e provedores de acesso.',
    keywords: ['pontobr', 'tecnologia', 'hardware', 'computador', 'windows', 'placas', 'internet'],
    internalLinks: ['forum', 'programas', 'lanhouse', 'downloads', 'escola']
  },
  'busca': {
    id: 'busca',
    url: 'retro://busca',
    title: 'Buscador Retrô Cadê a Página?',
    category: 'search',
    year: 2001,
    description: 'Encontre tudo na web brasileira dos anos 2000 por palavras-chave com relevância instantânea.',
    keywords: ['busca', 'buscador', 'cade', 'pesquisa', 'procurar', 'links', 'sites', 'encontrar'],
    internalLinks: ['portal', 'links']
  },
  'links': {
    id: 'links',
    url: 'retro://links',
    title: 'Diretório Amarelo de Links',
    category: 'tools',
    year: 2000,
    description: 'O mapa organizado da internet retrô: navegue por categorias selecionadas a dedo.',
    keywords: ['diretorio', 'links', 'sites', 'catalogo', 'web', 'categorias'],
    internalLinks: ['portal', 'blog', 'forum', 'lanhouse', 'fotolog', 'recreio']
  },

  // --- LAN HOUSE & GAMES ---
  'lanhouse': {
    id: 'lanhouse',
    url: 'retro://lanhouse',
    title: 'CyberSpace LAN House & Games',
    category: 'games',
    year: 2003,
    description: 'Tabela de preços, horários de corujão, 16 PCs com placas 3D, campeonatos de sábado e lanchonete.',
    keywords: ['lan house', 'cyberspace', 'jogos', 'games', 'computador', 'corujao', 'campeonato', 'rede', 'fichas', 'placas'],
    internalLinks: ['jogos', 'forum/jogos', 'blog/leo', 'recreio/leo', 'downloads']
  },
  'jogos': {
    id: 'jogos',
    url: 'retro://jogos',
    title: 'Central de Jogos e Estratégia',
    category: 'games',
    year: 2002,
    description: 'Dicas de jogos clássicos, comandos secretos, manuais da LAN e acesso aos jogos do RETRO OS.',
    keywords: ['jogos', 'games', 'dos', 'estrategia', 'macetes', 'dicas', 'launcher', 'gamecenter'],
    internalLinks: ['lanhouse', 'fanzine', 'forum/jogos']
  },

  // --- FÓRUM DO GABINETE BEGE ---
  'forum': {
    id: 'forum',
    url: 'retro://forum',
    title: 'Fórum do Gabinete Bege',
    category: 'forum',
    year: 2001,
    description: 'A maior comunidade técnica da internet nostálgica. Discussões sobre Windows, hardware, internet e jogos.',
    keywords: ['forum', 'comunidade', 'duvidas', 'computador', 'windows', 'hardware', 'internet', 'jogos', 'programacao'],
    internalLinks: ['forum/hardware', 'forum/windows', 'forum/internet', 'forum/jogos', 'forum/offtopic']
  },
  'forum/hardware': {
    id: 'forum/hardware',
    url: 'retro://forum/hardware',
    title: 'Fórum: Hardware & Overclock',
    category: 'forum',
    year: 2002,
    description: 'Placas-mãe, coolers, memórias DIMM, placas de vídeo AGP e overclock no cooler de cobre.',
    keywords: ['hardware', 'placa', 'cooler', 'processador', 'memoria', 'overclock', 'pecas', 'gabinete'],
    internalLinks: ['forum', 'blog/leo', 'lanhouse']
  },
  'forum/windows': {
    id: 'forum/windows',
    url: 'retro://forum/windows',
    title: 'Fórum: Dicas de Windows 98, 2000 & XP',
    category: 'forum',
    year: 2003,
    description: 'Otimizações no registro, temas Luna, inicialização rápida e atalhos de teclado.',
    keywords: ['windows', 'dicas', 'win98', 'win2000', 'winxp', 'registro', 'atalhos', 'otimizacao'],
    internalLinks: ['forum', 'programas', 'blog/monitor']
  },
  'forum/internet': {
    id: 'forum/internet',
    url: 'retro://forum/internet',
    title: 'Fórum: Internet Discada & Provedores',
    category: 'forum',
    year: 2002,
    description: 'Dicas para conectar após a meia-noite, pulsos telefônicos e modems de 56 Kbps.',
    keywords: ['internet', 'discada', 'modem', '56k', 'pulso', 'provedor', 'conexao'],
    internalLinks: ['forum', 'discador', 'secreto/lab1999']
  },
  'forum/jogos': {
    id: 'forum/jogos',
    url: 'retro://forum/jogos',
    title: 'Fórum: Jogos em Rede & Campeonatos',
    category: 'forum',
    year: 2003,
    description: 'Táticas para o corujão na LAN House, sensibilidade do mouse e campeonatos.',
    keywords: ['jogos', 'lan house', 'campeonatos', 'estrategia', 'corujao', 'mouse', 'ranking'],
    internalLinks: ['forum', 'lanhouse', 'jogos', 'blog/leo']
  },
  'forum/offtopic': {
    id: 'forum/offtopic',
    url: 'retro://forum/offtopic',
    title: 'Fórum: Conversas Aleatórias & Mistérios',
    category: 'forum',
    year: 2003,
    description: 'Tópicos descontraídos, lendas da internet e pistas sobre a página secreta do laboratório.',
    keywords: ['offtopic', 'misterio', 'secreto', 'pistas', 'conversas', 'lendas'],
    internalLinks: ['forum', 'blog/monitor', 'secreto/lab1999']
  },

  // --- BLOGS & FOTOLOGS ---
  'blog': {
    id: 'blog',
    url: 'retro://blog',
    title: 'Rede de Blogs & Diários da Turma',
    category: 'blog',
    year: 2003,
    description: 'Acompanhe as postagens do monitor e dos alunos da turma de informática.',
    keywords: ['blog', 'diario', 'posts', 'historias', 'turma', 'monitor', 'artigos'],
    internalLinks: ['blog/monitor', 'blog/leo', 'blog/bia', 'blog/rafa', 'fotolog']
  },
  'blog/monitor': {
    id: 'blog/monitor',
    url: 'retro://blog/monitor',
    title: 'Diário do Monitor do Laboratório',
    category: 'blog',
    year: 2003,
    description: 'Crônicas sobre salvar arquivos a tempo, ensinar atalhos no Windows e os disquetes perdidos.',
    keywords: ['blog', 'monitor', 'laboratorio', 'disquete', 'dicas', 'escola', 'segredos'],
    internalLinks: ['blog', 'visitas', 'forum/windows', 'secreto/lab1999', 'recreio/bia']
  },
  'blog/leo': {
    id: 'blog/leo',
    url: 'retro://blog/leo',
    title: 'Bancada do Léo: Hardware & LAN',
    category: 'blog',
    year: 2004,
    description: 'Montagem de gabinetes beges, preparativos para o campeonato da LAN e causos do corujão.',
    keywords: ['blog', 'leo', 'hardware', 'lan house', 'campeonato', 'computador', 'corujao'],
    internalLinks: ['blog', 'lanhouse', 'forum/hardware', 'recreio/leo']
  },
  'blog/bia': {
    id: 'blog/bia',
    url: 'retro://blog/bia',
    title: 'Caderno de Notas da Bia',
    category: 'blog',
    year: 2004,
    description: 'Textos sobre a escola, organização de estudos, disquetes coloridos e amigos.',
    keywords: ['blog', 'bia', 'escola', 'amigos', 'estudos', 'disquetes', 'historias'],
    internalLinks: ['blog', 'recreio/bia', 'fotolog', 'escola']
  },
  'blog/rafa': {
    id: 'blog/rafa',
    url: 'retro://blog/rafa',
    title: 'CD-R Express: O Blog do Rafa',
    category: 'blog',
    year: 2004,
    description: 'A arte de gravar coletâneas, encartes feitos à mão e playlists perfeitas.',
    keywords: ['blog', 'rafa', 'musica', 'mp3', 'cd-r', 'playlists', 'audio'],
    internalLinks: ['blog', 'musica', 'recreio/rafa']
  },
  'fotolog': {
    id: 'fotolog',
    url: 'retro://fotolog',
    title: 'Fotolog da Turma de Informática',
    category: 'fotolog',
    year: 2003,
    description: 'Uma foto ilustrada original por dia: tardes no laboratório, fila da LAN House e disquetes coloridos.',
    keywords: ['fotolog', 'fotos', 'galeria', 'turma', 'comentarios', 'albuns', 'nina'],
    internalLinks: ['recreio/nina', 'blog/bia', 'pessoal', 'lanhouse']
  },

  // --- REDE SOCIAL (RECREIO) ---
  'recreio': {
    id: 'recreio',
    url: 'retro://recreio',
    title: 'Rede Recreio',
    category: 'social',
    year: 2004,
    description: 'A rede social fictícia da turma: perfis completos, scraps, depoimentos e comunidades temáticas.',
    keywords: ['recreio', 'rede social', 'perfis', 'comunidades', 'scraps', 'depoimentos', 'amigos'],
    internalLinks: ['recreio/bia', 'recreio/leo', 'recreio/nina', 'recreio/rafa', 'forum', 'fotolog']
  },

  // --- SITES SECRETOS & EASTER EGGS ---
  'secreto/lab1999': {
    id: 'secreto/lab1999',
    url: 'retro://secreto/lab1999',
    title: '★ Arquivo Oculto: Laboratório 1999 ★',
    category: 'secret',
    year: 1999,
    description: 'A primeira homepage secreta criada pelos alunos fundadores do clube de computação.',
    keywords: ['secreto', 'lab1999', 'misterio', 'fundadores', 'arquivo', 'clube', 'oculto'],
    internalLinks: ['fanzine', 'blog/monitor', 'portal-praca']
  },
  'construcao': {
    id: 'construcao',
    url: 'retro://construcao',
    title: 'Obras Eternas da Web: O Pedreiro Virtual',
    category: 'secret',
    year: 1999,
    description: 'A página em construção desde 1999 com pequenas revelações sobre o projeto.',
    keywords: ['construcao', 'em obras', 'pedreiro', 'gif', 'animacao', 'easter egg'],
    internalLinks: ['portal', 'secreto/lab1999']
  },

  // --- UTILITÁRIOS & DOWNLOADS ---
  'downloads': {
    id: 'downloads',
    url: 'retro://downloads',
    title: 'Downloads Seguros no Disquete Virtual',
    category: 'tools',
    year: 2002,
    description: 'Baixe arquivos fictícios originais (.txt, papéis de parede e guias) com simulação 56K que salvam no VFS.',
    keywords: ['downloads', 'baixar', 'vfs', 'disquete', 'arquivos', 'txt', 'memorias'],
    internalLinks: ['portal', 'programas', 'lanhouse']
  },
  'pessoal': {
    id: 'pessoal',
    url: 'retro://pessoal',
    title: 'Cantinho Pessoal do Davi',
    category: 'personal',
    year: 2001,
    description: 'Homepage com estrelas animadas, contador de visitas e manifesto do disquete.',
    keywords: ['pessoal', 'homepage', 'davi', 'contador', 'cantinho', 'estrelas'],
    internalLinks: ['visitas', 'blog', 'fotolog']
  },
  'escola': {
    id: 'escola',
    url: 'retro://escola',
    title: 'Escola do Futuro — Laboratório 2000',
    category: 'tools',
    year: 2000,
    description: 'Guia do aluno moderno e simulador de trabalho em disquete.',
    keywords: ['escola', 'laboratorio', 'trabalho', 'quiz', 'estudos', 'disquete'],
    internalLinks: ['portal', 'blog/bia']
  },
  'musica': {
    id: 'musica',
    url: 'retro://musica',
    title: 'Prateleira Cultural de MP3 & Coletâneas',
    category: 'tools',
    year: 2004,
    description: 'Acervo cultural de referências musicais e integração com o RETROAMP.',
    keywords: ['musica', 'mp3', 'coletanea', 'player', 'retroamp', 'som'],
    internalLinks: ['blog/rafa', 'portal']
  },
  'visitas': {
    id: 'visitas',
    url: 'retro://visitas',
    title: 'Livro de Visitas Histórico',
    category: 'personal',
    year: 2001,
    description: 'Deixe um recado na sessão ou leia mensagens dos personagens nostálgicos.',
    keywords: ['visitas', 'livro', 'recados', 'mensagens', 'comentarios'],
    internalLinks: ['pessoal', 'portal']
  },
  'fanzine': {
    id: 'fanzine',
    url: 'retro://fanzine',
    title: 'Clube do Disquete Perdido: Fanzine',
    category: 'games',
    year: 2001,
    description: 'Fã-clube oficial de aventuras DOS originais com dicas para encontrar itens secretos.',
    keywords: ['fanzine', 'fa-clube', 'disquete', 'jogos', 'aventura', 'mapa'],
    internalLinks: ['jogos', 'secreto/lab1999', 'forum/jogos']
  },
  'programas': {
    id: 'programas',
    url: 'retro://programas',
    title: 'Museu dos Programas e Utilitários',
    category: 'tools',
    year: 2000,
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
    description: 'Instruções para configurar a conexão discada após a meia-noite gastando apenas um pulso telefônico.',
    keywords: ['discador', 'provedor', 'saudade', 'conexao', 'pulso', 'telefone', 'modem'],
    internalLinks: ['portal-praca', 'forum/internet']
  },
  'gifs': {
    id: 'gifs',
    url: 'retro://gifs',
    title: 'Galeria de Animações & GIFs Originais',
    category: 'tools',
    year: 2000,
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

export function searchWebRegistry(query: string): WebPageMeta[] {
  const q = normalizeText(query.trim());
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = Object.values(LIVING_WEB_REGISTRY).map(page => {
    let score = 0;
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
