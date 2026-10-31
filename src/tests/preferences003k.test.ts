import {describe,it,expect} from 'vitest';
import {mergePreferences} from '../themes/preferences';
import type {Preferences} from '../core/contracts';
const base:Preferences={theme:'xp',wallpaper:'night',muted:true,volume:.4,boot:false,xpColor:'silver',era:2005};
describe('preferências preservadas durante prévia e restauração 003K',()=>{
 it('não troca um papel de parede explícito ao restaurar tema clássico',()=>{expect(mergePreferences(base,{theme:'classic',wallpaper:'night'}).wallpaper).toBe('night')});
 it('mantém o padrão histórico quando o usuário só escolhe um tema',()=>{expect(mergePreferences(base,{theme:'classic'}).wallpaper).toBe('teal');expect(mergePreferences({...base,theme:'classic'},{theme:'xp'}).wallpaper).toBe('hills')});
 it('mudar a época ou cor preserva o papel de parede e as outras preferências',()=>{const result=mergePreferences(base,{era:2008,xpColor:'blue'});expect(result.wallpaper).toBe('night');expect(result.muted).toBe(true);expect(result.era).toBe(2008)});
 it('não modifica o objeto anterior nem o patch',()=>{const previous={...base},patch={theme:'win2000' as const};mergePreferences(previous,patch);expect(previous).toEqual(base);expect(patch).toEqual({theme:'win2000'})});
});
