const { GoogleGenerativeAI } = require('@google/generative-ai');
const { questionAnswerPrompt, conceptExplainPrompt } = require('../utils/prompts');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function extractJSON(text) {
  try {
    if (!text) return null;

    // Remove markdown fences if present
    const cleaned = text.replace(/```(json)?/gi, "").trim();

    // Match both objects {..} and arrays [..]
    const matches = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/g);
    if (!matches) return null;

    // Try each candidate block
    for (let block of matches) {
      try {
        return JSON.parse(block);
      } catch (err) {
        continue; // try next block
      }
    }

    return null; // nothing parsed
  } catch (err) {
    console.warn("Failed to extract JSON:", err.message);
    return null;
  }
}





// Generate interview questions
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions, excludeQuestions = [] } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt({ role, experience, topicsToFocus, numberOfQuestions, excludeQuestions });

    let response;
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      response = await model.generateContent(prompt);
    } catch (err) {
      console.warn('⚠️ 1.5-flash failed, retrying with 2.0-flash-lite...', err.message);
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      response = await fallbackModel.generateContent(prompt);
    }

    const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const data = extractJSON(text);

    if (!data) {
      return res.status(500).json({ message: "Failed to extract JSON from AI response", raw: text });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate questions", error: error.message });
  }
};

// Generate concept explanation
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Missing required fields" });

    const prompt = conceptExplainPrompt(question);

    let response;
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      response = await model.generateContent(prompt);
    } catch (err) {
      console.warn('⚠️ 1.5-flash failed, retrying with 2.0-flash-lite...', err.message);
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      response = await fallbackModel.generateContent(prompt);
    }

    const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const data = extractJSON(text);

    if (!data) {
      return res.status(500).json({ message: "Failed to extract JSON from AI response", raw: text });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate explanation", error: error.message });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
