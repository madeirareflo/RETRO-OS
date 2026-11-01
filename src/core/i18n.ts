export type Language = 'pt-BR' | 'en' | 'es';

export interface TranslationDictionary {
  // Desktop & Taskbar
  start: string;
  showDesktop: string;
  openInternet: string;
  quickSettings: string;
  connected56k: string;
  dialupDisconnected: string;
  enableSounds: string;
  muteSounds: string;
  volume: string;
  fidelityMode: string;
  dialupConnection: string;
  openAppearance: string;
  language: string;
  langPt: string;
  langEn: string;
  langEs: string;

  // Start Menu
  programs: string;
  documents: string;
  settings: string;
  search: string;
  help: string;
  run: string;
  allPrograms: string;
  accessories: string;
  games: string;
  restart: string;
  shutdown: string;
  helpAndSupport: string;
  visitor: string;
  personalComputer: string;
  dialupConnections: string;
  controlPanel: string;
  appearanceEllipsis: string;
  filesOrFolders: string;
  onInternet: string;

  // App Names in Registry
  appComputer: string;
  appDocuments: string;
  appFloppy: string;
  appInternet: string;
  appGames: string;
  appPaint: string;
  appNotepad: string;
  appPlayer: string;
  appChat: string;
  appTrash: string;
  appSettings: string;
  appAbout: string;
  appCalculator: string;
  appTerminal: string;
  appMines: string;
  appSnake: string;
  appSolitaire: string;
  appRun: string;
  appDialup: string;
  appTimeMachine: string;
  appSaver: string;
  appBackup: string;
  appLan: string;
  appCommunity: string;
  appMessenger: string;
  appDosGame: string;
  appFreedoom: string;
  appKlab: string;
  appSkyroads: string;
  appLauncher: string;
  appGameCenter: string;
  appNaval: string;
  appTasks: string;
  appMedia: string;
  appDosImported: string;

  // Retro Game Launcher
  launcherTitle: string;
  launcherSubtitle: string;
  searchPlaceholder: string;
  tabAll: string;
  tabInstalled: string;
  tabShareware: string;
  tabMuseum: string;
  tabImported: string;
  playGame: string;
  controlsHelp: string;
  createDesktopShortcut: string;
  exportArchive: string;
  deleteGame: string;
  historicalGameNotice: string;
  packageReady: string;
  genre: string;
  platform: string;
  year: string;
  timesPlayed: string;
  status: string;
  verifiedOfficial: string;
  localUserPackage: string;
  historicalArchiveOnly: string;
  badgeDos: string;
  badgeFps: string;
  badgePlatformer: string;
  badgeRacing: string;
  badgePuzzle: string;

