import {builtinCatalog} from './builtinGames';
import {catalog as rawCatalog} from '../museum/gameCatalog';
import {read, write} from '../storage/local';
import type {GameEntry, GameStatus, PlatformId, EngineAdapterId} from './types';

function parsePlatform(str: string): PlatformId {
  const lower = str.toLowerCase();
  if (lower.includes('dos')) return 'dos';
  if (lower.includes('95') || lower.includes('98')) return 'win95_98';
  if (lower.includes('xp') || lower.includes('2000')) return 'winxp';
  if (lower.includes('navegador') || lower.includes('web')) return 'browser';
  if (lower.includes('arcade')) return 'arcade';
  return 'other';
}

function parseEngine(game: {id: string; app: string | null; platform: string}): EngineAdapterId {
  if (game.app === 'dosgame' || game.id === 'dos-disquete') return 'dosbox-wasm';
  if (['naval', 'mines', 'snake', 'solitaire'].includes(game.app || '')) return 'native-js';
  return 'none';
}

function parseStatus(game: {id: string; app: string | null; status: string}): GameStatus {
  if (game.app) return 'playable';
  if (game.status === 'Museu') return 'museum';
  if (game.status === 'Externo') return 'requires_files';
  return 'evaluating';
}

export function loadBaseCatalog(): GameEntry[] {
  const favorites = read<string[]>('gameFavorites', []);
  const installed = read<string[]>('gameInstalled', []);
  const rawCustom=read<unknown>('launcherCustomGames',[]);const custom:GameEntry[]=Array.isArray(rawCustom)?rawCustom.filter((g):g is GameEntry=>!!g&&typeof g==='object'&&typeof g.id==='string'&&typeof g.title==='string'&&typeof g.genre==='string'&&typeof g.developer==='string'&&typeof g.description==='string'&&g.id.length<100&&g.title.length<121):[];

  // Map 74 museum entries + Disquete Perdido DOS
  const baseEntries: GameEntry[] = rawCatalog.map(g => {
    const isPlayable = Boolean(g.app);
    const engineId = parseEngine(g);
    const platform = parsePlatform(g.platform);
    const isFav = favorites.includes(g.id);
    const isInst = installed.includes(g.id);

    return {
      id: g.id,
      title: g.name,
      sortTitle: g.name.replace(/^(the|a|o|a|os|as)\s+/i, ''),
      year: g.year,
      platform,
      platformDisplay: g.platform,
      genre: g.genre,
      genres: [g.genre],
      developer: g.developer,
      publisher: g.publisher,
      description: g.relevance || 'Ficha histórica de preservação cultural e tecnológica dos anos de ouro da computação.',
      mechanics: g.mechanics || undefined,
      requirements: g.requirements || undefined,
      availability: g.availability || undefined,
      externalUrl: g.externalUrl || null,
      sourceReference: g.source || undefined,
      status: parseStatus(g),
      isFavorite: isFav,
      isInstalled: isInst,
      isPlayable,
      appId: g.app || null,
      engineId,
      entryExecutable: g.app === 'dosgame' ? 'DISQUETE.COM' : undefined,
      virtualPath: g.app === 'dosgame' ? 'A:/DISQUETE.COM' : undefined,
      emulationProfile: g.app === 'dosgame' ? {
        cycles: 2000,
        machine: 'svga_s3',
        memoryMb: 64,
        aspectRatio: true,
        scaler: 'normal2x'
      } : undefined,
      customCollections: isPlayable ? ['Jogáveis', 'Clássicos de LAN House'] : ['Museu'],
      dateAdded: '2026-10-31T00:00:00.000Z',
      lastPlayed: null,
      playCount: 0,
      metadataOrigin: 'builtin-museum'
    };
  });

  return [...baseEntries,...builtinCatalog().map(g=>({...g,isFavorite:favorites.includes(g.id)})), ...custom.filter(g=>g&&typeof g.id==='string'&&typeof g.title==='string').map<GameEntry>(g=>({...g,isFavorite:favorites.includes(g.id)||(localStorage.getItem('retro.gameFavorites')===null&&g.isFavorite),appId:g.metadataOrigin==='user-imported'?'dos-imported':null,isPlayable:g.metadataOrigin==='user-imported'&&g.id.startsWith('imported-')&&g.engineId==='dosbox-wasm',isInstalled:g.id.startsWith('imported-'),status:g.id.startsWith('imported-')?'installed':'requires_files',externalUrl:typeof g.externalUrl==='string'&&g.externalUrl.startsWith('https://')?g.externalUrl:null}))];
}

// Generate synthetic benchmarks for 1,000 to 10,000 items (Phase 15 requirement)
export function generateSyntheticBenchmarkCatalog(count: number = 3000): GameEntry[] {
  const genres = ['RPG', 'Estratégia', 'Aventura', 'Tiro', 'Corrida', 'Plataforma', 'Simulador', 'Puzzle'];
  const platforms: PlatformId[] = ['dos', 'win95_98', 'winxp', 'arcade'];
  const samplePublishers = ['Sierra On-Line', 'LucasArts', 'Apogee Software', 'id Software', 'MicroProse', 'Electronic Arts', 'Capcom', 'Brøderbund'];

  const results: GameEntry[] = [];
  for (let i = 1; i <= count; i++) {
    const genre = genres[i % genres.length];
    const plat = platforms[i % platforms.length];
    const pub = samplePublishers[i % samplePublishers.length];
    const year = 1988 + (i % 15);

    results.push({
      id: `synthetic-${i}`,
      title: `[BENCHMARK] Test Title #${i} (${genre})`,
      sortTitle: `Test Title #${i}`,
      year,
      platform: plat,
      platformDisplay: plat === 'dos' ? 'MS-DOS Synthetic' : plat === 'win95_98' ? 'Windows 95/98' : 'Windows XP',
      genre,
      genres: [genre],
      developer: `Lab Dev #${(i % 50) + 1}`,
      publisher: pub,
      description: `Registro sintético #${i} gerado estritamente para teste de estresse de biblioteca grande, paginação, filtros e performance (Missão 003G). Não representa jogo histórico real.`,
      status: i % 10 === 0 ? 'ready_to_configure' : 'requires_files',
      isFavorite: i % 25 === 0,
      isInstalled: i % 50 === 0,
      isPlayable: false,
      appId: null,
      engineId: plat === 'dos' ? 'dosbox-wasm' : 'none',
      customCollections: ['Teste Sintético Benchmark'],
      dateAdded: new Date(1700000000000 + i * 10000).toISOString(),
      lastPlayed: null,
      playCount: 0,
      metadataOrigin: 'synthetic-benchmark'
    });
  }
  return results;
}

export function saveCustomGame(game: GameEntry): void {
  const current = read<GameEntry[]>('launcherCustomGames', []);
  const updated = [game, ...current.filter(g => g.id !== game.id)];
  if(!write('launcherCustomGames', updated))throw Error('Sem espaço para metadados.');if(typeof window!=='undefined')window.dispatchEvent(new Event('retro:library-change'));
}
