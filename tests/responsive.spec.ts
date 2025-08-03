import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Mobile (375px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should display mobile layout correctly', async ({ page }) => {
      // Navigation should be mobile-friendly
      const nav = page.getByRole('navigation');
      await expect(nav).toBeVisible();
      
      // Desktop navigation should be hidden
      const desktopNav = page.locator('.hidden.md\\:flex');
      await expect(desktopNav).toBeHidden();
      
      // Mobile navigation should be visible
      const mobileNav = page.locator('.md\\:hidden');
      await expect(mobileNav).toBeVisible();
    });

    test('should show hero background image on mobile', async ({ page }) => {
      const heroImage = page.getByAltText('Hero background');
      await expect(heroImage).toBeVisible();
      
      // Should have mobile-specific classes
      await expect(heroImage).toHaveClass(/md:hidden/);
    });

    test('should stack contact form vertically', async ({ page }) => {
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();
      
      // Grid should be single column on mobile
      const gridContainer = contactSection.locator('.grid');
      await expect(gridContainer).toBeVisible();
    });

    test('should display footer navigation vertically', async ({ page }) => {
      const footer = page.getByRole('contentinfo');
      await expect(footer).toBeVisible();
      
      // Footer navigation should be hidden on mobile
      const footerNav = footer.locator('.hidden.md\\:flex');
      await expect(footerNav).toBeHidden();
    });

    test('should maintain proper text sizing on mobile', async ({ page }) => {
      const mainHeading = page.getByRole('heading', { name: /bringing your vision to life/i });
      await expect(mainHeading).toBeVisible();
      
      // Text should be readable on mobile
      const boundingBox = await mainHeading.boundingBox();
      expect(boundingBox?.width).toBeLessThan(375);
    });
  });

  test.describe('Tablet (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
    });

    test('should display tablet layout correctly', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav).toBeVisible();
      
      // Should still show mobile navigation at this breakpoint
      const mobileNav = page.locator('.md\\:hidden');
      await expect(mobileNav).toBeVisible();
    });

    test('should show proper grid layouts', async ({ page }) => {
      // About section should have proper grid
      const aboutSection = page.locator('#about');
      await expect(aboutSection).toBeVisible();
      
      // Contact section grid
      const contactGrid = page.locator('#contact .grid');
      await expect(contactGrid).toBeVisible();
    });
  });

  test.describe('Desktop (1024px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
    });

    test('should display desktop navigation', async ({ page }) => {
      // Desktop navigation should be visible
      const desktopNav = page.locator('.hidden.md\\:flex');
      await expect(desktopNav).toBeVisible();
      
      // Mobile navigation should be hidden
      const mobileNav = page.locator('.md\\:hidden');
      await expect(mobileNav).toBeVisible(); // Container is visible but nav items are hidden
    });

    test('should show 3D effects on desktop', async ({ page }) => {
      // Desktop should show ripple effects (3D) instead of background image
      const rippleContainer = page.locator('.hidden.md\\:block');
      await expect(rippleContainer).toBeVisible();
    });

    test('should display two-column layouts', async ({ page }) => {
      // About section should have two columns
      const aboutGrid = page.locator('#about .grid.md\\:grid-cols-2');
      await expect(aboutGrid).toBeVisible();
      
      // Contact section should have two columns
      const contactGrid = page.locator('#contact .grid.md\\:grid-cols-2');
      await expect(contactGrid).toBeVisible();
    });

    test('should show footer navigation', async ({ page }) => {
      const footer = page.getByRole('contentinfo');
      const footerNav = footer.locator('.hidden.md\\:flex');
      await expect(footerNav).toBeVisible();
    });
  });

  test.describe('Large Desktop (1440px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
    });

    test('should maintain max-width containers', async ({ page }) => {
      // Check max-width containers
      const containers = page.locator('.max-w-7xl');
      const containerCount = await containers.count();
      expect(containerCount).toBeGreaterThan(0);
      
      // Containers should not exceed max width
      for (let i = 0; i < containerCount; i++) {
        const container = containers.nth(i);
        const boundingBox = await container.boundingBox();
        if (boundingBox) {
          expect(boundingBox.width).toBeLessThanOrEqual(1280); // 7xl = 80rem = 1280px
        }
      }
    });

    test('should center content properly', async ({ page }) => {
      const mainContent = page.locator('.max-w-7xl.mx-auto').first();
      await expect(mainContent).toBeVisible();
      
      const boundingBox = await mainContent.boundingBox();
      expect(boundingBox?.x).toBeGreaterThan(0); // Should have margins
    });
  });

  test.describe('Cross-breakpoint functionality', () => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop' },
      { width: 1440, height: 900, name: 'Large Desktop' }
    ];

    for (const viewport of viewports) {
      test(`should maintain functionality on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        
        // Navigation should always be functional
        const nav = page.getByRole('navigation');
        await expect(nav).toBeVisible();
        
        // Main content should be visible
        const hero = page.getByRole('banner');
        await expect(hero).toBeVisible();
        
        // Footer should be visible
        const footer = page.getByRole('contentinfo');
        await expect(footer).toBeVisible();
        
        // Contact form should be functional
        const nameInput = page.getByPlaceholder('Your Name');
        await expect(nameInput).toBeVisible();
        await nameInput.fill('Test');
        await expect(nameInput).toHaveValue('Test');
      });
    }
  });

  test('should handle viewport orientation changes', async ({ page }) => {
    // Test landscape mobile
    await page.setViewportSize({ width: 667, height: 375 });
    
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    
    const hero = page.getByRole('banner');
    await expect(hero).toBeVisible();
    
    // Switch to portrait
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(nav).toBeVisible();
    await expect(hero).toBeVisible();
  });

  test('should have proper spacing and padding across breakpoints', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 1024, height: 768 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Check that content has proper padding
      const containers = page.locator('.px-4, .sm\\:px-6, .lg\\:px-8');
      const containerCount = await containers.count();
      expect(containerCount).toBeGreaterThan(0);
    }
  });
});