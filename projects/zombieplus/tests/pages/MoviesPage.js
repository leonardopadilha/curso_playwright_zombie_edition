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
    }
}