const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
    getAdminDashboard
} = require("../controllers/adminController");

const router = express.Router();

router.get(
    "/dashboard",
    authMiddleware,
    requireRole("admin"),
    getAdminDashboard
);

module.exports = router;