  // DOS Game Runner
  dosIntroTitle: string;
  dosIntroDesc: string;
  dosStartLab: string;
  dosReloadLab: string;
  dosFocus: string;
  dosFullscreen: string;
  dosExitDesktop: string;
  dosNoticeLocal: string;
  dosNoticeOriginal: string;
  dosStatusReady: string;
  dosStatusBooting: string;
  dosStatusRunning: string;
  dosStatusPaused: string;
  dosStatusDone: string;
  dosErrorMissingEntry: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  'pt-BR': {
    start: 'Iniciar',
    showDesktop: 'Mostrar área de trabalho',
    openInternet: 'Abrir Internet',
    quickSettings: 'Configurações rápidas',
    connected56k: '◉ Conectado · 56 Kbps',
    dialupDisconnected: '○ Internet discada desconectada',
    enableSounds: 'Ativar sons',
    muteSounds: 'Silenciar sons',
    volume: 'Volume',
    fidelityMode: 'Fidelidade 100%',
    dialupConnection: 'Conexão discada…',
    openAppearance: 'Abrir Aparência…',
    language: 'Idioma',
    langPt: 'Português (Brasil)',
    langEn: 'Inglês (English)',
    langEs: 'Espanhol (Español)',

    programs: 'Programas',
    documents: 'Documentos',
    settings: 'Configurações',
    search: 'Localizar',
    help: 'Ajuda',
    run: 'Executar…',
    allPrograms: 'Todos os programas',
    accessories: 'Acessórios',
    games: 'Jogos',
    restart: 'Reiniciar…',
    shutdown: 'Desligar…',
    helpAndSupport: 'Ajuda e suporte',
    visitor: 'Visitante',
    personalComputer: 'RETRO OS — computador pessoal',
    dialupConnections: 'Conexões dial-up',
    controlPanel: 'Painel de Controle',
    appearanceEllipsis: 'Aparência…',
    filesOrFolders: 'Arquivos ou pastas…',
    onInternet: 'Na Internet…',

    appComputer: 'Meu Computador',
    appDocuments: 'Meus Documentos',
    appFloppy: 'Disquete A:',
    appInternet: 'Internet',
    appGames: 'Jogos',
    appPaint: 'Paint',
    appNotepad: 'Bloco de Notas',
    appPlayer: 'Toca-MP3',
    appChat: 'Bate-Papo',
    appTrash: 'Lixeira',
    appSettings: 'Painel de Controle',
    appAbout: 'Sobre o RETRO OS',
    appCalculator: 'Calculadora',
    appTerminal: 'Terminal',
    appMines: 'Campo Minado',
    appSnake: 'Snake',
    appSolitaire: 'Paciência',
    appRun: 'Executar',
    appDialup: 'Conectar à Internet',
    appTimeMachine: 'Máquina do Tempo',
    appSaver: 'Protetor de Tela',
    appBackup: 'Backup e Restauração',
    appLan: 'LAN House',
    appCommunity: 'Comunidades e Perfis',
    appMessenger: 'Retro Messenger',
    appDosGame: 'Disquete Perdido DOS',
    appFreedoom: 'Freedoom Phase 1',
    appKlab: "Ken's Labyrinth",
    appSkyroads: 'SkyRoads',
    appLauncher: 'Retro Game Launcher',
    appGameCenter: 'Retro Game Center',
    appNaval: 'Batalha Naval',
    appTasks: 'Gerenciador de Tarefas',
    appMedia: 'Central de Discos',
    appDosImported: 'Jogo DOS importado',

    launcherTitle: 'Retro Game Launcher',
    launcherSubtitle: 'Biblioteca nostálgica de clássicos DOS e Windows com emulação autêntica',
    searchPlaceholder: 'Filtrar biblioteca (título, ano, gênero)…',
    tabAll: 'Todos',
    tabInstalled: 'Instalados / Prontos',
    tabShareware: 'Shareware Clássico',
    tabMuseum: 'Acervo Histórico',
    tabImported: 'Importados',
    playGame: '▶ Iniciar Jogo',
    controlsHelp: 'Controles / Ajuda',
    createDesktopShortcut: 'Criar Atalho no Desktop',
    exportArchive: 'Exportar Pacote (.ZIP)',
    deleteGame: 'Remover da Biblioteca',
    historicalGameNotice: 'Título histórico de referência documental. Para executar, importe o pacote de arquivos original no botão Importar.',
    packageReady: 'Pacote pronto para execução em DOSBox WASM.',
    genre: 'Gênero',
    platform: 'Plataforma',
    year: 'Ano de lançamento',
    timesPlayed: 'Partidas jogadas',
    status: 'Status',
    verifiedOfficial: 'Emulação verificada e autorizada',
    localUserPackage: 'Pacote local do usuário',
    historicalArchiveOnly: 'Acervo documental',
    badgeDos: 'DOS',
    badgeFps: 'Tiro em 1ª Pessoa',
    badgePlatformer: 'Ação / Plataforma',
    badgeRacing: 'Corrida Espacial',
    badgePuzzle: 'Estratégia / Puzzle',

    dosIntroTitle: 'Ambiente DOS no navegador',
    dosIntroDesc: 'Execução autêntica WebAssembly em sandbox segura.',
    dosStartLab: 'Iniciar jogo DOS',
    dosReloadLab: 'Recarregar emulador',
    dosFocus: 'Focar no jogo',
    dosFullscreen: 'Tela cheia',
    dosExitDesktop: 'Sair para o desktop',
    dosNoticeLocal: 'Pacote DOS local do usuário — sandbox WebAssembly',
    dosNoticeOriginal: 'DISQUETE PERDIDO · demonstração original DOS · execução real em DOSBox/WebAssembly',
    dosStatusReady: 'Pronto para iniciar.',
    dosStatusBooting: 'Inicializando DOSBox…',
    dosStatusRunning: 'Jogo DOS em execução.',
    dosStatusPaused: 'Jogo pausado.',
    dosStatusDone: 'Concluído!',
    dosErrorMissingEntry: 'Entrada importada não encontrada.',
  },
  'en': {
    start: 'Start',
    showDesktop: 'Show Desktop',
    openInternet: 'Open Internet',
    quickSettings: 'Quick Settings',
    connected56k: '◉ Connected · 56 Kbps',
    dialupDisconnected: '○ Dial-up Internet disconnected',
    enableSounds: 'Enable sounds',
    muteSounds: 'Mute sounds',
    volume: 'Volume',
    fidelityMode: '100% Fidelity',
    dialupConnection: 'Dial-up Connection…',
    openAppearance: 'Open Appearance…',
    language: 'Language',
    langPt: 'Portuguese (Brasil)',
    langEn: 'English',
    langEs: 'Spanish (Español)',

    programs: 'Programs',
    documents: 'Documents',
    settings: 'Settings',
    search: 'Search',
    help: 'Help',
    run: 'Run…',
    allPrograms: 'All Programs',
    accessories: 'Accessories',
    games: 'Games',
    restart: 'Restart…',
    shutdown: 'Shut Down…',
    helpAndSupport: 'Help and Support',
    visitor: 'Guest User',
    personalComputer: 'RETRO OS — Personal Computer',
    dialupConnections: 'Dial-up Connections',
    controlPanel: 'Control Panel',
    appearanceEllipsis: 'Appearance…',
    filesOrFolders: 'Files or Folders…',
    onInternet: 'On the Internet…',

    appComputer: 'My Computer',
    appDocuments: 'My Documents',
    appFloppy: '3½ Floppy (A:)',
    appInternet: 'Internet',
    appGames: 'Games',
    appPaint: 'Paint',
    appNotepad: 'Notepad',
    appPlayer: 'MP3 Player',
    appChat: 'Chat Room',
    appTrash: 'Recycle Bin',
    appSettings: 'Control Panel',
    appAbout: 'About RETRO OS',
    appCalculator: 'Calculator',
    appTerminal: 'Command Prompt',
    appMines: 'Minesweeper',
    appSnake: 'Snake',
    appSolitaire: 'Solitaire',
    appRun: 'Run',
    appDialup: 'Connect to Internet',
    appTimeMachine: 'Time Machine',
    appSaver: 'Screensaver',
    appBackup: 'Backup & Restore',
    appLan: 'LAN House Cafe',
    appCommunity: 'Communities & Profiles',
    appMessenger: 'Retro Messenger',
    appDosGame: 'Lost DOS Floppy',
    appFreedoom: 'Freedoom Phase 1',
    appKlab: "Ken's Labyrinth",
    appSkyroads: 'SkyRoads',
    appLauncher: 'Retro Game Launcher',
    appGameCenter: 'Retro Game Center',
    appNaval: 'Battleship',
    appTasks: 'Task Manager',
    appMedia: 'Disc Center',
    appDosImported: 'Imported DOS Game',

    launcherTitle: 'Retro Game Launcher',
    launcherSubtitle: 'Nostalgic library of classic DOS and Windows games with authentic emulation',
    searchPlaceholder: 'Search library (title, year, genre)…',
    tabAll: 'All Games',
    tabInstalled: 'Installed / Ready',
    tabShareware: 'Classic Shareware',
    tabMuseum: 'Museum Archive',
    tabImported: 'Imported',
    playGame: '▶ Launch Game',
    controlsHelp: 'Controls / Help',
    createDesktopShortcut: 'Create Desktop Shortcut',
    exportArchive: 'Export Archive (.ZIP)',
    deleteGame: 'Remove from Library',
    historicalGameNotice: 'Historical reference title for archival preservation. To run it, import the original game package using the Import button.',
    packageReady: 'Package ready for DOSBox WASM execution.',
    genre: 'Genre',
    platform: 'Platform',
    year: 'Release Year',
    timesPlayed: 'Times Played',
    status: 'Status',
    verifiedOfficial: 'Verified & authorized emulation',
    localUserPackage: 'User local package',
    historicalArchiveOnly: 'Documentary archive',
    badgeDos: 'DOS',
    badgeFps: 'First-Person Shooter',
    badgePlatformer: 'Action / Platformer',
    badgeRacing: 'Space Racing',
    badgePuzzle: 'Strategy / Puzzle',

    dosIntroTitle: 'DOS Environment in Browser',
    dosIntroDesc: 'Authentic WebAssembly execution in a secure sandbox.',
    dosStartLab: 'Start DOS Game',
    dosReloadLab: 'Reload Emulator',
    dosFocus: 'Focus on Game',
    dosFullscreen: 'Fullscreen',
    dosExitDesktop: 'Exit to Desktop',
    dosNoticeLocal: 'User local DOS package — WebAssembly sandbox',
    dosNoticeOriginal: 'LOST FLOPPY · Original DOS demo · Real DOSBox/WebAssembly execution',
    dosStatusReady: 'Ready to start.',
    dosStatusBooting: 'Initializing DOSBox…',
    dosStatusRunning: 'DOS game running.',
    dosStatusPaused: 'Game paused.',
    dosStatusDone: 'Completed!',
    dosErrorMissingEntry: 'Imported entry not found.',
  },
  'es': {
    start: 'Inicio',
    showDesktop: 'Mostrar escritorio',
    openInternet: 'Abrir Internet',
    quickSettings: 'Configuración rápida',
    connected56k: '◉ Conectado · 56 Kbps',
    dialupDisconnected: '○ Conexión telefónica desconectada',
    enableSounds: 'Activar sonidos',
    muteSounds: 'Silenciar sonidos',
    volume: 'Volumen',
    fidelityMode: 'Fidelidad 100%',
    dialupConnection: 'Conexión por módem…',
    openAppearance: 'Abrir Apariencia…',
    language: 'Idioma',
    langPt: 'Portugués (Brasil)',
    langEn: 'Inglés (English)',
    langEs: 'Español',

    programs: 'Programas',
    documents: 'Documentos',
    settings: 'Configuración',
    search: 'Buscar',
    help: 'Ayuda',
    run: 'Ejecutar…',
    allPrograms: 'Todos los programas',
    accessories: 'Accesorios',
    games: 'Juegos',
    restart: 'Reiniciar…',
    shutdown: 'Apagar el equipo…',
    helpAndSupport: 'Ayuda y soporte técnico',
    visitor: 'Invitado',
    personalComputer: 'RETRO OS — Equipo personal',
    dialupConnections: 'Conexiones telefónicas',
    controlPanel: 'Panel de control',
    appearanceEllipsis: 'Apariencia…',
    filesOrFolders: 'Archivos o carpetas…',
    onInternet: 'En Internet…',

    appComputer: 'Mi PC',
    appDocuments: 'Mis documentos',
    appFloppy: 'Disco de 3½ (A:)',
    appInternet: 'Internet',
    appGames: 'Juegos',
    appPaint: 'Paint',
    appNotepad: 'Bloc de notas',
    appPlayer: 'Reproductor MP3',
    appChat: 'Sala de Chat',
    appTrash: 'Papelera de reciclaje',
    appSettings: 'Panel de control',
    appAbout: 'Acerca de RETRO OS',
    appCalculator: 'Calculadora',
    appTerminal: 'Símbolo del sistema',
    appMines: 'Buscaminas',
    appSnake: 'Snake',
    appSolitaire: 'Solitario',
    appRun: 'Ejecutar',
    appDialup: 'Conectar a Internet',
    appTimeMachine: 'Máquina del Tiempo',
    appSaver: 'Protector de pantalla',
    appBackup: 'Copia de seguridad y restauración',
    appLan: 'Cibercafé LAN',
    appCommunity: 'Comunidades y Perfiles',
    appMessenger: 'Retro Messenger',
    appDosGame: 'Disquete Perdido DOS',
    appFreedoom: 'Freedoom Phase 1',
    appKlab: "Ken's Labyrinth",
    appSkyroads: 'SkyRoads',
    appLauncher: 'Retro Game Launcher',
    appGameCenter: 'Retro Game Center',
    appNaval: 'Batalla Naval',
    appTasks: 'Administrador de tareas',
    appMedia: 'Centro de Discos',
    appDosImported: 'Juego DOS importado',

    launcherTitle: 'Retro Game Launcher',
    launcherSubtitle: 'Biblioteca nostálgica de clásicos DOS y Windows con emulación auténtica',
    searchPlaceholder: 'Filtrar biblioteca (título, año, género)…',
    tabAll: 'Todos los juegos',
    tabInstalled: 'Instalados / Listos',
    tabShareware: 'Shareware Clásico',
    tabMuseum: 'Archivo Histórico',
    tabImported: 'Importados',
    playGame: '▶ Iniciar Juego',
    controlsHelp: 'Controles / Ayuda',
    createDesktopShortcut: 'Crear acceso directo en el escritorio',
    exportArchive: 'Exportar Paquete (.ZIP)',
    deleteGame: 'Eliminar de la biblioteca',
    historicalGameNotice: 'Título histórico de referencia documental. Para ejecutarlo, importe el paquete de archivos original con el botón Importar.',
    packageReady: 'Paquete listo para ejecutar en DOSBox WASM.',
    genre: 'Género',
    platform: 'Plataforma',
    year: 'Año de lanzamiento',
    timesPlayed: 'Partidas jugadas',
    status: 'Estado',
    verifiedOfficial: 'Emulación verificada y autorizada',
    localUserPackage: 'Paquete local del usuario',
    historicalArchiveOnly: 'Archivo documental',
    badgeDos: 'DOS',
    badgeFps: 'Disparos en 1ª Persona',
    badgePlatformer: 'Acción / Plataformas',
    badgeRacing: 'Carrera Espacial',
    badgePuzzle: 'Estrategia / Puzle',

    dosIntroTitle: 'Entorno DOS en el navegador',
    dosIntroDesc: 'Ejecución auténtica WebAssembly en sandbox segura.',
    dosStartLab: 'Iniciar juego DOS',
    dosReloadLab: 'Recargar emulador',
    dosFocus: 'Enfocar en el juego',
    dosFullscreen: 'Pantalla completa',
    dosExitDesktop: 'Salir al escritorio',
    dosNoticeLocal: 'Paquete DOS local del usuario — sandbox WebAssembly',
    dosNoticeOriginal: 'DISQUETE PERDIDO · Demostración original DOS · Ejecución real en DOSBox/WebAssembly',
    dosStatusReady: 'Listo para iniciar.',
    dosStatusBooting: 'Inicializando DOSBox…',
    dosStatusRunning: 'Juego DOS en ejecución.',
    dosStatusPaused: 'Juego pausado.',
    dosStatusDone: '¡Completado!',
    dosErrorMissingEntry: 'Entrada importada no encontrada.',
  }
};

export function getTranslation(lang: Language = 'pt-BR'): TranslationDictionary {
  return translations[lang] || translations['pt-BR'];
}
