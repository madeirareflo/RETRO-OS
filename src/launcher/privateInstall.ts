import {SHAREWARE_GAMES} from './sharewareGames';
import {installRuntimeGame} from './runtime37/install';
import {runtimeInstallationId} from './runtime37/integration';
import {getGamePackage,storeGamePackage,removeGameCompletely,sha256} from './storageManager';
import {inspectPreparedPackage,preparedEntry} from './preparedProfiles';
import {saveCustomGame} from './catalogStore';
import {read} from '../storage/local';import type {GameEntry} from './types';
let running:Promise<string>|null=null;
export function installLocalPrivateGames(){if(!import.meta.env.DEV||!['127.0.0.1','localhost'].includes(location.hostname))return Promise.resolve('');if(running)return running;running=install().finally(()=>{running=null});return running}
async function install(){
 const response=await fetch('/__retro_private/manifest');if(response.status===404)return '';if(!response.ok)throw Error('Instalação privada indisponível.');if(!response.headers.get('Content-Type')?.includes('application/json'))return '';
 const rows=await response.json();if(!Array.isArray(rows)||rows.length>37)throw Error('Manifesto privado inválido.');let count=0,preserved=0;const failures:string[]=[];
 for(const row of rows){try{
  if(typeof row.id!=='string'||!/^imported-private-[a-z0-9-]+$/.test(row.id)||typeof row.sha256!=='string'||!/^[a-f0-9]{64}$/.test(row.sha256)||typeof row.profileId!=='string')throw Error('Registro privado inválido.');
  const runtime=row.profileId.startsWith('dos-'),id=runtime?runtimeInstallationId(row.profileId):row.id;
  const existing=read<GameEntry[]>('launcherCustomGames',[]).find(g=>g.id===id);
  if(existing){const data=await getGamePackage(id);if(data&&await sha256(data)===row.sha256){preserved++;continue}throw Error('Instalação existente divergente ou incompleta. Seus dados foram preservados; restaure pelo importador.')}
  if(SHAREWARE_GAMES.some(g=>g.profileId===row.profileId)){preserved++;continue}
  const r=await fetch('/__retro_private/package/'+encodeURIComponent(row.id));if(!r.ok)throw Error('Pacote privado ausente.');const data=await r.arrayBuffer();if(data.byteLength!==row.bytes||await sha256(data)!==row.sha256)throw Error('Integridade do pacote privado inválida.');
  if(runtime){await installRuntimeGame(row.profileId,row.fileName,data,String(row.title).slice(0,120));count++;continue}
  const checked=await inspectPreparedPackage(row.profileId,row.fileName,data);await storeGamePackage(id,row.fileName,data,row.profileId);const entry=preparedEntry(row.profileId,id,checked.executables[0],checked.files.map(f=>f.name));entry.title=String(row.title).slice(0,120);entry.description+=' Instalação pessoal privada; não acompanha a build.';
  try{saveCustomGame(entry)}catch(error){await removeGameCompletely(id,true);throw error}count++;
 }catch(error){failures.push(String(row.title||row.profileId)+': '+String(error))}}
 return count+' novo(s) pacote(s) instalado(s); '+preserved+' instalação(ões) preservada(s).'+(failures.length?' '+failures.join(' | '):'');
}
