const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage');
const { Toast } = require('../pages/Components');

const email = 'admin@zombieplus.com';
const password = 'pwd123';

let loginPage;
let toast;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
})

test('deve logar como adminstrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit(email, password)
    await loginPage.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit(email, "incorrect-password")

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await toast.haveText(message)
})

test('não deve logar quando o email é inválido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit("www.papito.com.br", password)

    await loginPage.alertHaveText('Email incorreto')
})

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit("", password)

    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit(email, "")

    await loginPage.alertHaveText('Campo obrigatório')
})