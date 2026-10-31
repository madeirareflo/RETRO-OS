import {Naval} from './Naval';
import {TaskManager} from './TaskManager';
import {Lan} from './Lan';
import {Community} from './Community';
import {Messenger} from './Messenger';
import {useState} from 'react';
import {registry,type AppId} from '../core/registry';
import type {Preferences} from '../core/contracts';
import {Icon} from '../components/Icon';
import {Notepad} from './Notepad';
import {Explorer} from './Explorer';
import {Paint} from './Paint';
import {Player} from './Player';
import {Calculator} from './Calculator';
import {Terminal} from './Terminal';
import {Internet} from './Internet';
import {Chat} from './Chat';
import {Settings} from './Settings';
import {Mines} from '../games/Mines';
import {Snake} from '../games/Snake';
import {read} from '../storage/local';
import {Dialup} from './Dialup';
import {TimeMachine} from './TimeMachine';
import {SaverSettings} from './Screensaver';
import {Backup} from './Backup';
import {MediaCenter} from './MediaCenter';
import {Trash} from './Trash';
import type {FileRequest} from './Notepad';
import {Solitaire} from '../games/Solitaire';
function Run({open}:{open:(id:AppId)=>void}){const [command,setCommand]=useState(''),[error,setError]=useState('');return <form className="dialog-message" onSubmit={e=>{e.preventDefault();const aliases:Record<string,AppId>={notepad:'notepad',paint:'paint',calc:'calculator',cmd:'terminal',sol:'solitaire',winmine:'mines',snake:'snake',control:'settings',internet:'internet'};const id=aliases[command.toLowerCase()]||registry.find(a=>a.name.toLowerCase()===command.toLowerCase())?.id;if(id){open(id);setError('Programa aberto.')}else setError('Programa não encontrado. Tente notepad, paint, calc, cmd, sol ou control.')}}><p>Digite o nome de um programa virtual.</p><label>Abrir: <input aria-label="Programa a executar" value={command} onChange={e=>setCommand(e.target.value)}/></label><button>Executar</button><p role="status">{error}</p><small>Arquivos executáveis do computador real não são aceitos.</small></form>}
export function AppHost({id,open,close,prefs,setPrefs,active,request,activateSaver}:{id:AppId;open:(id:AppId)=>void;close:()=>void;prefs:Preferences;setPrefs:(p:Partial<Preferences>)=>void;active:boolean;request?:FileRequest;activateSaver:()=>void}){
switch(id){case 'naval':return <Naval/>;case 'tasks':return <TaskManager/>;case 'lan':return <Lan/>;case 'community':return <Community/>;case 'messenger':return <Messenger/>;case 'computer':return <Explorer/>;case 'documents':return <Explorer initial="C:/Meus Documentos"/>;case 'floppy':return <Explorer initial={read<number>('floppyVolume',1)===2?'A:/Lan house':'A:'}/>;case 'notepad':return <Notepad request={request}/>;case 'paint':return <Paint request={request}/>;case 'player':return <Player prefs={prefs}/>;case 'calculator':return <Calculator/>;case 'terminal':return <Terminal close={close}/>;case 'internet':return <Internet era={prefs.era||2001} open={open}/>;case 'chat':return <Chat/>;case 'settings':return <Settings prefs={prefs} setPrefs={setPrefs} activateSaver={activateSaver}/>;case 'mines':return <Mines active={active}/>;case 'snake':return <Snake active={active}/>;case 'solitaire':return <Solitaire/>;case 'run':return <Run open={open}/>;case 'games':return <div className="games-center"><header><small>INSIRA UMA BOA LEMBRANÇA</small><h1>Mais uma partida?</h1><p>Sem fichas. Sem pressa. Só diversão.</p></header><div>{registry.filter(a=>['mines','snake','solitaire'].includes(a.id)).map((a,i)=><button key={a.id} onClick={()=>open(a.id)}><Icon name={a.icon} size={48}/><span><b>{a.name}</b><small>{['Um clique de coragem.','Só mais um pixel.','As cartas estão na mesa.'][i]}</small></span><strong>JOGAR →</strong></button>)}</div><footer>Recordes locais · Jogos originais em JavaScript</footer></div>;case 'dialup':return <Dialup/>;case 'timemachine':return <TimeMachine prefs={prefs} setPrefs={setPrefs} open={open}/>;case 'saver':return <SaverSettings prefs={prefs} setPrefs={setPrefs} activate={activateSaver}/>;case 'backup':return <Backup/>;case 'media':return <MediaCenter open={open}/>;case 'trash':return <Trash/>;case 'about':return <article className="about-app"><div className="brand-mark">R<span>OS</span></div><small>PROJETO DAVI APRESENTA</small><h1>RETRO OS<span>002</span></h1><h2>Seu primeiro computador.<br/>Sua próxima boa memória.</h2><p>Uma homenagem original às tardes de lan house, disquetes de escola e primeiros passos na internet brasileira.</p><div className="about-specs"><span>MEMÓRIA<br/><b>640K de saudade</b></span><span>CONEXÃO<br/><b>Direto para 2001</b></span></div><p>Duplo clique nos ícones para começar. Arraste janelas, crie um desenho e descubra mais de dez segredos pelo caminho.</p><button onClick={()=>open('games')}>Abrir Central de Jogos</button> <button onClick={()=>open('settings')}>Personalizar meu computador</button><footer>v0.2.0 · Feito no Brasil · Independente de Microsoft e TheBomb<br/>Seus dados ficam neste navegador. Exporte textos e desenhos para guardá-los.</footer></article>}}
