import { Settings, MessageSquareMore, Users, QrCode, LogOut } from 'lucide-react'
import React from 'react'

const ChatNavbar = () => {
    return (
        <div className='bg-base-200 p-6 h-screen'>
            <div className='h-full flex flex-col items-center justify-between'>
                <div className='flex flex-col gap-4'>
                    <div className="avatar p-2">
                        <div className="w-8 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>

                    <div className='hover:bg-base-100 rounded-full p-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-300'>
                        <MessageSquareMore size={30} strokeWidth={1.9} />
                    </div>


                    <div className='hover:bg-base-100 rounded-full p-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-300'>
                        <Users size={30} strokeWidth={1.9} />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <button className='hover:bg-base-100 rounded-full p-2 ml-2 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-300'>
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