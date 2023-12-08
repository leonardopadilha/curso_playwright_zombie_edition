// @ts-check
const { test, expect } = require('@playwright/test');
const { LandingPage } = require('./pages/LandingPage')

let landingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
})

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  const name = "primeiro teste"
  const email = "primeiro_teste@teste.com"

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(name, email)
  await landingPage.toastHaveText(message)
});

test('não deve cadastrar com email incorreto', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(name, 'segundoteste.com.br')

  await landingPage.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm("", email)

  await landingPage.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(name, "")
  
  await landingPage.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o nenhum campo é preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm("", "")

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]) // mensagem para o campo nome e email
});

