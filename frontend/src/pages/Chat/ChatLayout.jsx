import { useEffect, useState } from "react";
import useThemeStore from "../../store/useThemeStore";
import ChatNavbar from "./ChatNavbar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/useAuthStore";
import useSocketStore from "../../store/useSocketStore";

//just a head up : screen is the friend object
//     it contains the fullName, profilePic, username, and _id of the friend

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { user } = useAuthStore.getState();
  const { connectSocket } = useSocketStore.getState();
  connectSocket(token);

  console.log("user", user);
  // console.log to see socket connection with the server
  


  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div data-theme={theme} className="h-screen overflow-hidden bg-base-300">
      <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-16 lg:grid-cols-40">
        {/* Chat Navbar */}
        <div className="hidden sm:block col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2">
          <ChatNavbar />
        </div>

        {/* Sidebar */}
        <div className="col-span-2 sm:col-span-3 md:col-span-5 lg:col-span-10">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="col-span-5 sm:col-span-5 md:col-span-10 lg:col-span-28 overflow-y-auto h-screen bg-base-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
