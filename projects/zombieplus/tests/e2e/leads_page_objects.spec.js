const { test, expect } = require('./support')
const { faker } = require('@faker-js/faker')

let leadName;
let leadEmail;

test.beforeAll(async () => {
  leadName = faker.person.fullName()
  leadEmail = faker.internet.email()
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadMessage = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  await page.toast.containText(leadMessage)
});

test('não deve cadastrar quando o email já existe', async ({ page }) => {

let message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  await page.toast.containText(message)
});

test('não deve cadastrar quando o email já salvo através da API', async ({ page, request }) => {

  const name = faker.person.fullName()
  const email = faker.internet.email()

  let message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: name,
      email: email
    }
  })

  expect(newLead.ok()).toBeTruthy()
  
    await page.landing.visit()
    await page.landing.openLeadModal()
    await page.landing.submitLeadForm(name, email)
    await page.toast.containText(message)
  });

test('não deve cadastrar com email incorreto', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, 'segundoteste.com.br')

  await page.landing.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm("", leadEmail)

  await page.landing.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, "")
  
  await page.landing.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o nenhum campo é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm("", "")

  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]) // mensagem para o campo nome e email
});

