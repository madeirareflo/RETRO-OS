import { describe, it, expect } from 'vitest';
import { LIVING_WEB_REGISTRY } from '../museum/webRegistry';

describe('RETRO OS 004E — Linha do Tempo da Internet (1998–2008)', () => {

  it('diferencia as épocas da web em eras coerentes', () => {
    const web10 = Object.values(LIVING_WEB_REGISTRY).filter(p => p.year <= 2000);
    const portalsForums = Object.values(LIVING_WEB_REGISTRY).filter(p => p.year >= 2001 && p.year <= 2003);
    const socialBlogs = Object.values(LIVING_WEB_REGISTRY).filter(p => p.year >= 2004 && p.year <= 2006);

    expect(web10.length).toBeGreaterThanOrEqual(5);
    expect(portalsForums.length).toBeGreaterThanOrEqual(5);
    expect(socialBlogs.length).toBeGreaterThanOrEqual(4);

    // Valida que portais pioneiros e discador estão na Web 1.0 (1998-2000)
    expect(LIVING_WEB_REGISTRY['portal-praca'].year).toBe(1998);
    expect(LIVING_WEB_REGISTRY['discador'].year).toBe(1998);
    expect(LIVING_WEB_REGISTRY['secreto/lab1999'].year).toBe(1999);

    // Valida que fóruns e LAN House amadurecem em 2001-2003
    expect(LIVING_WEB_REGISTRY['lanhouse'].year).toBe(2003);
    expect(LIVING_WEB_REGISTRY['forum'].year).toBe(2001);

    // Valida que redes sociais e blogs se destacam a partir de 2004
    expect(LIVING_WEB_REGISTRY['recreio'].year).toBe(2004);
    expect(LIVING_WEB_REGISTRY['blog/leo'].year).toBe(2004);
    expect(LIVING_WEB_REGISTRY['blog/bia'].year).toBe(2004);
  });

  it('todas as categorias são válidas e cada página possui palavras-chave exclusivas', () => {
    for (const page of Object.values(LIVING_WEB_REGISTRY)) {
      expect(['portal', 'blog', 'fotolog', 'forum', 'social', 'games', 'search', 'secret', 'personal', 'tools']).toContain(page.category);
      expect(page.keywords.length).toBeGreaterThanOrEqual(4);
    }
  });
});
