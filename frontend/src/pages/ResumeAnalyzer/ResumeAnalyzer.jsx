import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AiOutlineUpload } from "react-icons/ai";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/Navbar";
import { BASE_URL, API_PATHS } from "../../utils/apiPaths";


const ResumeAnalyzerPage = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to landing if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setAnalysisResult(null);
    setError("");
  };

  const handleAnalyzeResume = async () => {
    if (!selectedFile) {
      setError("Please select a resume to analyze.");
      return;
    }

    setIsLoading(true);
    setError("");
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const response = await axios.post(
              `${BASE_URL}${API_PATHS.RESUME.ANALYZE}`,

        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAnalysisResult(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to analyze resume. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state if auth is still loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-orange-500 mb-6">
          Resume Analyzer
        </h2>

        {/* File upload */}
        <label className="flex items-center justify-center cursor-pointer border-2 border-dashed border-orange-500 rounded p-4 mb-4 hover:bg-orange-500 hover:text-black transition">
          <AiOutlineUpload className="text-2xl mr-2" />
          {selectedFile ? selectedFile.name : "Upload your PDF resume"}
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          onClick={handleAnalyzeResume}
          disabled={isLoading}
          className="bg-orange-500 text-black px-5 py-2 rounded hover:bg-orange-600 transition mb-4"
        >
          {isLoading ? <SpinnerLoader size="sm" /> : "Analyze Resume"}
        </button>

        {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}

        {analysisResult && (
          <div className="mt-6 space-y-6">
            {/* Skills */}
            {analysisResult.skills && (
              <div className="p-4 border border-orange-600 rounded bg-black">
                <h3 className="text-xl font-semibold text-orange-400 mb-2">
                  Skills
                </h3>
                <ul className="list-disc list-inside text-white">
                  {analysisResult.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {analysisResult.weaknesses && (
              <div className="p-4 border border-orange-600 rounded bg-black">
                <h3 className="text-xl font-semibold text-orange-400 mb-2">
                  Weaknesses
                </h3>
                <ul className="list-disc list-inside text-white">
                  {analysisResult.weaknesses.map((weakness, idx) => (
                    <li key={idx}>{weakness}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {analysisResult.tips && (
              <div className="p-4 border border-orange-600 rounded bg-black">
                <h3 className="text-xl font-semibold text-orange-400 mb-2">
                  Tips
                </h3>
                <ul className="list-disc list-inside text-white">
                  {analysisResult.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Roles */}
            {analysisResult.suggestedRoles && (
              <div className="p-4 border border-orange-600 rounded bg-black">
                <h3 className="text-xl font-semibold text-orange-400 mb-2">
                  Suggested Roles
                </h3>
                <ul className="list-disc list-inside text-white">
                  {analysisResult.suggestedRoles.map((role, idx) => (
                    <li key={idx}>{role}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;
