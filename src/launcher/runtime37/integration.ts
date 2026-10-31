import {CATALOG_37_GAMES,getProfileById} from './catalog37Games';
import {resolveGameAction} from './actionResolver';import type {GameEntry} from '../types';
const museumNumbers=[1,2,3,4,5,6,7,8,9,11,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41];
const byMuseum=new Map(museumNumbers.map((n,i)=>['museum-'+n,CATALOG_37_GAMES[i].id]));
const legacy:Record<string,string>={prince:'dos-prince-1990','doom-shareware':'dos-doom-1993','duke-shareware':'dos-duke3d-1996'};
export function runtimeProfileId(g:GameEntry){return g.runtimeProfileId||byMuseum.get(g.id)||legacy[g.preparedProfileId||'']}
export function engineReady(id:string){const p=getProfileById(id);return !!p&&p.engineId==='dosbox-wasm'&&id!=='dos-quake2-1997'}
export function runtimeAction(g:GameEntry){const id=runtimeProfileId(g),p=id&&getProfileById(id);return p?resolveGameAction(p,!!g.isInstalled&&g.metadataOrigin==='user-imported'&&g.isPlayable,engineReady(p.id)):null}
export function reconcile37(entries:GameEntry[]){const installedProfiles=new Set(entries.filter(g=>g.metadataOrigin==='user-imported'&&g.runtimeProfileId&&g.isInstalled).map(g=>g.runtimeProfileId));return entries.filter(g=>!byMuseum.has(g.id)||!installedProfiles.has(byMuseum.get(g.id))).map(g=>{const id=runtimeProfileId(g);return id?{...g,runtimeProfileId:id,customCollections:[...new Set([...(g.customCollections||[]),'37 clássicos'])]}:g})}
