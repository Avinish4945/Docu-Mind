const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const chatRoutes =
    require("./routes/chatRoutes");
    const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "KMRL Document Intelligence API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/documents", documentRoutes);
app.use(
    "/api/chat",
    chatRoutes
);

app.use("/api/user", userRoutes);

module.exports = app;