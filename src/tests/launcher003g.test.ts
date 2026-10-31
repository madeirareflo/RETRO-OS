import {describe, it, expect, vi, beforeEach} from 'vitest';
import {loadBaseCatalog, generateSyntheticBenchmarkCatalog, saveCustomGame} from '../launcher/catalogStore';
import {ENGINE_ADAPTERS, getEngineAdapter} from '../launcher/engineAdapters';
import type {GameEntry} from '../launcher/types';

const memory = new Map<string, string>();

describe('Retro Game Launcher — Architecture & Models (003G)', () => {
  beforeEach(() => {
    memory.clear();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => memory.get(k) || null,
      setItem: (k: string, v: string) => memory.set(k, v)
    });
  });
  it('carrega o acervo base preservando as 74 entradas e o jogo DOS original', () => {
    const catalog = loadBaseCatalog();
    expect(catalog.length).toBeGreaterThanOrEqual(75);

    const dosDisquete = catalog.find(g => g.id === 'dos-disquete');
    expect(dosDisquete).toBeDefined();
    expect(dosDisquete?.engineId).toBe('dosbox-wasm');
    expect(dosDisquete?.isPlayable).toBe(true);
    expect(dosDisquete?.status).toBe('playable');
    expect(dosDisquete?.appId).toBe('dosgame');
    expect(dosDisquete?.entryExecutable).toBe('DISQUETE.COM');
    expect(dosDisquete?.virtualPath).toBe('A:/DISQUETE.COM');
  });

  it('mantém entradas de museu com status honesto sem simulação de execução', () => {
    const catalog = loadBaseCatalog();
    const museumDoom = catalog.find(g => g.title === 'Doom');
    expect(museumDoom).toBeDefined();
    expect(museumDoom?.status).toBe('museum');
    expect(museumDoom?.isPlayable).toBe(false);
    expect(museumDoom?.appId).toBeNull();
    expect(museumDoom?.metadataOrigin).toBe('builtin-museum');
  });

  it('registra adaptadores de engine modulares com estados transparentes', () => {
    expect(ENGINE_ADAPTERS.length).toBe(5);

    const dosbox = getEngineAdapter('dosbox-wasm');
    expect(dosbox?.isAvailable).toBe(true);
    expect(dosbox?.supportedPlatforms).toContain('dos');

    const nativeJs = getEngineAdapter('native-js');
    expect(nativeJs?.isAvailable).toBe(true);

    const scummvm = getEngineAdapter('scummvm-web');
    expect(scummvm?.isAvailable).toBe(false);
    expect(scummvm?.availabilityNotes).toContain('Futuro');

    const jsDosV7 = getEngineAdapter('js-dos-v7');
    expect(jsDosV7?.isAvailable).toBe(false);
  });

  it('executa benchmark com catálogo sintético grande (3.000 itens) sem corromper metadados', () => {
    const start = performance.now();
    const synthetic = generateSyntheticBenchmarkCatalog(3000);
    const duration = performance.now() - start;

    expect(synthetic.length).toBe(3000);
    expect(duration).toBeLessThan(100); // Geração e indexação em < 100ms
    expect(synthetic[0].metadataOrigin).toBe('synthetic-benchmark');
    expect(synthetic[0].title).toContain('[BENCHMARK]');

    // Filtragem em catálogo sintético de grande escala
    const filterStart = performance.now();
    const filtered = synthetic.filter(g => g.genre === 'RPG');
    const filterDuration = performance.now() - filterStart;

    expect(filtered.length).toBeGreaterThan(0);
    expect(filterDuration).toBeLessThan(20); // Busca e filtro em < 20ms
  });

  it('permite adicionar jogo customizado mantendo isolamento e integridade', () => {
    const custom: GameEntry = {
      id: 'test-custom-game-001',
      title: 'Labirinto das Cavernas DOS',
      year: 1991,
      platform: 'dos',
      platformDisplay: 'MS-DOS WebAssembly',
      genre: 'Labirinto',
      developer: 'Retro Dev',
      publisher: 'Indie',
      description: 'Jogo livre de demonstração adicionado para testes.',
      status: 'playable',
      isFavorite: true,
      isInstalled: true,
      isPlayable: true,
      appId: 'dosgame',
      engineId: 'dosbox-wasm',
      entryExecutable: 'CAVERNA.EXE',
      virtualPath: 'A:/GAMES/CAVERNA.EXE',
      dateAdded: new Date().toISOString(),
      playCount: 1,
      metadataOrigin: 'user-imported'
    };

    saveCustomGame(custom);
    const updatedCatalog = loadBaseCatalog();
    const retrieved = updatedCatalog.find(g => g.id === 'test-custom-game-001');

    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe('Labirinto das Cavernas DOS');
    expect(retrieved?.isFavorite).toBe(true);
    expect(retrieved?.engineId).toBe('dosbox-wasm');
  });
});
