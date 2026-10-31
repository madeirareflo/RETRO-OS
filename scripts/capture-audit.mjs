import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const phase=process.argv[2]||'before';
const dir=`evidence/002/${phase}`;await fs.mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
try{for(const theme of ['classic','xp','mix'])for(const [width,height] of [[800,600],[1024,768],[1366,768],[1920,1080]]){const context=await browser.newContext({viewport:{width,height}}),page=await context.newPage();await page.addInitScript(({theme})=>{localStorage.setItem('retro.prefs',JSON.stringify({theme,wallpaper:theme==='classic'?'teal':'hills',boot:false,muted:true,volume:.35,xpColor:'blue'}));localStorage.setItem('retro.welcomed','true')},{theme});await page.goto('http://127.0.0.1:5173/');await page.getByRole('button',{name:'Iniciar',exact:true}).click();await page.screenshot({path:`${dir}/${theme}-${width}x${height}-start.png`});await page.keyboard.press('Escape');await page.locator('.desktop-icon').filter({hasText:'Meu Computador'}).dblclick();await page.screenshot({path:`${dir}/${theme}-${width}x${height}-explorer.png`});await context.close()}}finally{await browser.close()}
