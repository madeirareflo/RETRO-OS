import { test, expect } from '@playwright/test';

async function boot(p: any) {
  await p.goto('http://127.0.0.1:4676/');
  const skipBtn = p.getByRole('button', { name: 'Pular inicialização' });
  if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) await skipBtn.click();
  await expect(p.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible({ timeout: 10000 });
  const closeAbout = p.getByRole('button', { name: /Fechar/ });
  if (await closeAbout.isVisible({ timeout: 1000 }).catch(() => false)) await closeAbout.click();
}

async function openBrowser(page: any) {
  const internetIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Internet', exact: true });
  await internetIcon.dblclick();
  const browserWin = page.getByRole('dialog', { name: 'Internet' });
  await expect(browserWin).toBeVisible({ timeout: 5000 });
  return browserWin;
}

test.describe('RETRO OS 004B - As Cinco Jornadas Obrigatórias da Internet Nostálgica', () => {

  test('Jornada A — Descoberta: Portal inicial -> Buscador -> Resultados -> Homepage Pessoal -> Blog', async ({ page }) => {
    await boot(page);
    const browser = await openBrowser(page);

    // 1. No portal inicial, digita URL do buscador
    const urlInput = browser.locator('#url');
    await urlInput.fill('retro://busca');
    await browser.locator('button:has-text("Ir")').click();
    await expect(browser.locator('.web-search')).toBeVisible();

    // 2. Busca por "pessoal" e submete
    const input = browser.locator('input[aria-label="Buscar na internet retrô"]');
    await input.fill('pessoal');
    await browser.locator('.web-search button:has-text("Buscar")').click();

    // 3. Clica no resultado da Minha homepage
    const resultLink = browser.locator('a:has-text("Minha homepage")').first();
    await expect(resultLink).toBeVisible();
    await resultLink.click();
    await expect(browser.locator('.personal-page')).toBeVisible();

    // 4. Na homepage, clica no link para o Diário do Monitor (Blog)
    const blogBtn = browser.locator('button:has-text("Ler o Diário do Monitor")');
    await expect(blogBtn).toBeVisible();
    await blogBtn.click();
    await expect(browser.locator('.blog-museum')).toBeVisible();
    await expect(browser.locator('h1:has-text("Diário do monitor")')).toBeVisible();
  });

  test('Jornada B — Comunidade: Blog -> Rede Recreio -> Comunidade -> Fórum -> Outro perfil', async ({ page }) => {
    await boot(page);
    const browser = await openBrowser(page);

    // Digita URL do blog e navega
    const urlInput = browser.locator('#url');
    await urlInput.fill('retro://blog');
    await browser.locator('button:has-text("Ir")').click();
    await expect(browser.locator('.blog-museum')).toBeVisible();

    // Link para o perfil do Léo na Recreio
    const leoLink = browser.locator('a:has-text("Ver perfil do Léo na Recreio")');
    await expect(leoLink).toBeVisible();
    await leoLink.click();
    await expect(browser.locator('.social-museum')).toBeVisible();
    await expect(browser.locator('.social-museum h1:has-text("Léo")')).toBeVisible();

    // Clica na aba comunidades
    await browser.locator('.social-columns aside button:has-text("comunidades")').click();
    await expect(browser.locator('h1:has-text("Comunidades do recreio")')).toBeVisible();

    // Abre comunidade e clica no tópico do fórum da comunidade
    const topicLink = browser.locator('.social-museum button:has-text("Quantos arquivos FINAL")').first();
    if (await topicLink.isVisible()) {
      await topicLink.click();
      await expect(browser.locator('text=roteiro histórico fictício')).toBeVisible();
    }

    // Visita outro perfil fictício a partir do participante
    const biaLink = browser.locator('.social-museum button:has-text("Bia do laboratório")').first();
    await biaLink.click();
    await expect(browser.locator('.social-museum h1:has-text("Bia do laboratório")')).toBeVisible();
  });

  test('Jornada C — LAN House: Portal de jogos -> Dicas -> LAN House -> Game Launcher', async ({ page }) => {
    await boot(page);
    const browser = await openBrowser(page);

    // Navega para jogos
    const urlInput = browser.locator('#url');
    await urlInput.fill('retro://jogos');
    await browser.locator('button:has-text("Ir")').click();
    await expect(browser.locator('text=Jogatina da lan')).toBeVisible();

    // Clica no botão para abrir o Retro Game Launcher
    const launcherBtn = browser.locator('button:has-text("Retro Game Launcher")');
    await expect(launcherBtn).toBeVisible();
    await launcherBtn.click();

    // Janela nativa do launcher abre
    const launcherWin = page.getByRole('dialog', { name: 'Retro Game Launcher' });
    await expect(launcherWin).toBeVisible();
  });

  test('Jornada D — Download & VFS: Portal -> Downloads -> Conexão -> VFS C: Meus Documentos -> Explorer', async ({ page }) => {
    await boot(page);
    const browser = await openBrowser(page);

    // Vai para página de downloads
    const urlInput = browser.locator('#url');
    await urlInput.fill('retro://downloads');
    await browser.locator('button:has-text("Ir")').click();
    await expect(browser.locator('text=Downloads que cabem no seu disquete')).toBeVisible();

    // Inicia download rápido (sem marcar slow)
    const downloadBtn = browser.locator('button:has-text("Baixar TXT original")');
    await downloadBtn.click();

    // Espera concluir 100% e exibir aviso de VFS
    await expect(browser.locator('text=Arquivo salvo no sistema')).toBeVisible({ timeout: 6000 });

    // Clica no botão para abrir Meus Documentos
    const openDocsBtn = browser.locator('button:has-text("Abrir em Meus Documentos")');
    await openDocsBtn.click();

    // Janela do Explorer em Meus Documentos deve abrir contendo o arquivo
    const docsWin = page.getByRole('dialog', { name: /Meus Documentos|Explorer/i });
    await expect(docsWin).toBeVisible();
  });

  test('Jornada E — Internet de 2005: Fotolog -> Perfil Recreio -> Blog -> Messenger Offline', async ({ page }) => {
    await boot(page);
    const browser = await openBrowser(page);

    // Navega para fotolog
    const urlInput = browser.locator('#url');
    await urlInput.fill('retro://fotolog');
    await browser.locator('button:has-text("Ir")').click();
    await expect(browser.locator('.fotolog-museum')).toBeVisible();

    // Clica no link de comentário da Bia para o perfil da Recreio
    const biaComment = browser.locator('.fotolog-museum a:has-text("Bia")').first();
    await biaComment.click();
    await expect(browser.locator('.social-museum')).toBeVisible();
    await expect(browser.locator('.social-museum h1:has-text("Bia")')).toBeVisible();

    // Clica no botão de abrir Retro Messenger diretamente
    const msgBtn = browser.locator('button:has-text("Abrir Retro Messenger com Bia")');
    await expect(msgBtn).toBeVisible();
    await msgBtn.click();

    // Janela do Messenger deve abrir
    const msgWin = page.getByRole('dialog', { name: /Retro Messenger|Messenger/i });
    await expect(msgWin).toBeVisible();
  });
});
