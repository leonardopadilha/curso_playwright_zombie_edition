const { expect } = require('@playwright/test')

export class MoviesPage {
    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        // aguarda o carregamento da rede
        await this.page.waitForLoadState('networkidle')

        const logoutLink = this.page.locator('a[href="/logout"]')
        await expect(logoutLink).toBeVisible()

        // verificando se na url tem a palavra admin
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create(title, overview, company, release_year) {
        //o selector abaixo termina com register
        await this.page.locator('a[href$="register"]').click()
        //await this.page.locator('#title').fill(title)

        /*
        Quando o label tem uma conexão com o for e o id, é possível
        realizar a automação utilizando o nome (label) do campo
        */
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()

        // Irá salvar e retornar o html obtido através do click anterior
        /* const html = await this.page.content()
        console.log(html) */

        await this.page.locator('.react-select__option')
                            .filter({hasText: company})
                                .click()

        
        await this.page.locator('#select_year .react-select__indicator').click()

/*         const year = await this.page.content()
        console.log(year)
 */
        await this.page.locator('.react-select__option')
                            .filter({ hasText: release_year })
                                .click()
    }
}