import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:4321/loler-inspections-site';

test.describe('LOLER Inspections Site - User Experience Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('a.header-cta')).toBeVisible();
  });

  test('desktop navigation visible at larger breakpoints', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
    const menuToggle = page.getByRole('button', { name: 'Menu', exact: true });

    await expect(navigation).toBeVisible();
  });

  test('keyboard navigation follows proper focus order', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const menuToggle = page.getByRole('button', { name: 'Menu', exact: true });
    const navigation = page.getByRole('navigation', { name: 'Primary navigation' });

    await page.locator('.header-cta').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('.menu-toggle')).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'true');
    await expect(navigation).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(navigation.getByRole('link').nth(0)).toBeFocused();


  });

  test('navigation links preserve URL hash on click', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for JS hydration
    await page.waitForFunction(() => {
      const header = document.querySelector('.site-header');
      return header ? header.classList.contains('is-menu-enhanced') : false;
    }, { timeout: 10000 });

    const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
    const menuToggle = page.locator('.menu-toggle');

    // Open menu first
    await menuToggle.click();
    await expect(navigation).toBeVisible();

    await navigation.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/#services/);


    await menuToggle.click();
    const enquiryCTA = page.locator('a.header-cta');
    await expect(enquiryCTA).toBeVisible();

    await enquiryCTA.click();
    await expect(page).toHaveURL(/#contact/);
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('privacy page is marked as draft', async ({ page }) => {
    await page.goto(`${BASE_URL}/privacy/`, { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: 'Privacy notice draft' })).toBeVisible();
    await expect(page.getByText(/draft.*not approved for production/i)).toBeVisible();
    await expect(page.getByText(/retention/i).nth(0)).toBeVisible();
  });

  test('form fields are present', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();

    const ctaInsideNav = await page.locator('a.header-cta').evaluate((el) => {
      const nav = document.querySelector('nav#primary-navigation');
      if (!nav) return false;
      return nav.contains(el);
    });
    expect(ctaInsideNav).toBe(false);
  });

  test('no browser console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    expect(errors).toEqual([]);
  });

  test('all images load correctly', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      const naturalWidth = await img.evaluate((el) => (el as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('skip to content link works', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeVisible();
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test('site header has proper structure', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    await expect(page.locator('.site-header')).toBeVisible();
    const brand = page.locator('a.brand');
    await expect(brand).toBeVisible();
    await expect(brand).toHaveAttribute('href', /#top/);

    const navLinks = page.locator('#primary-navigation a');
    await expect(navLinks).toHaveCount(4);
  });
});

test.describe('LOLER Inspections Site - Accessibility Tests', () => {
  test('skip link is present and functional', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveAttribute('href', '#main');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
  });

  test('aria labels are present on key elements', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    await expect(page.locator('nav#primary-navigation')).toHaveAttribute(
      'aria-label',
      'Primary navigation'
    );
    await expect(page.locator('.menu-toggle')).toHaveAttribute(
      'aria-controls',
      'primary-navigation'
    );
    await expect(page.locator('.skip-link')).toBeVisible();
  });

  test('focus visible styles are present', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const activeElement = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const style = getComputedStyle(el);
      return {
        tagName: el.tagName,
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        outlineColor: style.outlineColor,
      };
    });

    expect(activeElement).not.toBeNull();
    expect(activeElement!.outlineStyle).not.toBe('none');
  });
});

test.describe('LOLER Inspections Site - Performance Regression Tests', () => {
  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });
});

