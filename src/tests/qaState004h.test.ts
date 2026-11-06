import {describe,it,expect} from 'vitest';
import {gameQaState,gameQaLabel} from '../launcher/qaState004h';
import {loadBaseCatalog} from '../launcher/catalogStore';
import {CATALOG_37_GAMES} from '../launcher/runtime37/catalog37Games';
import {runtimeProfileId} from '../launcher/runtime37/integration';
import {nativeSavePath,restoreNativeSaves} from '../launcher/saveRestore004h';
import type {SaveMetadata} from '../launcher/storageManager';
describe('004H honest state and native data',()=>{
 it('reconciles all 37 profiles without inventing approval',()=>{const entries=loadBaseCatalog();for(const p of CATALOG_37_GAMES){const matches=entries.filter(g=>runtimeProfileId(g)===p.id);expect(matches.length).toBeGreaterThan(0);for(const g of matches){expect(gameQaState(g)).not.toBeNull();expect(gameQaState(g)).not.toBe('A');if(!g.isPlayable)expect(['D','E','F']).toContain(gameQaState(g))}}});
 it('does not approve a new import or an installed museum flag',()=>{const g=loadBaseCatalog().find(g=>g.id==='imported-private-prince')!;expect(gameQaState({...g,metadataOrigin:'user-imported'})).toBe('C');expect(gameQaState({...g,isInstalled:false})).toBe('D');expect(gameQaState(g,true)).toBe('G');const m=loadBaseCatalog().find(g=>g.engineId==='none')!;expect(gameQaState({...m,isInstalled:true})).not.toBe('A')});
 it('keeps distinct translated states in all three languages',()=>{for(const lang of ['pt-BR','en','es'] as const)expect(new Set((['A','B','C','D','E','F','G'] as const).map(s=>gameQaLabel(s,lang))).size).toBe(7)});
 it('never restores active scripts or path traversal as a save',()=>{for(const path of ['../SAVE.DAT','BAD.EXE','AUTOEXEC.BAT','SCRIPT.PS1','RUN.CMD'])expect(nativeSavePath(path)).toBe(false);expect(nativeSavePath('ID1/H004Q.SAV')).toBe(true)});
 it('keeps the newest native progress and ignores malformed fallback',()=>{const record={fileName:'SLOT.SAV',dataBase64:btoa('new'),lastModified:'2026-11-03T01:00:00Z'} as SaveMetadata;expect(restoreNativeSaves([record],{at:'2020-01-01',files:{'SLOT.SAV':[1]}})['SLOT.SAV']).toEqual([110,101,119]);expect(restoreNativeSaves([record],{at:'2026-11-04',files:{'SLOT.SAV':[2],'BAD.EXE':[1],'INVALID.SAV':[999]}})).toEqual({'SLOT.SAV':[2]})});
});
