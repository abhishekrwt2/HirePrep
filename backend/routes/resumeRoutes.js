const express = require('express');
const router = express.Router();
const uploadResumes = require("../middlewares/uploadResumes");

const { analyzeResume } = require('../controllers/resumeController');

router.post('/analyze', uploadResumes.single('resume'), analyzeResume);

module.exports = router;
