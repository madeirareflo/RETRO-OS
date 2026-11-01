import {test,expect,type Page} from '@playwright/test';

async function boot(p:Page){
  await p.goto('/');
  await p.getByRole('button',{name:'Pular inicialização'}).click();
  await expect(p.getByRole('button',{name:'Iniciar',exact:true})).toBeVisible();
  const closeAbout = p.getByRole('button',{name:'Fechar Sobre o RETRO OS'});
  if (await closeAbout.isVisible()) {
    await closeAbout.click();
  }
}

test.describe('Retro Game Launcher - 4 Pontos de Acesso e Execução Real (003S)', ()=>{
  test('Ponto 1: Acesso direto pelo Desktop (duplo clique)', async({page})=>{
    await boot(page);
    const desktopIcon = page.locator('.desktop-icons').getByRole('button',{name:'Retro Game Launcher',exact:true});
    await expect(desktopIcon).toBeVisible();
    await desktopIcon.dblclick();
    await expect(page.getByRole('dialog',{name:'Retro Game Launcher'})).toBeVisible();
    await page.screenshot({path:'evidence/launcher-desktop-open.png'});
    await page.getByRole('button',{name:'Fechar Retro Game Launcher'}).click();
    await expect(page.getByRole('dialog',{name:'Retro Game Launcher'})).toBeHidden();
  });

  test('Ponto 2: Acesso pelo Menu Iniciar (Programas -> Jogos / Todos os Programas)', async({page})=>{
    await boot(page);
    await page.getByRole('button',{name:'Iniciar',exact:true}).click();
    const startMenu = page.locator('.start-menu');
    await expect(startMenu).toBeVisible();
    
    // Clica em 'Todos os programas' no layout XP Luna
    const allProgramsBtn = page.getByRole('button',{name:/Todos os programas/});
    if (await allProgramsBtn.isVisible()) {
      await allProgramsBtn.click();
      await page.waitForTimeout(200);
      const launcherBtn = page.locator('.luna-all-programs').getByRole('button',{name:'Retro Game Launcher'});
      await launcherBtn.click();
    } else {
      // Menu clássico: Programas -> Jogos
      const programasBtn = page.getByRole('button',{name:'Programas'});
      await programasBtn.hover();
      await page.waitForTimeout(200);
      const launcherBtn = page.getByRole('button',{name:'Retro Game Launcher'});
      await launcherBtn.click();
    }
    
    await expect(page.getByRole('dialog',{name:'Retro Game Launcher'})).toBeVisible();
    await page.screenshot({path:'evidence/launcher-startmenu-open.png'});
    await page.getByRole('button',{name:'Fechar Retro Game Launcher'}).click();
  });

  test('Ponto 3: Acesso pelo Retro Game Center (botão Game Launcher)', async({page})=>{
    await boot(page);
    const gcIcon = page.locator('.desktop-icons').getByRole('button',{name:'Retro Game Center',exact:true});
    await gcIcon.dblclick();
    await expect(page.getByRole('dialog',{name:'Retro Game Center'})).toBeVisible();
    
    const launcherBtn = page.getByRole('dialog',{name:'Retro Game Center'}).getByRole('button',{name:'Game Launcher',exact:true});
    await expect(launcherBtn).toBeVisible();
    await launcherBtn.click();
    
    await expect(page.getByRole('dialog',{name:'Retro Game Launcher'})).toBeVisible();
    await page.screenshot({path:'evidence/launcher-from-gamecenter.png'});
    await page.getByRole('button',{name:'Fechar Retro Game Launcher'}).click();
    await page.getByRole('button',{name:'Fechar Retro Game Center'}).click();
  });

  test('Ponto 4: Acesso pelo Meu Computador / Explorer (atalho .lnk)', async({page})=>{
    await boot(page);
    await page.evaluate(() => localStorage.removeItem('retro.files'));
    await page.reload();
    await pular(page);
    
    const compIcon = page.locator('.desktop-icons').getByRole('button',{name:'Meu Computador',exact:true});
    await compIcon.dblclick();
    await expect(page.getByRole('dialog',{name:'Meu Computador'})).toBeVisible();
    
    await page.getByRole('button',{name:'Disco local (C:)'}).dblclick();
    await page.waitForTimeout(300);
    
    const docsFolder = page.locator('.file-grid button').filter({hasText:'Meus Documentos'});
    if (await docsFolder.isVisible()) {
      await docsFolder.dblclick();
      await page.waitForTimeout(300);
    }
    
    const voltarBtn = page.getByRole('button',{name:'Voltar à pasta'});
    if (await voltarBtn.isVisible()) {
      await voltarBtn.click();
    }

    const launcherLnk = page.locator('.file-grid button').filter({hasText:'Retro Game Launcher.lnk'});
    await expect(launcherLnk).toBeVisible();
    await launcherLnk.dblclick();
    
    await expect(page.getByRole('dialog',{name:'Retro Game Launcher'})).toBeVisible();
    await page.screenshot({path:'evidence/launcher-from-explorer.png'});
    await page.getByRole('button',{name:'Fechar Retro Game Launcher'}).click();
  });

  test('Pesquisa e visualização de controles inline de jogos clássicos', async({page})=>{
    await boot(page);
    await page.locator('.desktop-icons').getByRole('button',{name:'Retro Game Launcher',exact:true}).dblclick();
    const launcher = page.getByRole('dialog',{name:'Retro Game Launcher'});
    await expect(launcher).toBeVisible();

    // Pesquisa Quake pelo campo de busca
    const searchInput = launcher.locator('input[type="search"]');
    await searchInput.fill('Quake');
    await page.waitForTimeout(300);
    
    // Clica no card ou linha de Quake shareware
    const quakeBtn = launcher.getByRole('button',{name:/Quake - shareware/i});
    await expect(quakeBtn).toBeVisible();
    await quakeBtn.click();
    
    // Verifica detalhes e controles
    await expect(launcher.getByText('Controles & Comandos')).toBeVisible();
    await expect(launcher.getByText('W, A, S, D / Setas')).toBeVisible();
    await page.screenshot({path:'evidence/launcher-controls-inline.png'});
  });
});

async function pular(p: Page) {
  const pularBtn = p.getByRole('button',{name:'Pular inicialização'});
  if (await pularBtn.isVisible()) await pularBtn.click();
  const closeAbout = p.getByRole('button',{name:'Fechar Sobre o RETRO OS'});
  if (await closeAbout.isVisible()) await closeAbout.click();
}
