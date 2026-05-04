import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import snapcartlogo from "../assets/snapcartlogo.png";
import { authDataContext } from "../context/AuthContext";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { FaHome, FaThLarge, FaPhone } from "react-icons/fa";
import { userDataContext } from "../context/UserContext";
import { useContext } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { currentUser, getcurrentUser } = useContext(userDataContext);
  let [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      getcurrentUser(); // refresh user
      navigate("/login"); // redirect
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LEFT: Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <img
            src={snapcartlogo}
            alt="logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* CENTER: Links */}
        <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-gray-300 transition"
          >
            Home
          </span>
          <span
            onClick={() => navigate("/collections")}
            className="cursor-pointer hover:text-gray-300 transition"
          >
            Collections
          </span>
          <span
            onClick={() => navigate("/about")}
            className="cursor-pointer hover:text-gray-300 transition"
          >
            About
          </span>
          <span
            onClick={() => navigate("/contact")}
            className="cursor-pointer hover:text-gray-300 transition"
          >
            Contact
          </span>
        </div>

        {/* RIGHT: Search + Icons */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="hidden md:flex items-center bg-white/10 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-white/30">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-white placeholder-gray-400 text-sm w-32"
            />
          </div>

          {/* Profile */}
          {!currentUser && (
            <FaUser
              onClick={() => navigate("/login")}
              className="text-white cursor-pointer hover:text-gray-300 transition text-lg"
            />
          )}
          {currentUser && (
            <div
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              {currentUser?.name.slice(0, 1).toUpperCase() || "U"}
            </div>
          )}

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-4 top-14  bg-white text-gray-800 rounded-lg shadow-lg py-2 w-40 ">
              {!currentUser && (
                <span
                  onClick={() => {
                    navigate("/login");
                    setShowProfile(false);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  login
                </span>
              )}
              {currentUser && (
                <span
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/profile");
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </span>
              )}
              <span
                onClick={() => {
                  setShowProfile(false);
                  navigate("/orders");
                }}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Orders
              </span>
              {currentUser && (
                <span
                  onClick={() => {
                    handleLogout();
                    setShowProfile(false);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </span>
              )}
            </div>
          )}

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <FaShoppingCart className="text-white hover:text-gray-300 transition text-lg" />

            {/* Badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
              2
            </span>
          </div>
        </div>
      </div>
      {/* 🔻 MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-[#0c2025] border-t border-white/10 md:hidden">
        <div className="flex justify-around items-center py-3 text-white text-xs">
          {/* Home */}
          <div
            onClick={() => navigate("/")}
            className="flex flex-col items-center cursor-pointer hover:text-gray-300 transition"
          >
            <FaHome className="text-lg mb-1" />
            Home
          </div>

          {/* Collections */}
          <div
            onClick={() => navigate("/collections")}
            className="flex flex-col items-center cursor-pointer hover:text-gray-300 transition"
          >
            <FaThLarge className="text-lg mb-1" />
            Collections
          </div>

          {/* Contact */}
          <div
            onClick={() => navigate("/contact")}
            className="flex flex-col items-center cursor-pointer hover:text-gray-300 transition"
          >
            <FaPhone className="text-lg mb-1" />
            Contact
          </div>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="flex flex-col items-center cursor-pointer hover:text-gray-300 transition relative"
          >
            <FaShoppingCart className="text-lg mb-1" />
            {/* Badge */}
            <span className="absolute -top-1 right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
              2
            </span>
            Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
