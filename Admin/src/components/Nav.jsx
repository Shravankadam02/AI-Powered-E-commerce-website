import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import snapcartlogo from "../assets/snapcartlogo.png";
import { adminDataContext } from "../context/Admincontext";
import { authDataContext } from "../context/Authcontext";
import axios from "axios";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { adminData ,getAdmin } = useContext(adminDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [scrolled, setScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      
      adminData(null);
      getAdmin();
      console.log("Logout successful, admin data cleared.");
      navigate("/login");
      
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c2025]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center cursor-pointer"
        >
          <img src={snapcartlogo} alt="logo" className="h-8" />
          <span className="ml-2 text-white text-sm opacity-60">
            Admin
          </span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
          <span onClick={() => navigate("/admin/dashboard")} className="cursor-pointer hover:text-gray-300">
            Dashboard
          </span>
          <span onClick={() => navigate("/admin/products")} className="cursor-pointer hover:text-gray-300">
            Products
          </span>
          <span onClick={() => navigate("/admin/orders")} className="cursor-pointer hover:text-gray-300">
            Orders
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* Admin Profile */}
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white cursor-pointer"
          >
            {adminData?.email?.[0]?.toUpperCase() || "A"}
          </div>

          {/* Dropdown */}
          {showProfile && (
            <div className="absolute right-6 top-16 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-40">
              <span
                onClick={() => navigate("/admin/profile")}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </span>

              <span
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;