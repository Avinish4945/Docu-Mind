const ChatSession = require("../models/ChatSession");
const ChatMessage = require("../models/ChatMessage");

const {
    askQuestion
} = require("../services/ragService");


const askChatQuestion = async (req, res) => {

    try {

        const {
            question,
            sessionId
        } = req.body;


        if (!question || !question.trim()) {
            return res.status(400).json({
                message: "Question is required"
            });
        }


        // --------------------------------
        // 1. Find or create chat session
        // --------------------------------

        let session;


        if (sessionId) {

            session =
                await ChatSession.findOne({
                    _id: sessionId,
                    userId: req.user.userId
                });

            if (!session) {
                return res.status(404).json({
                    message: "Chat session not found"
                });
            }

        } else {

            // Create a title from the question
            const title =
                question.trim().length > 50
                    ? question.trim().substring(0, 50) + "..."
                    : question.trim();


            session =
                await ChatSession.create({
                    userId: req.user.userId,
                    title
                });
        }


        // --------------------------------
        // 2. Save user message
        // --------------------------------

        await ChatMessage.create({

            sessionId: session._id,

            role: "user",

            content: question.trim()

        });


        // --------------------------------
        // 3. Ask RAG
        // --------------------------------

       const previousMessages =
    await ChatMessage.find({
        sessionId: session._id
    })
    .sort({
        createdAt: 1
    })
    .limit(10)
    .select("role content -_id");


const result =
    await askQuestion(
        question.trim(),
        previousMessages
    );


        // --------------------------------
        // 4. Save AI response
        // --------------------------------

        await ChatMessage.create({

            sessionId: session._id,

            role: "assistant",

            content: result.answer,

            sources: result.sources

        });


        // --------------------------------
        // 5. Return response
        // --------------------------------

        res.status(200).json({

            message:
                "Question answered successfully",

            sessionId:
                session._id,

            title:
                session.title,

            question:
                question.trim(),

            answer:
                result.answer,

            sources:
                result.sources

        });


    } catch (error) {

        console.error(
            "Chat question error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to answer question"

        });
    }
};


module.exports = {
    askChatQuestion
};