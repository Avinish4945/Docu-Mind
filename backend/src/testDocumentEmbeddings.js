require("dotenv").config();

const mongoose = require("mongoose");

const {
    generateDocumentEmbeddings
} = require("./services/documentEmbeddingService");


const run = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log("MongoDB connected");

        const documentId =
            "6a86f6483415c29de387f708";

        const result =
            await generateDocumentEmbeddings(
                documentId
            );

        console.log("\nEmbedding result:");

        console.log(
            JSON.stringify(
                result,
                null,
                2
            )
        );

    } catch (error) {

        console.error(
            "Document embedding failed:",
            error
        );

    } finally {

        await mongoose.disconnect();
    }
};


run();