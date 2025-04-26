import { Settings, MessageSquareMore, Users, QrCode, LogOut } from 'lucide-react'
import React from 'react'
import useAuthStore from '../../store/useAuthStore'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import Avatar from '/public/avatar.png'




const ChatNavbar = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    const getUser = () => {
        toast('Changing profile picture is under development...', {icon: '😐'})
    }

    const handleLogout = async () => {
        try {
            const logout = useAuthStore.getState().logout;
            await logout();
            toast.success('Logged out successfully!');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout. Please try again.');
        }
    }

    return (
        <div className='bg-base-200 p-6 h-screen'>
            <div className='h-full flex flex-col items-center justify-between'>
                <div className='flex flex-col gap-4'>
                    <button onClick={getUser} className="avatar p-2 cursor-pointer">
                        <div className="w-10 rounded-full">
                            <img src={'' || Avatar} />
                        </div>
                    </button>

                    <div className='hover:bg-base-100 rounded-full p-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-300'>
                        <MessageSquareMore size={30} strokeWidth={1.9} />
                    </div>


                    <div className='hover:bg-base-100 rounded-full p-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-300'>
                        <Users size={30} strokeWidth={1.9} />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <button onClick={handleLogout} className='hover:bg-base-100 rounded-full p-2 ml-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-300'>
                        <LogOut size={28} color='crimson' strokeWidth={1.9} />
                    </button>
                    <button className='hover:bg-base-100 rounded-full p-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-300'>
                        <QrCode size={30} />
                    </button>
                    <button className='hover:bg-base-100 rounded-full p-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-300'>
                        <Settings size={32} strokeWidth={1.9} />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ChatNavbar