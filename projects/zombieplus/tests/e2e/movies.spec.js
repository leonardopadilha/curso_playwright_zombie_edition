//const { test } = require('@playwright/test')
const { test } = require('./support')

const data = require('./support/fixtures/movies.json')
const { executeSQL } = require('./support/database')

/* const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components'); */

const email = 'admin@zombieplus.com';
const password = 'pwd123';
const username = 'Admin'

/* let loginPage;
let moviesPage;
let toast;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    moviesPage = new MoviesPage(page)
    toast = new Toast(page)
}) */

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM movies;`)
})

test('deve poder cadastrar um novo filme', async ({ page }) => {
    
    // é importante estar logado
    const movie = data.create;
    
    await page.login.do(email, password, username)

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)

    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('não deve cadastrar quando o título é duplicado', async ({ page }) => {
    
    // é importante estar logado
    const movie = data.duplicate;
    
    await page.login.do(email, password, username)
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.toast.containText('Cadastro realizado com sucesso!')
    
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do(email, password, username)

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        "Por favor, informe o título.",
        "Por favor, informe a sinopse.",
        "Por favor, informe a empresa distribuidora.",
        "Por favor, informe o ano de lançamento."
    ])
})