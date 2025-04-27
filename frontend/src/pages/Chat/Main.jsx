import { useEffect, useRef, useState } from 'react';
import Avatar from '/public/avatar.png'
import { Send, Link } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore';
import { socket, sendMessage, checkConnection } from '../../lib/socket';


const Main = ({ screen }) => {
    const user = useAuthStore.getState().user;
    return (
        <>
            {!screen ? (<></>) : (<Chat screen={screen} user={user} />)}
        </>
    );
}

function Chat({ screen, user }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const messageEndRef = useRef(null);

    // auto scroll down when new message comes
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 🧠 REAL-TIME LISTENER
    useEffect(() => {
        const handleReceiveMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        };
        socket.on('receiveMessage', handleReceiveMessage);
        return () => {
            socket.off('receiveMessage', handleReceiveMessage); // cleanup
        };
    }, []);

    const handleSend = async () => {
        setLoading(true)
        if (message.trim() === '') return;
        try {
            const response = await sendMessage(screen._id, user, message)
            setMessages([...messages, response])
            setMessage('')
        } catch (error) {
            console.error('Error sending message:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCheck = () => {
        alert('Checking connection...')
        checkConnection();
    }

    return (
        <div className='flex flex-col justify-between h-screen'>
            <div className="navbar bg-base-100 shadow-sm px-8 py-4">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={screen.profilePic || Avatar} />
                    </div>
                </div>
                <a className="btn btn-ghost text-xl uppercase tracking-wide">{screen.username}</a>
            </div>

            <div className='h-fit bg-base-100 overflow-y-auto'>
                <button  onClick={(()=>handleCheck())} className='px-2 bg-fuchsia-500'>CheckSocket</button>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.senderId === yourId ? 'justify-end' : 'justify-start'}`}>
                            <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.senderId === yourId ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
            </div>


            <div className='p-4 pr-6 flex gap-6'>
                <button className='p-3 border-2 border-stone-700/40 rounded-lg cursor-pointer'><Link size={30} /></button>
                <input type="text" className='w-full py-3 px-6 text-xl rounded-l-4xl rounded-r-2xl bg-white/20 text-white/90 outline-none'
                    value={message} onChange={(e) => (setMessage(e.target.value))} placeholder='Hey! How was your day?'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }} />
                <button className='px-3 border-2 border-slate-800/80 rounded-lg cursor-pointer text-xl font-medium tracking-wider'>GIF</button>
                <button className='p-3 px-5 border-2 border-slate-800/80 rounded-lg cursor-pointer' ><Send size={30} /></button>
            </div>
        </div>
    )
}





export default Main