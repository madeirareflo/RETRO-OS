import {loadBaseCatalog} from '../launcher/catalogStore';
import {mergePreferences} from '../themes/preferences';
import {SystemTraySymbols} from '../components/SystemTraySymbols';
import {useState,useEffect,useRef,type PointerEvent} from 'react';
import {registry,appInfo,type AppId} from '../core/registry';
import type {Preferences} from '../core/contracts';
import {read,write} from '../storage/local';
import {sound} from '../services/audio';
import {Dialog} from '../components/Dialog';
import {SystemMark} from '../components/PeriodIcons';
import {Icon} from '../components/Icon';
import {Window,type WindowState} from '../window-manager/Window';
import {clampRect} from '../window-manager/model';
import {AppHost} from '../apps/AppHost';
import {SystemThemeContext} from '../core/ThemeContext';
import {StartMenu} from './StartMenu';
import {SaverCanvas} from '../apps/Screensaver';
import {useConnection} from '../services/connection';
import type {VFile} from '../storage/local';
import {catalog} from '../museum/gameCatalog';
import {getTranslation, type Language} from '../core/i18n';

const defaults:Preferences={theme:'mix',wallpaper:'hills',muted:true,volume:0.35,boot:true,xpColor:'blue',language:'pt-BR'};
type Position={x:number;y:number};
type Rect={x:number;y:number;w:number;h:number};

