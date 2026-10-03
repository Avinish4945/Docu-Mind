const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const {
    semanticSearch
} = require("./semanticSearchService");


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);


const model = genAI.getGenerativeModel({
    model:
        process.env.GEMINI_CHAT_MODEL ||
        "gemini-3.5-flash"
});


const askQuestion = async (
    question,
    conversationHistory = []
) => {

    if (!question || !question.trim()) {
        throw new Error("Question is required");
    }


    // --------------------------------
    // 1. Retrieve relevant chunks
    // --------------------------------

    const searchResults =
        await semanticSearch(
            question,
            5
        );


    // --------------------------------
    // 2. Build context
    // --------------------------------

    const context =
        searchResults.length > 0
            ? searchResults
                .map((result, index) => {

                    return `
SOURCE ${index + 1}

Document ID:
${result.documentId}

Chunk:
${result.text}
`;
                })
                .join("\n--------------------\n")

            : "No relevant document sources were found.";


    // --------------------------------
    // 3. Build conversation history
    // --------------------------------

    const historyText =
        conversationHistory
            .slice(-10)
            .map((message) => {
                return `${message.role.toUpperCase()}: ${message.content}`;
            })
            .join("\n");


    // --------------------------------
    // 4. Prompt Gemini
    // --------------------------------

    const prompt = `
You are an intelligent Document Assistant.

You help users understand and interact with their uploaded documents.
The uploaded documents may belong to any organization, department,
industry, or subject.

Previous conversation:

${historyText || "No previous conversation."}


AVAILABLE DOCUMENT SOURCES:

${context}


CURRENT USER QUESTION:

${question}


Follow these rules carefully:

1. First determine whether the user's question is:
   - related to the uploaded documents, or
   - a general/non-document question.

2. If the question is related to the uploaded documents:
   - Use the AVAILABLE DOCUMENT SOURCES as the factual authority.
   - Answer using information supported by the sources.
   - Do not invent document-specific information.
   - Do not invent dates, deadlines, amounts, names, clauses,
     obligations, requirements, policies, or technical specifications.
   - If the requested information is not present in the available
     sources, clearly say that it was not found in the available
     documents.

3. If the question is a general question:
   - You may answer using your general knowledge.
   - Give a clear, accurate, and useful answer.
   - Do not claim that the answer came from the uploaded documents.

4. General questions may include:
   - Artificial Intelligence
   - programming
   - technology
   - mathematics
   - science
   - English
   - general concepts
   - everyday questions
   - other topics unrelated to the uploaded documents

5. Use the previous conversation only to understand context
   and maintain continuity.

6. For document-specific factual claims, rely on the available
   document sources rather than the previous conversation.

7. When relevant document sources are available, prioritize them
   over general knowledge.

8. Preserve exact information from the documents, especially:
   - dates
   - deadlines
   - amounts
   - names
   - document titles
   - requirements
   - clauses
   - responsibilities
   - technical specifications

9. If the document sources contain conflicting information,
   clearly mention the conflict. Do not invent a resolution.

10. If no relevant document sources are available:
    - Answer general questions normally.
    - For document-specific questions, clearly state that the
      requested information was not found in the available documents.

11. Do not mention:
    - similarity scores
    - embeddings
    - vector databases
    - retrieval scores
    - internal RAG processes

    unless the user specifically asks how the system works.

12. Keep the answer concise, clear, and useful.

13. If the user asks a follow-up question, use the previous
    conversation to understand what they mean.

14. Never claim that information came from an uploaded document
    if it was generated from general knowledge.

Now answer the CURRENT USER QUESTION.
`;


    // --------------------------------
    // 5. Generate answer
    // --------------------------------

    const result =
        await model.generateContent(prompt);


    const response =
        result.response.text();


    // --------------------------------
    // 6. Return sources
    // --------------------------------

    const sources =
        searchResults.map(
            (result) => ({
                documentId:
                    result.documentId,

                chunkId:
                    result._id,

                documentTitle:
                    result.documentTitle,

                originalName:
                    result.originalName,

                department:
                    result.department,

                documentType:
                    result.documentType,

                chunkIndex:
                    result.chunkIndex,

                text:
                    result.text,

                score:
                    result.score
            })
        );


    return {

        answer: response,

        sources

    };
};


module.exports = {
    askQuestion
};