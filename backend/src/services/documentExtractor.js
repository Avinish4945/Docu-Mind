const fs = require("fs/promises");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const extractTextFromDocument = async (filePath, mimeType) => {

    if (mimeType === "application/pdf") {

        const buffer = await fs.readFile(filePath);

        const pdfData = await pdfParse(buffer);

        return pdfData.text.trim();
    }

    if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

        const result = await mammoth.extractRawText({
            path: filePath
        });

        return result.value.trim();
    }

    if (mimeType === "text/plain") {

        const text = await fs.readFile(
            filePath,
            "utf-8"
        );

        return text.trim();
    }

    throw new Error(
        `Unsupported document type: ${mimeType}`
    );
};

module.exports = {
    extractTextFromDocument
};