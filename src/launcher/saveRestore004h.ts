import {safeDosPath} from './packageValidation';
import type {SaveMetadata} from './storageManager';
export function nativeSavePath(name:string){try{return safeDosPath(name)===name&&!/\.(COM|EXE|BAT|JS|HTML?|SVG|DLL|PS1|CMD|VBS|WAD|WASM)$/i.test(name)}catch{return false}}
export function restoreNativeSaves(records:SaveMetadata[],fallback:unknown){const out:Record<string,number[]>={},dates:Record<string,number>={};for(const row of records){try{const raw=atob(row.dataBase64);if(!nativeSavePath(row.fileName)||raw.length<1||raw.length>4194304)continue;out[row.fileName]=Array.from(raw,c=>c.charCodeAt(0));dates[row.fileName]=Date.parse(row.lastModified)||0}catch{/* malformed legacy record */}}
 if(fallback&&typeof fallback==='object'){const f=fallback as {at?:string;files?:Record<string,unknown>};for(const [name,bytes] of Object.entries(f.files||{})){if(!nativeSavePath(name)||!Array.isArray(bytes)||!bytes.length||bytes.length>4194304||!bytes.every(n=>Number.isInteger(n)&&n>=0&&n<=255))continue;if(!out[name]||(Date.parse(f.at||'')||0)>dates[name])out[name]=bytes}}
 return out;
}
