import { describe, it, expect } from 'vitest';
import { LIVING_WEB_REGISTRY, searchWebRegistry } from '../museum/webRegistry';

describe('RETRO OS 004F — The Lost Internet: Três Tramas Narrativas & Arqueologia Digital', () => {

  // TRAMA 1: O Segredo do Laboratório de 1999
  it('Trama 1: Acesso, manifesto e pistas do Laboratório de 1999', () => {
    const labPage = LIVING_WEB_REGISTRY['secreto/lab1999'];
    expect(labPage).toBeDefined();
    expect(labPage.category).toBe('secret');
    expect(labPage.url).toBe('retro://secreto/lab1999');
    expect(labPage.keywords).toContain('manifesto');
    expect(labPage.keywords).toContain('fundadores');

    // Nina possui vínculo narrativo direto com o laboratório
    const blogNina = LIVING_WEB_REGISTRY['blog/nina'];
    expect(blogNina).toBeDefined();
    expect(blogNina.internalLinks).toContain('secreto/lab1999');

    // Busca por lab1999 deve encontrar o arquivo secreto
    const results = searchWebRegistry('lab1999');
    expect(results.some(r => r.id === 'secreto/lab1999')).toBe(true);
  });

  // TRAMA 2: A LAN House Desaparecida
  it('Trama 2: CyberSpace LAN House, campeonatos e táticas', () => {
    const lanPage = LIVING_WEB_REGISTRY['lanhouse'];
    expect(lanPage).toBeDefined();
    expect(lanPage.category).toBe('games');
    expect(lanPage.internalLinks).toContain('forum/jogos');
    expect(lanPage.internalLinks).toContain('blog/leo');

    // Léo é o embaixador e jogador principal da LAN House
    const blogLeo = LIVING_WEB_REGISTRY['blog/leo'];
    expect(blogLeo.keywords).toContain('lanhouse');
    expect(blogLeo.internalLinks).toContain('lanhouse');

    // Snapshots históricos da LAN cobrem inauguração, corujão e memorial
    expect(lanPage.snapshots).toBeDefined();
    expect(lanPage.snapshots!.length).toBeGreaterThanOrEqual(3);
    expect(lanPage.snapshots!.some(s => s.year === 2008 && s.title.includes('Memorial'))).toBe(true);
  });

  // TRAMA 3: A Turma do Recreio & Redes Pessoais
  it('Trama 3: A Turma do Recreio, Fotologs e Diários Pessoais', () => {
    const recreio = LIVING_WEB_REGISTRY['recreio'];
    const fotolog = LIVING_WEB_REGISTRY['fotolog'];
    expect(recreio).toBeDefined();
    expect(fotolog).toBeDefined();

    // Personagens Bia, Léo, Nina e Rafa possuem perfis e blogs vinculados
    expect(LIVING_WEB_REGISTRY['recreio/bia']).toBeDefined();
    expect(LIVING_WEB_REGISTRY['recreio/leo']).toBeDefined();
    expect(LIVING_WEB_REGISTRY['recreio/rafa']).toBeDefined();
    expect(LIVING_WEB_REGISTRY['recreio/nina']).toBeDefined();

    expect(LIVING_WEB_REGISTRY['blog/bia']).toBeDefined();
    expect(LIVING_WEB_REGISTRY['blog/rafa']).toBeDefined();
    expect(LIVING_WEB_REGISTRY['blog/nina']).toBeDefined();

    // Fotolog possui snapshots datados
    expect(fotolog.snapshots!.length).toBeGreaterThanOrEqual(2);
  });

  // ARQUIVO HISTÓRICO & INTEGRIDADE TEMPORAL
  it('Arquivo Histórico e busca com filtros temporais de 1998 a 2008', () => {
    const arquivo = LIVING_WEB_REGISTRY['arquivo'];
    expect(arquivo).toBeDefined();
    expect(arquivo.category).toBe('tools');

    // Busca restrita à era 1998 não deve retornar páginas lançadas a partir de 2004
    const results1998 = searchWebRegistry('recreio', 1998);
    expect(results1998.length).toBe(0);

    // Busca na era 2004 deve retornar a Rede Recreio
    const results2004 = searchWebRegistry('recreio', 2004);
    expect(results2004.length).toBeGreaterThan(0);
    expect(results2004[0].id).toBe('recreio');
  });

});
