const {
    calculateAttention
} = require("./services/attentionService");


const analysis = {

    documentType: "Tender",

    department: "IT Dept.",

    deadlines: [
        {
            description: "Bid submission",
            date: "2015-03-02",
            sourceText: "Last date for submission"
        }
    ],

    obligations: [
        {
            description: "Submit EMD",
            responsibleParty: "Bidder"
        },
        {
            description: "Submit technical proposal",
            responsibleParty: "Bidder"
        }
    ],

    complianceRequirements: [
        {
            description: "Three year warranty"
        }
    ]
};


const result =
    calculateAttention(analysis);


console.log(
    JSON.stringify(
        result,
        null,
        2
    )
);