require("dotenv").config();

const mongoose = require("mongoose");

const Document = require("./models/Document");

const {
    createDocumentChunks
} = require("./services/documentChunkService");


const run = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB connected"
        );


        const document =
            await Document.findOne({
                title: "KMRL new"
            });


        if (!document) {
            throw new Error(
                "Document not found"
            );
        }


        const chunks =
            await createDocumentChunks(
                document
            );


        console.log(
            `Created ${chunks.length} chunks`
        );


        chunks.forEach((chunk) => {

            console.log(
                `\nChunk ${chunk.chunkIndex}:`
            );

            console.log(
                chunk.text
            );
        });


    } catch (error) {

        console.error(
            "Chunk creation failed:",
            error
        );

    } finally {

        await mongoose.disconnect();
    }
};


run();