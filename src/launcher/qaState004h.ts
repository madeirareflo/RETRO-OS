import type {Language} from '../core/i18n';
import type {GameEntry} from './types';
import {getProfileById} from './runtime37/catalog37Games';
import {runtimeProfileId,engineReady} from './runtime37/integration';
export type QaState='A'|'B'|'C'|'D'|'E'|'F'|'G';
const labels:Record<Language,Record<QaState,string>>={
 'pt-BR':{A:'Jogável homologado',B:'Inicia, com pendências',C:'Pronto para teste humano',D:'Importação necessária',E:'Motor pendente',F:'Museu',G:'Bloqueado'},
 en:{A:'Playability approved',B:'Starts, with pending issues',C:'Ready for human testing',D:'Import required',E:'Engine pending',F:'Museum',G:'Blocked'},
 es:{A:'Jugabilidad homologada',B:'Inicia, con pendientes',C:'Listo para prueba humana',D:'Importación necesaria',E:'Motor pendiente',F:'Museo',G:'Bloqueado'}
};
// No runtime, installed flag or new import automatically earns A.
export function gameQaState(g:GameEntry,packageError=false):QaState|null{
 const profile=runtimeProfileId(g);
 if(!profile&&g.engineId!=='dosbox-wasm')return null;
 if(packageError)return 'G';
 const p=profile&&getProfileById(profile);
 if(p&&(p.engineId==='none'||p.status==='museum'))return 'F';
 if(!p&&g.engineId==='none')return 'F';
 if(profile&&!engineReady(profile))return 'E';
 if(!p&&g.engineId!=='dosbox-wasm')return 'E';
 if(!g.isPlayable||!g.isInstalled||!['licensed-builtin','user-imported'].includes(g.metadataOrigin||''))return 'D';
 if(g.metadataOrigin==='user-imported')return 'C';
 return ['imported-private-doom-shareware','imported-private-duke-shareware','imported-private-heretic','imported-private-quake','dos-freedoom','dos-klab'].includes(g.id)?'B':'C';
}
export function gameQaLabel(state:QaState,language:Language='pt-BR'){return labels[language][state]}
export function gameQaNotice(language:Language='pt-BR'){return {'pt-BR':'Instalado não significa homologado. B/C permitem iniciar um teste; áudio, controles e saves podem ter pendências. Licença de redistribuição é avaliada separadamente.',en:'Installed does not mean approved. B/C allow a test session; audio, controls and saves may have pending issues. Redistribution rights are reviewed separately.',es:'Instalado no significa homologado. B/C permiten una prueba; audio, controles y guardados pueden tener pendientes. La redistribución se evalúa por separado.'}[language]}
