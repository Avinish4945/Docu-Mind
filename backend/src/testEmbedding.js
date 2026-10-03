require("dotenv").config();

const {
    generateEmbedding
} = require("./services/embeddingService");


const runTest = async () => {

    try {

        const text =
            "The technical proposal must be submitted before 25 August 2026.";

        const embedding =
            await generateEmbedding(text);

        console.log(
            "Embedding generated successfully"
        );

        console.log(
            "Dimensions:",
            embedding.length
        );

        console.log(
            "First 10 values:",
            embedding.slice(0, 10)
        );

    } catch (error) {

        console.error(
            "Embedding test failed:",
            error
        );
    }
};


runTest();