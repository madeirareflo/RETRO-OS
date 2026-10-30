import {useRef,type ReactNode,type PointerEvent} from 'react';
import {Icon} from '../components/Icon';
import {appInfo,type AppId} from '../core/registry';
import {clampRect,type Rect} from './model';
export type WindowState={id:AppId;rect:Rect;z:number;min:boolean;max:boolean};
export function Window({win,active,children,update,focus,close}:{win:WindowState;active:boolean;children:ReactNode;update:(p:Partial<WindowState>)=>void;focus:()=>void;close:()=>void}){
const gesture=useRef<{x:number;y:number;r:Rect;edge:string}|null>(null),info=appInfo(win.id);
function start(e:PointerEvent,edge=''){if((e.target as HTMLElement).closest('button')||e.button!==0||win.max)return;gesture.current={x:e.clientX,y:e.clientY,r:win.rect,edge};e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault()}
function move(e:PointerEvent){const g=gesture.current;if(!g)return;const dx=e.clientX-g.x,dy=e.clientY-g.y;const r={...g.r};if(!g.edge){r.x+=dx;r.y+=dy}else{if(g.edge.includes('e'))r.w+=dx;if(g.edge.includes('s'))r.h+=dy;if(g.edge.includes('w')){r.x+=dx;r.w-=dx}if(g.edge.includes('n')){r.y+=dy;r.h-=dy}}update({rect:clampRect(r,innerWidth,innerHeight-40)})}
return <section role="dialog" aria-label={info.name} aria-modal="false" className={'os-window '+(active?'active ':'')+(win.max?'maximized':'')} style={win.max?{inset:'0 0 40px',zIndex:win.z,display:win.min?'none':undefined}:{left:win.rect.x,top:win.rect.y,width:win.rect.w,height:win.rect.h,zIndex:win.z,display:win.min?'none':undefined}} onPointerDown={focus}>
<header className="titlebar" onPointerDown={e=>start(e)} onPointerMove={move} onPointerUp={()=>gesture.current=null} onDoubleClick={()=>update({max:!win.max})}>
<Icon name={info.icon} size={18}/><span>{info.name}</span><div className="window-controls"><button aria-label={'Minimizar '+info.name} onClick={()=>update({min:true})}>_</button><button aria-label={'Maximizar '+info.name} onClick={()=>update({max:!win.max})}>{win.max?'❐':'□'}</button><button aria-label={'Fechar '+info.name} onClick={close}>×</button></div></header>
<div className="window-body">{children}</div>
{!win.max&&['n','s','e','w','ne','nw','se','sw'].map(edge=><div key={edge} className={'resize '+edge} onPointerDown={e=>start(e,edge)} onPointerMove={move} onPointerUp={()=>gesture.current=null}/>)}</section>
}
