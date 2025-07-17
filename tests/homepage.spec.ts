import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays the main page content', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/York/);

    // Check main navigation
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav').locator('text=York.')).toBeVisible();
    await expect(page.locator('nav').locator('text=web')).toBeVisible();

    // Check navigation links
    await expect(page.locator('nav').locator('text=Home')).toBeVisible();
    await expect(page.locator('nav').locator('text=About')).toBeVisible();
    await expect(page.locator('nav').locator('text=Services')).toBeVisible();
    await expect(page.locator('nav').locator('text=Portfolio')).toBeVisible();
    await expect(page.locator('nav').locator('text=Contact')).toBeVisible();

    // Check theme toggle button
    await expect(
      page.getByRole('button', { name: 'Toggle theme' }),
    ).toBeVisible();

    // Check footer
    await expect(page.locator('footer')).toBeVisible();
    await expect(
      page.locator('text=© 2024 York.web All Rights Reserved.'),
    ).toBeVisible();
  });

  test('displays hero section', async ({ page }) => {
    // Check if hero section elements are present
    await expect(page.locator('nav').locator('text=York.')).toBeVisible();

    // Check if page content is loaded
    await expect(page.locator('main')).toBeVisible();
  });

  test('page loads without errors', async ({ page }) => {
    // Check that no console errors occurred
    const logs: string[] = [];
    page.on('console', message => {
      if (message.type() === 'error') {
        logs.push(message.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Allow for any async operations to complete
    await page.waitForTimeout(1000);

    // Check that no critical errors occurred
    expect(logs.filter(log => !log.includes('Warning:'))).toHaveLength(0);
  });

  test('has proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check meta viewport
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute(
      'content',
      'width=device-width, initial-scale=1',
    );

    // Check charset
    const charset = page.locator('meta[charset]');
    await expect(charset).toHaveAttribute('charset', 'utf-8');
  });
});
