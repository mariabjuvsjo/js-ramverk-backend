/* global it expect  afterEach describe beforeAll afterAll */
const mongoose = require('mongoose');
const { connectMongo, closeDb } = require("../db/testdatabase");
const Doc = require("../models/texts");

describe("DOC MODEL TEST", () => {
    beforeAll(async () => {
        await connectMongo();
    });

    afterEach(async () => {
        await Doc.deleteMany({});
    });


    afterAll(async () => {
        await closeDb();
    });

    it("has a module", () => {
        expect(Doc).toBeDefined();
    });

    describe("GET DOCUMENT", () => {
        it("get a document", async () => {
            const doc = new Doc({
                name: "hello",
                text: "test text"
            });

            await doc.save();
            const findDoc = await Doc.findOne({ name: "hello" });
            const expected = "hello";
            const actual = findDoc.name;

            expect(actual).toBe(expected);
        });
    });

    /* describe("ADD NEW DOC", () => {
        it("let you add a new doc", async () => {
            const doc = new Doc({
                name: "maria",
                text: "du är bäst"
            });
            const savedDoc = await doc.save();
            const expected = "maria";
            const actual = savedDoc.name;

            expect(actual).toBe(expected);
        });
    });

    describe("UPDATE NEW DOC", () => {
        it("let you add a new doc", async () => {
            const doc = new Doc({
                name: "maria",
                text: "du är bäst"
            });

            await doc.save();

            doc.name = "Eng";
            const updatedDoc = await doc.save();
            const expected = "Eng";
            const actual = updatedDoc.name;

            expect(actual).toBe(expected);
        });
    });

    describe("ADD NEW DOC ERR", () => {
        it("tests to add new doc on wrong input", async () => {
            let doc = {
                name: "maria"
            };

            try {
                const newDoc = new Doc(doc);

                await newDoc.save();
            } catch (error) {
                expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            }
        });
    });*/
});

