import supertest from "supertest"
import { web } from "../src/application/web.js"
import { prismaClient } from "../src/application/database.js"
import { logger } from "../src/application/logging.js"

describe('POST /api/users', function () {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "Dio"
            }
        })
    })

    it("Seharusnya Bisa register user", async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "Dio",
                password: "Dio",
                name: "Dio"
            })
        logger.info("Apakah dia promise?" + typeof result.then)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Dio")
        expect(result.body.data.password).toBeUndefined()
        expect(result.body.data.name).toBe("Dio");
    })

    it("Seharusnya register error jika input nya invalid", async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "",
                password: "",
                name: ""
            })
        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it("Seharusnya gagal karena username sudah ada", async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: "Dio",
                password: "Dio",
                name: "Dio"
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe("Dio")
        expect(result.body.data.password).toBeUndefined()
        expect(result.body.data.name).toBe("Dio");

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "Dio",
                password: "Dio",
                name: "Dio"
            })
        logger.info(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})