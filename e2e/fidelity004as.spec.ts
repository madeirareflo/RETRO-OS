import { test, expect } from '@playwright/test';

async function boot(p: any) {
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

test.describe('RETRO OS 004A-S - Fidelidade Histórica Windows 98 / 2000 / XP', () => {

  test('01. Windows 98: Menu Iniciar clássico com banner vertical 98 e painel WebView', async ({ page }) => {
    await boot(page);

    // Ajusta para Windows 98 clássico pelo painel rápido ou propriedades
    const quickBtn = page.getByRole('button', { name: /Configurações rápidas/i });
    await quickBtn.click();
    const fidelityBtn = page.getByRole('button', { name: /Modo Fidelidade 100%|Fidelidade/i });
    await fidelityBtn.click();
    await page.keyboard.press('Escape');

    const startBtn = page.getByRole('button', { name: 'Iniciar', exact: true });
    await startBtn.click();

    const startMenu = page.locator('.start-menu');
    await expect(startMenu).toBeVisible();

    // Valida banner vertical do Win98
    const win98Banner = startMenu.locator('.win98-vertical-banner');
    await expect(win98Banner).toBeVisible();
    await expect(win98Banner).toContainText('Windows');
    await expect(win98Banner).toContainText('98');

    // Abre o Painel de Controle pelo Menu Iniciar
    await startMenu.getByRole('button', { name: /Configurações/i }).hover();
    const cpBtn = startMenu.getByRole('button', { name: /Painel de Controle/i });
    await expect(cpBtn).toBeVisible();
    await cpBtn.click();

    // Confirma janela de configurações / Painel de Controle
    const settingsWin = page.getByRole('dialog', { name: /Painel de Controle/i });
    await expect(settingsWin).toBeVisible();

    // Acessa catálogo clássico de itens
    await settingsWin.getByRole('button', { name: /Todos os itens do Painel de Controle/i }).click();
    const periodPanel = settingsWin.locator('.period-control-panel');
    await expect(periodPanel).toBeVisible();
    await expect(periodPanel.locator('.win98-cp-sidebar-info')).toBeVisible();

    // Fecha a janela
    await settingsWin.getByRole('button', { name: /Fechar Painel de Controle/i }).click();
  });

  test('02. Windows 2000 Professional: Identidade corporativa, banner 2000 e painel próprio', async ({ page }) => {
    await boot(page);

    // Abre Painel de Controle pelo ícone da área de trabalho
    const cpDesktopIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Painel de Controle', exact: true });
    await cpDesktopIcon.dblclick();

    const settingsWin = page.getByRole('dialog', { name: /Painel de Controle/i });
    await expect(settingsWin).toBeVisible();

    // Seleciona tema Windows 2000
    const win2000Choice = settingsWin.getByRole('button', { name: 'Windows 2000' });
    await win2000Choice.click();

    // Aplica e fecha
    await settingsWin.getByRole('button', { name: 'Aplicar' }).click();
    await settingsWin.getByRole('button', { name: 'OK' }).click();

    // Abre Menu Iniciar do Windows 2000
    const startBtn = page.getByRole('button', { name: 'Iniciar', exact: true });
    await startBtn.click();
    const ntStart = page.locator('.nt-start');
    await expect(ntStart).toBeVisible();
    const ntBanner = ntStart.locator('.nt-vertical-banner');
    await expect(ntBanner).toBeVisible();
    await expect(ntBanner).toContainText('Windows');
    await expect(ntBanner).toContainText('2000');
    await expect(ntBanner).toContainText('Professional');

    // Abre Meu Computador no Windows 2000 e valida WebView corporativo
    await page.keyboard.press('Escape');
    const myComputerIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Meu Computador', exact: true });
    await myComputerIcon.dblclick();

    const explorerWin = page.getByRole('dialog', { name: 'Meu Computador' });
    await expect(explorerWin).toBeVisible();
    const ntWebview = explorerWin.locator('.nt-webview');
    await expect(ntWebview).toBeVisible();
    await expect(ntWebview).toContainText('Meu Computador');

    // Fecha janela
    await explorerWin.getByRole('button', { name: /Fechar Meu Computador/i }).click();
  });

  test('03. Windows XP Luna: Menu Iniciar 2 colunas, Painel por Categorias e Task Pane', async ({ page }) => {
    await boot(page);

    // Abre Painel de Controle para trocar para XP
    const cpDesktopIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Painel de Controle', exact: true });
    await cpDesktopIcon.dblclick();

    const settingsWin = page.getByRole('dialog', { name: /Painel de Controle/i });
    await expect(settingsWin).toBeVisible();

    // Seleciona XP NOSTALGIA
    await settingsWin.getByRole('button', { name: 'XP NOSTALGIA' }).click();
    await settingsWin.getByRole('button', { name: 'Aplicar' }).click();
    await settingsWin.getByRole('button', { name: 'OK' }).click();

    // Abre Menu Iniciar do Windows XP Luna
    const startBtn = page.getByRole('button', { name: 'Iniciar', exact: true });
    await startBtn.click();
    const lunaStart = page.locator('.luna-start');
    await expect(lunaStart).toBeVisible();
    await expect(lunaStart.locator('.luna-user-header')).toBeVisible();
    await expect(lunaStart.locator('.luna-columns')).toBeVisible();
    await expect(lunaStart.locator('.luna-pinned')).toBeVisible();
    await expect(lunaStart.locator('.luna-links')).toBeVisible();

    // Abre Explorer e verifica Common Tasks Pane
    await page.keyboard.press('Escape');
    const docsIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Meus Documentos', exact: true });
    await docsIcon.dblclick();

    const explorerWin = page.getByRole('dialog', { name: 'Meus Documentos' });
    await expect(explorerWin).toBeVisible();
    const taskPane = explorerWin.locator('.xp-task-pane');
    await expect(taskPane).toBeVisible();
    await expect(taskPane).toContainText('Tarefas de arquivos e pastas');
    await expect(taskPane).toContainText('Outros locais');

    // Abre Painel de Controle e valida modo de Categorias XP
    const cpDesktopBtn = page.locator('.desktop-icons').getByRole('button', { name: 'Painel de Controle', exact: true });
    await cpDesktopBtn.dblclick();

    const cpWin = page.getByRole('dialog', { name: /Painel de Controle/i });
    await expect(cpWin).toBeVisible();

    // Acessa catálogo de itens do Painel
    await cpWin.getByRole('button', { name: /Todos os itens do Painel de Controle/i }).click();
    const xpCategories = cpWin.locator('.xp-categories-grid');
    await expect(xpCategories).toBeVisible();
    await expect(xpCategories).toContainText('Escolha uma categoria');

    // Alterna para visualização clássica e volta para categorias
    const toggleBtn = cpWin.locator('.xp-view-toggle-btn');
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(cpWin.locator('.cp-items')).toBeVisible();

    await toggleBtn.click();
    await expect(xpCategories).toBeVisible();
  });

});
