import {it,expect,vi,beforeEach} from 'vitest';
import {exportBackup,validateBackup,importBackup} from '../storage/backup';
import {saveFile,files} from '../storage/local';
const memory=new Map<string,string>();
beforeEach(()=>{memory.clear();vi.stubGlobal('localStorage',{getItem:(k:string)=>memory.get(k)||null,setItem:(k:string,v:string)=>memory.set(k,v)})});
it('exporta e verifica checksum sem alterar dados',async()=>{const before=files();const text=await exportBackup();expect((await validateBackup(text)).files).toEqual(before);expect(files()).toEqual(before)});
it('rejeita checksum inválido e arquivos grandes',async()=>{const backup=JSON.parse(await exportBackup());backup.payload.files[0].content='mudou';await expect(validateBackup(JSON.stringify(backup))).rejects.toThrow('integridade');await expect(validateBackup('x'.repeat(20*1024*1024+1))).rejects.toThrow('20 MB')});
it('validação de caminho funciona mesmo com checksum recalculado',async()=>{const backup=JSON.parse(await exportBackup());backup.payload.files[0].path='C:/../escape.txt';backup.sha256=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(backup.payload)))),v=>v.toString(16).padStart(2,'0')).join('');await expect(validateBackup(JSON.stringify(backup))).rejects.toThrow('Arquivo inválido')});
it('restauração preserva a versão atual e renomeia conflito mantendo extensão',async()=>{saveFile('C:/Meus Documentos/Backup.txt','original');const backup=await exportBackup();saveFile('C:/Meus Documentos/Backup.txt','atual');await importBackup(backup);expect(files().find(f=>f.path==='C:/Meus Documentos/Backup.txt')?.content).toBe('atual');expect(files().find(f=>f.path==='C:/Meus Documentos/Backup (restaurado 1).txt')?.content).toBe('original')});
