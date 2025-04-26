import React from 'react'
import SearchUserModal from './SearchUserModal'
import { MessageSquarePlus, EllipsisVertical } from 'lucide-react'


const Sidebar = () => {
    return (
        <div>
            <div className='border-x bg-base-200 hide-scrollbar border-slate-50/20 text-slate-50/80 overflow-y-auto h-screen'>
                <Header />
                <SearchUserModal />
                {/* chats */}
                <div className=''>
                    {
                        Array.from({ length: 12 }, (_, i) => (
                            <div key={i} className='cursor-pointer transition-all ease-in-out duration-300'>
                                <div className='h-16 hover:bg-base-100 text-lg flex items-center px-8 text-slate-50/80'>Number {i}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar


function Header() {
    return (
        <div className='flex flex-col gap-6 border-b border-slate-50/10 pt-2 pb-1 sticky top-0 bg-base-300'>
            <div className='flex items-center justify-between pl-4 pr-2 '>
                <h1 className='text-bold text-2xl text-white/90' >Chat</h1>
                <div className='flex items-center gap-4'>
                    <button className="btn mt-2" onClick={() => document.getElementById('my_modal_2').showModal()}><MessageSquarePlus size={28} strokeWidth={1.5} /></button>
                    <button><EllipsisVertical /></button>

                </div>
            </div>

            <div className='px-4 pb-2'>
                <input type="text" className='bg-green-100/30 w-full px-6 py-2 text-md rounded-2xl outline-none text-green-50/70 capitalize' />
            </div>

        </div>

    )
}

