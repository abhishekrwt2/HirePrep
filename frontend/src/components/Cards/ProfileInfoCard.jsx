import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // safer than clear()
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex items-center">
      <img
        src={user?.profileImageUrl || "https://via.placeholder.com/44"}
        alt={`${user?.name || "User"}'s profile`}
        className="w-11 h-11 bg-gray-300 rounded-full mr-3"
      />
      <div>
        <div className="text-[15px] text-white font-bold leading-3">
          {user?.name || ""}
        </div>
        <button
          className="text-orange-500 text-sm font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;

