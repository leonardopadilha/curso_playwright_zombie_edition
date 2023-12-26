// @ts-check
const { test, expect } = require('@playwright/test')
const { LandingPage } = require('../pages/LandingPage')
const { faker } = require('@faker-js/faker')

let landingPage;

let leadName;
let leadEmail;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
})

test.beforeAll(async () => {
  leadName = faker.person.fullName()
  leadEmail = faker.internet.email()
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadMessage = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)
  await landingPage.toastHaveText(leadMessage)
});

test('não deve cadastrar quando o email já existe', async ({ page }) => {

let message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)
  await landingPage.toastHaveText(message)
});

test('não deve cadastrar com email incorreto', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, 'segundoteste.com.br')

  await landingPage.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm("", leadEmail)

  await landingPage.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, "")
  
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

