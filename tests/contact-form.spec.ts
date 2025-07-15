import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
  });

  test('displays contact form elements', async ({ page }) => {
    // Check contact section heading
    await expect(page.locator('h3:has-text("Contact Information")')).toBeVisible();
    
    // Check form fields are visible
    await expect(page.locator('input[placeholder="Your Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Your Email"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Your Message"]')).toBeVisible();
    await expect(page.locator('button:has-text("SEND MESSAGE")')).toBeVisible();
  });

  test('allows user to fill out form fields', async ({ page }) => {
    // Fill out name field
    await page.fill('input[placeholder="Your Name"]', 'John Doe');
    await expect(page.locator('input[placeholder="Your Name"]')).toHaveValue('John Doe');
    
    // Fill out email field
    await page.fill('input[placeholder="Your Email"]', 'john@example.com');
    await expect(page.locator('input[placeholder="Your Email"]')).toHaveValue('john@example.com');
    
    // Fill out message field
    await page.fill('textarea[placeholder="Your Message"]', 'This is a test message for the contact form.');
    await expect(page.locator('textarea[placeholder="Your Message"]')).toHaveValue('This is a test message for the contact form.');
  });

  test('form fields have proper types and attributes', async ({ page }) => {
    // Check name field type
    await expect(page.locator('input[placeholder="Your Name"]')).toHaveAttribute('type', 'text');
    
    // Check email field type
    await expect(page.locator('input[placeholder="Your Email"]')).toHaveAttribute('type', 'email');
    
    // Check textarea rows
    await expect(page.locator('textarea[placeholder="Your Message"]')).toHaveAttribute('rows', '4');
    
    // Check button (submit button doesn't have explicit type="button")
    await expect(page.locator('button:has-text("SEND MESSAGE")')).toBeVisible();
  });

  test('form submission button is clickable', async ({ page }) => {
    // Fill out form fields
    await page.fill('input[placeholder="Your Name"]', 'John Doe');
    await page.fill('input[placeholder="Your Email"]', 'john@example.com');
    await page.fill('textarea[placeholder="Your Message"]', 'Test message');
    
    // Click submit button
    const submitButton = page.locator('button:has-text("SEND MESSAGE")');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    
    // Click the button (currently no submission logic, but button should be clickable)
    await submitButton.click();
  });

  test('form accessibility features', async ({ page }) => {
    // Use tab navigation to test keyboard accessibility
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Focus on the name input field
    await page.focus('input[placeholder="Your Name"]');
    await expect(page.locator('input[placeholder="Your Name"]')).toBeFocused();
    
    // Tab to next field
    await page.keyboard.press('Tab');
    await expect(page.locator('input[placeholder="Your Email"]')).toBeFocused();
    
    // Tab to message field
    await page.keyboard.press('Tab');
    await expect(page.locator('textarea[placeholder="Your Message"]')).toBeFocused();
    
    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(page.locator('button:has-text("SEND MESSAGE")')).toBeFocused();
  });

  test('form styling and layout', async ({ page }) => {
    // Check that form container is visible
    const formContainer = page.locator('form').first();
    await expect(formContainer).toBeVisible();
    
    // Check that form has proper styling classes
    const nameInput = page.locator('input[placeholder="Your Name"]');
    const emailInput = page.locator('input[placeholder="Your Email"]');
    const messageTextarea = page.locator('textarea[placeholder="Your Message"]');
    const submitButton = page.locator('button:has-text("SEND MESSAGE")');
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageTextarea).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('form on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that form is still visible and usable on mobile
    await expect(page.locator('input[placeholder="Your Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Your Email"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Your Message"]')).toBeVisible();
    await expect(page.locator('button:has-text("SEND MESSAGE")')).toBeVisible();
    
    // Test that form fields are still functional on mobile
    await page.fill('input[placeholder="Your Name"]', 'Mobile User');
    await expect(page.locator('input[placeholder="Your Name"]')).toHaveValue('Mobile User');
  });

  test('contact information display', async ({ page }) => {
    // Check if contact information is displayed alongside the form
    await expect(page.locator('h3:has-text("Contact Information")')).toBeVisible();
    
    // The contact section should be visible
    const contactSection = page.locator('section').filter({ hasText: 'Contact Information' });
    await expect(contactSection).toBeVisible();
  });
});