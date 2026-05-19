import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import snapcartlogo from "../assets/snapcartlogo.png";

import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { ShopDataContext } from "../context/ShopContext";

import axios from "axios";

import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaHome,
  FaThLarge,
  FaPhone,
} from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate();

  const { serverUrl } = useContext(authDataContext);

  const { currentUser, getcurrentUser } =
    useContext(userDataContext);

  const { search, setSearch } =
    useContext(ShopDataContext);

  const [showProfile, setShowProfile] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  // 🔥 NAVBAR SCROLL EFFECT
  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  // 🔥 LOGOUT
  const handleLogout = async () => {

    try {

      await axios.get(
        `${serverUrl}/api/auth/logout`,
        {
          withCredentials: true,
        }
      );

      getcurrentUser();

      navigate("/login");

    } catch (error) {

      console.error("Logout error:", error);

    }
  };

  return (
    <>

      {/* 🔝 TOP NAVBAR */}
      <div
        className={`
          w-full
          fixed
          top-0
          left-0
          z-50
          transition-all
          duration-300
          ${
            scrolled
              ? "bg-[#0c2025]/90 backdrop-blur-md shadow-md"
              : "bg-transparent"
          }
        `}
      >

        {/* MAIN NAVBAR */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <img
              src={snapcartlogo}
              alt="logo"
              className="h-8 w-auto"
            />
          </div>

          {/* DESKTOP NAV LINKS */}
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

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 relative">

            {/* MOBILE SEARCH BUTTON */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden text-white text-lg"
            >
              <FaSearch />
            </button>

            {/* DESKTOP SEARCH */}
            <div className="hidden lg:flex items-center bg-white/10 px-3 py-2 rounded-lg">

              <FaSearch className="text-gray-400 mr-2" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="
                  bg-transparent
                  outline-none
                  text-white
                  placeholder-gray-400
                  text-sm
                  w-32
                "
              />

            </div>

            {/* USER */}
            {!currentUser ? (

              <FaUser
                onClick={() => navigate("/login")}
                className="
                  text-white
                  cursor-pointer
                  hover:text-gray-300
                  text-lg
                "
              />

            ) : (

              <div
                onClick={() =>
                  setShowProfile(!showProfile)
                }
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-gray-600
                  flex
                  items-center
                  justify-center
                  text-white
                  cursor-pointer
                "
              >
                {currentUser?.name?.[0]?.toUpperCase() || "U"}
              </div>

            )}

            {/* PROFILE DROPDOWN */}
            {showProfile && (

              <div
                className="
                  absolute
                  right-0
                  top-12
                  bg-white
                  text-gray-800
                  rounded-lg
                  shadow-lg
                  py-2
                  w-40
                  z-50
                "
              >

                <span
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/profile");
                  }}
                  className="
                    block
                    px-4
                    py-2
                    hover:bg-gray-100
                    cursor-pointer
                  "
                >
                  Profile
                </span>

                <span
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/orders");
                  }}
                  className="
                    block
                    px-4
                    py-2
                    hover:bg-gray-100
                    cursor-pointer
                  "
                >
                  Orders
                </span>

                {currentUser && (
                  <span
                    onClick={() => {
                      handleLogout();
                      setShowProfile(false);
                    }}
                    className="
                      block
                      px-4
                      py-2
                      hover:bg-gray-100
                      cursor-pointer
                    "
                  >
                    Logout
                  </span>
                )}

              </div>

            )}

            {/* CART */}
            <div
              onClick={() => navigate("/cart")}
              className="relative cursor-pointer"
            >

              <FaShoppingCart
                className="
                  text-white
                  hover:text-gray-300
                  text-lg
                "
              />

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-red-500
                  text-white
                  text-[10px]
                  px-1.5
                  rounded-full
                "
              >
                2
              </span>

            </div>

          </div>

        </div>

        {/* 🔥 MOBILE SEARCH DROPDOWN */}
        {showSearch && (

          <div className="md:hidden px-6 pb-4">

            <div
              className="
                flex
                items-center
                bg-white/10
                px-3
                py-3
                rounded-xl
                border
                border-white/10
              "
            >

              <FaSearch className="text-gray-400 mr-3" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-white
                  placeholder-gray-400
                  text-sm
                "
              />

            </div>

          </div>

        )}

      </div>

      {/* 🔻 MOBILE BOTTOM NAV */}
      <div
        className="
          fixed
          bottom-0
          left-0
          w-full
          z-[60]
          bg-[#0c2025]
          border-t
          border-white/10
          md:hidden
        "
      >

        <div className="flex justify-around items-center py-3 text-white text-xs">

          <div
            onClick={() => navigate("/")}
            className="flex flex-col items-center cursor-pointer"
          >
            <FaHome className="text-lg mb-1" />
            Home
          </div>

          <div
            onClick={() => navigate("/collections")}
            className="flex flex-col items-center cursor-pointer"
          >
            <FaThLarge className="text-lg mb-1" />
            Collections
          </div>

          <div
            onClick={() => navigate("/contact")}
            className="flex flex-col items-center cursor-pointer"
          >
            <FaPhone className="text-lg mb-1" />
            Contact
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="
              flex
              flex-col
              items-center
              relative
              cursor-pointer
            "
          >

            <FaShoppingCart className="text-lg mb-1" />

            <span
              className="
                absolute
                -top-1
                right-2
                bg-red-500
                text-white
                text-[10px]
                px-1.5
                rounded-full
              "
            >
              2
            </span>

            Cart

          </div>

        </div>

      </div>

    </>
  );
};

export default Navbar;