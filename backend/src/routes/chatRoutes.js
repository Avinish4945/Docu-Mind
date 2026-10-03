const express = require("express");

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    askChatQuestion
} = require("../controllers/chatController");

const {
    getChatHistory,
    getChatSession,
    deleteChatSession
} = require("../controllers/chatHistoryController");


const router = express.Router();


router.post(
    "/ask",
    authMiddleware,
    askChatQuestion
);


router.get(
    "/history",
    authMiddleware,
    getChatHistory
);


router.get(
    "/history/:id",
    authMiddleware,
    getChatSession
);

router.delete(
    "/history/:id",
    authMiddleware,
    deleteChatSession
);


module.exports = router;