import { useEffect, useRef, useState, useMemo } from "react";
import Avatar from "/public/avatar.png";
import { Send, Link } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import {
  sendMessage,
  checkConnection,
  connectSocket,
  disconnectSocket,
  joinRoom,
  getSocket,
} from "../../lib/socket";
import { useParams } from "react-router";
import useChatStore from "../../store/useChatStore";

const Main = () => {
  const { id } = useParams();
  const { screen } = useChatStore(); // Get the screen from the store
  const user = useAuthStore.getState().user;
  console.log("Params", id);
  console.log("Screen", screen);
  return <>{!screen ? <></> : <Chat screen={screen} user={user} />}</>;
};

function Chat({ screen, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  // Memoize the input value to prevent unnecessary re-renders
  const memoizedMessage = useMemo(() => message, [message]);

  // Auto scroll to the latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!user) return;

    // Connect the socket when the component mounts
    connectSocket(user);
    const socket = getSocket();

    if (socket) {
      const handleReceiveMessage = (response) => {
        if (response && response.success) {
          setMessages((prev) => [...prev, response.data]);
          console.log("Received message:", response.data);
        } else {
          console.error("Error receiving message:", response.error);
        }
      };

      socket.on("receiveMessage", handleReceiveMessage);

      // Join the chat room with the receiver (screen) and the current user
      joinRoom({ friendId: screen._id, myId: user });

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
        disconnectSocket();
      };
    }
  }, [user, screen]);

  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);

  const handleSend = async () => {
    setLoading(true);
    if (!memoizedMessage.trim()) return;

    try {
      const msgObj = {
        myId: user,
        friendId: screen._id,
        content: memoizedMessage,
        timestamp: new Date().toISOString(),
      };
      sendMessage(msgObj); // Send the message through the socket
      setMessage(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = () => {
    checkConnection(); // Check the socket connection if needed
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="navbar bg-base-100 px-4 py-4 ">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={screen.profilePic || Avatar} alt="Receiver Avatar" />
          </div>
        </div>
        <a className="btn btn-ghost text-xl uppercase tracking-wide">
          {screen.username}
        </a>
      </div>

      <div className="h-fit bg-base-100 overflow-y-auto">
        <button
          onClick={() => handleCheck()}
          className="px-2 bg-fuchsia-500 cursor-pointer"
        >
          CheckSocket
        </button>

        {/* Message List */}
        <div className="flex-1  overflow-y-auto p-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.senderId === user ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.senderId === user
                    ? "bg-blue-500 text-white"
                    : "bg-slate-600/90 text-white"
                }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-slate-50/40">
                {new Date(msg.timestamp).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>

      <div className="p-4 flex gap-4 ">
        
        <input
          type="text"
          className="w-full py-3 px-4 text-lg rounded-2xl bg-neutral-700 text-white outline-none"
          value={memoizedMessage}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hey! How was your day?"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend(); // Send on Enter key press
          }}
        />
        <button className="px-4 border border-neutral-800 aspect-square rounded-lg cursor-pointer">
          <Link size={20} />
        </button>
        <button className="px-3 border border-slate-800 rounded-lg cursor-pointer text-lg font-medium tracking-wider">
          GIF
        </button>
        <button
          onClick={() => handleSend()}
          className="p-4 aspect-square border border-slate-800 rounded-lg cursor-pointer"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default Main;
