const {
    compareDocuments
} = require(
    "../services/documentComparisonService"
);


const compareDocumentsController =
    async (req, res) => {

        try {

            const {
                oldDocumentId,
                newDocumentId
            } = req.body;


            if (
                !oldDocumentId ||
                !newDocumentId
            ) {

                return res.status(400).json({
                    message:
                        "oldDocumentId and newDocumentId are required"
                });
            }


            const comparison =
                await compareDocuments(
                    oldDocumentId,
                    newDocumentId
                );


            res.status(200).json({
                message:
                    "Documents compared successfully",

                comparison
            });


        } catch (error) {

            console.error(
                "Document comparison error:",
                error
            );


            res.status(500).json({
                message:
                    "Failed to compare documents"
            });
        }
    };


module.exports = {
    compareDocumentsController
};