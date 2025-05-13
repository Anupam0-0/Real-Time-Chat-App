import { useEffect, useRef, useState, useMemo } from 'react';
import Avatar from '/public/avatar.png';
import { Send, Link } from 'lucide-react';
import { useParams } from 'react-router';
import useChatStore from '../../store/useChatStore';
import useAuthStore from '../../store/useAuthStore';
import {
  sendMessage,
  connectSocket,
  disconnectSocket,
  getSocket,
  joinRoom,
} from '../../lib/socket';
import axios from 'axios';

const Main = () => {
  const { id } = useParams();
  const { user, token } = useAuthStore();
  const {
    setCurrentRoom,
    setMessages,
    currentRoom,
    messages,
    addMessage,
    screen,
  } = useChatStore();

  useEffect(() => {
    if (!screen || !token) return;

    const fetchRoomMessages = async () => {
      const res = await axios.get(`/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentRoom(screen);
      setMessages(res.data.messages);
    };

    fetchRoomMessages();
  }, [screen]);

  return <>{!screen ? <></> : <Chat screen={screen} user={user} />}</>;
};

function Chat({ screen, user }) {
  const [message, setMessage] = useState('');
  const messageEndRef = useRef(null);
  const { messages, addMessage, currentRoom } = useChatStore();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!user) return;

    connectSocket(user);
    const socket = getSocket();

    if (socket) {
      socket.on('receiveMessage', (res) => {
        if (res.roomId === currentRoom?._id && res.success) {
          addMessage(res.data);
        }
      });

      joinRoom({ friendId: screen._id, myId: user });

      return () => {
        socket.off('receiveMessage');
        disconnectSocket();
      };
    }
  }, [user, screen]);

  const handleSend = () => {
    if (!message.trim()) return;
    const msgObj = {
      myId: user,
      friendId: screen._id,
      content: message,
      timestamp: new Date().toISOString(),
    };
    sendMessage(msgObj);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-base-100 px-4 py-4">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={screen.profilePic || Avatar} />
          </div>
        </div>
        <span className="ml-4 text-xl font-semibold">{screen.username}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.senderId === user ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.senderId === user ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="p-4 flex gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="w-full py-3 px-4 rounded-2xl bg-neutral-700 text-white"
          placeholder="Type a message"
        />
        <button onClick={handleSend} className="p-4 bg-blue-600 rounded-full text-white">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default Main;
