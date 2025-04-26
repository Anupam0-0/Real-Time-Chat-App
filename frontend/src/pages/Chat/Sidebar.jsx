import { useState, useEffect } from 'react'
import Avatar from '/public/avatar.png'
import SearchUserModal from './SearchUserModal'
import { MessageSquarePlus, EllipsisVertical } from 'lucide-react'
import { FriendList } from '../../lib/axios'
import { set } from 'lodash'


const Sidebar = ({ screen, setScreen }) => {
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await FriendList();
                // console.log(response);
                setFriends(response);
            } catch (error) {
                console.error('Error fetching friends:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchFriends()
    }, [])

    const handleScreen = (item) => {
        setScreen(item);
    }

    return (
        <div>
            <div className='border-x bg-base-200 hide-scrollbar border-slate-50/20 text-slate-50/80 overflow-y-auto h-screen'>
                <Header />
                <SearchUserModal />
                {/* chats */}
                <div className='mt-4 flex flex-col gap-1'>
                    {
                        friends.map((item, i) => (
                            <button onClick={()=>handleScreen(item)} key={i} className='cursor-pointer transition-all ease-in-out duration-300'>
                                <div className='h-20 hover:bg-base-100 text-xl flex gap-4 items-center px-8 text-slate-50/80'>
                                    <img src={item.profilePic || Avatar} className='size-12' />
                                    <div className='flex flex-col items-start gap-1'>
                                        <p className='uppercase' >{item.username}</p>
                                        <p className='text-sm text-slate-50/50 capitalize'>{item.fullName}</p>

                                    </div>


                                </div>
                            </button>
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
        <div className='flex flex-col gap-6  py-2 sticky top-0 bg-base-200'>
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

