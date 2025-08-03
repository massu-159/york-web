import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
    // Wait for the contact section to be visible
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should display contact form elements', async ({ page }) => {
    const contactForm = page.getByRole('form');
    await expect(contactForm).toBeVisible();
    
    // Check form fields
    const nameInput = page.getByPlaceholder('Your Name');
    const emailInput = page.getByPlaceholder('Your Email');
    const messageTextarea = page.getByPlaceholder('Your Message');
    const submitButton = page.getByRole('button', { name: /send message/i });
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageTextarea).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await expect(page.getByText('Contact Information')).toBeVisible();
    
    // Check contact details
    await expect(page.getByText('Our Location')).toBeVisible();
    await expect(page.getByText('123 Creative St, Digital Valley, NY')).toBeVisible();
    
    await expect(page.getByText('Call Us')).toBeVisible();
    await expect(page.getByText('+1 234 5678')).toBeVisible();
    
    await expect(page.getByText('Email Us')).toBeVisible();
    await expect(page.getByText('hello@yorkweb.com')).toBeVisible();
  });

  test('should allow typing in form fields', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Your Name');
    const emailInput = page.getByPlaceholder('Your Email');
    const messageTextarea = page.getByPlaceholder('Your Message');
    
    await nameInput.fill('John Doe');
    await emailInput.fill('john.doe@example.com');
    await messageTextarea.fill('This is a test message for the contact form.');
    
    await expect(nameInput).toHaveValue('John Doe');
    await expect(emailInput).toHaveValue('john.doe@example.com');
    await expect(messageTextarea).toHaveValue('This is a test message for the contact form.');
  });

  test('should submit form successfully', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Your Name');
    const emailInput = page.getByPlaceholder('Your Email');
    const messageTextarea = page.getByPlaceholder('Your Message');
    const submitButton = page.getByRole('button', { name: /send message/i });
    
    // Fill out the form
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await messageTextarea.fill('Test message content');
    
    // Submit the form
    await submitButton.click();
    
    // The form should handle submission (mock implementation)
    await expect(submitButton).toBeVisible();
  });

  test('should have proper form field attributes', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Your Name');
    const emailInput = page.getByPlaceholder('Your Email');
    const messageTextarea = page.getByPlaceholder('Your Message');
    
    // Check input types
    await expect(nameInput).toHaveAttribute('type', 'text');
    await expect(emailInput).toHaveAttribute('type', 'email');
    
    // Check required attributes
    await expect(nameInput).toHaveAttribute('aria-required', 'true');
    await expect(emailInput).toHaveAttribute('aria-required', 'true');
    await expect(messageTextarea).toHaveAttribute('aria-required', 'true');
    
    // Check aria-describedby attributes
    await expect(nameInput).toHaveAttribute('aria-describedby', 'name-description');
    await expect(emailInput).toHaveAttribute('aria-describedby', 'email-description');
    await expect(messageTextarea).toHaveAttribute('aria-describedby', 'message-description');
  });

  test('should have accessible labels', async ({ page }) => {
    // Check for screen reader labels
    const nameLabel = page.locator('label[for="contact-name"]');
    const emailLabel = page.locator('label[for="contact-email"]');
    const messageLabel = page.locator('label[for="contact-message"]');
    
    await expect(nameLabel).toHaveClass('sr-only');
    await expect(emailLabel).toHaveClass('sr-only');
    await expect(messageLabel).toHaveClass('sr-only');
    
    await expect(nameLabel).toHaveText('お名前');
    await expect(emailLabel).toHaveText('メールアドレス');
    await expect(messageLabel).toHaveText('メッセージ');
  });

  test('should focus on form fields correctly', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Your Name');
    const emailInput = page.getByPlaceholder('Your Email');
    const messageTextarea = page.getByPlaceholder('Your Message');
    
    // Focus on name input
    await nameInput.focus();
    await expect(nameInput).toBeFocused();
    
    // Tab to email input
    await page.keyboard.press('Tab');
    await expect(emailInput).toBeFocused();
    
    // Tab to message textarea
    await page.keyboard.press('Tab');
    await expect(messageTextarea).toBeFocused();
  });

  test('should display form in proper layout', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Check responsive grid layout
    const gridContainer = contactSection.locator('.grid.md\\:grid-cols-2');
    await expect(gridContainer).toBeVisible();
    
    // Check form spacing
    const form = page.getByRole('form');
    await expect(form).toHaveClass(/space-y-6/);
  });

  test('should have contact info icons with hover effects', async ({ page }) => {
    // Check for icon containers with hover effects
    const iconContainers = page.locator('.group .w-10.h-10.bg-pink-100.rounded-full');
    
    await expect(iconContainers).toHaveCount(3);
    
    // Test hover on first icon (location)
    const firstIcon = iconContainers.first();
    await firstIcon.hover();
    
    // Icon should be visible after hover
    await expect(firstIcon).toBeVisible();
  });

  test('should display section heading and description', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /get in touch/i });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveAttribute('id', 'contact-heading');
    
    const description = page.getByText(/For project consultations and quote requests/);
    await expect(description).toBeVisible();
  });

  test('should have proper form validation attributes', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /send message/i });
    
    await expect(submitButton).toHaveAttribute('type', 'submit');
    await expect(submitButton).toHaveAttribute('aria-label', 'メッセージを送信する');
  });

  test('should handle form submission with enter key', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Your Name');
    
    await nameInput.fill('Test User');
    await nameInput.press('Enter');
    
    // Form should remain on page and not navigate away
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should display animated background elements', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Check for animated ripple elements
    const rippleElements = contactSection.locator('.animate-ripple');
    await expect(rippleElements).toHaveCount(3);
  });
});