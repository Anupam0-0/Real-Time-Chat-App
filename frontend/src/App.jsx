import { Routes, Route } from "react-router";
import { useState } from "react";
import Home from './pages/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import AuthPage from './pages/Auth/AuthPage';
import Chat from './pages/Chat/Home';
import { Toaster } from 'react-hot-toast';

const App = () => {

  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<AuthPage/>} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/contact" element={<About />} /> */}
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App