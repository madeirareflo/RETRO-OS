import {useContext,useEffect,useRef,useState,type KeyboardEvent} from 'react';
import {registry,type AppId,appInfo} from '../core/registry';
import {SystemThemeContext} from '../core/ThemeContext';
import {Icon} from '../components/Icon';
import type {Language} from '../core/i18n';
import {getTranslation} from '../core/i18n';

function menuKeys(e:KeyboardEvent<HTMLElement>){
  if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
  const buttons=Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')).filter(b=>b.getClientRects().length);
  const at=buttons.indexOf(document.activeElement as HTMLButtonElement);
  if(!buttons.length)return;
  e.preventDefault();
  const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(at+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;
  buttons[next]?.focus();
}

export function StartMenu({open,classic,restart,shutdown,language='pt-BR'}:{open:(id:AppId)=>void;classic:boolean;restart:()=>void;shutdown:()=>void;language?:Language}){
  const theme=useContext(SystemThemeContext),[group,setGroup]=useState(''),[nested,setNested]=useState('');
  const [cascadeTop,setCascadeTop]=useState<number|undefined>(undefined);
  const itemRefs=useRef<Record<string,HTMLButtonElement|null>>({});
  const hover=useRef<ReturnType<typeof setTimeout>|undefined>(undefined),root=useRef<HTMLElement>(null);
  const t = getTranslation(language);

  useEffect(()=>()=>clearTimeout(hover.current),[]);
  function updateCascadePosition(name:string){
    if(!name || ['help','run'].includes(name)){ setCascadeTop(undefined); return; }
    const btn = itemRefs.current[name];
    if(btn && root.current){
      const rootRect = root.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setCascadeTop(Math.round(btnRect.top - rootRect.top));
    } else {
      setCascadeTop(undefined);
    }
  }
  function chooseGroup(name:string){clearTimeout(hover.current);setGroup(name);setNested('');updateCascadePosition(name);}
  function schedule(name:string){clearTimeout(hover.current);hover.current=setTimeout(()=>{setGroup(name);setNested('');updateCascadePosition(name);},160)}
  const appButton=(id:AppId,size=20)=>{
    const app=appInfo(id,language);
    return <button key={id} onClick={()=>open(id)}><Icon name={app.icon} size={size}/><span>{app.name}</span></button>;
  };

  const groupKeys = [
    {key: 'programs', label: t.programs},
    {key: 'documents', label: t.documents},
    {key: 'settings', label: t.settings},
    {key: 'search', label: t.search},
    {key: 'help', label: t.help},
    {key: 'run', label: t.run}
  ];

  const groupContent=(key:string)=>key==='settings'?(
    <>
      <button onClick={()=>open('settings')}><Icon name="settings" size={16}/><span>{t.controlPanel}</span></button>
      <button onClick={()=>open('settings')}><span>{t.appearanceEllipsis}</span></button>
      <button onClick={()=>open('dialup')}><Icon name="globe" size={16}/><span>{t.dialupConnections}</span></button>
      <button onClick={()=>open('tasks')}><Icon name="computer" size={16}/><span>{language==='en'?'Task Manager':language==='es'?'Administrador de tareas':'Gerenciador de Tarefas'}</span></button>
    </>
  ):key==='documents'?(
    <>
      {appButton('documents', 16)}
      {appButton('floppy', 16)}
    </>
  ):key==='search'?(
    <>
      <button onClick={()=>open('computer')}><Icon name="computer" size={16}/><span>{t.filesOrFolders}</span></button>
      <button onClick={()=>open('internet')}><Icon name="globe" size={16}/><span>{t.onInternet}</span></button>
    </>
  ):(
    <>
      {[{id: 'accessories', label: t.accessories},{id: 'games', label: t.games}].map(g=>(
        <div className="start-nested-anchor" key={g.id}>
          <button
            aria-expanded={nested===g.id}
            onMouseEnter={()=>setNested(g.id)}
            onClick={()=>setNested(nested===g.id?'':g.id)}
            onKeyDown={e=>{
              if(e.key==='ArrowRight'){
                const anchor=e.currentTarget.parentElement;
                setNested(g.id);
                requestAnimationFrame(()=>anchor?.querySelector<HTMLButtonElement>('.start-nested button')?.focus());
              }
            }}
          >
            <Icon name={g.id==='games'?'games':'folder'} size={16}/>
            <span>{g.label}</span>
            <span className="submenu-arrow">▸</span>
          </button>
          {nested===g.id&&(
            <div
              className="start-nested"
              onKeyDown={e=>{
                menuKeys(e);
                if(e.key==='ArrowLeft'){
                  e.preventDefault();
                  e.stopPropagation();
                  setNested('');
                  e.currentTarget.parentElement?.querySelector<HTMLButtonElement>('button')?.focus();
                }
              }}
            >
              {registry.filter(a=>a.group===(g.id==='games'?'Jogos':'Acessórios')).map(a=>appButton(a.id,16))}
            </div>
          )}
        </div>
      ))}
      <hr/>
      {registry.filter(a=>a.group==='Programas').map(a=>appButton(a.id,16))}
    </>
  );

  if(!classic) {
    return (
      <nav ref={root} className="start-menu luna-start" aria-label={t.start} onKeyDown={menuKeys}>
        <header className="luna-user-header">
          <div className="user-avatar"><Icon name="computer" size={34}/></div>
          <span className="user-name">{t.visitor}<small>{t.personalComputer}</small></span>
        </header>
        <div className="luna-columns">
          <div className="luna-pinned">
            {(['internet','chat','paint','notepad','player','games'] as AppId[]).map((id,i)=>{
              const app=appInfo(id,language);
              return (
                <button key={id} className={'luna-app-button '+(i===2?'start-recent-first':'')} onClick={()=>open(id)}>
                  <Icon name={app.icon} size={32}/>
                  <span className="luna-app-text">
                    <b>{app.name}</b>
                    <small>{[t.appInternet,t.appChat,'','',t.appPlayer,t.appGames][i]}</small>
                  </span>
                </button>
              );
            })}
            <div className="luna-separator"/>
            <button
              className="all-programs"
              aria-expanded={group==='Todos'}
              onMouseEnter={()=>schedule('Todos')}
              onClick={()=>chooseGroup(group==='Todos'?'':'Todos')}
            >
              <b>{t.allPrograms}</b>
              <span className="luna-arrow-green">▶</span>
            </button>
          </div>
          <div className="luna-links">
            {(['documents','computer','timemachine','dialup','settings','run','about'] as AppId[]).map(id=>{
              const app=appInfo(id,language);
              return (
                <button
                  className={'luna-right-link '+(id==='settings'?'start-settings-link':'')}
                  key={id}
                  aria-label={id==='run'?(t.run+' ▸'):undefined}
                  onClick={()=>open(id)}
                >
                  <Icon name={app.icon} size={22}/>
                  <span>{id==='settings'?t.settings:id==='run'?t.run:id==='about'?t.helpAndSupport:app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        {group==='Todos'&&(
          <div className="luna-all-programs" onKeyDown={menuKeys}>
            {registry.map(a=>appButton(a.id,16))}
          </div>
        )}
        <footer className="luna-footer">
          <button className="luna-logoff-btn" onClick={restart}>
            <span className="luna-btn-icon">↻</span>
            <span>{t.restart}</span>
          </button>
          <button className="luna-shutdown-btn" onClick={shutdown}>
            <span className="luna-btn-icon">⏻</span>
            <span>{t.shutdown}</span>
          </button>
        </footer>
      </nav>
    );
  }

  const isWin2000 = theme === 'win2000';

  return (
    <nav
      ref={root}
      className={'start-menu classic-start '+(isWin2000?'nt-start':'win98-start')}
      aria-label={t.start}
      onKeyDown={menuKeys}
    >
      <div className="start-vertical" aria-hidden="true">
        {isWin2000 ? (
          <div className="nt-vertical-banner">
            <span className="nt-bold">Windows</span>
            <span className="nt-light">2000</span>
            <small className="nt-edition">Professional</small>
          </div>
        ) : (
          <div className="win98-vertical-banner">
            <span className="win98-bold">Windows</span>
            <span className="win98-version">98</span>
          </div>
        )}
      </div>
      <div className="start-columns">
        <div className="start-categories">
          {groupKeys.map((item,i)=>(
            <button
              key={item.key}
              ref={el=>{itemRefs.current[item.key]=el;}}
              className={group===item.key?'highlight':''}
              aria-label={item.key==='run'?(t.run+' ▸'):item.label+' ▸'}
              aria-expanded={['help','run'].includes(item.key)?undefined:group===item.key}
              onMouseEnter={()=>schedule(item.key)}
              onClick={()=>{
                chooseGroup(item.key);
                if(item.key==='run')open('run');
                if(item.key==='help')open('about');
              }}
              onKeyDown={e=>{
                if(e.key==='ArrowRight'&&!['help','run'].includes(item.key)){
                  e.preventDefault();
                  chooseGroup(item.key);
                  requestAnimationFrame(()=>root.current?.querySelector<HTMLButtonElement>('.start-programs button')?.focus());
                }
              }}
            >
              <Icon name={['folder','note','settings','globe','help','terminal'][i]} size={isWin2000?18:22}/>
              <span>{item.label}</span>
              {!['help','run'].includes(item.key)&&<span className="submenu-arrow">▸</span>}
            </button>
          ))}
          <hr className="classic-start-divider"/>
          <button className="classic-quick-logoff" onClick={restart}>
            <Icon name="computer" size={isWin2000?18:20}/>
            <span>{language==='en'?'Log Off Visitor...':language==='es'?'Cerrar sesión...':'Efetuar logoff...'}</span>
          </button>
        </div>
        {group&&!['help','run'].includes(group)&&(
          <div
            className="start-programs cascade"
            style={cascadeTop !== undefined ? { top: `${cascadeTop}px`, bottom: 'auto' } : undefined}
            onKeyDown={e=>{
              menuKeys(e);
              e.stopPropagation();
              if(e.key==='ArrowLeft'){
                e.preventDefault();
                setGroup('');
                root.current?.querySelector<HTMLButtonElement>('.start-categories .highlight')?.focus();
              }
            }}
          >
            {groupContent(group)}
          </div>
        )}
      </div>
      <footer>
        <button onClick={restart}><Icon name="computer" size={20}/><span>{t.restart}</span></button>
        <button onClick={shutdown}><Icon name="settings" size={20}/><span>{t.shutdown}</span></button>
      </footer>
    </nav>
  );
}
