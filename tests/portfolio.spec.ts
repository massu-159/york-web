import { test, expect } from '@playwright/test';

test.describe('Portfolio Section E2E Tests', () => {
  test('ページが正常に読み込まれる', async ({ page }) => {
    await page.goto('/');
    
    // ページタイトルが表示される
    await expect(page).toHaveTitle('York.web - Creative Web Solutions');
    
    // ページが完全に読み込まれることを確認
    await page.waitForLoadState('networkidle');
  });

  test('ポートフォリオセクションの基本要素が表示される', async ({ page }) => {
    await page.goto('/');
    
    // ポートフォリオセクションの存在確認
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();

    // セクションタイトルの確認
    await expect(page.locator('h2', { hasText: 'Our Portfolio' })).toBeVisible();
    
    // 説明文の確認（部分文字列で確認）
    await expect(page.locator('p', { hasText: 'Showcasing' })).toBeVisible();
  });

  test('ポートフォリオグリッドが表示される', async ({ page }) => {
    await page.goto('/');
    
    // グリッドコンテナが存在することを確認
    const gridContainer = page.locator('#portfolio .grid');
    await expect(gridContainer).toBeVisible();
    
    // グリッドクラスが適用されていることを確認
    await expect(gridContainer).toHaveClass(/grid/);
  });

  test('ポートフォリオコンテンツの表示（実際のデータまたはフォールバック）', async ({ page }) => {
    await page.goto('/');
    
    // ポートフォリオセクション内でコンテンツが表示されることを確認
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();
    
    // 何らかのコンテンツが表示される（実データまたは"In progress"）
    const hasRealContent = await page.locator('#portfolio .group').count() > 0;
    const hasFallbackContent = await page.locator('text=In progress').isVisible();
    
    // どちらか一方は表示される
    expect(hasRealContent || hasFallbackContent).toBeTruthy();
  });

  test('レスポンシブデザインの基本確認', async ({ page }) => {
    // モバイル表示
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();
    
    // タブレット表示
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(portfolioSection).toBeVisible();
    
    // デスクトップ表示
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(portfolioSection).toBeVisible();
  });

  test('ページスクロールでポートフォリオセクションにアクセス可能', async ({ page }) => {
    await page.goto('/');
    
    // ポートフォリオセクションまでスクロール
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    
    // セクションが表示されることを確認
    await expect(page.locator('#portfolio')).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Our Portfolio' })).toBeVisible();
  });

  test('ページの基本構造が正しく表示される', async ({ page }) => {
    await page.goto('/');
    
    // メインコンテナの確認
    const mainContainer = page.locator('#portfolio .max-w-7xl');
    await expect(mainContainer).toBeVisible();
    
    // タイトルとグリッドが含まれていることを確認
    await expect(mainContainer.locator('h2')).toBeVisible();
    await expect(mainContainer.locator('.grid')).toBeVisible();
  });
});