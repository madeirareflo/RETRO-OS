import type {GameEntry} from './types';

export interface SharewareGameConfig {
  id: string;
  gameId: string;
  profileId: string;
  title: string;
  year: number;
  developer: string;
  publisher: string;
  genre: string;
  packageFile: string;
  sha256: string;
  bytes: number;
  executable: string;
  cycles: number;
  license: string;
  source: string;
  controls: string;
  runtimeProfileId?: string;
  preparedProfileId?: string;
}

export const SHAREWARE_GAMES: SharewareGameConfig[] = [
  {
    id: 'prince',
    gameId: 'imported-private-prince',
    profileId: 'prince',
    preparedProfileId: 'prince',
    runtimeProfileId: 'dos-prince-1990',
    title: 'Prince of Persia - demo DOS 1.0',
    year: 1990,
    developer: 'Jordan Mechner / Brøderbund',
    publisher: 'Brøderbund',
    genre: 'Plataforma',
    packageFile: 'prince-demo-private.zip',
    sha256: 'd6762fd72bf74ef21f8ea34c5db87506b29a9c8ac89456ae56aaf675e66c4f1c',
    bytes: 254145,
    executable: 'PRINCE.EXE',
    cycles: 6000,
    license: 'Demo jogável DOS oficial de 1990 distribuída publicamente.',
    source: 'https://github.com/jmechner/Prince-of-Persia-Apple-II',
    controls: 'Setas: mover/saltar/abaixar · Shift: ação/caminhar · Ctrl+K: modo teclado · Esc: menu/pausa'
  },
  {
    id: 'doom-shareware',
    gameId: 'imported-private-doom-shareware',
    profileId: 'doom-shareware',
    preparedProfileId: 'doom-shareware',
    runtimeProfileId: 'dos-doom-1993',
    title: 'DOOM - shareware DOS v1.9',
    year: 1993,
    developer: 'id Software',
    publisher: 'id Software',
    genre: 'FPS',
    packageFile: 'doom-shareware-private.zip',
    sha256: '0010d4a4851aa88344a87a8079d5c1ec15c688a20cb4e6ad2919a13d1f828a70',
    bytes: 2493854,
    executable: 'DOOM.EXE',
    cycles: 20000,
    license: 'Shareware Episode 1 (DOOM1.WAD) oficial de redistribuição livre.',
    source: 'https://github.com/id-Software/DOOM',
    controls: 'Setas: mover · Ctrl: disparar · Espaço: usar/abrir · F2: salvar · F3: carregar · Esc: menu'
  },
  {
    id: 'duke-shareware',
    gameId: 'imported-private-duke-shareware',
    profileId: 'duke-shareware',
    preparedProfileId: 'duke-shareware',
    runtimeProfileId: 'dos-duke3d-1996',
    title: 'Duke Nukem 3D - shareware DOS v1.3d',
    year: 1996,
    developer: '3D Realms / Apogee',
    publisher: 'FormGen / 3D Realms',
    genre: 'FPS',
    packageFile: 'duke-shareware-private.zip',
    sha256: '8ce1cc14233a4b7dfdc82bd944506c1d09545c83754b9741642e5519f4b5f30e',
    bytes: 5963697,
    executable: 'DUKE3D.EXE',
    cycles: 20000,
    license: 'Shareware Episode 1 oficial de redistribuição autorizada pelos autores originais.',
    source: 'https://legacy.3drealms.com/duke3d/',
    controls: 'Setas: mover · Ctrl: disparar · Espaço: usar · A: pular · Z: agachar · Esc: menu'
  },
  {
    id: 'heretic',
    gameId: 'imported-private-heretic',
    profileId: 'dos-heretic-1994',
    preparedProfileId: 'dos-heretic-1994',
    runtimeProfileId: 'dos-heretic-1994',
    title: 'Heretic - shareware DOS v1.2',
    year: 1994,
    developer: 'Raven Software',
    publisher: 'id Software',
    genre: 'FPS',
    packageFile: 'heretic-shareware-private.zip',
    sha256: '50170e162b653619d266ecaf719f9a0fe9df04b88e3c30a37e436b42df5640f2',
    bytes: 2890661,
    executable: 'HERETIC.EXE',
    cycles: 20000,
    license: 'Shareware oficial id Software / Raven Software.',
    source: 'https://www.doomworld.com/idgames/idstuff/heretic/',
    controls: 'Setas: mover · Ctrl: magia · Espaço: portas · Enter: artefato · [ ]: inventário · Esc: menu'
  },
  {
    id: 'quake',
    gameId: 'imported-private-quake',
    profileId: 'dos-quake-1996',
    preparedProfileId: 'dos-quake-1996',
    runtimeProfileId: 'dos-quake-1996',
    title: 'Quake - shareware DOS v1.06',
    year: 1996,
    developer: 'id Software',
    publisher: 'id Software',
    genre: 'FPS',
    packageFile: 'quake-shareware-private.zip',
    sha256: 'f2958ff5ec2e8155f4d0b9a7af0eb1a6bea4446b4e34379f29129137f3ff3f89',
    bytes: 8834732,
    executable: 'QUAKE.EXE',
    cycles: 20000,
    license: 'Shareware v1.06 oficial id Software para MS-DOS.',
    source: 'https://www.quakewiki.net/archives/manual/index.html',
    controls: 'Mouse look / WASD / Setas: mover · Clique/Ctrl: disparar · Espaço: pular · 1–8: armas · Esc: menu'
  }
];

export function sharewareCatalog(): GameEntry[] {
  return SHAREWARE_GAMES.map(g => ({
    id: g.gameId,
    title: g.title,
    sortTitle: g.title.replace(/^(the|a|o|a|os|as)\s+/i, ''),
    year: g.year,
    platform: 'dos',
    platformDisplay: 'DOS · Shareware Oficial',
    genre: g.genre,
    genres: [g.genre],
    developer: g.developer,
    publisher: g.publisher,
    description: g.license,
    mechanics: g.controls,
    availability: g.license,
    sourceReference: g.source,
    externalUrl: g.source,
    status: 'installed',
    isFavorite: false,
    isInstalled: true,
    isPlayable: true,
    appId: 'dos-imported',
    engineId: 'dosbox-wasm',
    entryExecutable: g.executable,
    emulationProfile: {
      cycles: g.cycles,
      machine: 'svga_s3',
      memoryMb: 32,
      aspectRatio: true,
      scaler: 'normal2x'
    },
    preparedProfileId: g.preparedProfileId,
    runtimeProfileId: g.runtimeProfileId,
    customCollections: ['Jogáveis', 'Instalados', 'Prince / DOOM / Duke', 'MS-DOS'],
    dateAdded: '2026-10-31T00:00:00Z',
    lastPlayed: null,
    playCount: 0,
    metadataOrigin: 'licensed-builtin'
  }));
}
