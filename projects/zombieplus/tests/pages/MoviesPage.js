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
}