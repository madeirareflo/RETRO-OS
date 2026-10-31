import fs from 'node:fs';import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
fs.mkdirSync('evidence/003f/before',{recursive:true});
for(const theme of ['classic','win2000','xp'])for(const file of ['explorer.png','settings.png','metrics.json']){const path=`evidence/003e/visual/edge-${theme}-${file}`;try{fs.writeFileSync(`evidence/003f/before/edge-${theme}-${file}`,execFileSync('git',['show',`HEAD:${path}`]))}catch{}}
const paths=['public/emulation/adapter.js','public/emulation/player.html','public/vendor/js-dos-6.22.60/js-dos.js','public/vendor/js-dos-6.22.60/wdosbox.js','public/vendor/js-dos-6.22.60/wdosbox.wasm.js','public/vendor/js-dos-6.22.60/SOURCE.zip','public/emulation/DISQUETE.COM','games-source/disquete-perdido/game.asm'];
fs.writeFileSync('evidence/003f/runtime-integrity.json',JSON.stringify(paths.map(path=>({path,bytes:fs.statSync(path).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex')})),null,2));
