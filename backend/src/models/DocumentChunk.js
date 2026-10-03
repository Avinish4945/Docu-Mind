const mongoose = require("mongoose");

const documentChunkSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true,
            index: true
        },

        chunkIndex: {
            type: Number,
            required: true
        },

        text: {
            type: String,
            required: true
        },

        startIndex: {
            type: Number,
            required: true
        },

        endIndex: {
            type: Number,
            required: true
        },
        embedding: {
    type: [Number],
    default: []
},
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "DocumentChunk",
    documentChunkSchema
);