import {describe, it, expect} from 'vitest';
import {museumSites, siteYears} from '../museum/sites';
import {people, communities} from '../museum/social';

describe('RETRO OS 003X — Internet Nostalgia Ecosystem 1998–2008', () => {
  it('contém catálogo robusto de sites fictícios e anos atribuídos', () => {
    expect(museumSites.length).toBeGreaterThanOrEqual(10);
    for (const [id, title, desc] of museumSites) {
      expect(id).toBeTruthy();
      expect(title).toBeTruthy();
      expect(desc).toBeTruthy();
      expect(siteYears[id]).toBeDefined();
      expect(siteYears[id]).toBeGreaterThanOrEqual(1998);
      expect(siteYears[id]).toBeLessThanOrEqual(2008);
    }
  });

  it('Rede Recreio contém comunidades e personagens fictícios sem dados de terceiros', () => {
    expect(people.length).toBeGreaterThanOrEqual(4);
    expect(communities.length).toBeGreaterThanOrEqual(4);
    for (const p of people) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.nick).toBeTruthy();
      expect(p.about).toBeTruthy();
      expect(p.interests).toBeTruthy();
    }
    for (const c of communities) {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.description).toBeTruthy();
    }
  });
});
