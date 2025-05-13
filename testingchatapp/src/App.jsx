import React, { useEffect, useRef, useState } from "react";
import api from "./axios";
import useAuthStore, { useRoomStore } from "./useAuthStore";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";

const App = () => {
  return (
    <div className="min-h-screen  bg-neutral-900 text-neutral-200 font-mono  text-2xl flex flex-col gap-4">
      <div className="max-w-4xl p-10 border rounded mx-auto my-10">
        {" "}
        <h1>Testing chat app</h1>
        <Login />
        <Socket />
      </div>
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

  const token = useAuthStore.getState().token;

  if (typeof token === "string" && token.trim() !== "") {
    try {
      const decode = jwtDecode(token);
      useAuthStore.getState().setUser(decode.userId);
    } catch (error) {
      console.error("Error decoding token:", error.message);
    }
  } else {
    console.warn("Invalid or missing token.");
  }

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
        <div className="text-green-400 py-8">
          Token info: {JSON.stringify(jwtDecode(token), null, 2)}
        </div>
      )}
    </div>
  );
}

function Socket() {
  const [socketId, setSocketId] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.user);
  const roomId = useRoomStore((state) => state.room);
  const messagesEndRef = useRef(null);

  const socket = React.useMemo(() => {
    if (!token) return null;

    const newSocket = io("http://localhost:3000", {
      auth: { token },
    });

    newSocket.on("connect", () => console.log("Connected to socket server"));
    newSocket.on("connected", (msg) => setSocketId(msg.socketId));
    newSocket.on("disconnect", () =>
      console.log("Disconnected from socket server")
    );

    return newSocket;
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.off("joined_room");
    socket.off("receive_message");

    socket.on("joined_room", (roomId) => {
      console.log("🔵 joined_room", roomId);
      useRoomStore.getState().setRoom(roomId);
    });

    socket.on("receive_message", (msg) => {
      console.log("🟢 Received message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
      socket.off("receive_message");
      socket.off("joined_room");
    };
  }, [socket]);

  // CHECK SOCKET
  const handleCheckSocket = () => {
    if (socket) {
      socket.emit("check", userId);
    }
  };

  // JOIN ROOM
  const handleJoinRoom = () => {
    if (!receiver) return;
    socket.emit("join_room", { receiver });
  };

  // SEND MESSAGE
  const handleSendMessage = () => {
    if (!roomId) return console.warn("No room joined");
    if (!content.trim()) return;

    socket.emit("send_message", { roomId, content });
    console.log("Sent message:", content, roomId);
    setContent("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="py-4 text-white/80">
        <h1>This is Socket Section</h1>
        <div className="flex gap-6 items-center"></div>
        <p>Socket Id: {socketId || "Not connected"}</p>
        <button
          className="bg-blue-500 rounded px-4 py-0.5 cursor-pointer"
          onClick={handleCheckSocket}
        >
          Check for socket
        </button>

        <div className="border rounded-2xl my-5 p-5 flex flex-col gap-2">
          <h3 className="font text-4xl">Chat</h3>
          <h3>
            Room ID: <span className="text-green-500">{roomId || "None"}</span>
          </h3>
          <div>
            <input
              type="text"
              placeholder="Enter receiver..."
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="outline-none text-white/70"
            />
            <button
              onClick={handleJoinRoom}
              className="bg-blue-500 px-3 rounded"
            >
              Join Room
            </button>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="outline-none text-white/70"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 px-3 rounded"
            >
              Send Message
            </button>
          </div>
        </div>

        {/* MESSAGES SECTION */}
        <div className="border rounded-2xl p-4 flex flex-col gap-1">
          <h3>Messages:</h3>
          {messages.length === 0 && (
            <p className="text-neutral-500">No messages yet</p>
          )}
          <div>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-2 m-1 w-fit rounded-xl ${
                  msg.senderId === userId
                    ? "ml-auto bg-neutral-800"
                    : " mr-auto bg-neutral-700 "
                } `}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  );
}
