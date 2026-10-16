import { test, expect, type Page } from '@playwright/test';

async function scrollToY(page: Page, y: number) {
  await page.evaluate(value => window.scrollTo({ top: value, behavior: 'instant' }), y);
  await expect.poll(() => page.evaluate(() => Math.round(scrollY)), { timeout: 8000 }).toBeCloseTo(Math.round(y), -1);
}

test('preserves the brand palette and renders live WebGL with local assets', async ({ page }) => {
  const errors: string[] = [];
  const failed: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failed.push(response.url()); });
  await page.goto('/');
  await expect(page.locator('canvas[data-webgl="ready"]').first()).toBeVisible();
  const palette = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return ['--brand', '--brand-deep', '--brand-action', '--brand-soft', '--brand-blush', '--paper', '--ink', '--muted', '--line'].map(name => style.getPropertyValue(name).trim());
  });
  expect(palette).toEqual(['#df2a93', '#17191d', '#df2a93', '#f8d8ea', '#e96db7', '#fff', '#17191d', '#17191d', '#f8d8ea']);
  const photo = await page.locator('.hero-portrait').boundingBox();
  expect(photo!.x).toBeGreaterThan(200);
  expect(photo!.x + photo!.width).toBeLessThan(1440);
  expect(photo!.y + photo!.height).toBeLessThan(1000);
  await page.screenshot({ path: '/tmp/valentina-campaign-desktop.png' });
  const transform = await page.locator('.hero-title-first').evaluate(el => getComputedStyle(el).transform);
  await scrollToY(page, 450);
  await expect.poll(() => page.locator('.hero-title-first').evaluate(el => getComputedStyle(el).transform)).not.toBe(transform);
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
  await expect(page.locator('.proof-print')).toHaveCount(4);
});

test('vertical scroll advances the pinned runway and sequential concepts', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.runway.is-horizontal')).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
  const bounds = await page.locator('.runway').evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: el.querySelector('.runway-track')!.scrollWidth - innerWidth }));
  await scrollToY(page, bounds.top + bounds.travel * .42);
  await expect.poll(() => page.locator('.runway').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(5);
  await expect.poll(() => page.locator('.runway-track').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41)).toBeLessThan(-500);
  const look = page.getByRole('button', { name: 'Ver editorial Entre texturas', exact: true });
  await look.focus();
  await look.press('Enter');
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Entre texturas' })).toBeVisible();
  await page.getByRole('button', { name: 'Próximo editorial' }).click();
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Naturalmente você' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(look).toBeFocused();
  const start = await page.locator('.concepts').evaluate(el => el.getBoundingClientRect().top + scrollY);
  await scrollToY(page, start + 1900);
  await expect.poll(() => page.locator('.concepts').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(5);
  await expect(page.getByRole('heading', { name: 'Atitude', exact: true })).toBeVisible();
});

test('mobile keeps normal page scrolling, swipe gallery and working navigation', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('canvas[data-webgl="ready"]').first()).toBeVisible();
  await expect(page.locator('.art-cursor')).toBeHidden();
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '/tmp/valentina-campaign-mobile.png' });
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.getByRole('dialog').getByRole('link', { name: 'Looks' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  const track = page.locator('.runway-track');
  await track.evaluate(el => { el.scrollLeft = el.clientWidth * 2; });
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(400);
  await page.getByRole('button', { name: 'Ver editorial Entre texturas', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Fechar', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(await page.locator('.art-webgl').first().evaluate(el => getComputedStyle(el).pointerEvents)).toBe('none');
  await page.setViewportSize({ width: 320, height: 740 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await context.close();
});

test('reduced motion shows all content and keyboard focus stays inside dialogs', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('.art-cursor')).toBeHidden();
  expect(await page.locator('.manifesto-word').evaluateAll(elements => elements.every(el => getComputedStyle(el).opacity === '1'))).toBe(true);
  for (const title of ['Elegância', 'Personalidade', 'Atitude', 'Estilo']) await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ver editorial Essência urbana', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole('button', { name: 'Fechar', exact: true });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Próximo editorial' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  expect(await page.locator('#root').evaluate(el => el.inert)).toBe(true);
  await page.keyboard.press('Escape');
  expect(await page.locator('#root').evaluate(el => el.inert)).toBe(false);
  await expect(page.locator('.contact-orb')).toHaveAttribute('href', 'https://wa.me/5547996420364');
  await context.close();
});

test('institutional contacts and placeholders are honest and all anchors resolve', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Valentina Closet | Moda Feminina em Blumenau');
  await expect(page.locator('h1')).toHaveText('A modatetransforma.');
  const unresolved = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))));
  expect(unresolved).toEqual([]);
  await expect(page.locator('#vip .pill-button')).toHaveAttribute('href', /wa\.me\/5547996420364\?text=/);
  await expect(page.locator('#vip')).toContainText('Link direto do grupo em breve');
  await expect(page.locator('#jo')).toContainText('WhatsApp da loja');
  await expect(page.locator('.proof-placeholder')).toHaveCount(0);
  await expect(page.locator('a')).not.toContainText(['Comprar pelo WhatsApp']);
  await expect(page.locator('#loja address')).toContainText('Blumenau, Santa Catarina, Brasil');
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('customer carousel shows four original prints, advances and opens full images', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const track = page.locator('.proof-wall');
  await track.scrollIntoViewIfNeeded();
  await expect(track.locator('img')).toHaveCount(4);
  for (const img of await track.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await track.evaluate(el => el.scrollTo({ left: 0, behavior: 'instant' }));
  await page.getByRole('button', { name: 'Próximas fotos', exact: true }).click();
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(200);
  await page.getByRole('button', { name: 'Ampliar: Regata de poá', exact: false }).click();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', /cliente-poa.*\.jpg$/);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '/tmp/valentina-clientes-mobile.png' });
});
