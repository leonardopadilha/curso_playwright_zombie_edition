//const { test } = require('@playwright/test')
const { test, expect } = require('./support')

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

    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('deve poder remover um filme', async ({ page, request }) => {
    const movie = data.to_remove;
    await request.api.postMovie(movie)
    await page.login.do(email, password, username)
    
    await page.movies.remove(movie.title)
    await page.popup.haveText('Filme removido com sucesso.')
})

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    
    // é importante estar logado
    const movie = data.duplicate;

    await request.api.postMovie(movie)
    
    await page.login.do(email, password, username)    
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do(email, password, username)

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório"
    ])
})