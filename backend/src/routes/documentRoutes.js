const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
    uploadDocument,
    getDocuments,
    getAttentionDocuments,
    getSingleDocument,
    deleteDocument,
    getDocumentFile
} = require("../controllers/documentController");

const {
    compareDocumentsController
} = require(
    "../controllers/documentComparisonController"
);

const router = express.Router();

router.post(
    "/upload",
    authMiddleware,
    requireRole("admin","user"),
    upload.single("document"),
    uploadDocument
);

router.get(
    "/",
    authMiddleware,
    requireRole("admin","user"),
    getDocuments
);
router.get(
    "/attention",
    authMiddleware,
    requireRole("admin","user"),
    getAttentionDocuments
);

router.get(
    "/:id/file",
    authMiddleware,
    getDocumentFile
);

router.get(
    "/:id",
    authMiddleware,
    getSingleDocument
);

router.delete(
    "/:id",
    authMiddleware,
    requireRole("admin"),
    deleteDocument
);

router.post(
    "/compare",
    authMiddleware,
    compareDocumentsController
);

// router.get(
//     "/:id",
//     authMiddleware,
//     compareDocumentsController
// );


module.exports = router;