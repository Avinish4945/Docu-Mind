const Document = require("../models/Document");
const {
    extractTextFromDocument
} = require("../services/documentExtractor");

const {
    analyzeDocument
} = require("../services/documentAnalyzer");

const {
    calculateAttention
} = require("../services/attentionService");

const fs = require("fs/promises");
const mongoose = require("mongoose");





const uploadDocument = async (req, res) => {
    try {

        console.log("UPLOAD REQUEST RECEIVED");

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a document"
            });
        }

        // ==========================================
        // 1. CREATE DOCUMENT IMMEDIATELY
        // ==========================================

        const document = await Document.create({

            title:
                req.body.title ||
                req.file.originalname,

            originalName:
                req.file.originalname,

            fileName:
                req.file.filename,

            filePath:
                req.file.path,

            mimeType:
                req.file.mimetype,

            fileSize:
                req.file.size,

            uploadedBy:
                req.user.userId,

            processingStatus:
                "processing"

        });


        console.log(
            "DOCUMENT CREATED:",
            document._id
        );


        // ==========================================
        // 2. SEND RESPONSE IMMEDIATELY
        // ==========================================

        res.status(201).json({

            message:
                "Document uploaded successfully. Processing started.",

            document: {

                _id:
                    document._id,

                id:
                    document._id,

                title:
                    document.title,

                originalName:
                    document.originalName,

                mimeType:
                    document.mimeType,

                fileSize:
                    document.fileSize,

                processingStatus:
                    "processing",

                createdAt:
                    document.createdAt

            }

        });


        // ==========================================
        // 3. PROCESS DOCUMENT IN BACKGROUND
        // ==========================================

        processDocument(
            document._id,
            document.filePath,
            document.mimeType
        );


    } catch (error) {

        console.error(
            "UPLOAD ERROR:",
            error
        );

        if (!res.headersSent) {

            res.status(500).json({

                message:
                    "Document upload failed",

                error:
                    error.message

            });

        }

    }
};

const processDocument = async (
    documentId,
    filePath,
    mimeType
) => {

    try {

        console.log(
            "BACKGROUND PROCESSING STARTED:",
            documentId
        );


        // ==========================================
        // TEXT EXTRACTION
        // ==========================================

        console.log(
            "Extracting text..."
        );

        const extractedText =
            await extractTextFromDocument(
                filePath,
                mimeType
            );


        console.log(
            "Text extraction completed"
        );


        // ==========================================
        // GEMINI
        // ==========================================

        console.log(
            "Starting Gemini analysis..."
        );

        const analysis =
            await analyzeDocument(
                extractedText
            );


        console.log(
            "Gemini analysis completed"
        );


        // ==========================================
        // ATTENTION
        // ==========================================

        const attention =
            calculateAttention(
                analysis
            );


        console.log(
            "Attention calculated:",
            attention
        );


        // ==========================================
        // UPDATE DOCUMENT
        // ==========================================

        await Document.findByIdAndUpdate(

            documentId,

            {

                extractedText:
                    extractedText,

                analysis:
                    analysis,

                attention:
                    attention,

                processingStatus:
                    "completed"

            }

        );


        console.log(
            "DOCUMENT PROCESSING COMPLETED:",
            documentId
        );


    } catch (error) {

        console.error(
            "BACKGROUND DOCUMENT PROCESSING ERROR:",
            error
        );


        // Mark processing as failed

        await Document.findByIdAndUpdate(

            documentId,

            {

                processingStatus:
                    "failed"

            }

        );

    }
};




const getDocuments = async (req, res) => {
    try {

        const documents = await Document.find()
            .populate("uploadedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: documents.length,
            documents
        });

    } catch (error) {

        console.error(
            "Get documents error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch documents"
        });
    }
};

const getAttentionDocuments = async (req, res) => {
    try {

        const documents = await Document.find({
            "attention.priority": {
                $in: [
                    "medium",
                    "high",
                    "critical"
                ]
            }
        })
        .sort({
            "attention.score": -1
        })
        .select(
            "title originalName analysis.documentType analysis.department attention createdAt"
        );

        res.status(200).json({
            count: documents.length,
            documents
        });

    } catch (error) {

        console.error(
            "Get attention documents error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch attention documents"
        });
    }
};

const getSingleDocument = async (req, res) => {
    try {

        const { id } = req.params;

        const document = await Document.findById(id)
            .select("-extractedText")
            .populate(
                "uploadedBy",
                "name email role"
            );

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        res.status(200).json({
            document
        });

    } catch (error) {

        console.error(
            "Get single document error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch document"
        });
    }
};

const deleteDocument = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid document ID"
            });
        }

        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        // Delete physical file
        try {
            await fs.unlink(document.filePath);
        } catch (fileError) {

            // File may already be missing.
            // We still want to remove the DB record.
            if (fileError.code !== "ENOENT") {
                throw fileError;
            }
        }

        // Delete MongoDB record
        await Document.findByIdAndDelete(id);

        res.status(200).json({
            message: "Document deleted successfully"
        });

    } catch (error) {

        console.error(
            "Delete document error:",
            error
        );

        res.status(500).json({
            message: "Failed to delete document"
        });
    }
};

const getDocumentFile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid document ID"
            });
        }

        const document = await Document.findById(id);

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        // Check that the physical file exists
        try {
            await fs.access(document.filePath);
        } catch (error) {
            return res.status(404).json({
                message: "Document file not found"
            });
        }

        res.sendFile(document.filePath);

    } catch (error) {

        console.error(
            "Get document file error:",
            error
        );

        res.status(500).json({
            message: "Failed to open document"
        });
    }
};
module.exports = {
    uploadDocument,
    getDocuments,
    getAttentionDocuments,
    getSingleDocument,
    getDocumentFile,
    deleteDocument,
};