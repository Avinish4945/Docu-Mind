const {
    chunkText
} = require("./services/textChunker");


const text = `
Kochi Metro Rail Limited issued a procurement notice.
All bidders must submit the technical proposal before
25 August 2026.

The successful bidder shall comply with all applicable
safety and procurement requirements.

The bidder shall submit the required bid security
along with the proposal.
`;


const chunks =
    chunkText(text, 30, 5);


console.log(
    JSON.stringify(
        chunks,
        null,
        2
    )
);