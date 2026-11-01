import {describe, it, expect} from 'vitest';
import {getTranslation, type Language} from '../core/i18n';
import {appInfo, registry} from '../core/registry';

describe('RETRO OS — Sistema de Idiomas (i18n)', () => {
  it('contém dicionários completos para pt-BR, en e es', () => {
    const langs: Language[] = ['pt-BR', 'en', 'es'];
    for (const lang of langs) {
      const t = getTranslation(lang);
      expect(t.start).toBeTruthy();
      expect(t.programs).toBeTruthy();
      expect(t.documents).toBeTruthy();
      expect(t.settings).toBeTruthy();
      expect(t.restart).toBeTruthy();
      expect(t.shutdown).toBeTruthy();
      expect(t.appComputer).toBeTruthy();
      expect(t.appTrash).toBeTruthy();
      expect(t.playGame).toBeTruthy();
      expect(t.launcherTitle).toBeTruthy();
    }
  });

  it('traduz nomes dos aplicativos no registro dinamicamente', () => {
    const computerPt = appInfo('computer', 'pt-BR');
    const computerEn = appInfo('computer', 'en');
    const computerEs = appInfo('computer', 'es');

    expect(computerPt.name).toBe('Meu Computador');
    expect(computerEn.name).toBe('My Computer');
    expect(computerEs.name).toBe('Mi PC');

    const trashPt = appInfo('trash', 'pt-BR');
    const trashEn = appInfo('trash', 'en');
    const trashEs = appInfo('trash', 'es');

    expect(trashPt.name).toBe('Lixeira');
    expect(trashEn.name).toBe('Recycle Bin');
    expect(trashEs.name).toBe('Papelera de reciclaje');
  });

  it('preserva integridade de todos os AppIds registrados', () => {
    for (const app of registry) {
      const infoEn = appInfo(app.id, 'en');
      const infoEs = appInfo(app.id, 'es');
      expect(infoEn.id).toBe(app.id);
      expect(infoEs.id).toBe(app.id);
      expect(infoEn.name.length).toBeGreaterThan(0);
      expect(infoEs.name.length).toBeGreaterThan(0);
    }
  });
});
