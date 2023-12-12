const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')

const email = 'admin@zombieplus.com';
const password = 'pwd123';

let loginPage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
})

test('deve logar como adminstrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit(email, password)
    await loginPage.isLoggedIn()
})