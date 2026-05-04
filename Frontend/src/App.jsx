import React from "react";
import Home from "./pages/Home.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Navbar from "./components/Nav.jsx";

const App = () => {
  const location = useLocation();

  // 🚫 pages where Navbar should NOT show
  const hideNavbarRoutes = ["/login", "/register"];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;