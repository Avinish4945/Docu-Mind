require("dotenv").config();

const {
    analyzeDocument
} = require("./services/documentAnalyzer");

const text = `
Kochi Metro Rail Limited

Tender for Metro Operations Services.

All bidders must submit their technical
proposal before 18 September 2026.

The successful contractor shall comply
with all applicable safety regulations.

Department: Procurement.
`;

const runTest = async () => {

    try {

        const result =
            await analyzeDocument(text);

        console.log(
            JSON.stringify(
                result,
                null,
                2
            )
        );

    } catch (error) {

        console.error(
            "Analyzer test failed:",
            error
        );

    }
};

runTest();