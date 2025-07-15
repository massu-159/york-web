import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Mobile Viewport (375px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('navigation adapts to mobile view', async ({ page }) => {
      // Check that navigation is visible
      await expect(page.locator('nav')).toBeVisible();
      
      // Brand should be visible
      await expect(page.locator('nav').locator('text=York.')).toBeVisible();
      await expect(page.locator('nav').locator('text=web')).toBeVisible();
      
      // Navigation links should be hidden on mobile (using md:flex class)
      const navLinks = page.locator('.hidden.md\\:flex');
      await expect(navLinks).toBeHidden();
      
      // Theme toggle should still be accessible
      await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
    });

    test('main content adapts to mobile view', async ({ page }) => {
      // Main content should be visible
      await expect(page.locator('main')).toBeVisible();
      
      // Check that content doesn't overflow
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(375);
    });

    test('footer adapts to mobile view', async ({ page }) => {
      // Footer should be visible
      await expect(page.locator('footer')).toBeVisible();
      
      // Check that footer content is properly arranged for mobile
      await expect(page.locator('text=© 2024 York.web All Rights Reserved.')).toBeVisible();
    });

    test('contact form is usable on mobile', async ({ page }) => {
      await page.goto('/#contact');
      
      // Form fields should be visible and usable
      await expect(page.locator('input[placeholder="Your Name"]')).toBeVisible();
      await expect(page.locator('input[placeholder="Your Email"]')).toBeVisible();
      await expect(page.locator('textarea[placeholder="Your Message"]')).toBeVisible();
      await expect(page.locator('button:has-text("SEND MESSAGE")')).toBeVisible();
      
      // Test form interaction on mobile
      await page.fill('input[placeholder="Your Name"]', 'Mobile User');
      await expect(page.locator('input[placeholder="Your Name"]')).toHaveValue('Mobile User');
    });
  });

  test.describe('Tablet Viewport (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
    });

    test('navigation shows desktop layout on tablet', async ({ page }) => {
      // Navigation should show desktop layout
      await expect(page.locator('nav')).toBeVisible();
      
      // Navigation links should be visible (md:flex means visible on md and up)
      const navLinks = page.locator('.hidden.md\\:flex');
      await expect(navLinks).toBeVisible();
      
      // All navigation links should be visible
      await expect(page.locator('nav').locator('text=Home')).toBeVisible();
      await expect(page.locator('nav').locator('text=About')).toBeVisible();
      await expect(page.locator('nav').locator('text=Services')).toBeVisible();
      await expect(page.locator('nav').locator('text=Portfolio')).toBeVisible();
      await expect(page.locator('nav').locator('text=Contact')).toBeVisible();
    });

    test('content layout adapts to tablet view', async ({ page }) => {
      // Main content should be visible
      await expect(page.locator('main')).toBeVisible();
      
      // Check that content is properly sized for tablet
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(768);
    });
  });

  test.describe('Desktop Viewport (1024px and above)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
    });

    test('navigation shows full desktop layout', async ({ page }) => {
      // All navigation elements should be visible
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('nav').locator('text=York.')).toBeVisible();
      await expect(page.locator('nav').locator('text=web')).toBeVisible();
      
      // Navigation links should be fully visible
      await expect(page.locator('nav').locator('text=Home')).toBeVisible();
      await expect(page.locator('nav').locator('text=About')).toBeVisible();
      await expect(page.locator('nav').locator('text=Services')).toBeVisible();
      await expect(page.locator('nav').locator('text=Portfolio')).toBeVisible();
      await expect(page.locator('nav').locator('text=Contact')).toBeVisible();
      
      // Theme toggle should be visible
      await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
    });

    test('content utilizes full desktop space', async ({ page }) => {
      // Main content should be visible
      await expect(page.locator('main')).toBeVisible();
      
      // Content should be properly centered with max-width
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible();
    });
  });

  test.describe('Large Desktop Viewport (1440px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
    });

    test('content is properly centered on large screens', async ({ page }) => {
      // Check that content uses max-width containers
      const nav = page.locator('nav .max-w-7xl');
      await expect(nav).toBeVisible();
      
      // Main content should be visible and centered
      await expect(page.locator('main')).toBeVisible();
    });

    test('footer adapts to large desktop view', async ({ page }) => {
      // Footer should be visible and properly laid out
      await expect(page.locator('footer')).toBeVisible();
      
      // Footer content should be properly spaced
      const footerContent = page.locator('footer .max-w-7xl');
      await expect(footerContent).toBeVisible();
    });
  });

  test.describe('Orientation Changes', () => {
    test('handles portrait to landscape orientation', async ({ page }) => {
      // Start in portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('nav')).toBeVisible();
      
      // Change to landscape
      await page.setViewportSize({ width: 667, height: 375 });
      await expect(page.locator('nav')).toBeVisible();
      
      // Content should still be accessible
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('Accessibility on Different Screen Sizes', () => {
    test('maintains accessibility on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check that interactive elements are still accessible
      const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
      await expect(themeToggle).toBeVisible();
      
      // Check that theme toggle is still functional
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for theme change
    });

    test('maintains keyboard navigation on different screen sizes', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Test keyboard navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Theme toggle should be focusable
      const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
      await expect(themeToggle).toBeFocused();
    });
  });

  test.describe('Performance on Different Screen Sizes', () => {
    test('loads quickly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Load time should be reasonable (under 5 seconds)
      expect(loadTime).toBeLessThan(5000);
    });

    test('no horizontal scrolling on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check that body width doesn't exceed viewport
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(375);
    });
  });
});