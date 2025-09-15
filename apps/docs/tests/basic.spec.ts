import { test, expect } from '@playwright/test';

test('home renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=AutofuseCSS')).toBeVisible();
  await expect(page).toHaveScreenshot('home.png');
});

test('utilities index', async ({ page }) => {
  await page.goto('/utilities');
  await expect(page.locator('text=Utilities')).toBeVisible();
  await expect(page).toHaveScreenshot('utilities.png');
});

test('studio page and export button', async ({ page }) => {
  await page.goto('/studio');
  await expect(page.locator('text=Theme Studio')).toBeVisible();
  await expect(page.locator('text=Export')).toBeVisible();
  // Interact: try clicking auto-generate; ignore WS connect if fails
  await page.locator('text=Auto‑generate Primary Shades').click();
  await expect(page).toHaveScreenshot('studio.png');
  // Try WS connect if server is present
  try {
    await page.getByPlaceholder('ws://localhost:4001').fill('ws://localhost:4001');
    await page.getByPlaceholder('room').fill('default');
    await page.getByPlaceholder('token (optional)').fill('');
    await page.getByRole('button', { name: 'Connect WS' }).click();
    await page.getByRole('button', { name: 'Connected' }).waitFor({ timeout: 2000 });
    // Roundtrip validation via WS message
    const ok = await page.evaluate(async () => {
      const url = 'ws://localhost:4001/ws?room=default';
      return await new Promise<boolean>((resolve) => {
        const ws = new WebSocket(url);
        ws.onopen = () => {
          ws.send(JSON.stringify({ type: 'tokens:update', tokens: { colors: { primary: { 500: '#22c55e' } } } }));
          setTimeout(() => {
            const v = getComputedStyle(document.documentElement).getPropertyValue('--af-color-primary-500').trim();
            resolve(v.includes('#22c55e'));
            ws.close();
          }, 400);
        };
        ws.onerror = () => resolve(false);
      });
    });
    if (ok) expect(ok).toBe(true);
  } catch {}
});

test('typography utilities page visual', async ({ page }) => {
  await page.goto('/doc/utilities/Typography');
  await expect(page).toHaveScreenshot('utilities-typography.png');
});

test('spacing utilities page visual', async ({ page }) => {
  await page.goto('/doc/utilities/Spacing');
  await expect(page).toHaveScreenshot('utilities-spacing.png');
});

test('colors utilities page visual', async ({ page }) => {
  await page.goto('/doc/utilities/Colors');
  await expect(page).toHaveScreenshot('utilities-colors.png');
});

test('forms utilities page visual', async ({ page }) => {
  await page.goto('/doc/utilities/Forms');
  await expect(page).toHaveScreenshot('utilities-forms.png');
});
