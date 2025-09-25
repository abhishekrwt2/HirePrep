import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ChoicePage from "./pages/ChoicePage"; 
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import { UserProvider } from './context/userContext';
import ResumeAnalyzerPage from './pages/ResumeAnalyzer/ResumeAnalyzer';
const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
                  <Route path="/choice" element={<ChoicePage />} />
                    <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
        </Routes>
      </Router>

      {/* Toaster should be outside Router, with options passed as props */}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
    </UserProvider>
  );
};

export default App;
