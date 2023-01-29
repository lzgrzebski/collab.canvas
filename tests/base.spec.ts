import { test, expect, Page } from '@playwright/test';

const testId = (id: string) => `data-testid=${id}`;
const byTestId = (page: Page, id: string) => page.locator(testId(id));

test('has logo', async ({ page }) => {
    await page.goto('/');

    await expect(byTestId(page, 'logo')).toBeVisible();
});

test('starts a new canvas', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('start').click();

    await expect(byTestId(page, 'name-form')).toBeVisible();

    await page.fill(testId('name-input'), 'Bob');

    await page.keyboard.press('Enter');

    await expect(byTestId(page, 'canvas')).toBeVisible();
});

test('checks if 2 participants can join', async ({ page, browser }) => {
    await page.goto('/');

    await page.getByTestId('start').click();
    await page.fill(testId('name-input'), 'Bob');
    await page.keyboard.press('Enter');
    const blobs = page.getByTestId('user-blob');
    await expect(await blobs.all()).toHaveLength(1);

    const pageTwo = await browser.newPage();
    await pageTwo.goto(page.url());
    await pageTwo.fill(testId('name-input'), 'Ross');
    await pageTwo.keyboard.press('Enter');

    const blobsTwo = pageTwo.getByTestId('user-blob');
    await expect(await blobsTwo.all()).toHaveLength(2);
    await expect(await blobs.all()).toHaveLength(2);
});
