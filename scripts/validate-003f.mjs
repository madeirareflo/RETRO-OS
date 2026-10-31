import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
fs.mkdirSync('evidence/003f',{recursive:true});
const tasks=[['typecheck',['node_modules/typescript/bin/tsc','--noEmit']],['lint',['node_modules/eslint/bin/eslint.js','src']],['unit',['node_modules/vitest/vitest.mjs','run']],['build',['node_modules/vite/bin/vite.js','build']],['e2e-final',['node_modules/@playwright/test/cli.js','test','--project=edge','--project=chrome']],['static-production',['node_modules/@playwright/test/cli.js','test','--config','playwright.static.config.ts']]];
for(const [name,args] of tasks){const result=spawnSync(process.execPath,args,{encoding:'utf8',windowsHide:true,maxBuffer:16*1024*1024});fs.writeFileSync('evidence/003f/'+name+'.log',(result.stdout||'')+(result.stderr||''));console.log(name,result.status===0?'PASS':'FAIL');if(result.status!==0){console.error(result.error||result.stderr);process.exit(result.status||1)}}
