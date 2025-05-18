import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-64">
      <div className="flex items-center border-b pb-4">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-4">
          <span className="text-xl font-bold">
            {user.firstName[0].toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>
      
      <button
        onClick={handleSignOut}
        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserCard; 