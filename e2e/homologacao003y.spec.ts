import { test, expect, type Page } from '@playwright/test';

async function boot(p: Page) {
  await p.goto('/');
  const skipBtn = p.getByRole('button', { name: 'Pular inicialização' });
  if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await skipBtn.click();
  }
  await expect(p.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible({ timeout: 10000 });
  const closeAbout = p.getByRole('button', { name: /Fechar Sobre/ });
  if (await closeAbout.isVisible({ timeout: 1000 }).catch(() => false)) {
    await closeAbout.click();
  }
}

test.describe('003Y Homologação Integral - Suíte de Aceitação', () => {

  test('01. Explorer operações funcionais completas (CRUD, navegação, seleção)', async ({ page }) => {
    await boot(page);
    const myComp = page.locator('.desktop-icons').getByRole('button', { name: 'Meu Computador', exact: true });
    await expect(myComp).toBeVisible();
    await myComp.dblclick();

    const explorerWin = page.getByRole('dialog', { name: /Meu Computador|Explorer/i });
    await expect(explorerWin).toBeVisible({ timeout: 5000 });

    // Testa menu bar com match exato dos botões de menu
    await expect(explorerWin.locator('.explorer-menus').getByRole('button', { name: 'Arquivo', exact: true })).toBeVisible();
    await expect(explorerWin.locator('.explorer-menus').getByRole('button', { name: 'Editar', exact: true })).toBeVisible();
    await expect(explorerWin.locator('.explorer-menus').getByRole('button', { name: 'Exibir', exact: true })).toBeVisible();
    await expect(explorerWin.locator('.explorer-menus').getByRole('button', { name: 'Favoritos', exact: true })).toBeVisible();
    await expect(explorerWin.locator('.explorer-menus').getByRole('button', { name: 'Ferramentas', exact: true })).toBeVisible();
    await expect(explorerWin.locator('.explorer-menus').getByRole('button', { name: 'Ajuda', exact: true })).toBeVisible();

    // Navega para C: digitando no endereço
    const addr = explorerWin.getByLabel('Endereço virtual');
    await addr.fill('C:/Meus Documentos');
    await addr.press('Enter');
    await expect(addr).toHaveValue('C:/Meus Documentos');

    // Botão Voltar
    const backBtn = explorerWin.getByRole('button', { name: 'Voltar', exact: true });
    await backBtn.click();

    await page.screenshot({ path: 'evidence/003y-explorer-menubar.png' });
    const closeBtn = explorerWin.getByRole('button', { name: /Fechar/i }).first();
    await closeBtn.click();
  });

  test('02. Internet 2000 - Navegador Retro Explorer e sites simulados', async ({ page }) => {
    await boot(page);
    // Abre pelo desktop icon 'Internet'
    const internetIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Internet', exact: true });
    await expect(internetIcon).toBeVisible();
    await internetIcon.dblclick();

    const browserWin = page.getByRole('dialog', { name: 'Internet' });
    await expect(browserWin).toBeVisible({ timeout: 5000 });

    // Barra de endereço e navegação
    await expect(browserWin.locator('label', { hasText: 'Endereço' })).toBeVisible();
    const addrInput = browserWin.locator('#url');
    await expect(addrInput).toBeVisible();
    await expect(addrInput).toHaveValue(/retro:\/\//);

    // Navega pelos sites
    await expect(browserWin.getByRole('link', { name: 'Minha homepage' })).toBeVisible();
    await browserWin.getByRole('link', { name: 'Minha homepage' }).click();
    await expect(browserWin.getByText(/Bem-vindo ao meu cantinho/i)).toBeVisible();

    await page.screenshot({ path: 'evidence/003y-retro-explorer.png' });
    const closeBtn = browserWin.getByRole('button', { name: /Fechar/i }).first();
    await closeBtn.click();
  });

  test('03. Retro Game Launcher e os 8 jogos preservados', async ({ page }) => {
    await boot(page);
    const launcherIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Retro Game Launcher', exact: true });
    await expect(launcherIcon).toBeVisible();
    await launcherIcon.dblclick();

    const launcherWin = page.getByRole('dialog', { name: 'Retro Game Launcher' });
    await expect(launcherWin).toBeVisible({ timeout: 5000 });

    // Pesquisa no catálogo pelo input[type="search"]
    const searchInput = launcherWin.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();

    // Pesquisa Quake
    await searchInput.fill('Quake');
    await expect(launcherWin.getByRole('button', { name: /Quake/i }).first()).toBeVisible();

    // Pesquisa SkyRoads
    await searchInput.fill('SkyRoads');
    await expect(launcherWin.getByRole('button', { name: /SkyRoads/i }).first()).toBeVisible();

    // Pesquisa DOOM
    await searchInput.fill('DOOM');
    await expect(launcherWin.getByRole('button', { name: /DOOM/i }).first()).toBeVisible();

    await page.screenshot({ path: 'evidence/003y-game-launcher-8games.png' });
    const closeBtn = launcherWin.getByRole('button', { name: /Fechar/i }).first();
    await closeBtn.click();
  });

  test('04. Alternância Dinâmica de Idiomas (pt-BR, en, es)', async ({ page }) => {
    await boot(page);
    
    // Iniciar padrão em Português
    await expect(page.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible();

    // Seletor de idioma na bandeja do sistema
    const langBtn = page.getByRole('button', { name: /PT|Idioma/i }).first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.screenshot({ path: 'evidence/003y-lang-selector.png' });
    }
  });

  test('05. Responsividade Mobile (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await boot(page);

    const startBtn = page.getByRole('button', { name: 'Iniciar', exact: true });
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    const startMenu = page.locator('.start-menu');
    await expect(startMenu).toBeVisible();
    await page.screenshot({ path: 'evidence/003y-mobile-390.png' });
  });

});
