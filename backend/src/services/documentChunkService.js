const DocumentChunk = require("../models/DocumentChunk");

const {
    chunkText
} = require("./textChunker");


const createDocumentChunks = async (document) => {

    if (!document.extractedText) {
        throw new Error(
            "Document has no extracted text"
        );
    }

    const chunks = chunkText(
        document.extractedText,
        1000,
        200
    );


    // Remove old chunks if document is processed again
    await DocumentChunk.deleteMany({
        documentId: document._id
    });


    const chunkDocuments = chunks.map(
        (chunk, index) => ({

            documentId: document._id,

            chunkIndex: index,

            text: chunk.text,

            startIndex: chunk.startIndex,

            endIndex: chunk.endIndex

        })
    );


    if (chunkDocuments.length === 0) {
        return [];
    }


    return await DocumentChunk.insertMany(
        chunkDocuments
    );
};


module.exports = {
    createDocumentChunks
};