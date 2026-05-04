import React, { useContext, useState } from "react";
import snapcartlogo from "../assets/snapcartlogo.png";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firbase";
import { userDataContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getcurrentUser } = useContext(userDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("LOGIN SUCCESS:", result.data);

      if (response.status === 200) {
          getcurrentUser();
          navigate("/");
        }

    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data || error.message);
    }
  };

  const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const name = user.displayName;
        const email = user.email;

        const response = await axios.post(
          serverUrl + "/api/auth/google-login",
          { name, email },
          { withCredentials: true }
        );

        console.log("GOOGLE SIGN-IN SUCCESS:", response.data);

        if (response.status === 200) {
          getcurrentUser();
          navigate("/");
        }

      } catch (error) {
        console.error("GOOGLE SIGN-IN ERROR:", error);
      }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141414] to-[#0c2025] flex flex-col items-center justify-center px-4">

      {/* Navbar */}
      <div className="w-full fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          
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

        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md mt-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-white/10 transition duration-300">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition active:scale-95"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="google"
            className="h-5 w-5"
          />
          Continue with Google
        </button>

        {/* OR Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition"
          />

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pr-12 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition"
            />

            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition duration-200"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.042-3.362M6.223 6.223A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.137M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3-3v3m0 0l3 3m-3-3l-3 3" />
                </svg>
              )}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition active:scale-95"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-white ml-1 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;