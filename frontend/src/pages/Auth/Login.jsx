import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser}=useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/choice"); // Navigate after successful login
      } else {
        setError("Login failed. No token returned.");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black text-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-2 text-orange-500">Welcome Back!</h3>
      <p className="mb-6 text-gray-300">Please enter your details to login</p>
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="Enter your email"
          type="text"
        />

        {/* Password Input */}
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          LOGIN
        </button>

        <p className="text-gray-300 text-sm text-center mt-2">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-orange-500 hover:text-orange-600 font-semibold ml-1"
            onClick={() => setCurrentPage("signup")}
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;

