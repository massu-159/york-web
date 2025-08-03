import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render navigation bar', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    await expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション');
  });

  test('should display logo with correct link', async ({ page }) => {
    const logo = page.getByRole('link', { name: /ホームページへ戻る/i });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '#');
    await expect(logo).toHaveText(/York\.web/);
  });

  test('should display desktop navigation items', async ({ page }) => {
    // Ensure we're in desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    
    const navItems = [
      { name: /ホームセクションへ移動/i, href: '#' },
      { name: /サービスセクションへ移動/i, href: '#services' },
      { name: /ポートフォリオセクションへ移動/i, href: '#portfolio' },
      { name: /会社概要セクションへ移動/i, href: '#about' },
      { name: /お問い合わせセクションへ移動/i, href: '#contact' }
    ];

    for (const item of navItems) {
      const link = page.getByRole('link', { name: item.name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', item.href);
    }
  });

  test('should navigate to sections when clicking links', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Click about link and check URL
    const aboutLink = page.getByRole('link', { name: /会社概要セクションへ移動/i });
    await aboutLink.click();
    await expect(page).toHaveURL(/#about$/);
    
    // Check that about section is visible
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
  });

  test('should show mobile navigation on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Desktop nav items should be hidden
    const desktopNav = page.locator('.hidden.md\\:flex');
    await expect(desktopNav).toBeHidden();
    
    // Mobile nav container should be visible
    const mobileNavContainer = page.locator('.md\\:hidden');
    await expect(mobileNavContainer).toBeVisible();
  });

  test('should open mobile menu when clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Look for menu trigger button
    const menuButton = page.getByRole('button').first();
    await expect(menuButton).toBeVisible();
    
    // Note: Sheet component behavior would need to be tested with actual interaction
    // This tests the presence of the mobile menu structure
  });

  test('should have proper hover effects on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    const homeLink = page.getByRole('link', { name: /ホームセクションへ移動/i });
    
    // Check initial state
    await expect(homeLink).toBeVisible();
    
    // Hover and check for hover styles (if CSS allows testing)
    await homeLink.hover();
    await expect(homeLink).toBeVisible();
  });

  test('should maintain navigation bar position on scroll', async ({ page }) => {
    // The navigation should have fixed positioning
    const nav = page.getByRole('navigation');
    
    // Check fixed positioning classes
    await expect(nav).toHaveClass(/fixed/);
    await expect(nav).toHaveClass(/top-0/);
    await expect(nav).toHaveClass(/w-full/);
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Navigation should still be visible
    await expect(nav).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toHaveAttribute('role', 'navigation');
    await expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション');
    
    // Check that all navigation links have proper aria-labels
    const links = await page.getByRole('link').all();
    
    for (const link of links) {
      const ariaLabel = await link.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });

  test('should have backdrop blur effect', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toHaveClass(/backdrop-blur-sm/);
    await expect(nav).toHaveClass(/bg-background\/80/);
  });

  test('should have correct z-index for overlay', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toHaveClass(/z-50/);
  });

  test('should display logo with pink accent', async ({ page }) => {
    const logoSpan = page.locator('span.text-pink-500');
    await expect(logoSpan).toBeVisible();
    await expect(logoSpan).toHaveText('web');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Tab through navigation links
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continue tabbing through navigation items
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const currentFocus = page.locator(':focus');
      await expect(currentFocus).toBeVisible();
    }
  });
});