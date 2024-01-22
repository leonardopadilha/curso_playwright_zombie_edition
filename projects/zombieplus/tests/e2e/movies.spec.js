const { test } = require('@playwright/test')

const data = require('./support/fixtures/movies.json')
const { executeSQL } = require('./support/database')

const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components');

const email = 'admin@zombieplus.com';
const password = 'pwd123';

let loginPage;
let moviesPage;
let toast;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    moviesPage = new MoviesPage(page)
    toast = new Toast(page)
})

test('deve poder cadastrar um novo filme', async ({ page }) => {
    
    // é importante estar logado
    const movie = data.create;
    
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`)

    await loginPage.visit()
    await loginPage.submit(email, password)
    await moviesPage.isLoggedIn()

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    await toast.containText('Cadastro realizado com sucesso!')
})