require("dotenv").config();

const mongoose = require("mongoose");

const {
    semanticSearch
} = require("./services/semanticSearchService");


const run = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB connected"
        );


        const query =
            "When is the technical proposal submission deadline?";


        const results =
            await semanticSearch(
                query,
                5
            );


        console.log(
            "\nSearch results:"
        );


        console.log(
            JSON.stringify(
                results,
                null,
                2
            )
        );


    } catch (error) {

        console.error(
            "Semantic search failed:",
            error
        );

    } finally {

        await mongoose.disconnect();
    }
};


run();