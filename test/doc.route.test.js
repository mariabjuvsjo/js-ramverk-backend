/* global it expect describe beforeAll afterAll */
const request = require('supertest');
const app = require('../app');
const { connectMongo, closeDb } = require("../db/testdatabase");

describe("API ROUTE TEST", () => {
    beforeAll(async () => {
        await connectMongo();
    });

    afterAll(async () => {
        await closeDb();
    });

    describe("GET ROUTE ON EMPTY DATABASE", () => {
        it("should return empty array", async () => {
            const res = await request(app).get(
                `/text`);

            expect(res.statusCode).toBe(200);
        });
    });

    describe("GET ONE DOC ON WITH WRONG ID", () => {
        it("should return 400", async () => {
            const res = await request(app).get(
                `/text/123454332`);

            expect(res.statusCode).toBe(404);
        });
    });

    describe("GET ONE DOC ON WITH RIGHT ID", () => {
        it("should return 400", async () => {
            const created = await request(app).post(
                `/text`).send({ name: 'Get Me', text: 'xxx' });


            const res = await request(app).get(
                `/text/${created.body._id}`);

            expect(res.statusCode).toBe(200);
        });
    });


    describe("POST ROUTE ADD DOC", () => {
        it("should return 200 and name", async () => {
            const res = await request(app).post(
                `/text`).send({ name: 'testPost', text: 'hey you' });

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe('testPost');
        });
    });


    /*describe("POST ROUTE ADD DOC ON WRONG INFO", () => {
        it("should return 400 and error mess", async () => {
            const res = await request(app).post(
                `/text`).send({ name: 'testPost' });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Doc validation failed: text: Path `text` is required.');
        });
    });*/


    describe("DELETE ROUTE", () => {
        it("should return 200 and name", async () => {
            const res = await request(app).post(
                `/text`).send({ name: 'delete this', text: "delteeee" });

            const del = await request(app).delete(`/text/${res.body._id}`);

            expect(del.statusCode).toBe(200);

            const getOne = await request(app).get(`/text/${res.body._id}`);

            expect(getOne.statusCode).toBe(404);
        });
    });

    describe("DELETE ROUTE ON NO ID", () => {
        it("should return 404", async () => {
            const del = await request(app).delete(`/text/xxxxx`);

            expect(del.statusCode).toBe(404);
        });
    });
});
