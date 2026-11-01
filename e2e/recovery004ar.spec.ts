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

test.describe('RETRO OS 004A-R - Suíte de Recuperação de Escopo', () => {

  test('01. Marquee Drag Selection: arrasto em área vazia do desktop seleciona múltiplos ícones', async ({ page }) => {
    await boot(page);

    // Arrasta o mouse criando um retângulo de seleção sobre os dois primeiros ícones à esquerda
    await page.mouse.move(5, 5);
    await page.mouse.down();
    await page.mouse.move(120, 180, { steps: 5 });

    // Verifica que o elemento .desktop-marquee é renderizado
    const marquee = page.locator('.desktop-marquee');
    await expect(marquee).toBeVisible();

    // Solta o mouse para consolidar seleção
    await page.mouse.up();
    await expect(marquee).toBeHidden();

    // Confirma que ícones contidos no retângulo ganharam a classe .selected
    const selectedIcons = page.locator('.desktop-icon.selected');
    const count = await selectedIcons.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Clicar em espaço vazio desmarca a seleção
    await page.mouse.click(300, 300);
    await expect(page.locator('.desktop-icon.selected')).toHaveCount(0);
  });

  test('02. Jornada A - Internet Discada: Portal -> Downloads -> Simulação 56K', async ({ page }) => {
    await boot(page);
    const internetIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Internet', exact: true });
    await internetIcon.dblclick();

    const browserWin = page.getByRole('dialog', { name: 'Internet' });
    await expect(browserWin).toBeVisible();

    // Navega para a seção de Downloads
    await browserWin.getByRole('link', { name: 'Downloads' }).click();
    await expect(browserWin.getByRole('heading', { name: /Downloads que cabem/i })).toBeVisible();

    // Ativa modo lento 56K
    const slowCheckbox = browserWin.getByLabel(/Modo lento 56K/i);
    await expect(slowCheckbox).toBeVisible();
    await slowCheckbox.check();
  });

  test('03. Jornada C - LAN House: Portal -> Jogos -> Retro Game Launcher', async ({ page }) => {
    await boot(page);
    const internetIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Internet', exact: true });
    await internetIcon.dblclick();

    const browserWin = page.getByRole('dialog', { name: 'Internet' });
    await expect(browserWin).toBeVisible();

    // Acessa seção de Jogos
    await browserWin.getByRole('link', { name: 'Portal de jogos' }).click();
    await expect(browserWin.getByRole('heading', { name: 'Jogatina da lan' })).toBeVisible();

    // Abre o Launcher diretamente a partir do portal
    const launcherBtn = browserWin.getByRole('button', { name: /Abrir Retro Game Launcher/i });
    await expect(launcherBtn).toBeVisible();
    await launcherBtn.click();

    // Confirma que o Launcher abriu na tela
    const launcherWin = page.getByRole('dialog', { name: 'Retro Game Launcher' });
    await expect(launcherWin).toBeVisible();
  });

  test('04. Jornada B - Social Fictício -> Perfil -> Abrir Retro Messenger', async ({ page }) => {
    await boot(page);

    // Ajusta a Máquina do Tempo para 2004 para que serviços sociais estejam ativos
    const timeMachineIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Máquina do Tempo', exact: true });
    await timeMachineIcon.dblclick();
    const timeWin = page.getByRole('dialog', { name: 'Máquina do Tempo' });
    await expect(timeWin).toBeVisible();
    await timeWin.getByRole('button', { name: /2004/ }).click();
    const closeTime = page.getByRole('button', { name: /Fechar Máquina do Tempo/ });
    if (await closeTime.isVisible().catch(() => false)) await closeTime.click();

    // Abre a Internet
    const internetIcon = page.locator('.desktop-icons').getByRole('button', { name: 'Internet', exact: true });
    await internetIcon.dblclick();

    const browserWin = page.getByRole('dialog', { name: 'Internet' });
    await expect(browserWin).toBeVisible();

    // Digita o endereço retro://recreio na barra de navegação
    const addrBar = browserWin.getByRole('textbox', { name: /Endereço/i });
    await addrBar.fill('retro://recreio');
    await addrBar.press('Enter');

    // Confirma que carregou a rede fictícia recreio.net
    await expect(browserWin.getByText('recreio.net')).toBeVisible();

    // Clica no botão para abrir o Retro Messenger
    const openMessengerBtn = browserWin.getByRole('button', { name: /Abrir Retro Messenger com Bia/i });
    await expect(openMessengerBtn).toBeVisible();
    await openMessengerBtn.click();

    // Confirma que a janela do Retro Messenger abriu
    const messengerWin = page.getByRole('dialog', { name: /Retro Messenger|Bate-Papo/i });
    await expect(messengerWin).toBeVisible();
  });

});
