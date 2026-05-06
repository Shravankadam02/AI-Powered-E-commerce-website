import React from 'react'
import AdminNavbar from '../components/Nav'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141414] to-[#0c2025]">
      <AdminNavbar />
      <Sidebar />
    </div>
  )
}

export default Home
