import React from 'react';
import Signup from './app-components/Signup.jsx';
import Login from './app-components/Login.jsx';
import { Toaster } from 'sonner';
import { Routes, Route } from 'react-router-dom'
import Home from './app-components/Home.jsx'
import Chatbot from './app-components/Chatbot'
// import Dashboard from './app-components/Dashboard'
import './App.css'

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </>
  )
}

export default App
