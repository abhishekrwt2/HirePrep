const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { resumeAnalysisPrompt } = require('../utils/prompts');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to safely extract JSON from AI response
function extractJSON(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/); // first {...} block
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch (err) {
    console.warn("Failed to parse JSON safely:", err.message);
    return null;
  }
}

// @desc Analyze resume PDF
// @route POST /api/resume/analyze
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read and parse PDF
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);

    const prompt = resumeAnalysisPrompt(pdfData.text);

    let response;

    try {
      // ✅ Try stable model first
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      response = await model.generateContent(prompt);
    } catch (err) {
      console.warn('⚠️ 1.5-flash failed, retrying with 2.0-flash-lite...', err.message);

      // 🔄 Fallback to experimental model
      const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
      response = await fallbackModel.generateContent(prompt);
    }

    // Get text safely
    const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const data = extractJSON(text);

    if (!data) {
      return res.status(500).json({
        message: "Failed to extract JSON from AI response",
        raw: text
      });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error('❌ Resume analysis error:', error);
    res.status(500).json({
      message: 'Failed to analyze resume',
      error: error.message,
    });
  }
};

module.exports = { analyzeResume };