export function Desktop(){
  const [prefs,setPreferences]=useState(()=>({...defaults,...read<Partial<Preferences>>('prefs',{})}));
  const lang: Language = prefs.language || 'pt-BR';
  const t = getTranslation(lang);

  const [boot,setBoot]=useState(()=>read('prefs',defaults).boot);
  const [powered,setPowered]=useState(true);
  const [windows,setWindows]=useState<WindowState[]>([]);
  const [start,setStart]=useState(false);
  const [quick,setQuick]=useState(false);
  const [selected,setSelected]=useState('');
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const [marquee,setMarquee]=useState<Rect|null>(null);
  const marqueeOrigin=useRef<Position|null>(null);
  const [menu,setMenu]=useState<(Position&{app?:AppId})|null>(null);
  const [properties,setProperties]=useState<AppId|null>(null);
  const [positions,setPositions]=useState<Record<string,Position>>(()=>read('positions',{}));
  const [time,setTime]=useState(new Date());
  const [toast,setToast]=useState('');
  const [bounds,setBounds]=useState({w:innerWidth,h:innerHeight-34});
  const [gameShortcuts,setGameShortcuts]=useState<string[]>(()=>read('gameShortcuts',[]));

  useEffect(()=>{
    const update=()=>setGameShortcuts(read('gameShortcuts',[]));
    window.addEventListener('retro:game-shortcuts',update);
    return ()=>window.removeEventListener('retro:game-shortcuts',update);
  },[]);

  const connection=useConnection(),[saverActive,setSaverActive]=useState(false),[requests,setRequests]=useState<Record<string,{file:VFile;version:number}>>({});
  const taskHeight=(prefs.theme==='classic'||prefs.theme==='win2000')?28:prefs.theme==='xp'?30:34;
  const z=useRef(10),drag=useRef<{id:string;x:number;y:number;pos:Position}|null>(null),bootTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const visible=windows.filter(w=>!w.min),top=visible.reduce<WindowState|undefined>((a,b)=>!a||b.z>a.z?b:a,undefined);

  function setPrefs(p:Partial<Preferences>){
    setPreferences(old=>{
      const next=mergePreferences(old,p);
      write('prefs',next);
      return next;
    });
  }

  function focus(id:AppId){
    setWindows(ws=>ws.map(w=>w.id===id?{...w,min:false,z:++z.current}:w));
  }

  function open(id:AppId){
    setStart(false);
    setMenu(null);
    sound(id==='floppy'?'floppy':'open');
    setWindows(ws=>{
      if(ws.some(w=>w.id===id))return ws.map(w=>w.id===id?{...w,min:false,z:++z.current}:w);
      const explorer=['computer','documents','floppy'].includes(id),w=id==='retrolauncher'?980:id==='run'?420:id==='settings'?520:id==='calculator'?330:id==='player'?440:id==='mines'?470:explorer&&prefs.theme!=='mix'?(prefs.theme==='xp'?760:prefs.theme==='win2000'?650:620):720,h=id==='retrolauncher'?620:id==='run'?210:id==='settings'?540:id==='calculator'?460:id==='player'?490:explorer&&prefs.theme!=='mix'?(prefs.theme==='xp'?550:460):550;
      return [...ws,{id,rect:clampRect({x:id==='run'?10:Math.max(155,innerWidth*0.2)+(ws.length%5)*24,y:id==='run'?innerHeight-taskHeight-h-12:55+(ws.length%5)*24,w,h},innerWidth,innerHeight-taskHeight),z:++z.current,min:false,max:innerWidth<600}];
    });
  }

  useEffect(()=>{
    const handler=(e:Event)=>{
      const custom=(e as CustomEvent<{app:AppId}>).detail;
      if(custom?.app)open(custom.app);
    };
    window.addEventListener('retro:navigate-app',handler);
    return ()=>window.removeEventListener('retro:navigate-app',handler);
  },[]);

  function close(id:AppId){
    const confirmed=()=>{
      setWindows(ws=>ws.filter(w=>w.id!==id));
      if(id==='notepad'||id==='paint')setRequests(r=>{const next={...r};delete next[id];return next});
    };
    const beforeClose=new CustomEvent('retro:before-close',{detail:{id,proceed:confirmed},cancelable:true});
    const prevented=!window.dispatchEvent(beforeClose);
    if(!prevented)confirmed();
  }

  function guardedPower(action:()=>void){
    const dirtyApps=['notepad','paint'].filter(id=>windows.some(w=>w.id===id));
    if(!dirtyApps.length){action();return}
    function next(i:number){
      if(i>=dirtyApps.length){action();return}
      const id=dirtyApps[i];
      const ev=new CustomEvent('retro:before-close',{detail:{id,proceed:()=>next(i+1)},cancelable:true});
      const prevented=!window.dispatchEvent(ev);
      if(!prevented)next(i+1);
    }
    next(0);
  }

  function finishBoot(){
    clearTimeout(bootTimer.current);
    setBoot(false);
    sound('boot');
    if(!windows.length)open('about');
  }

  useEffect(()=>{
    if(!boot)return;
    bootTimer.current=setTimeout(()=>{
      setBoot(false);
      setWindows(ws=>ws.length?ws:[{id:'about',rect:clampRect({x:innerWidth*0.25,y:70,w:700,h:530},innerWidth,innerHeight-taskHeight),z:11,min:false,max:innerWidth<600}]);
    },2600);
    return ()=>clearTimeout(bootTimer.current);
  },[boot]);

  useEffect(()=>{
    if(!boot&&!windows.length&&!read('welcomed',false)){
      write('welcomed',true);
      open('about');
    }
  },[boot]);

  useEffect(()=>{
    const t=setInterval(()=>setTime(new Date()),1000);
    const resize=()=>{
      setBounds({w:innerWidth,h:innerHeight-taskHeight});
      setWindows(ws=>ws.map(w=>({...w,rect:clampRect(w.rect,innerWidth,innerHeight-taskHeight)})));
    };
    window.addEventListener('resize',resize);
    resize();
    return ()=>{clearInterval(t);window.removeEventListener('resize',resize)};
  },[taskHeight]);

  useEffect(()=>{
    if(!toast)return;
    const t=setTimeout(()=>setToast(''),4500);
    return ()=>clearTimeout(t);
  },[toast]);

  useEffect(()=>{
    function key(e:KeyboardEvent){
      if((e.key==='ContextMenu'||e.shiftKey&&e.key==='F10')&&!(e.target as HTMLElement).closest('.os-window,.taskbar,.start-menu')){
        e.preventDefault();
        const icon=(e.target as HTMLElement).closest<HTMLElement>('[data-app-id]'),r=icon?.getBoundingClientRect();
        if(icon?.dataset.appId){
          setSelected(icon.dataset.appId);
          setSelectedIds([icon.dataset.appId]);
        }
        setMenu({x:Math.min(r?.left||20,innerWidth-220),y:Math.min(r?.bottom||20,innerHeight-220),app:icon?.dataset.appId as AppId|undefined});
      }
      if(e.altKey && e.key === 'Tab') {
        e.preventDefault();
        setWindows(ws => {
          const vis = ws.filter(w => !w.min);
          if (vis.length <= 1) return ws;
          // Ordena por z decrescente
          const sorted = [...vis].sort((a,b) => b.z - a.z);
          // O segundo na ordem ganha o topo
          const nextActive = sorted[1];
          if (!nextActive) return ws;
          z.current++;
          return ws.map(w => w.id === nextActive.id ? { ...w, z: z.current, min: false } : w);
        });
        return;
      }
      if(e.ctrlKey && e.key.toLowerCase() === 'a' && !(e.target as HTMLElement).closest('input,textarea,select,.os-window,.explorer-app')) {
        e.preventDefault();
        const allDesktopIds = [...registry.slice(0,12),...registry.filter(a=>['dialup','timemachine','gamecenter','retrolauncher'].includes(a.id))].map(a=>a.id);
        setSelectedIds(allDesktopIds);
        return;
      }
      if(e.key==='Escape'){
        if(menu?.app)document.querySelector<HTMLButtonElement>('[data-app-id="'+menu.app+'"]')?.focus();
        setStart(false);
        setQuick(false);
        setMenu(null);
        setMarquee(null);
        marqueeOrigin.current=null;
      }
      if(e.altKey&&e.key==='F4'&&top){
        e.preventDefault();
        close(top.id);
      }
      if(e.key==='Meta'||(e.ctrlKey&&e.key==='Escape')){
        e.preventDefault();
        setStart(s=>!s);
      }
    }
    window.addEventListener('keydown',key);
    return ()=>window.removeEventListener('keydown',key);
  },[top,windows,menu]);

  useEffect(()=>{
    if(menu)requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>('.context-menu button')?.focus());
  },[menu]);

  function position(id:string,i:number){
    const historical=prefs.theme!=='mix',step=historical?75:86;
    const rows=Math.max(1,Math.floor((bounds.h-8)/step)),p=positions[id]||{x:(historical?0:16)+Math.floor(i/rows)*(historical?75:86),y:4+(i%rows)*step};
    return {x:Math.max(0,Math.min(p.x,bounds.w-78)),y:Math.max(0,Math.min(p.y,bounds.h-70))};
  }

  function iconDown(e:PointerEvent<HTMLButtonElement>,id:string,i:number){
    if(e.button!==0)return;
    e.stopPropagation();
    drag.current={id,x:e.clientX,y:e.clientY,pos:position(id,i)};
    e.currentTarget.setPointerCapture(e.pointerId);
    setSelected(id);
    if(e.ctrlKey){
      setSelectedIds(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
    } else {
      setSelectedIds([id]);
    }
  }

  function iconMove(e:PointerEvent<HTMLButtonElement>){
    const d=drag.current;
    if(!d||Math.abs(e.clientX-d.x)+Math.abs(e.clientY-d.y)<5)return;
    setPositions(p=>({...p,[d.id]:{x:Math.max(0,Math.min(d.pos.x+e.clientX-d.x,bounds.w-90)),y:Math.max(0,Math.min(d.pos.y+e.clientY-d.y,bounds.h-88))}}));
  }

  // Marquee selection handlers on desktop free space
  function desktopPointerDown(e:PointerEvent<HTMLElement>){
    if((e.target as HTMLElement).closest('.os-window,.taskbar,.start-menu,.quick-panel,.context-menu,.desktop-icon'))return;
    if(e.button!==0)return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    marqueeOrigin.current={x:e.clientX,y:e.clientY};
    setMarquee({x:e.clientX,y:e.clientY,w:0,h:0});
    setSelected('');
    setSelectedIds([]);
  }

  function desktopPointerMove(e:PointerEvent<HTMLElement>){
    const origin=marqueeOrigin.current;
    if(!origin)return;
    const x=Math.min(origin.x,e.clientX);
    const y=Math.min(origin.y,e.clientY);
    const w=Math.abs(e.clientX-origin.x);
    const h=Math.abs(e.clientY-origin.y);
    const currentRect:Rect={x,y,w,h};
    setMarquee(currentRect);

    // Calculate intersected icons
    const icons=document.querySelectorAll<HTMLElement>('.desktop-icon');
    const matched:string[]=[];
    icons.forEach(el=>{
      const r=el.getBoundingClientRect();
      const intersects=!(r.right<currentRect.x||r.left>currentRect.x+currentRect.w||r.bottom<currentRect.y||r.top>currentRect.y+currentRect.h);
      const id=el.dataset.appId;
      if(intersects&&id)matched.push(id);
    });
    setSelectedIds(matched);
    if(matched.length===1)setSelected(matched[0]);
    else if(matched.length===0)setSelected('');
  }

  function desktopPointerUp(e:PointerEvent<HTMLElement>){
    try {
      if(e.currentTarget.hasPointerCapture(e.pointerId)){
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    marqueeOrigin.current=null;
    setMarquee(null);
  }

  useEffect(()=>{
    const snapshot=()=>window.dispatchEvent(new CustomEvent('retro:tasks',{detail:windows.map(w=>({id:w.id,name:appInfo(w.id,lang).name,min:w.min}))}));
    const terminate=(event:Event)=>{
      const id=(event as CustomEvent<AppId>).detail;
      if(id!=='tasks'&&registry.some(a=>a.id===id))close(id);
    };
    window.addEventListener('retro:tasks-request',snapshot);
    window.addEventListener('retro:terminate',terminate);
    snapshot();
    return ()=>{
      window.removeEventListener('retro:tasks-request',snapshot);
      window.removeEventListener('retro:terminate',terminate);
    };
  },[windows,lang]);

  useEffect(()=>{
    const listener=(event:Event)=>{
      const file=(event as CustomEvent<VFile>).detail;
      const id=file.kind==='image'?'paint':'notepad';
      setRequests(old=>({...old,[id]:{file,version:Date.now()}}));
      open(id);
    };
    const launch=(e:Event)=>open((e as CustomEvent<AppId>).detail);
    window.addEventListener('retro:open-app',launch);
    window.addEventListener('retro:open-file',listener);
    return ()=>{
      window.removeEventListener('retro:open-file',listener);
      window.removeEventListener('retro:open-app',launch);
    };
  },[prefs.theme]);

  useEffect(()=>{
    if(!prefs.idleMinutes||boot||!powered)return;
    let idle:ReturnType<typeof setTimeout>;
    const reset=()=>{
      clearTimeout(idle);
      idle=setTimeout(()=>setSaverActive(true),prefs.idleMinutes!*60000);
    };
    reset();
    window.addEventListener('pointermove',reset);
    window.addEventListener('keydown',reset);
    window.addEventListener('pointerdown',reset);
    return ()=>{
      clearTimeout(idle);
      window.removeEventListener('pointermove',reset);
      window.removeEventListener('keydown',reset);
      window.removeEventListener('pointerdown',reset);
    };
  },[prefs.idleMinutes,boot,powered]);

  useEffect(()=>{
    if(!saverActive)return;
    const exit=()=>setSaverActive(false);
    window.addEventListener('keydown',exit);
    return ()=>window.removeEventListener('keydown',exit);
  },[saverActive]);

  if(!powered)return <div className="shutdown"><h1>{lang==='en'?'It is now safe to turn off your computer.':lang==='es'?'Ahora puede apagar el equipo con seguridad.':'Agora você já pode descansar.'}</h1><p>{lang==='en'?'Your nostalgia remains safe here.':lang==='es'?'Sus recuerdos permanecen seguros aquí.':'Suas memórias continuam por aqui.'}</p><button onClick={()=>{setPowered(true);setBoot(true)}}>{lang==='en'?'Turn on RETRO OS':lang==='es'?'Encender RETRO OS':'Ligar RETRO OS'}</button></div>;
  if(boot)return <div className="boot-screen"><pre>RETRO SYSTEMS BIOS v1.001<br/>Copyright (c) Projeto Davi<br/><br/>Memory test: 640K ........... OK<br/>Detecting A: FLOPPY DRIVE ... OK<br/>Detecting C: GOOD MEMORIES .. OK<br/>Checking nostalgia ........ 100%<br/><br/>Loading retro experience_</pre><div className="boot-logo">RETRO <b>OS</b><small>PERSONAL MEMORIES SYSTEM</small><div className="boot-progress"><i/></div></div><button onClick={finishBoot}>{lang==='en'?'Skip boot':lang==='es'?'Saltar inicio':'Pular inicialização'}</button><label><input type="checkbox" checked={!prefs.muted} onChange={e=>setPrefs({muted:!e.target.checked})}/> {t.enableSounds}</label></div>;

  return (
    <SystemThemeContext value={prefs.theme}>
      <main
        className={'desktop theme-'+prefs.theme+(prefs.theme==='win2000'?' theme-classic':'')+' wallpaper-'+prefs.wallpaper+' xp-'+prefs.xpColor+' era-'+(prefs.era||2001)}
        onContextMenu={e=>{
          if((e.target as HTMLElement).closest('.os-window,.taskbar,.start-menu'))return;
          e.preventDefault();
          const app=(e.target as HTMLElement).closest<HTMLElement>('[data-app-id]')?.dataset.appId as AppId|undefined;
          if(app){
            setSelected(app);
            setSelectedIds([app]);
          }
          setMenu({x:Math.max(0,Math.min(e.clientX,innerWidth-220)),y:Math.max(0,Math.min(e.clientY,innerHeight-260)),app});
        }}
        onPointerDown={e=>{
          if(!(e.target as HTMLElement).closest('.start-menu,.start-button'))setStart(false);
          if(!(e.target as HTMLElement).closest('.quick-panel,.tray'))setQuick(false);
          if(!(e.target as HTMLElement).closest('.context-menu'))setMenu(null);
          desktopPointerDown(e);
        }}
        onPointerMove={desktopPointerMove}
        onPointerUp={desktopPointerUp}
      >
        <div className="wallpaper-art" aria-hidden="true"><div className="sun"/><div className="cloud c1"/><div className="cloud c2"/><div className="hill far"/><div className="hill near"/></div>
        <div className="desktop-signature"><b>RETRO<span>OS</span></b><small>EST. 2001 / REBOOTED TODAY</small></div>
        
        {marquee&&marquee.w>3&&marquee.h>3&&(
          <div
            className="desktop-marquee"
            style={{
              left: marquee.x,
              top: marquee.y,
              width: marquee.w,
              height: marquee.h
            }}
          />
        )}

        <div className="desktop-icons" aria-label={t.showDesktop}>
          {[...registry.slice(0,12),...registry.filter(a=>['dialup','timemachine','gamecenter','retrolauncher'].includes(a.id))].map((a,i)=>{
            const p=position(a.id,i);
            const app = appInfo(a.id, lang);
            const isSelected = selectedIds.includes(a.id) || selected===a.id;
            return (
              <button
                key={a.id}
                data-app-id={a.id}
                className={'desktop-icon '+(isSelected?'selected':'')}
                style={{left:p.x,top:p.y}}
                onPointerDown={e=>iconDown(e,a.id,i)}
                onPointerMove={iconMove}
                onPointerUp={()=>{drag.current=null;write('positions',positions)}}
                onDoubleClick={()=>open(a.id)}
                onKeyDown={e=>{
                  if(e.key==='Enter')open(a.id);
                  if(e.altKey&&e.key.startsWith('Arrow')){
                    e.preventDefault();
                    const dx=e.key==='ArrowLeft'?-10:e.key==='ArrowRight'?10:0,dy=e.key==='ArrowUp'?-10:e.key==='ArrowDown'?10:0;
                    const next={...positions,[a.id]:{x:Math.max(0,Math.min(bounds.w-90,p.x+dx)),y:Math.max(0,Math.min(bounds.h-88,p.y+dy))}};
                    setPositions(next);
                    write('positions',next);
                  }
                }}
              >
                <Icon name={a.icon} size={(prefs.theme==='classic'||prefs.theme==='win2000')?32:prefs.theme==='xp'?32:38}/>
                <span>{app.name}</span>
              </button>
            );
          })}
          {gameShortcuts.map((id,i)=>{
            const g=catalog.find(g=>g.id===id)||loadBaseCatalog().filter(g=>g.metadataOrigin==='user-imported'||g.metadataOrigin==='licensed-builtin').map(g=>({id:g.id,name:g.title})).find(g=>g.id===id);
            if(!g)return null;
            const p=position('shortcut-'+id,15+i);
            return (
              <button
                key={id}
                className="desktop-icon"
                style={{left:p.x,top:p.y}}
                onDoubleClick={()=>{
                  if(id.startsWith('imported-')){
                    write('activeCustomGameId',id);
                    window.dispatchEvent(new Event('retro:custom-game'));
                    open('dos-imported');
                    return;
                  }
                  write('catalogSelected',id);
                  open('gamecenter');
                  window.dispatchEvent(new Event('retro:catalog-select'));
                }}
              >
                <Icon name="disc" size={38}/>
                <span>↗ {g.name}</span>
              </button>
            );
          })}
        </div>
        {windows.map(win=>{
          return (
            <Window key={win.id} win={win} language={lang} active={top?.id===win.id} focus={()=>{if(top?.id!==win.id)focus(win.id)}} close={()=>close(win.id)} update={patch=>setWindows(ws=>ws.map(w=>w.id===win.id?{...w,...patch}:w))}>
              <AppHost id={win.id} open={open} close={()=>close(win.id)} prefs={prefs} setPrefs={setPrefs} request={requests[win.id]} activateSaver={()=>setSaverActive(true)} active={top?.id===win.id&&!win.min}/>
            </Window>
          );
        })}
        {start&&<StartMenu open={open} classic={prefs.theme==='classic'||prefs.theme==='win2000'} language={lang} restart={()=>guardedPower(()=>{setStart(false);setBoot(true);setWindows([])})} shutdown={()=>guardedPower(()=>{sound('shutdown');setStart(false);setWindows([]);setPowered(false)})}/>}
        {quick&&<div className="quick-panel">
          <b>{t.quickSettings}</b>
          <p>{connection==='connected'?t.connected56k:t.dialupDisconnected}</p>
          <div style={{margin: '6px 0'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <span>{t.language}:</span>
              <select value={lang} onChange={e=>setPrefs({language: e.target.value as Language})}>
                <option value="pt-BR">Português (Brasil)</option>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>
          </div>
          <button onClick={()=>setPrefs({muted:!prefs.muted})}>{prefs.muted?t.enableSounds:t.muteSounds}</button>
          <label>{t.volume}<input type="range" aria-label={t.volume} min="0" max="1" step="0.05" value={prefs.volume} onChange={e=>setPrefs({volume:+e.target.value})}/></label>
          <button className={(prefs.theme==='classic'||prefs.theme==='win2000')?'pressed':''} onClick={()=>setPrefs({theme:'classic'})}>{t.fidelityMode}</button>
          <button onClick={()=>open('dialup')}>{t.dialupConnection}</button>
          <button onClick={()=>{setQuick(false);open('settings')}}>{t.openAppearance}</button>
        </div>}
        {menu&&<div className="context-menu" role="menu" onKeyDown={e=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;e.preventDefault();const buttons=Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')),at=buttons.indexOf(document.activeElement as HTMLButtonElement);buttons[e.key==='Home'?0:e.key==='End'?buttons.length-1:(at+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length]?.focus()}} style={{left:menu.x,top:menu.y}}>{menu.app&&<><button role="menuitem" onClick={()=>open(menu.app!)}>{lang==='en'?'Open':lang==='es'?'Abrir':'Abrir'}</button><button role="menuitem" onClick={()=>{setProperties(menu.app!);setMenu(null)}}>{lang==='en'?'Shortcut Properties':lang==='es'?'Propiedades del acceso directo':'Propriedades do atalho'}</button><hr/></>}<button role="menuitem" onClick={()=>{setPositions({});write('positions',{});setMenu(null)}}>{lang==='en'?'Auto Arrange Icons':lang==='es'?'Organizar iconos':'Organizar ícones'}</button><button role="menuitem" onClick={()=>{setMenu(null);setToast('Desktop atualizado.')}}>{lang==='en'?'Refresh':lang==='es'?'Actualizar':'Atualizar'}</button><hr/><button role="menuitem" onClick={()=>open('settings')}>{lang==='en'?'Desktop Properties':lang==='es'?'Propiedades de pantalla':'Propriedades da área de trabalho'}</button></div>}
        {properties&&<Dialog title={lang==='en'?'Properties':lang==='es'?'Propiedades':'Propriedades'} onCancel={()=>setProperties(null)} onConfirm={()=>setProperties(null)}><dl className="file-properties"><dt>{lang==='en'?'Name':lang==='es'?'Nombre':'Nome'}</dt><dd>{appInfo(properties, lang).name}</dd><dt>{lang==='en'?'Type':lang==='es'?'Tipo':'Tipo'}</dt><dd>{lang==='en'?'Application Shortcut':lang==='es'?'Acceso directo a la aplicación':'Atalho para aplicativo interno'}</dd></dl></Dialog>}
        {toast&&<div className="notification" role="status"><b>RETRO OS</b><p>{toast}</p></div>}
        <footer className="taskbar">
          <button className={'start-button '+(start?'pressed':'')} aria-label={t.start} aria-expanded={start} onClick={()=>{setStart(!start);sound()}}>
            <span className="start-emblem"><SystemMark/></span><b>{t.start}</b>
          </button>
          <div className="quick-launch">
            <button aria-label={t.showDesktop} onClick={()=>setWindows(ws=>ws.map(w=>({...w,min:true})))}><Icon name="computer" size={19}/></button>
            <button aria-label={t.openInternet} onClick={()=>open('internet')}><Icon name="globe" size={19}/></button>
          </div>
          <div className="task-list">
            {windows.map(win=>{
              const info = appInfo(win.id, lang);
              return <button key={win.id} className={top?.id===win.id?'pressed':''} onClick={()=>{
                if(top?.id===win.id && !win.min){
                  setWindows(ws=>ws.map(w=>w.id===win.id?{...w,min:true}:w));
                } else {
                  focus(win.id);
                }
              }} title={info.name}><Icon name={info.icon} size={18}/><span>{info.name}</span></button>;
            })}
          </div>
          <button className="tray" aria-label={t.quickSettings} aria-expanded={quick} onClick={()=>setQuick(!quick)}>
            <SystemTraySymbols muted={prefs.muted} connected={connection==='connected'} language={lang}/>
            <time>{time.toLocaleTimeString(lang==='en'?'en-US':lang==='es'?'es-ES':'pt-BR',{hour:'2-digit',minute:'2-digit'})}</time>
          </button>
        </footer>
        {saverActive&&<div className="saver-overlay" role="dialog" aria-label={t.appSaver}><SaverCanvas full mode={prefs.saver||'pipes'} text={prefs.saverText} onExit={()=>setSaverActive(false)}/><button onClick={()=>setSaverActive(false)}>{lang==='en'?'Exit Screensaver':lang==='es'?'Salir del protector':'Sair do protetor'}</button></div>}
      </main>
    </SystemThemeContext>
  );
}
