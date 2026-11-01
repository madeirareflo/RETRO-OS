import {describe, it, expect} from 'vitest';
import {loadBaseCatalog} from '../launcher/catalogStore';
import {SHAREWARE_GAMES} from '../launcher/sharewareGames';

describe('Restauração dos 8 Jogos Clássicos Autorizados (003S)', () => {
  it('loadBaseCatalog contém os 8 jogos como instalados e jogáveis por padrão', () => {
    const catalog = loadBaseCatalog();
    const playableDos = catalog.filter(g => g.isPlayable && g.isInstalled && g.engineId === 'dosbox-wasm' && g.id !== 'dos-disquete');
    
    // Devem existir 3 built-in livres + 5 shareware oficiais
    expect(playableDos).toHaveLength(8);

    const ids = playableDos.map(g => g.id);
    expect(ids).toContain('dos-freedoom');
    expect(ids).toContain('dos-klab');
    expect(ids).toContain('dos-skyroads');
    expect(ids).toContain('imported-private-prince');
    expect(ids).toContain('imported-private-doom-shareware');
    expect(ids).toContain('imported-private-duke-shareware');
    expect(ids).toContain('imported-private-heretic');
    expect(ids).toContain('imported-private-quake');
  });

  it('todos os 5 pacotes shareware possuem arquivos válidos e configurados', () => {
    expect(SHAREWARE_GAMES).toHaveLength(5);
    for (const game of SHAREWARE_GAMES) {
      expect(game.packageFile).toMatch(/\.zip$/);
      expect(game.sha256).toHaveLength(64);
      expect(game.bytes).toBeGreaterThan(100000);
      expect(game.executable).toMatch(/\.EXE$/);
    }
  });
});
