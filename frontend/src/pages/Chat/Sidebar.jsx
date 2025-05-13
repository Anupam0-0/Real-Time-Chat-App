import { useEffect } from 'react';
import Avatar from '/public/avatar.png';
import SearchUserModal from './SearchUserModal';
import { MessageSquarePlus, EllipsisVertical } from 'lucide-react';
import { FriendList } from '../../lib/axios';
import { useNavigate } from 'react-router';
import useChatStore from '../../store/useChatStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const { setScreen, setRooms, rooms } = useChatStore();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await FriendList();
        setRooms(response); // Store friends in rooms list
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleScreen = (item) => {
    setScreen(item);
    navigate(`/chat/${item._id}`);
  };

  return (
    <div className='border-x bg-base-200 overflow-y-auto h-screen text-white'>
      <Header />
      <SearchUserModal />
      <div className='mt-4 flex flex-col gap-1'>
        {rooms.map((item, i) => (
          <button key={i} onClick={() => handleScreen(item)}>
            <div className='hover:bg-base-100 flex gap-4 py-5 items-center px-6'>
              <img src={item.profilePic || Avatar} className='size-12' />
              <div className='flex flex-col items-start'>
                <p className='font-bold truncate'>{item.username}</p>
                <p className='text-xs text-slate-400 truncate'>{item.fullName}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

function Header() {
  return (
    <div className='flex flex-col gap-6 py-4 sticky top-0 bg-base-200'>
      <div className='flex justify-between px-4'>
        <h1 className='text-2xl font-bold'>Chat</h1>
        <div className='flex gap-4'>
          <button onClick={() => document.getElementById('my_modal_2').showModal()}>
            <MessageSquarePlus size={28} />
          </button>
          <button><EllipsisVertical /></button>
        </div>
      </div>
      <div className='px-4 pb-2'>
        <input type="text" placeholder="Search..." className='bg-neutral-800 w-full px-4 py-2 rounded-xl text-white' />
      </div>
    </div>
  );
}
