const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        originalName: {
            type: String,
            required: true
        },

        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        mimeType: {
            type: String,
            required: true
        },

        fileSize: {
            type: Number,
            required: true
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        extractedText: {
            type: String,
            default: ""
        },


 analysis: {
    documentType: {
        type: String,
        default: null
    },

    department: {
        type: String,
        default: null
    },

    summary: {
        type: String,
        default: null
    },

    entities: [
        {
            name: {
                type: String
            },

            type: {
                type: String
            }
        }
    ],

    deadlines: [
        {
            description: {
                type: String
            },

            date: {
                type: Date
            },

            sourceText: {
                type: String
            }
        }
    ],

    obligations: [
        {
            description: {
                type: String
            },

            responsibleParty: {
                type: String
            },

            sourceText: {
                type: String
            }
        }
    ],

    complianceRequirements: [
        {
            description: {
                type: String
            },

            sourceText: {
                type: String
            }
        }
    ]
},

// ✅ OUTSIDE analysis
attention: {
    score: {
        type: Number,
        default: 0
    },

    priority: {
        type: String,
        enum: [
            "normal",
            "medium",
            "high",
            "critical"
        ],
        default: "normal"
    },

    reasons: [
        {
            type: String
        }
    ],

    deadlineDetails: [
        {
            description: String,
            date: Date,
            daysRemaining: Number,
            status: String
        }
    ]
},

        processingStatus: {
            type: String,
            enum: [
                "uploaded",
                "processing",
                "completed",
                "failed"
            ],
            default: "uploaded"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Document", documentSchema);