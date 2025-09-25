const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper to safely extract JSON from AI response
function extractJSON(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/); // match first {...} block
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch (err) {
    console.warn("Failed to parse JSON safely:", err.message);
    return null;
  }
}

// Generate interview questions
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt({ role, experience, topicsToFocus, numberOfQuestions });

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });
    } catch (err) {
      console.warn("⚠️ 1.5-flash failed, retrying with 2.0-flash-lite...", err.message);
      response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt,
      });
    }

    const text = response?.text || "";
    const data = extractJSON(text);

    if (!data) {
      return res.status(500).json({ message: "Failed to extract JSON from AI response", raw: text });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// Generate explanation
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Missing question field" });

    const prompt = conceptExplainPrompt(question);

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });
    } catch (err) {
      console.warn("⚠️ 1.5-flash failed, retrying with 2.0-flash-lite...", err.message);
      response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt,
      });
    }

    const text = response?.text || "";
    const data = extractJSON(text);

    if (!data) {
      return res.status(500).json({ message: "Failed to extract JSON from AI response", raw: text });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };

