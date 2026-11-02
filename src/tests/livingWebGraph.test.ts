import { describe, it, expect } from 'vitest';
import { LIVING_WEB_REGISTRY, searchWebRegistry } from '../museum/webRegistry';

describe('RETRO OS 004E — Arquitetura de Navegação & Grafo de Links', () => {

  it('todos os links internos do grafo apontam para páginas existentes no registro', () => {
    const allIds = new Set(Object.keys(LIVING_WEB_REGISTRY));
    const missingLinks: { source: string; target: string }[] = [];

    for (const [id, meta] of Object.entries(LIVING_WEB_REGISTRY)) {
      for (const target of meta.internalLinks) {
        // Trata sub-rotas como 'recreio/bia' onde 'recreio' é o base
        const baseTarget = target.split('/')[0];
        if (!allIds.has(target) && !allIds.has(baseTarget)) {
          missingLinks.push({ source: id, target });
        }
      }
    }

    expect(missingLinks).toEqual([]);
  });

  it('o buscador retorna resultados relevantes e distintos para consultas chave', () => {
    const testCases = [
      { query: 'jogos', expectId: 'jogos' },
      { query: 'windows', expectId: 'forum/windows' },
      { query: 'lan house', expectId: 'lanhouse' },
      { query: 'blog', expectId: 'blog' },
      { query: 'comunidade', expectId: 'recreio' },
      { query: 'computador', expectId: 'forum' },
      { query: 'música', expectId: 'musica' },
      { query: 'secreto', expectId: 'secreto/lab1999' }
    ];

    for (const tc of testCases) {
      const results = searchWebRegistry(tc.query);
      if (results.length === 0) {
        console.error('Failed query:', tc.query);
      }
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.id === tc.expectId || r.id.startsWith(tc.expectId))).toBe(true);
    }
  });

  it('consultas vazias ou com espaços retornam array vazio', () => {
    expect(searchWebRegistry('')).toEqual([]);
    expect(searchWebRegistry('   ')).toEqual([]);
  });

  it('todas as páginas possuem URL iniciando com retro://', () => {
    for (const meta of Object.values(LIVING_WEB_REGISTRY)) {
      expect(meta.url.startsWith('retro://')).toBe(true);
      expect(meta.year).toBeGreaterThanOrEqual(1998);
      expect(meta.year).toBeLessThanOrEqual(2008);
    }
  });
});
