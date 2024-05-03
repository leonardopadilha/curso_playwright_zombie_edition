const { expect } = require('@playwright/test')

/* export class Toast {
    constructor(page) {
        this.page = page
    }

    async containText(message) {
        const toast = this.page.locator('.toast')

        //await expect(toast).toHaveText(message)
        await expect(toast).toContainText(message)
        //await expect(toast).toBeHidden({ timeout: 5000 }) // verifica se o elemento ficará invisível, nesse caso, em até 5 segundos (ou seja, apareceu e "foi embora")
        await expect(toast).not.toBeVisible({ timeout: 7000 })
    }
} */

export class Popup {
    constructor(page) {
        this.page = page
    }

    async haveText(message) {
        const element = this.page.locator('.swal2-html-container')
        await expect(element).toHaveText(message)

    }
}