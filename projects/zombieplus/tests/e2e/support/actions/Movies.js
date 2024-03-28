const { expect } = require('@playwright/test')

export class Movies {
    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async create(title, overview, company, release_year, cover, featured) {
        //o selector abaixo termina com register
        this.goForm()
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

        // realizando upload do arquivo                        
        await this.page.locator('input[name=cover]')
                .setInputFiles('tests/e2e/support/fixtures' + cover)

        if (featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        this.submit()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}