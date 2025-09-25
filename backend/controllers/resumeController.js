const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');
const { resumeAnalysisPrompt } = require('../utils/prompts');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc Analyze resume PDF
// @route POST /api/resume/analyze
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);

    const prompt = resumeAnalysisPrompt(pdfData.text);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
    });

    let cleanedText = response.text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to analyze resume', error: error.message });
  }
};

module.exports = { analyzeResume };

