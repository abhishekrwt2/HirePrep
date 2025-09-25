import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SignUp from './Auth/Signup';
import Login from './Auth/Login';
import Modal from '../components/Modal';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-black text-white font-display flex flex-col min-h-screen">

      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-4">
        <div className="text-3xl font-bold">HirePrep</div>
        {user ? (
          <ProfileInfoCard />
        ) : (
          <button
            className="bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-6 rounded-full"
            onClick={() => setOpenAuthModal(true)}
          >
            Login / Get Started
          </button>
        )}
      </nav>

      {/* Hero Section */}
      <motion.div
        className="flex flex-col justify-center items-center text-center px-6 py-16"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          From Prep to <span className="text-orange-500">Success</span> <br />
          Powered by AI
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl">
          Prepare. Understand. Master. Your AI-guided journey to interview success.
        </p>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 px-8 rounded-full"
          onClick={handleCTA}
        >
          Get Started
        </button>
      </motion.div>

      {/* What HirePrep Does Section (No Grey Background) */}
      <section className="px-10 py-10 mx-10 mb-12">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-orange-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What HirePrep Does
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <motion.div
            className="bg-black p-6 rounded-lg border border-orange-500 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-orange-500">Mock Interview Practice</h3>
            <p className="text-gray-300">
              Practice role-specific interview questions powered by AI, get instant feedback, and improve your answers step by step.
            </p>
          </motion.div>
          <motion.div
            className="bg-black p-6 rounded-lg border border-orange-500 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-orange-500">Resume Analysis</h3>
            <p className="text-gray-300">
              Upload your resume and get AI-driven analysis with suggestions to make your resume stand out to recruiters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-10 py-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-orange-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { title: 'Register / Login', desc: 'Create your account to start your personalized AI interview journey.' },
            { title: 'Select Role & Experience', desc: 'Choose your job role and experience level to get relevant questions.' },
            { title: 'Practice Questions', desc: 'Answer AI-curated questions and practice at your own pace.' },
            { title: 'Get AI Explanations', desc: 'Receive detailed explanations, and concept deep-dives from AI.' },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="bg-black p-6 rounded-lg border border-orange-500 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-orange-500">{i + 1}. {step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <motion.section
        className="px-10 py-10 bg-black rounded-lg mx-10 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center mb-4 text-orange-500">About HirePrep</h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          HirePrep is an AI-powered interview preparation platform that helps job seekers practice role-specific questions, understand concepts deeply, and master their interview skills. Tailor your learning path and gain confidence with AI-guided feedback at every step.
        </p>
      </motion.section>

      {/* FAQ Section */}
      <section className="px-10 py-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-orange-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { question: 'Is HirePrep free to use?', answer: 'Yes, you can start for free. Some premium features may require a subscription in the future.' },
            { question: 'Do I need prior experience?', answer: 'No, HirePrep guides you based on your selected experience level, whether beginner or advanced.' },
            { question: 'Can I practice multiple roles?', answer: 'Yes, you can select different roles and practice for each role independently.' },
            { question: 'How AI Helps In My Practice?', answer: 'AI analyzes your answers and provides detailed explanations, suggestions, and concept deep-dives to help you improve.' },
          ].map((faq, i) => (
            <motion.div
              key={i}
              className="bg-black p-6 rounded-lg border border-orange-500 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => toggleFaq(i)}
            >
              <h3 className="text-xl font-semibold mb-2 text-orange-500">{faq.question}</h3>
              {faqOpen[i] && <p className="text-gray-300 mt-2">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader={false} // show close button
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Modal>

      {/* Footer */}
      <footer className="w-full flex justify-between items-center px-10 py-6 mt-auto border-t border-orange-500">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">HirePrep</div>
          <span className="text-gray-400 text-sm mt-1">© {new Date().getFullYear()} HirePrep. All rights reserved.</span>
        </div>
        <div className="flex space-x-6 text-orange-500">
          <p>Follow Me</p>
          <a href="https://github.com/abhishekrwt2" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/abhishek-rawat-9976a1221/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

