import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle('York.web - Creative Web Solutions');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display the hero section', async ({ page }) => {
    const heroSection = page.getByRole('banner');
    await expect(heroSection).toBeVisible();
    
    const mainHeading = page.getByRole('heading', { name: /bringing your vision to life/i });
    await expect(mainHeading).toBeVisible();
    
    const subHeading = page.getByRole('heading', { name: /creative web solutions/i });
    await expect(subHeading).toBeVisible();
    
    const ctaButton = page.getByRole('button', { name: /get started/i });
    await expect(ctaButton).toBeVisible();
  });

  test('should display the navigation', async ({ page }) => {
    const navigation = page.getByRole('navigation');
    await expect(navigation).toBeVisible();
    
    const logo = page.getByRole('link', { name: /ホームページへ戻る/i });
    await expect(logo).toBeVisible();
    
    // Check desktop navigation items
    const homeLink = page.getByRole('link', { name: /ホームセクションへ移動/i });
    const servicesLink = page.getByRole('link', { name: /サービスセクションへ移動/i });
    const portfolioLink = page.getByRole('link', { name: /ポートフォリオセクションへ移動/i });
    const aboutLink = page.getByRole('link', { name: /会社概要セクションへ移動/i });
    const contactLink = page.getByRole('link', { name: /お問い合わせセクションへ移動/i });
    
    await expect(homeLink).toBeVisible();
    await expect(servicesLink).toBeVisible();
    await expect(portfolioLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(contactLink).toBeVisible();
  });

  test('should display the about section', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    
    const aboutHeading = page.getByRole('heading', { name: /we create digital experiences/i });
    await expect(aboutHeading).toBeVisible();
    
    // Check statistics
    await expect(page.getByText('250+')).toBeVisible();
    await expect(page.getByText('Happy Clients')).toBeVisible();
    await expect(page.getByText('120+')).toBeVisible();
    await expect(page.getByText('Projects')).toBeVisible();
    await expect(page.getByText('8')).toBeVisible();
    await expect(page.getByText('Years Experience')).toBeVisible();
  });

  test('should display the contact section', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    const contactHeading = page.getByRole('heading', { name: /get in touch/i });
    await expect(contactHeading).toBeVisible();
    
    // Check contact information
    await expect(page.getByText('Our Location')).toBeVisible();
    await expect(page.getByText('Call Us')).toBeVisible();
    await expect(page.getByText('Email Us')).toBeVisible();
    
    // Check contact form
    const contactForm = page.getByRole('form');
    await expect(contactForm).toBeVisible();
    
    await expect(page.getByPlaceholder('Your Name')).toBeVisible();
    await expect(page.getByPlaceholder('Your Email')).toBeVisible();
    await expect(page.getByPlaceholder('Your Message')).toBeVisible();
    
    const submitButton = page.getByRole('button', { name: /send message/i });
    await expect(submitButton).toBeVisible();
  });

  test('should display the footer', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
    
    await expect(page.getByText('York.web')).toBeVisible();
    await expect(page.getByText(/© 2024 York\.web All Rights Reserved\./)).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    // Check that all main sections are present
    await expect(page.getByRole('banner')).toBeVisible(); // Hero
    await expect(page.getByRole('navigation')).toBeVisible(); // Navigation
    await expect(page.locator('#about')).toBeVisible(); // About
    await expect(page.locator('#contact')).toBeVisible(); // Contact
    await expect(page.getByRole('contentinfo')).toBeVisible(); // Footer
  });

  test('should load hero background image on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const heroImage = page.getByAltText('Hero background');
    await expect(heroImage).toBeVisible();
    await expect(heroImage).toHaveAttribute('src', '/images/hero-bg.jpg');
  });

  test('should show mobile navigation menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mobile menu should be accessible but sheet content might not be visible initially
    const navigation = page.getByRole('navigation');
    await expect(navigation).toBeVisible();
  });
});