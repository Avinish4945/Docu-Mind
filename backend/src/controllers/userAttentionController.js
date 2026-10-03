const Document = require("../models/Document");


const getUserAttention = async (req, res) => {

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
            "title originalName analysis.documentType analysis.department analysis.summary attention createdAt"
        );


        res.status(200).json({
            count: documents.length,
            documents
        });


    } catch (error) {

        console.error(
            "Get user attention error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch user attention"
        });

    }

};


module.exports = {
    getUserAttention
};