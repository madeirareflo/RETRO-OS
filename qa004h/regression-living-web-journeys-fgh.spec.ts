import { test, expect } from '@playwright/test';

async function boot(p: any) {
  await p.goto('http://127.0.0.1:5076/');
  const skipBtn = p.getByRole('button', { name: 'Pular inicialização' });
  if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) await skipBtn.click();
  await expect(p.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible({ timeout: 10000 });
  const closeAbout = p.getByRole('button', { name: /Fechar/ });
  if (await closeAbout.isVisible({ timeout: 1000 }).catch(() => false)) await closeAbout.click();
}

test.describe('RETRO OS 004E — Jornadas Integradas da Living Web', () => {

  test('Jornada F — Investigação: Buscador -> Fórum -> Postagem -> Diário -> Página Secreta', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    // Abre o Retro Explorer
    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // 1. Vai para o Buscador e pesquisa 'secreto'
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://busca');
    await urlInput.press('Enter');
    await page.waitForTimeout(300);

    const searchInput = browserWin.getByRole('textbox', { name: /Buscar na internet retrô/i });
    await searchInput.fill('secreto');
    await searchInput.press('Enter');
    await page.waitForTimeout(400);

    // 2. Clica no Fórum de Off-Topic nos resultados
    const forumLink = browserWin.getByRole('link', { name: /Fórum: Conversas Aleatórias & Mistérios/i });
    await expect(forumLink).toBeVisible();
    await forumLink.click();
    await page.waitForTimeout(400);

    // 3. No Fórum, abre tópico do clube antigo
    const threadBtn = browserWin.getByRole('button', { name: /Alguém lembra do site pioneiro do clube de 1999?/i });
    await expect(threadBtn).toBeVisible();
    await threadBtn.click();
    await page.waitForTimeout(400);

    // 4. Do Fórum, clica para navegar até o Diário do Monitor
    const blogLink = browserWin.getByRole('link', { name: /Página Oculta de 1999|retro:\/\/secreto\/lab1999/i }).first();
    await expect(blogLink).toBeVisible();
    await blogLink.click();
    await page.waitForTimeout(500);

    // 5. Valida chegada à Página Secreta
    await expect(browserWin.locator('h1')).toContainText('ARQUIVO OCULTO · LABORATÓRIO 1999');
    await expect(browserWin.locator('.secret-page')).toBeVisible();
  });

  test('Jornada G — Amigos: Fotolog -> Blog da Bia -> Rede Recreio', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // 1. Acessa o Fotolog da Turma
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://fotolog');
    await urlInput.press('Enter');
    await page.waitForTimeout(400);

    await expect(browserWin.locator('h1')).toContainText('fotodiário da turma');

    // 2. Clica para ler o Caderno da Bia
    const biaBlogLink = browserWin.getByRole('link', { name: /Caderno da Bia/i });
    await expect(biaBlogLink).toBeVisible();
    await biaBlogLink.click();
    await page.waitForTimeout(400);

    await expect(browserWin.locator('.blog-entry h2')).toContainText('Caderno da Bia');

    // 3. Do Blog da Bia, vai para o perfil dela na Rede Recreio
    const biaProfileLink = browserWin.getByRole('link', { name: /Deixar um scrap no meu perfil/i });
    await expect(biaProfileLink).toBeVisible();
    await biaProfileLink.click();
    await page.waitForTimeout(500);

    // 4. Valida perfil na Rede Recreio
    await expect(browserWin.locator('text=recreio.net')).toBeVisible();
    await expect(browserWin.locator('h1')).toContainText('Bia do laboratório');
    await expect(browserWin.locator('text=bia ☆ salvando o trabalho')).toBeVisible();
  });

  test('Jornada H — LAN House: Portal -> CyberSpace LAN House -> Retro Game Launcher', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // 1. Acessa o Portal Conexão 2000
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://portal');
    await urlInput.press('Enter');
    await page.waitForTimeout(400);

    // 2. Clica no banner ou link da LAN House
    const lanLink = browserWin.getByRole('button', { name: /Ver Tabela ↗|Conhecer a LAN House →/i }).first();
    await expect(lanLink).toBeVisible();
    await lanLink.click();
    await page.waitForTimeout(400);

    // 3. Valida tabela de preços da LAN House
    await expect(browserWin.locator('h1')).toContainText('CYBERSPACE LAN HOUSE & GAMES');
    await expect(browserWin.locator('table')).toContainText('Corujão (23h às 06h)');

    // 4. Clica no botão para abrir o Retro Game Launcher
    const launchGameBtn = browserWin.getByRole('button', { name: /Abrir Retro Game Launcher/i });
    await expect(launchGameBtn).toBeVisible();
    await launchGameBtn.click();
    await page.waitForTimeout(600);

    // 5. Valida que a janela do Game Launcher abriu no desktop
    const launcherWin = page.getByRole('dialog', { name: /Game Launcher|Jogos DOS/i });
    await expect(launcherWin).toBeVisible();
  });
});
