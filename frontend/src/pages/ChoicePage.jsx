// ChoicePage.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import { UserContext } from "../context/userContext";
const ChoicePage = () => {
  const navigate = useNavigate();
  const { user, loading, clearUser } = useContext(UserContext);

  // Redirect to landing page if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    clearUser();
    navigate("/", { replace: true });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar with logout */}
      <Navbar user={user} onLogout={handleLogout} />

      <div className="flex flex-col items-center justify-center flex-1 space-y-8 p-6">
        <h2 className="text-3xl font-bold text-orange-500 text-center">
          Be ready for your next interview!
        </h2>
        <p className="text-white text-center max-w-md">
          Choose one of the options below to either practice a mock interview or optimize your resume for better ATS performance.
        </p>

        <div className="flex gap-6 mt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-orange-500 rounded hover:bg-orange-600 transition font-semibold"
          >
            Mock Interview
          </button>
          <button
            onClick={() => navigate("/resume-analyzer")}
            className="px-6 py-3 bg-orange-500 rounded hover:bg-orange-600 transition font-semibold"
          >
            Analyze Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoicePage;

