const express = require("express");

const router = express.Router();

const {
    getUserAttention
} = require("../controllers/userAttentionController");

const authMiddleware = require("../middleware/authMiddleware");


router.get(
    "/attention",
    authMiddleware,
    getUserAttention
);


module.exports = router;