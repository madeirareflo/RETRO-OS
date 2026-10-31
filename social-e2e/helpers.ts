import {expect,type Page} from '@playwright/test';
/** Accept either the skippable BIOS or the desktop reached by automatic boot. */
export async function bootSocial(page:Page){await page.goto('/');const skip=page.getByRole('button',{name:'Pular inicialização'}),start=page.getByRole('button',{name:'Iniciar',exact:true});await expect(skip.or(start).first()).toBeVisible();if(await skip.isVisible()){try{await skip.click({timeout:1500})}catch(error){if(!await start.isVisible())throw error}}await expect(start).toBeVisible()}
