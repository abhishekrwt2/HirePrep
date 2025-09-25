import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "", // empty by default
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    // Convert experience to string and trim for proper empty check
    const experienceValue = experience.toString().trim();

    if (!role.trim() || !topicsToFocus.trim() || experienceValue === "") {
      setError("⚠️ Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: role.trim(),
          experience: Number(experience),
          topicsToFocus: topicsToFocus.trim(),
          numberOfQuestions: 10, // <-- matches backend exactly
        }
      );

      const generatedQuestions = aiResponse.data;

      // Create session with questions
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        role: role.trim(),
        experience: Number(experience),
        topicsToFocus: topicsToFocus.trim(),
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black p-6 rounded-lg border border-orange-500 shadow-lg text-white">
      <h3 className="text-xl font-semibold text-orange-400">
        Start a New Interview Journey
      </h3>
      <p className="text-sm text-gray-300 mt-1 mb-4">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="space-y-4">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Experience (in years)"
          placeholder="(e.g., 2)"
          type="number"
          min="0"
          step="any"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) =>
            handleChange("topicsToFocus", target.value)
          }
          label="Topics to Focus"
          placeholder="(e.g., React, Node.js, System Design)"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) =>
            handleChange("description", target.value)
          }
          label="Description"
          placeholder="(Any specific goals or notes for this session)"
          type="text"
        />

        {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md text-black font-semibold hover:from-orange-500 hover:to-orange-700 transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerLoader /> : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
