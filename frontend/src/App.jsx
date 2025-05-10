import { Routes, Route } from "react-router";
import { useState } from "react";
import Home from './pages/Homepage/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import AuthPage from './pages/Auth/AuthPage';
import Chat from './pages/Chat/ChatLayout';
import ChatScreen from './pages/Chat/ChatScreen';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuthStore';
import Default from "./pages/Default/Default";

const App = () => {

  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<AuthPage/>} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/chat" element={<Chat />}>
          <Route path=":id" element={<ChatScreen />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<Default />} />
        {/* <Route path="/contact" element={<About />} /> */}
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App