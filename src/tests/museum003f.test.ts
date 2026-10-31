import {describe,it,expect} from 'vitest';
import original from '../../archive/social-003e/game-catalog-original.json';
import data from '../data/game-catalog.json';
import {validLocalShip,newNaval} from '../games/LocalNaval';
import {people,communities} from '../museum/social';
import {siteYears} from '../museum/sites';
describe('003F museu e preservação',()=>{
it('preserva byte a byte o catálogo original de 74 entradas',()=>{expect(data.games).toHaveLength(74);expect(data).toEqual(original)});
it('todos os vínculos de perfis, recados e comunidades apontam para personagens existentes',()=>{const ids=new Set(people.map(p=>p.id)),groups=new Set(communities.map(c=>c.id));for(const p of people){expect(p.status).toContain('simulado');for(const id of [...p.friends,...p.scraps.map(s=>s.from),...p.testimonials.map(t=>t.from)])expect(ids.has(id)).toBe(true);for(const id of p.communities)expect(groups.has(id)).toBe(true)}for(const c of communities)for(const t of c.threads){expect(ids.has(t.author)).toBe(true);for(const r of t.replies)expect(ids.has(r.author)).toBe(true)}});
it('arquétipos sociais não antecedem sua exposição editorial',()=>{expect(siteYears.recreio).toBe(2004);expect(siteYears.fotolog).toBe(2002)});
it('recusa navio que cruza borda, sobrepõe, sai do tabuleiro ou é diagonal',()=>{expect(validLocalShip([6,7,8],[])).toBe(false);expect(validLocalShip([0,1,2],[1])).toBe(false);expect(validLocalShip([56,64],[])).toBe(false);expect(validLocalShip([0,9],[])).toBe(false);expect(validLocalShip([2,10,18],[])).toBe(true);expect(newNaval().fleets).toEqual([[],[]])});
});
