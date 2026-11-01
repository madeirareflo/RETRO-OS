import {chromium} from '@playwright/test';
import fs from 'node:fs';

async function run() {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  
  // 1. Desktop Test (1366x768)
  const page = await browser.newPage({viewport: {width: 1366, height: 768}});
  await page.goto('http://127.0.0.1:4676/RETRO-OS/');
  await page.waitForTimeout(1000);
  
  const skipBtn = page.getByRole('button', {name: 'Pular inicialização'});
  if (await skipBtn.count() > 0) await skipBtn.click();
  
  const closeAbout = page.getByRole('button', {name: 'Fechar Sobre o RETRO OS'});
  if (await closeAbout.count() > 0) await closeAbout.click();

  // Abrir Retro Game Launcher pelo ícone da Área de Trabalho
  await page.locator('.desktop-icons').getByRole('button', {name: 'Retro Game Launcher', exact: true}).dblclick();
  await page.waitForTimeout(1500);

  fs.mkdirSync('evidence/003s-fix', {recursive: true});
  await page.screenshot({path: 'evidence/003s-fix/01-desktop-launcher-8games.png'});

  // Clicar na coleção "Instalados"
  await page.locator('.collection-list').getByRole('button', {name: 'Instalados', exact: true}).click();
  await page.waitForTimeout(500);
  await page.screenshot({path: 'evidence/003s-fix/02-desktop-installed-8games.png'});

  // Clicar na coleção "Prince / DOOM / Duke"
  await page.locator('.collection-list').getByRole('button', {name: 'Prince / DOOM / Duke', exact: true}).click();
  await page.waitForTimeout(500);
  await page.screenshot({path: 'evidence/003s-fix/03-desktop-shareware-collection.png'});

  // Fechar o Launcher usando o botão fechar da titlebar
  await page.locator('section[data-app="retrolauncher"] .control-close').click();
  await page.waitForTimeout(500);

  // Abrir Retro Game Center pelo desktop
  await page.locator('.desktop-icons').getByRole('button', {name: 'Retro Game Center', exact: true}).dblclick();
  await page.waitForTimeout(1000);

  // Clicar em Instalados no Game Center
  await page.locator('.gc-nav').getByRole('button', {name: 'Instalados', exact: true}).click();
  await page.waitForTimeout(500);
  await page.screenshot({path: 'evidence/003s-fix/04-desktop-gamecenter-installed.png'});

  await page.close();

  // 2. Mobile Test (iPhone / Android viewport 390x844)
  const mobilePage = await browser.newPage({
    viewport: {width: 390, height: 844},
    isMobile: true,
    hasTouch: true
  });
  await mobilePage.goto('http://127.0.0.1:4676/RETRO-OS/');
  await mobilePage.waitForTimeout(1000);

  const mSkipBtn = mobilePage.getByRole('button', {name: 'Pular inicialização'});
  if (await mSkipBtn.count() > 0) await mSkipBtn.click();
  
  const mCloseAbout = mobilePage.getByRole('button', {name: 'Fechar Sobre o RETRO OS'});
  if (await mCloseAbout.count() > 0) await mCloseAbout.click();

  // No mobile, abrir Launcher pelo desktop
  await mobilePage.locator('.desktop-icons').getByRole('button', {name: 'Retro Game Launcher', exact: true}).dblclick();
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({path: 'evidence/003s-fix/05-mobile-launcher-view.png'});

  // Fechar Launcher no mobile
  await mobilePage.locator('section[data-app="retrolauncher"] .control-close').click();
  await mobilePage.waitForTimeout(500);

  // No mobile, testar menu iniciar
  await mobilePage.locator('.start-button').click();
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({path: 'evidence/003s-fix/06-mobile-start-menu.png'});

  await browser.close();
  console.log('E2E validation finished successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
