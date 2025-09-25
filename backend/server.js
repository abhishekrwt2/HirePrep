
require ("dotenv").config();
const fs = require('fs');
const express=require("express");

const cors=require("cors");
const path=require("path");
const app=express();
const ConnectDB=require("./config/db");
const authRoutes=require('./routes/authRoutes');
const sessionRoutes=require("./routes/sessionRoutes");
const questionRoutes=require("./routes/questionRoutes");
const {protect}=require("./middlewares/authMiddleware");
const {generateInterviewQuestions,generateConceptExplanation}=require("./controllers/aiController");
const resumeRoutes = require("./routes/resumeRoutes");

app.use(
    cors({
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
);
ConnectDB()
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/resume", resumeRoutes);

app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
app.use('/api/ai/generate-explanation',protect,generateConceptExplanation);
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server running on Port ${PORT}`));
