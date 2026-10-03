const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash"
});


const analyzeDocument = async (text) => {

    if (!text || !text.trim()) {
        throw new Error(
            "Document contains no readable text"
        );
    }

  const prompt = `
You are an enterprise document intelligence system.

Analyze the following organizational document.

Your job is to extract ONLY information that is
actually supported by the document.

DO NOT invent, assume, infer, or add information
that is not explicitly supported by the document.

IMPORTANT:
- Do not assume the organization is KMRL.
- Do not assume the department.
- Do not assume the document type.
- Do not create deadlines that are not present.
- Do not create obligations that are not present.
- Use only information found in the DOCUMENT TEXT.
- If information is unavailable, return null or [] as specified below.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanations outside the JSON.

Required JSON structure:

{
    "documentType": null,

    "department": null,

    "summary": null,

    "entities": [
        {
            "name": "",
            "type": ""
        }
    ],

    "deadlines": [
        {
            "description": "",
            "date": "",
            "sourceText": ""
        }
    ],

    "obligations": [
        {
            "description": "",
            "responsibleParty": "",
            "sourceText": ""
        }
    ],

    "complianceRequirements": [
        {
            "description": "",
            "sourceText": ""
        }
    ]
}

Rules:

1. documentType:
   Identify the document type only from the document.
   
   Examples:
   Tender, Policy, Circular, Contract,
   Agreement, Notice, Report, Manual, etc.

2. department:
   Identify the responsible department only if
   the document explicitly mentions it.
   
   If no department is mentioned, return null.

3. summary:
   Provide a concise factual summary based
   only on the document.

4. entities:
   Extract important entities explicitly
   mentioned in the document.
   
   These may include:
   organizations, companies, vendors,
   people, projects, locations, or systems.

5. deadlines:
   Extract actual deadlines, due dates,
   submission dates, expiry dates, review dates,
   renewal dates, or other important dates.

   Use ISO format:

   YYYY-MM-DD

   Example:

   {
       "description": "Document review deadline",
       "date": "2026-08-25",
       "sourceText": "The document should be reviewed before 25 August 2026."
   }

   Never invent a date.

6. obligations:
   Extract statements describing something that
   a person, department, contractor, vendor,
   or organization must do.

7. complianceRequirements:
   Extract mandatory rules, standards,
   regulations, approvals, or compliance requirements
   explicitly mentioned in the document.

8. sourceText:
   For every deadline, obligation, and compliance
   requirement, include the relevant sentence or
   short passage from the document that supports it.

9. Missing information:

   For missing single-value fields:

   null

   For missing arrays:

   []

10. Accuracy:
    Never use general knowledge to fill missing
    information.

DOCUMENT TEXT:

${text}
`;

    const result = await model.generateContent(prompt);

    const response =
        result.response.text();

    // Remove possible markdown fences
    const cleanedResponse = response
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    try {

        return JSON.parse(cleanedResponse);

        console.log(
    "GEMINI ANALYSIS:",
    JSON.stringify(JSON.parse(cleanedResponse), null, 2)
);

    } catch (error) {

        console.error(
            "Gemini returned invalid JSON:",
            response
        );

        throw new Error(
            "AI returned invalid document analysis"
        );
    }
};


module.exports = {
    analyzeDocument
};