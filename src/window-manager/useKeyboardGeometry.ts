import {useEffect,useRef,useState} from 'react';
import {clampRect,type Rect} from './model';
export function useKeyboardGeometry(active:boolean,rect:Rect,max:boolean,update:(patch:{rect:Rect})=>void){
 const [mode,setMode]=useState<'move'|'size'|null>(null),origin=useRef<Rect|null>(null),live=useRef(rect);live.current=rect;
 function begin(value:'move'|'size'){if(max)return;origin.current={...rect};setMode(value)}
 useEffect(()=>{if(!active){setMode(null);return}if(!mode)return;function key(event:KeyboardEvent){if(event.key==='Escape'||event.key==='Enter'){event.preventDefault();event.stopImmediatePropagation();if(event.key==='Escape'&&origin.current)update({rect:origin.current});setMode(null);return}if(!event.key.startsWith('Arrow'))return;event.preventDefault();event.stopImmediatePropagation();const step=event.ctrlKey?1:8,dx=event.key==='ArrowRight'?step:event.key==='ArrowLeft'?-step:0,dy=event.key==='ArrowDown'?step:event.key==='ArrowUp'?-step:0,r={...live.current};if(mode==='move'){r.x+=dx;r.y+=dy}else{r.w+=dx;r.h+=dy}live.current=clampRect(r,innerWidth,innerHeight-(document.querySelector('.taskbar')?.clientHeight||30));update({rect:live.current})}window.addEventListener('keydown',key,true);return ()=>window.removeEventListener('keydown',key,true)},[active,mode,update]);
 return {mode,begin};
}
