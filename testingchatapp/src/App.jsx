import React, { useEffect, useState } from "react";
import api from "./axios";
import useAuthStore from "./useAuthStore";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 font-mono p-10 text-2xl flex flex-col gap-4">
      <h1>Testing chat app</h1>
      <Login />
      <Socket />
    </div>
  );
};

export default App;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });
      console.log(res.data);
      useAuthStore.getState().setToken(res.data.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError("Error: " + errorMessage);
    }
  };

  const decode = jwtDecode(useAuthStore.getState().token);
  const TokenInfo = decode ? JSON.stringify(decode, null, 2) : "No token found";
  useAuthStore.getState().setUser(decode.userId);

  return (
    <div className="flex flex-col gap-4 border-b border-neutral-500">
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="p-2 bg-neutral-800 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 bg-neutral-800 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 p-2 rounded active:scale-95 cursor-pointer"
      >
        Login
      </button>
      {error && <div className="text-red-400 py-8">{error}</div>}
      {useAuthStore.getState().token && (
        <div className="text-green-400 py-8">Token info: {TokenInfo}</div>
      )}
    </div>
  );
}

function Socket() {
  const [socketId, setSocketId] = useState(null);
  const token = useAuthStore.getState().token;
  const userId = useAuthStore.getState().user;
  console.log("userId", userId);

  const socket = React.useMemo(() => {
    const newSocket = io("http://localhost:3000", {
      auth: {
        token: token,
      },
    });

    newSocket.on("connect", () => console.log("Connected to socket server"));
    newSocket.on("connected", (msg) => {
      setSocketId(msg.socketId);
    });
    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
    return newSocket;
  }, [token]);

  const handleCheckSocket = () => {
    socket.emit("check", userId);
  };

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="py-4 text-white/80">
      <h1>This is Socket Section</h1>
      <div className="flex gap-6 items-center">
        <p className="">Socket Id: {socketId}</p>
        <button
          className="bg-blue-500 rounded px-4 py-0.5 cursor-pointer"
          onClick={handleCheckSocket}
        >
          Check for socket
        </button>
      </div>

      <div className="border rounded-2xl my-5 p-5 flex flex-col gap-2">
        <h3 className="font text-4xl">Chat </h3>
        <h3>Room ID: <span className="text-green-500">{} </span></h3>
        <div>
          <input
            type="text"
            placeholder="Enter receiver... "
            className="outline-none text-white/70"
          />
          <button className="bg-blue-500 px-3 rounded">Send Message</button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter message..."
            className="outline-none text-white/70"
          />
          <button className="bg-blue-500 px-3 rounded">Send Message</button>
        </div>
      </div>
    </div>
  );
}
