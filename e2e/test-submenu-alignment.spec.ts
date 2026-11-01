import { test, expect } from '@playwright/test';

async function boot(p: any) {
  await p.goto('http://127.0.0.1:4676/');
  const skipBtn = p.getByRole('button', { name: 'Pular inicialização' });
  if (await skipBtn.isVisible({ timeout: 2000 }).catch(() => false)) await skipBtn.click();
  await expect(p.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible({ timeout: 10000 });
  const closeAbout = p.getByRole('button', { name: /Fechar Sobre/ });
  if (await closeAbout.isVisible({ timeout: 1000 }).catch(() => false)) await closeAbout.click();
}

test('Verificar alinhamento dinâmico do submenu', async ({ page }) => {
  await boot(page);

  // Ativa modo fidelidade 100%
  const quickBtn = page.getByRole('button', { name: /Configurações rápidas/i });
  await quickBtn.click();
  const fidelityBtn = page.getByRole('button', { name: /Modo Fidelidade 100%|Fidelidade/i });
  await fidelityBtn.click();
  await page.keyboard.press('Escape');

  const startBtn = page.getByRole('button', { name: 'Iniciar', exact: true });
  await startBtn.click();
  const startMenu = page.locator('.start-menu');
  await expect(startMenu).toBeVisible();

  // Teste Documentos
  const docBtn = startMenu.getByRole('button', { name: /Documentos/i }).first();
  await docBtn.hover();
  await page.waitForTimeout(300);

  const docBox = await docBtn.boundingBox();
  const cascade = page.locator('.start-programs.cascade');
  const cascadeBox = await cascade.boundingBox();
  console.log('DOCUMENTOS:', { docY: docBox?.y, cascadeY: cascadeBox?.y, diff: Math.abs((docBox?.y || 0) - (cascadeBox?.y || 0)) });

  // Tira print da correcao
  await page.screenshot({ path: 'evidence/004b-submenu-bug-fixed.png' });

  // Teste Configurações
  const cfgBtn = startMenu.getByRole('button', { name: /Configurações/i }).first();
  await cfgBtn.hover();
  await page.waitForTimeout(300);
  const cfgBox = await cfgBtn.boundingBox();
  const cascadeBoxCfg = await cascade.boundingBox();
  console.log('CONFIGURACOES:', { cfgY: cfgBox?.y, cascadeY: cascadeBoxCfg?.y, diff: Math.abs((cfgBox?.y || 0) - (cascadeBoxCfg?.y || 0)) });

  // O alinhamento do topo deve ser praticamente identico (< 2px de diferenca de borda)
  expect(Math.abs((docBox?.y || 0) - (cascadeBox?.y || 0))).toBeLessThanOrEqual(2);
  expect(Math.abs((cfgBox?.y || 0) - (cascadeBoxCfg?.y || 0))).toBeLessThanOrEqual(2);
});
