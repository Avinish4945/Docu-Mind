const ChatSession = require("../models/ChatSession");
const ChatMessage = require("../models/ChatMessage");


const getChatHistory = async (req, res) => {

    try {

        const sessions =
            await ChatSession.find({
                userId: req.user.userId
            })
            .sort({
                updatedAt: -1
            })
            .select(
                "_id title createdAt updatedAt"
            );


        res.status(200).json({

            count:
                sessions.length,

            sessions

        });


    } catch (error) {

        console.error(
            "Get chat history error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch chat history"
        });
    }
};


const getChatSession = async (req, res) => {

    try {

        const { id } = req.params;


        const session =
            await ChatSession.findOne({
                _id: id,
                userId: req.user.userId
            });


        if (!session) {

            return res.status(404).json({
                message:
                    "Chat session not found"
            });
        }


        const messages =
            await ChatMessage.find({
                sessionId: session._id
            })
            .sort({
                createdAt: 1
            });


        res.status(200).json({

            session,

            messages

        });


    } catch (error) {

        console.error(
            "Get chat session error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch chat session"
        });
    }
};

const deleteChatSession = async (req, res) => {
    try {
        const { id } = req.params;

        const session = await ChatSession.findOne({
            _id: id,
            userId: req.user.userId
        });

        if (!session) {
            return res.status(404).json({
                message: "Chat session not found"
            });
        }

        await ChatMessage.deleteMany({
            sessionId: session._id
        });

        await ChatSession.findByIdAndDelete(
            session._id
        );

        res.status(200).json({
            message: "Chat session deleted successfully"
        });

    } catch (error) {
        console.error(
            "Delete chat session error:",
            error
        );

        res.status(500).json({
            message: "Failed to delete chat session"
        });
    }
};


module.exports = {
    getChatHistory,
    getChatSession,
    deleteChatSession
};