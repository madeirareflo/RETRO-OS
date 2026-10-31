import {useSyncExternalStore} from 'react';
export type Connection='offline'|'dialing'|'verifying'|'connected'|'error';
let state:Connection='offline';try{if(sessionStorage.getItem('retro.connection')==='connected')state='connected'}catch{/* sessão sem armazenamento */}
const listeners=new Set<()=>void>();let timer:ReturnType<typeof setTimeout>|undefined;
export function connectedAt(){try{return Number(sessionStorage.getItem('retro.connectedAt'))||Date.now()}catch{return Date.now()}}
function set(next:Connection){if(next==='connected'){try{sessionStorage.setItem('retro.connectedAt',String(Date.now()))}catch{/* sem armazenamento */}}state=next;try{sessionStorage.setItem('retro.connection',next)}catch{/* sem persistência */}listeners.forEach(fn=>fn())}
export function disconnect(){clearTimeout(timer);set('offline')}
export function connect(busy=false){clearTimeout(timer);set('dialing');timer=setTimeout(()=>{if(busy){set('error');return}set('verifying');timer=setTimeout(()=>set('connected'),1100)},1200)}
export function useConnection(){return useSyncExternalStore(fn=>{listeners.add(fn);return ()=>{listeners.delete(fn)}},()=>state)}
