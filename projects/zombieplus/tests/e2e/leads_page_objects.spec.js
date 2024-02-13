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
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  await page.toast.containText(leadMessage)
});

test('não deve cadastrar quando o email já existe', async ({ page }) => {

let message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
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
  
    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(name, email)
    await page.toast.containText(message)
  });

test('não deve cadastrar com email incorreto', async ({ page }) => {

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, 'segundoteste.com.br')

  await page.leads.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm("", leadEmail)

  await page.leads.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, "")
  
  await page.leads.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o nenhum campo é preenchido', async ({ page }) => {

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm("", "")

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]) // mensagem para o campo nome e email
});

