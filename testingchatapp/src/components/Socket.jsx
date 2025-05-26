import React, { useState } from "react";
import {jwtDecode} from "jwt-decode";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import api from "../utils/axios";
import useAuthStore, { useRoomStore } from "../store/useAuthStore";



export default function Socket() {
  const [socketId, setSocketId] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.user);
  const roomId = useRoomStore((state) => state.room);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("TEMPTOKEN");
    // console.log("Stored token:", storedToken);
    if (typeof storedToken === "string" && storedToken.trim() !== "") {
      try {
        const decodedToken = jwtDecode(storedToken);
        useAuthStore.getState().setUser(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
  }, []);

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

  // FEtCH MESSAGES
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/messages/${roomId}`);
        // console.log("Fetched messages:", res.data);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [roomId]);

  // SCROLL TO BOTTOM
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // JOIN ROOM N ReCEIVE MESSAGE
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

    socket.on("error", (err) => {
      console.error("Socket error:", err);
      setError(err.message);
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

  // JOIN DM
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

  return (
    <>
      <div className="pt-4 text-white/80">
        <h1>This is Socket Section</h1>
        <div className="flex justify-between gap-2">
          <p>Socket Id: {socketId || "Not connected"}</p>

          <button
            className="bg-blue-500 rounded px-4 py-0.5 cursor-pointer"
            onClick={handleCheckSocket}
          >
            Check for socket
          </button>
        </div>

        <div className="border rounded-2xl my-5 p-5 flex flex-col gap-2">
          <h3 className="font text-4xl">Chat</h3>
          <h3>
            Room ID: <span className="text-green-500">{roomId || "None"}</span>
          </h3>
          <h3>{error && <p className="text-red-500">Error: {error}</p>}</h3>
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
              className="bg-blue-500 px-5 rounded"
            >
              Open chat
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
        <div className="border rounded-2xl px-4 py-2 flex flex-col gap-1">
          <h3 className="border-b py-3">Messages:</h3>
          {messages.length === 0 && (
            <p className="text-neutral-500 text-3xl p-4">No messages yet</p>
          )}
          <div className="overflow-y-auto max-h-[42vh]">
            {messages.map((msg) => (
              console.log("Message:", msg),
              <div
                key={msg._id}
                className={`p-2 px-4 m-1 w-fit rounded-xl ${
                  msg.senderId._id === userId
                    ? "ml-auto bg-neutral-800"
                    : "mr-auto bg-neutral-700 "
                } `}
              >
                {msg.content} <span></span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  );
}