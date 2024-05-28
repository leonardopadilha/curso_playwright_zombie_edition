const { expect } = require('@playwright/test')

export class Login {
    constructor(page) {
        this.page = page
    }

    async do(email, password, username) {
        await this.visit()
        await this.submit(email, password)
        await this.isLoggedIn(username)
    }

    async visit() {
        await this.page.goto('/admin/login')

        const loginForm = this.page.locator(".login-form")
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
    }
    
    async alertHaveText(text) {
        //último caractere na classe do css
        const alert = this.page.locator("span[class$='alert']") 
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn(username) {
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${username}`)
    }

/*     async isLoggedIn() {
        // aguarda o carregamento da rede
        await this.page.waitForLoadState('networkidle')

        const logoutLink = this.page.locator('a[href="/logout"]')
        await expect(logoutLink).toBeVisible()

        // verificando se na url tem a palavra admin
        await expect(this.page).toHaveURL(/.*admin/)
    } */
}