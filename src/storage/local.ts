export function read<T>(key:string,fallback:T):T{try{const v=localStorage.getItem('retro.'+key);return v?JSON.parse(v):fallback}catch{return fallback}}
export function write(key:string,value:unknown){try{localStorage.setItem('retro.'+key,JSON.stringify(value));return true}catch{return false}}
export type VFile={path:string;content:string;kind:'text'|'folder'|'image';modified:string};
const stamp='2001-01-01T12:00:00Z';
export const initialFiles:VFile[]=[
{path:'C:/Meus Documentos',kind:'folder',content:'',modified:stamp},
{path:'C:/Meus Documentos/LEIA-ME.txt',kind:'text',content:'Bem-vindo ao RETRO OS!\nTudo acontece neste navegador.\nSalve suas memórias no Bloco de Notas.\n\nDica: tente TYPE SEGREDO.TXT no terminal.',modified:stamp},
{path:'C:/Meus Documentos/Retro Game Launcher.lnk',kind:'text',content:'retro-app:retrolauncher',modified:stamp},
{path:'A:/Trabalho da escola.txt',kind:'text',content:'ESCOLA MUNICIPAL — INFORMÁTICA\nAluno: você :)\nTema: Como será o computador no futuro?\n\nAcho que um dia vai caber uma lan house inteira dentro de uma página.',modified:stamp},
{path:'A:/SEGREDO.TXT',kind:'text',content:'EASTER EGG: O disquete sobreviveu à mochila!\nVocê desbloqueou uma memória: salvar como trabalho_FINAL_agora_vai.txt',modified:stamp},
{path:'A:/Cartão da turma.svg',kind:'image',content:'school-postcard',modified:stamp},
{path:'A:/Coleção',kind:'folder',content:'',modified:stamp},
{path:'A:/Coleção/Volume 001.txt',kind:'text',content:'DISQUETE VIRTUAL 001 — Volta às aulas\nColeção RETRO OS. Futuras edições poderão ser importadas como dados, nunca como programas.',modified:stamp},
{path:'D:/Instalar a saudade.txt',kind:'text',content:'Instalação concluída.\nComponentes: cheiro de CD novo, café da lan house, sábado depois da meia-noite.\nNenhum arquivo executável é necessário.',modified:stamp}];
export function files(){return read<VFile[]>('files',initialFiles)}
export function saveFile(path:string,content:string){if(content.length>500000)throw Error('Limite de 500 KB por texto.');if(!/^C:\/Meus Documentos\/[\p{L}\p{N} _().-]+\.txt$/u.test(path))throw Error('Use um nome simples terminado em .txt.');const all=files().filter(f=>f.path!==path);all.push({path,content,kind:'text',modified:new Date().toISOString()});if(!write('files',all))throw Error('Armazenamento cheio ou indisponível. Exporte seu texto.');if(typeof window!=='undefined')window.dispatchEvent(new Event('retro:files'));}
export function download(name:string,blob:Blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
