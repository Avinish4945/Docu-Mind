const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(
    process.cwd(),
    "uploads"
);

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true
    });
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {

        const uniqueName =
            `${Date.now()}-${file.originalname}`;

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/pdf",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "text/plain"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only PDF, DOCX and TXT files are allowed"
            )
        );
    }
};

const upload = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

module.exports = upload;