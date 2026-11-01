import {describe, it, expect} from 'vitest';
import {getTranslation, type Language} from '../core/i18n';

describe('RETRO OS 003W — Historical Windows Fidelity Dictionary', () => {
  it('contém traduções completas para menus e diálogos do Explorer nos 3 idiomas', () => {
    const langs: Language[] = ['pt-BR', 'en', 'es'];
    for (const lang of langs) {
      const t = getTranslation(lang);
      expect(t.explorerFile).toBeTruthy();
      expect(t.explorerEdit).toBeTruthy();
      expect(t.explorerView).toBeTruthy();
      expect(t.explorerFavorites).toBeTruthy();
      expect(t.explorerTools).toBeTruthy();
      expect(t.explorerHelp).toBeTruthy();
      expect(t.explorerBack).toBeTruthy();
      expect(t.explorerForward).toBeTruthy();
      expect(t.explorerUp).toBeTruthy();
      expect(t.explorerCut).toBeTruthy();
      expect(t.explorerCopy).toBeTruthy();
      expect(t.explorerPaste).toBeTruthy();
      expect(t.explorerDelete).toBeTruthy();
      expect(t.explorerProperties).toBeTruthy();
      expect(t.explorerFolders).toBeTruthy();
    }
  });
});
