import { test, expect } from '@playwright/test';

test.describe('Produção Oficial - https://madeirareflo.github.io/RETRO-OS/', () => {
  test('Smoke Test Remoto: Produção 003Y ao vivo no GitHub Pages', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('requestfailed', req => {
      failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
    });

    // 1. Acesso à página pública oficial
    const res = await page.goto('https://madeirareflo.github.io/RETRO-OS/');
    expect(res?.status()).toBe(200);

    // Pula boot se necessário
    const skipBtn = page.getByRole('button', { name: 'Pular inicialização' });
    if (await skipBtn.isVisible({ timeout: 4000 }).catch(() => false)) {
      await skipBtn.click();
    }

    // Fecha janela Sobre se presente
    const closeAbout = page.getByRole('button', { name: /Fechar Sobre/ });
    if (await closeAbout.isVisible({ timeout: 2000 }).catch(() => false)) {
      await closeAbout.click();
    }

    // 2. Menu Iniciar e Desktop
    await expect(page.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible({ timeout: 10000 });

    // 3. Verifica Explorer com Menubar completa (003W)
    const myComp = page.locator('.desktop-icons').getByRole('button', { name: 'Meu Computador', exact: true });
    await expect(myComp).toBeVisible();
    await myComp.dblclick();

    const explorerWin = page.getByRole('dialog', { name: /Meu Computador|Explorer/i });
    await expect(explorerWin).toBeVisible({ timeout: 5000 });
    await expect(explorerWin.locator('.explorer-menus').getByRole('button', { name: 'Arquivo', exact: true })).toBeVisible();
    await expect(explorerWin.locator('.explorer-menus').getByRole('button', { name: 'Editar', exact: true })).toBeVisible();
    await explorerWin.getByRole('button', { name: /Fechar/i }).first().click();

    // 4. Verifica Internet 2000 (003X)
    const ieIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Internet', exact: true });
    await expect(ieIcon).toBeVisible();
    await ieIcon.dblclick();

    const browserWin = page.getByRole('dialog', { name: 'Internet' });
    await expect(browserWin).toBeVisible({ timeout: 5000 });
    await expect(browserWin.locator('#url')).toBeVisible();
    await browserWin.getByRole('button', { name: /Fechar/i }).first().click();

    // 5. Verifica Retro Game Launcher com os 8 jogos clássicos
    const launcherIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Retro Game Launcher', exact: true });
    await expect(launcherIcon).toBeVisible();
    await launcherIcon.dblclick();

    const launcherWin = page.getByRole('dialog', { name: 'Retro Game Launcher' });
    await expect(launcherWin).toBeVisible({ timeout: 5000 });
    const searchInput = launcherWin.locator('input[type="search"]');
    await searchInput.fill('Freedoom');
    await expect(launcherWin.getByRole('button', { name: /Freedoom/i }).first()).toBeVisible();

    await page.screenshot({ path: 'evidence/003y-live-github-pages.png' });
    await launcherWin.getByRole('button', { name: /Fechar/i }).first().click();

    // 6. Reporta erros se existirem
    console.log('Console Errors no Live:', consoleErrors);
    console.log('Failed Requests no Live:', failedRequests);
  });
});
