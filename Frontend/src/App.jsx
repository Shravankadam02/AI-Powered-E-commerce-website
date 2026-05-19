import React, { useContext } from "react";
import Home from "./pages/Home.jsx";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Navbar from "./components/Nav.jsx";
import Products from "./pages/Products.jsx";
import Collectios from "./pages/Collectios.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import { userDataContext } from "./context/UserContext.jsx";

const App = () => {
  const location = useLocation();
  let {currentUser} = useContext(userDataContext);

  return (
    <>
      {currentUser && <Navbar />}

      <Routes>
        <Route path="/register" 
        element={
         currentUser? (<Navigate to={location.state?.from || "/"} />) 
         : (<Register />)} />
        <Route path="/login" 
        element={
         currentUser? (<Navigate to={location.state?.from || "/"} />) 
         : (<Login />)} />
        <Route path="/" element={
          currentUser? (<Home />) : (<Navigate to="/login" state={{from : location.pathname}} />) } />
        <Route path="/products" element={
          currentUser? (<Products />) : (<Navigate to="/login" state={{from : location.pathname}} />) } />
        <Route path="/collections" element={
          currentUser? (<Collectios />) : (<Navigate to="/login" state={{from : location.pathname}} />) } />
        <Route path="/about" element={
          currentUser? (<About />) : (<Navigate to="/login" state={{from : location.pathname}} />) } />
        <Route path="/contact" element={
          currentUser? (<Contact />) : (<Navigate to="/login" state={{from : location.pathname}} />) } />
        <Route path="/products/:id" element={
          currentUser? (<ProductDetail />) : (<Navigate to="/login" state={{from : location.pathname}} />) } />
      </Routes>
    </>
  );
};

export default App;