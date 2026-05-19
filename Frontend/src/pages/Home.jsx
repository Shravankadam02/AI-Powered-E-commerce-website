import React from 'react'
import Navbar from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Products from './Products.jsx'
import Bestseller from '../components/BestSeller.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141414] to-[#0c2025]">
      <Hero />
      <Bestseller />
      <Footer />
    </div>
  )
}

export default Home
