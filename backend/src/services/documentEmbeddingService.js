const DocumentChunk = require("../models/DocumentChunk");

const {
    generateEmbedding
} = require("./embeddingService");


const generateDocumentEmbeddings = async (documentId) => {

    const chunks = await DocumentChunk.find({
        documentId
    }).sort({
        chunkIndex: 1
    });

    if (chunks.length === 0) {
        throw new Error(
            "No chunks found for this document"
        );
    }

    let processed = 0;

    for (const chunk of chunks) {

        const embedding =
            await generateEmbedding(chunk.text);

        chunk.embedding = embedding;

        await chunk.save();

        processed++;

        console.log(
            `Embedded chunk ${chunk.chunkIndex + 1}/${chunks.length}`
        );
    }

    return {
        documentId,
        totalChunks: chunks.length,
        processed
    };
};


module.exports = {
    generateDocumentEmbeddings
};