const { test, expect } = require('./support')

const email = 'admin@zombieplus.com';
const password = 'pwd123';

test('deve logar como adminstrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit(email, password)
    await page.login.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit(email, "incorrect-password")

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await page.toast.containText(message)
})

test('não deve logar quando o email é inválido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit("www.papito.com.br", password)

    await page.login.alertHaveText('Email incorreto')
})

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit("", password)

    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é preenchida', async ({ page }) => {
    await page.login.visit()
    await page.login.submit(email, "")

    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit("", "")

    await page.login.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})