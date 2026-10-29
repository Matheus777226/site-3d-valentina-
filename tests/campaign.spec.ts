import { test, expect } from '@playwright/test';

const shopNumber = '5547996420364';
const catalogUrl = 'https://wa.me/c/554732226894';

test('landing prioritizes conversation, preserves essential sections and avoids repeated imagery', async ({ page }) => {
  const errors: string[] = [];
  const failures: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith('http://127.0.0.1:4180/') && response.status() >= 400) failures.push(response.url());
  });
  await page.goto('/');
  await expect(page).toHaveTitle('Valentina Closet | Moda Feminina em Blumenau');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('conversa');
  const primary = page.locator('.hero-primary');
  await expect(primary).toBeVisible();
  await expect(primary).toHaveAttribute('href', new RegExp(`^https://wa\\.me/${shopNumber}\\?text=`));
  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver catálogo', exact: true })).toHaveAttribute('href', catalogUrl);
  for (const id of ['novidades', 'catalogo', 'clientes', 'jo', 'vip', 'instagram', 'loja']) await expect(page.locator(`#${id}`)).toHaveCount(1);
  await expect(page.locator('canvas, .pin-spacer, .runway, .art-gallery, .concepts, .manifesto')).toHaveCount(0);
  const unresolved = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))));
  expect(unresolved).toEqual([]);
  const photos = await page.locator('main img').evaluateAll(images => images.map(img => (img as HTMLImageElement).src));
  expect(new Set(photos).size).toBe(photos.length);
  expect(errors).toEqual([]);
  expect(failures).toEqual([]);
});

test('catalog and contact calls preserve their destinations and supply relevant conversation starters', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#catalogo a').filter({ hasText: /catálogo/i }).first()).toHaveAttribute('href', catalogUrl);
  const expected: Array<[string, RegExp]> = [
    ['#novidades', /verão/i],
    ['#clientes', /look|escolher/i],
    ['#vip', /convite|grupo vip/i],
    ['#jo', /Jô/i],
  ];
  for (const [section, message] of expected) {
    const href = await page.locator(`${section} a[href^="https://wa.me/${shopNumber}"]`).first().getAttribute('href');
    const url = new URL(href!);
    expect(url.pathname).toBe(`/${shopNumber}`);
    expect(url.searchParams.get('text')).toMatch(message);
  }
  await expect(page.locator('#vip')).toContainText('WhatsApp da loja');
  await expect(page.locator('#jo')).toContainText('WhatsApp da loja');
  await expect(page.locator('#jo img')).toHaveAttribute('src', /jo.*\.jpg$/);
  await expect(page.locator('#instagram a[href="https://www.instagram.com/valentinaclosetloja/"]').first()).toBeAttached();
  await expect(page.locator('#loja address')).toContainText('Rua Júlio Michel, 262');
  const maps = new URL((await page.locator('#loja a[href*="google.com/maps"]').first().getAttribute('href'))!);
  expect(maps.searchParams.get('query')).toMatch(/Júlio Michel.*262.*Blumenau/);
  await expect(page.locator('#novidades img')).toHaveCount(1);
  await expect(page.locator('#novidades img')).toHaveAttribute('src', /colecao-verao.*\.png$/);
});

test('mobile menu works by keyboard and persistent contact remains reachable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Abrir menu', exact: true });
  await menu.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Fechar', exact: true })).toBeFocused();
  expect(await page.locator('#root').evaluate(el => el.inert)).toBe(true);
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('dialog').getByRole('link', { name: 'Catálogo', exact: false }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(await page.locator('#root').evaluate(el => el.inert)).toBe(false);

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width <= 390) {
      const contact = page.locator('.mobile-contact-bar');
      await expect(contact).toBeVisible();
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
      const bounds = await contact.boundingBox();
      expect(bounds!.y).toBeGreaterThanOrEqual(0);
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(901);
      await expect(contact.locator('a').first()).toHaveAttribute('href', new RegExp(`^https://wa\\.me/${shopNumber}\\?text=`));
    }
  }
});

test('customer carousel loads original photos and opens a complete image with accessible dismissal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const track = page.locator('.proof-wall');
  await track.scrollIntoViewIfNeeded();
  await expect(track.locator('img')).toHaveCount(4);
  for (const image of await track.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await track.evaluate(el => el.scrollTo({ left: 0, behavior: 'instant' }));
  await page.getByRole('button', { name: 'Próximas fotos', exact: true }).click();
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(150);
  const photo = page.getByRole('button', { name: 'Ampliar: Regata de poá', exact: false });
  await photo.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('img')).toHaveAttribute('src', /cliente-poa.*\.jpg$/);
  await expect(dialog.getByRole('button', { name: 'Fechar', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(photo).toBeFocused();
});

test('reduced motion retains collection content and direct contact actions', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('.hero-primary')).toBeVisible();
  await page.locator('#novidades').scrollIntoViewIfNeeded();
  await page.locator('#novidades img').evaluate(img => (img as HTMLImageElement).decode());
  const image = await page.locator('#novidades img').evaluate(el => {
    const img = el as HTMLImageElement;
    return { natural: img.naturalWidth / img.naturalHeight, rendered: img.getBoundingClientRect().width / img.getBoundingClientRect().height };
  });
  expect(image.rendered).toBeCloseTo(image.natural, 2);
  await expect(page.locator('#novidades h2')).toContainText('de verão');
  await expect(page.locator('canvas, .pin-spacer')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
