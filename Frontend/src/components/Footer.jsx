import React from "react";
import { useNavigate } from "react-router-dom";
import snapcartlogo from "../assets/snapcartlogo.png";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-[#08161a] border-t border-white/10 mt-20 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>

            <div
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer mb-5"
            >
              <img
                src={snapcartlogo}
                alt="SnapCart"
                className="h-9 w-auto"
              />
            </div>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Premium fashion essentials crafted for every
              generation. Elevate your style with SnapCart.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-6">

              <a
                href="#"
                className="
                  w-10 h-10
                  rounded-full
                  bg-white/5
                  border border-white/10

                  flex items-center justify-center

                  text-white/70
                  hover:text-white
                  hover:bg-white/10

                  transition
                "
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="
                  w-10 h-10
                  rounded-full
                  bg-white/5
                  border border-white/10

                  flex items-center justify-center

                  text-white/70
                  hover:text-white
                  hover:bg-white/10

                  transition
                "
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="
                  w-10 h-10
                  rounded-full
                  bg-white/5
                  border border-white/10

                  flex items-center justify-center

                  text-white/70
                  hover:text-white
                  hover:bg-white/10

                  transition
                "
              >
                <FaTwitter />
              </a>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/50">

              <span
                onClick={() => navigate("/")}
                className="hover:text-white cursor-pointer transition"
              >
                Home
              </span>

              <span
                onClick={() => navigate("/collections")}
                className="hover:text-white cursor-pointer transition"
              >
                Collections
              </span>

              <span
                onClick={() => navigate("/about")}
                className="hover:text-white cursor-pointer transition"
              >
                About
              </span>

              <span
                onClick={() => navigate("/contact")}
                className="hover:text-white cursor-pointer transition"
              >
                Contact
              </span>

            </div>
          </div>

          {/* SUPPORT */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/50">

              <span className="hover:text-white cursor-pointer transition">
                Shipping Policy
              </span>

              <span className="hover:text-white cursor-pointer transition">
                Returns & Refunds
              </span>

              <span className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </span>

              <span className="hover:text-white cursor-pointer transition">
                Terms & Conditions
              </span>

            </div>
          </div>

          {/* NEWSLETTER */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Stay Updated
            </h3>

            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Subscribe to get updates about new arrivals,
              offers, and exclusive collections.
            </p>

            {/* INPUT */}
            <div
              className="
                flex items-center
                bg-white/5
                border border-white/10
                rounded-xl
                overflow-hidden
                backdrop-blur-md
              "
            >

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  flex-1
                  bg-transparent
                  px-4 py-3
                  text-sm
                  text-white
                  placeholder:text-white/40
                  outline-none
                "
              />

              <button
                className="
                  px-4
                  h-full
                  bg-white
                  text-black

                  hover:bg-gray-200
                  transition

                  flex items-center justify-center
                "
              >
                <FaArrowRight />
              </button>

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-white/10 my-10"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">

          <p>
            © 2026 SnapCart. All rights reserved.
          </p>

          <p>
            Designed & Developed with ❤️ for modern fashion.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;