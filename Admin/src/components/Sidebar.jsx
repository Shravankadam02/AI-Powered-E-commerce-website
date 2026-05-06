import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaList,
  FaBoxOpen,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../context/Authcontext.jsx";
import { adminDataContext } from "../context/Admincontext.jsx";

const Sidebar = () => {
  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);
  const { setAdminData } = useContext(adminDataContext);

  const menuItems = [
    { name: "Add Items", icon: <FaPlus />, path: "/add" },
    { name: "List Items", icon: <FaList />, path: "/list" },
    { name: "Orders", icon: <FaBoxOpen />, path: "/orders" },
    { name: "Analytics", icon: <FaChartBar />, path: "/analytics" },
  ];

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      setAdminData(null); // clear frontend state
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-64 bg-[#0c2025] text-white fixed left-0 top-16 flex flex-col justify-between border-r border-white/10">
      {/* MENU */}
      <div className="flex flex-col gap-2 px-4 mt-6">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="px-4 pb-6">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-red-500/20 text-red-400 hover:text-red-300 transition"
        >
          <FaSignOutAlt />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
