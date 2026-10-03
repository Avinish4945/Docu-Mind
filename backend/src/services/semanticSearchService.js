const DocumentChunk = require("../models/DocumentChunk");

const {
    generateEmbedding
} = require("./embeddingService");


const semanticSearch = async (
    query,
    limit = 5
) => {

    if (!query || !query.trim()) {
        throw new Error(
            "Search query is required"
        );
    }

    // Generate embedding for user's question
    const queryEmbedding =
        await generateEmbedding(query);


    // Search MongoDB Atlas Vector Search
    const results =
        await DocumentChunk.aggregate([

            {
                $vectorSearch: {
                    index:
                        "document_chunks_vector_index",

                    path: "embedding",

                    queryVector:
                        queryEmbedding,

                    numCandidates:
                        Math.max(limit * 10, 50),

                    limit
                }
            },

            {
    $lookup: {
        from: "documents",
        localField: "documentId",
        foreignField: "_id",
        as: "document"
    }
},
{
    $unwind: "$document"
},
{
    $project: {
        _id: 1,
        documentId: 1,
        chunkIndex: 1,
        text: 1,

        score: {
            $meta: "vectorSearchScore"
        },

        documentTitle: "$document.title",
        originalName: "$document.originalName",
        department: "$document.analysis.department",
        documentType: "$document.analysis.documentType"
    }
}

        ]);


    return results;
};


module.exports = {
    semanticSearch
};