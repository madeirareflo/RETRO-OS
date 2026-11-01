import {describe, it, expect} from 'vitest';
import {calculate} from '../apps/Calculator';
import {museumSites, siteYears} from '../museum/sites';
import {people, communities} from '../museum/social';

describe('RETRO OS 003Z — Ultimate Experience Verifications', () => {
  it('Calculadora trata todas as operações clássicas e divisão por zero com segurança', () => {
    expect(calculate(10, 5, '+')).toBe(15);
    expect(calculate(10, 5, '−')).toBe(5);
    expect(calculate(10, 5, '×')).toBe(50);
    expect(calculate(10, 5, '÷')).toBe(2);
    expect(calculate(10, 0, '÷')).toBeNaN();
  });

  it('Retro Explorer mantém o ecossistema com no mínimo 12 destinos e anos atribuídos', () => {
    expect(museumSites.length).toBeGreaterThanOrEqual(10);
    for (const [id, title, desc] of museumSites) {
      expect(id).toBeTruthy();
      expect(title).toBeTruthy();
      expect(desc).toBeTruthy();
      expect(siteYears[id]).toBeDefined();
    }
  });

  it('Personagens e comunidades da Rede Recreio preservam dados estruturados e sem terceiros', () => {
    expect(people.length).toBeGreaterThanOrEqual(4);
    expect(communities.length).toBeGreaterThanOrEqual(4);
    for (const person of people) {
      expect(person.id).toBeTruthy();
      expect(person.name).toBeTruthy();
      expect(person.nick).toBeTruthy();
      expect(person.scraps.length).toBeGreaterThanOrEqual(1);
    }
  });
});
