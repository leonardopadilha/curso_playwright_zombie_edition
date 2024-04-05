const { expect } = require('@playwright/test')

export class Api {
    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: "admin@zombieplus.com",
                password: "pwd123"
            }
        })
    
        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())
        this.token = 'Bearer ' + body.token
    }

    async postMovie(movie) {

        await this.setToken()

        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: 'a6b5344f-7c12-4210-896c-25dc2bed2fdd',
                release_year: movie.release_year,
                featured: movie.featured
            }
        })

        expect(response.ok()).toBeTruthy()
    }
}