import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4">
      <label className="block mb-1 text-white font-medium">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-3 pr-10 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
        />
        {type === 'password' && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
