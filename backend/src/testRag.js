require("dotenv").config();

const mongoose = require("mongoose");

const {
    askQuestion
} = require("./services/ragService");


const run = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB connected"
        );


        const question =
            "When is the technical proposal submission deadline?";


        const result =
            await askQuestion(question);


        console.log(
            "\nRAG RESULT:\n"
        );


        console.log(
            JSON.stringify(
                result,
                null,
                2
            )
        );


    } catch (error) {

        console.error(
            "RAG test failed:",
            error
        );

    } finally {

        await mongoose.disconnect();
    }
};


run();