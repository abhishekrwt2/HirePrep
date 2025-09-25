import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import AIResponsePreview from "../../pages/InterviewPrep/components/AiResponsePreview";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data
  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to fetch session data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate AI explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setOpenLearnMoreDrawer(true);
      setIsGenerating(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
      if (response.data) setExplanation(response.data);
    } catch (error) {
      console.error(error);
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Pin/unpin question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      if (response.data?.question) fetchSessionDetailsById();
    } catch (error) {
      console.error(error);
    }
  };

  // Load more AI questions
// Load more AI questions
const uploadMoreQuestions = async () => {
  if (!sessionData) return;
  try {
    setIsUpdateLoader(true);
    setErrorMsg("");

    // Collect existing question texts
    const existingQuestions = sessionData.questions.map(q => q.question);

    // Generate new questions via AI
    const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
      role: sessionData.role,
      experience: sessionData.experience,
      topicsToFocus: sessionData.topicsToFocus,
      numberOfQuestions: 10,
      excludeQuestions: existingQuestions, // Send existing questions to AI
    });

    let generatedQuestions = aiResponse.data;

    // Remove duplicates just in case AI repeats
    generatedQuestions = generatedQuestions.filter(
      q => !existingQuestions.includes(q.question)
    );

    if (!generatedQuestions || generatedQuestions.length === 0) {
      setErrorMsg("No new questions returned from AI");
      return;
    }

    // Add new questions to the session
    await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
      sessionId: sessionData._id,
      questions: generatedQuestions,
    });

    // Fetch updated session
    await fetchSessionDetailsById();
  } catch (error) {
    console.error(error);
    setErrorMsg(
      error.response?.data?.message || "Something went wrong while loading more questions"
    );
  } finally {
    setIsUpdateLoader(false);
  }
};


  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[70vh] bg-black text-white">
          <SpinnerLoader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-black min-h-screen text-white p-6 space-y-6">
        {/* Role Info */}
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || "-"}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""}
        />

        {/* Q&A Section */}
        <div className="bg-black border border-orange-500 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-orange-500">Interview Q&A</h2>

          <div className="grid grid-cols-12 gap-4">
            {/* Questions List */}
            <div className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-12"} space-y-4`}>
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100, delay: index * 0.1, damping: 15 }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <QuestionCard
                      question={data.question}
                      answer={data.answer}
                      isPinned={data.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      onLearnMore={() => generateConceptExplanation(data.question)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Load More Button */}
              <div className="flex justify-center mt-4">
                <button
                  className="flex items-center gap-2 bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600"
                  onClick={uploadMoreQuestions}
                  disabled={isUpdateLoader}
                >
                  {isUpdateLoader ? <SpinnerLoader size="sm" /> : <LuListCollapse />}
                  Load More Questions
                </button>
              </div>

              {/* Display error if any */}
              {errorMsg && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-2">
                  <LuCircleAlert />
                  {errorMsg}
                </p>
              )}
            </div>

            {/* Drawer */}
            <Drawer
              isOpen={openLearnMoreDrawer}
              onClose={() => setOpenLearnMoreDrawer(false)}
              title={!isGenerating && explanation?.title}
            >
              {isGenerating && <SkeletonLoader lines={5} />}
              {!isGenerating && explanation && (
                <div className="space-y-4">
                  {explanation.title && (
                    <h3 className="text-lg font-semibold text-orange-500">{explanation.title}</h3>
                  )}
                  <AIResponsePreview content={explanation.explanation || "No explanation provided"} />
                </div>
              )}
            </Drawer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
