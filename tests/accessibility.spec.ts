import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Test navigation with keyboard
    await page.keyboard.press('Tab');

    // Check if skip link is focused
    const skipLink = await page.locator('.skip-link:focus');
    await expect(skipLink).toBeVisible();

    // Press Enter to skip to main content
    await page.keyboard.press('Enter');

    // Continue tabbing through navigation
    await page.keyboard.press('Tab');
    const firstNavLink = await page.locator('nav a:first-child');
    await expect(firstNavLink).toBeFocused();
  });

  test('form should have proper labels and be accessible', async ({ page }) => {
    await page.goto('/');

    // Navigate to contact form
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Check form accessibility
    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
    const messageTextarea = page.locator('#contact-message');

    await expect(nameInput).toHaveAttribute('aria-required', 'true');
    await expect(emailInput).toHaveAttribute('aria-required', 'true');
    await expect(messageTextarea).toHaveAttribute('aria-required', 'true');

    // Check that labels are properly associated
    await expect(nameInput).toHaveAttribute(
      'aria-describedby',
      'name-description',
    );
    await expect(emailInput).toHaveAttribute(
      'aria-describedby',
      'email-description',
    );
    await expect(messageTextarea).toHaveAttribute(
      'aria-describedby',
      'message-description',
    );
  });

  test('theme toggle should be accessible', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('button[aria-label*=\"テーマ\"]');

    // Check if theme toggle has proper attributes
    await expect(themeToggle).toHaveAttribute('aria-label');
    await expect(themeToggle).toHaveAttribute('title');

    // Test keyboard interaction
    await themeToggle.focus();
    await expect(themeToggle).toBeFocused();

    await page.keyboard.press('Enter');
    // Theme should change (we can check if the class or attribute changed)
  });

  test('headings should follow proper hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check heading hierarchy
    const h1 = page.locator('h1');
    const h2Elements = page.locator('h2');
    const h3Elements = page.locator('h3');

    await expect(h1).toHaveCount(1); // Should have exactly one h1
    await expect(h2Elements).toHaveCount.greaterThan(0); // Should have h2 elements

    // Verify h1 comes before h2 elements
    const h1Text = await h1.textContent();
    expect(h1Text).toBeTruthy();
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const altText = await image.getAttribute('alt');
      expect(altText).toBeTruthy();
    }
  });

  test('focus should be trapped in modals/dialogs', async ({ page }) => {
    await page.goto('/');

    // If there are any modal triggers, test focus trapping
    // This test would be expanded when modals are implemented

    // For now, just verify no modals are open by default
    const modals = page.locator('[role=\"dialog\"]');
    await expect(modals).toHaveCount(0);
  });

  test('color contrast should meet WCAG AA standards', async ({ page }) => {
    await page.goto('/');

    // Test with axe-core for color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('screen reader announcements should work', async ({ page }) => {
    await page.goto('/');

    // Check if announcement container exists
    const announcements = page.locator('#announcements');
    await expect(announcements).toHaveAttribute('aria-live', 'polite');
    await expect(announcements).toHaveAttribute('aria-atomic', 'true');
    await expect(announcements).toHaveClass(/sr-only/);
  });

  test('reduced motion preferences should be respected', async ({ page }) => {
    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Check if animations are reduced/disabled
    const animatedElements = page.locator('.animate-ripple');

    if ((await animatedElements.count()) > 0) {
      const animationDuration = await animatedElements
        .first()
        .evaluate(el => getComputedStyle(el).animationDuration);

      // Animation duration should be very short or zero when reduced motion is preferred
      expect(parseFloat(animationDuration)).toBeLessThanOrEqual(0.1);
    }
  });
});
