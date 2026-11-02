import { test, expect } from '@playwright/test';

async function boot(p: any) {
  await p.goto('http://127.0.0.1:4676/');
  const skipBtn = p.getByRole('button', { name: 'Pular inicialização' });
  if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) await skipBtn.click();
  await expect(p.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible({ timeout: 10000 });
  const closeAbout = p.getByRole('button', { name: /Fechar/ });
  if (await closeAbout.isVisible({ timeout: 1000 }).catch(() => false)) await closeAbout.click();
}

test.describe('RETRO OS 004F — The Lost Internet: Jornadas Arqueológicas 1 a 6', () => {

  test('Jornada 1 — O Manifesto do Laboratório de 1999 e Download no VFS', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    // Abre o Retro Explorer
    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // 1. Navega para a página secreta do laboratório
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://secreto/lab1999');
    await urlInput.press('Enter');
    await page.waitForTimeout(400);

    // Valida carregamento da página secreta
    await expect(browserWin.locator('h1')).toContainText('ARQUIVO OCULTO · LABORATÓRIO 1999');

    // 2. Executa o download confidencial do manifesto
    const dlBtn = browserWin.getByRole('button', { name: /Salvar 'Manifesto Laboratorio 1999.txt' no VFS/i });
    await expect(dlBtn).toBeVisible();
    await dlBtn.click();
    await page.waitForTimeout(300);

    // Valida confirmação de salvamento no VFS
    await expect(browserWin.locator('.secret-page')).toContainText('Manifesto Laboratorio 1999.txt');
  });

  test('Jornada 2 — A Ascensão e Memorial da CyberSpace LAN House', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // 1. Acessa a LAN House
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://lanhouse');
    await urlInput.press('Enter');
    await page.waitForTimeout(400);

    await expect(browserWin.locator('h1')).toContainText('CYBERSPACE LAN HOUSE');

    // 2. Navega até o blog do Léo
    const blogLeoLink = browserWin.getByRole('link', { name: /Leia mais relatos na Bancada do Léo/i });
    await expect(blogLeoLink).toBeVisible();
    await blogLeoLink.click();
    await page.waitForTimeout(400);

    await expect(browserWin.locator('h1')).toContainText('Diário do monitor e Blogs da Turma');
    await expect(browserWin.locator('.blog-entry h2')).toContainText('Bancada do Léo');
  });

  test('Jornada 3 — Arquivo Histórico e Snapshots Temporais (1998-2008)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // 1. Acessa o Arquivo Histórico
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://arquivo');
    await urlInput.press('Enter');
    await page.waitForTimeout(400);

    await expect(browserWin.locator('h1')).toContainText('ARQUIVO HISTÓRICO DA WEB RETRÔ');

    // 2. Clica no snapshot de 2004
    const snap2004 = browserWin.getByRole('button', { name: 'Snapshot 2004' });
    await expect(snap2004).toBeVisible();
    await snap2004.click();
    await page.waitForTimeout(300);

    await expect(browserWin.locator('.archive-museum')).toContainText('2004: O auge das LAN Houses');
  });

  test('Jornada 4 — Buscador com Filtros Temporais e de Categoria', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // 1. Abre o Buscador
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://busca');
    await urlInput.press('Enter');
    await page.waitForTimeout(400);

    // 2. Busca por 'lanhouse'
    const searchInput = browserWin.getByRole('textbox', { name: /Buscar na internet retrô/i });
    await searchInput.fill('lanhouse');
    await page.waitForTimeout(300);

    await expect(browserWin.locator('.search-results-container')).toContainText('CyberSpace LAN House');
  });

  test('Jornada 5 — Integridade Temporal (Site Inexistente em 1998)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    // Abre a Máquina do Tempo e viaja para 1998
    const timeIcon = page.locator('.desktop-icons').locator('button[data-app-id="time"]');
    await timeIcon.dblclick();
    const timeWin = page.locator('section[data-app="time"]');
    await expect(timeWin).toBeVisible({ timeout: 10000 });

    const btn1998 = timeWin.getByRole('button', { name: '1998' });
    await btn1998.click();
    await page.waitForTimeout(400);

    // Abre o Retro Explorer em 1998
    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // Tenta acessar a Rede Recreio (que foi criada em 2004)
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://recreio');
    await urlInput.press('Enter');
    await page.waitForTimeout(400);

    // Valida exibição da tela de Domínio Reservado / Em Construção
    await expect(browserWin.locator('.era-under-construction')).toBeVisible();
    await expect(browserWin.locator('h2')).toContainText('Domínio Reservado / Em Construção (1998)');
  });

  test('Jornada 6 — Central de Downloads com Táticas e Manifesto no VFS', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await boot(page);

    const ieIcon = page.locator('.desktop-icons').locator('button[data-app-id="internet"]');
    await ieIcon.dblclick();
    const browserWin = page.locator('section[data-app="internet"]');
    await expect(browserWin).toBeVisible({ timeout: 10000 });

    // 1. Abre a Central de Downloads
    const urlInput = browserWin.locator('input#url');
    await urlInput.fill('retro://downloads');
    await urlInput.press('Enter');
    await page.waitForTimeout(400);

    // 2. Seleciona Táticas da LAN
    const taticaBtn = browserWin.getByRole('button', { name: /Táticas da LAN/i });
    await expect(taticaBtn).toBeVisible();
    await taticaBtn.click();
    await page.waitForTimeout(200);

    // 3. Executa o download
    const dlBtn = browserWin.getByRole('button', { name: 'Baixar TXT original' });
    await dlBtn.click();
    await page.waitForTimeout(1500);

    // Valida salvamento no VFS
    await expect(browserWin.locator('p')).toContainText('Taticas LAN House CS.txt');
  });

});
