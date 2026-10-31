import {describe,it,expect} from 'vitest';
import {clampRect} from '../window-manager/model';
describe('geometria histórica 003K',()=>{
 it('elimina coordenadas e dimensões fracionárias que desfocam bordas de um pixel',()=>{expect(clampRect({x:273.2,y:55.4,w:619.9,h:459.5},1366,740)).toEqual({x:273,y:55,w:620,h:460})});
 it('continua dentro da área útil ao arredondar perto das bordas',()=>{const r=clampRect({x:1000.7,y:700.9,w:719.7,h:549.8},1366,740);expect(r).toEqual({x:646,y:190,w:720,h:550});expect(Object.values(r).every(Number.isInteger)).toBe(true)});
 it('mantém a janela acessível em viewport menor que o tamanho mínimo nominal',()=>{expect(clampRect({x:50.5,y:60.5,w:500,h:400},240,160)).toEqual({x:0,y:0,w:240,h:160})});
});
