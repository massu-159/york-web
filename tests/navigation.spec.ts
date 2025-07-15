import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigation links are clickable and functional', async ({ page }) => {
    // Test Home link
    await page.click('text=Home');
    await expect(page).toHaveURL('/');
    
    // Test About link (should scroll to about section)
    await page.click('text=About');
    await expect(page).toHaveURL('/#about');
    
    // Test Services link (should scroll to services section)
    await page.click('text=Services');
    await expect(page).toHaveURL('/#services');
    
    // Test Portfolio link (should scroll to portfolio section)
    await page.click('text=Portfolio');
    await expect(page).toHaveURL('/#portfolio');
    
    // Test Contact link (should scroll to contact section)
    await page.click('text=Contact');
    await expect(page).toHaveURL('/#contact');
  });

  test('theme toggle functionality', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
    await expect(themeToggle).toBeVisible();
    
    // Get initial theme state
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    
    // Click theme toggle
    await themeToggle.click();
    
    // Wait for theme change
    await page.waitForTimeout(500);
    
    // Check that theme has changed
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    
    expect(newTheme).toBe(!initialTheme);
  });

  test('mobile navigation behavior', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // On mobile, navigation links should be hidden by default
    const navLinks = page.locator('.hidden.md\\:flex');
    await expect(navLinks).toBeHidden();
    
    // Brand/logo should still be visible
    await expect(page.locator('nav').locator('text=York.')).toBeVisible();
    await expect(page.locator('nav').locator('text=web')).toBeVisible();
  });

  test('navigation accessibility', async ({ page }) => {
    // Check that navigation has proper semantic structure
    await expect(page.locator('nav')).toBeVisible();
    
    // Check that theme toggle has proper accessibility
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
    await expect(themeToggle).toBeVisible();
    
    // Check that links are accessible
    const homeLink = page.locator('nav a[href="#"]');
    await expect(homeLink).toBeVisible();
    
    const aboutLink = page.locator('nav a[href="#about"]');
    await expect(aboutLink).toBeVisible();
    
    const servicesLink = page.locator('nav a[href="#services"]');
    await expect(servicesLink).toBeVisible();
    
    const portfolioLink = page.locator('nav a[href="#portfolio"]');
    await expect(portfolioLink).toBeVisible();
    
    const contactLink = page.locator('nav a[href="#contact"]');
    await expect(contactLink).toBeVisible();
  });

  test('navigation keyboard accessibility', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Theme toggle should be focusable
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
    await expect(themeToggle).toBeFocused();
    
    // Continue tabbing through navigation links
    await page.keyboard.press('Tab');
    await expect(page.locator('nav a[href="#"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('nav a[href="#services"]')).toBeFocused();
  });

  test('navigation stays fixed on scroll', async ({ page }) => {
    // Get initial position of navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check that navigation has fixed positioning
    const navClasses = await nav.getAttribute('class');
    expect(navClasses).toContain('fixed');
    expect(navClasses).toContain('top-0');
    
    // Scroll down and check that nav is still visible
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(nav).toBeVisible();
  });
});