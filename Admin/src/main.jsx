import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/Authcontext.jsx'
import Admincontext from './context/Admincontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <Admincontext>
      <App />
      </Admincontext>
    </AuthContext>
  </BrowserRouter>
)
