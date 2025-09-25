# 🚀 HirePrep  

HirePrep is a comprehensive platform for job seekers to prepare for **technical interviews** and **optimize their resumes** for ATS (Applicant Tracking Systems).  
Users can practice **mock interviews**, analyze resumes, and get **AI-powered feedback** to improve their chances of landing their dream job.  

---

## 🌟 Features  

- **Mock Interview Questions & Answers**: Generate role-specific technical interview questions with detailed, beginner-friendly answers. Includes code examples when needed.  
- **Resume Analysis**: Upload your resume to get AI-powered suggestions on weaknesses and improvements.  
- **JWT-Based Authentication**: Secure login and user sessions using JSON Web Tokens (JWT).  
- **Responsive & Modern UI**: Dark theme interface with intuitive design and orange accent highlights.  

---

## 🛠️ Tech Stack  

**Frontend:** React, Tailwind CSS, React Icons, Axios  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT  

---

## ⚙️ Installation  

### 1. Clone the repository  
```bash
git clone https://github.com/abhishekrwt2/HirePrep.git
cd HirePrep
Install frontend dependencies
cd frontend
npm install

3. Install backend dependencies
cd ../backend
npm install

4. Setup environment variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret

5. Run the backend
cd backend
npm run dev

6. Run the frontend
cd ../frontend
npm start
