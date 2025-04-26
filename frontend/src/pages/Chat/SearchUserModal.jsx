import { useState, useEffect } from 'react'
import { searchUsers, AddFriend } from '../../lib/axios'
import { debounce } from 'lodash'
import toast from 'react-hot-toast';
import useAuthStore from '../../store/useAuthStore';



function SearchUserModal() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const userId = useAuthStore.getState().user; // Get the user ID from the store

    const handleAddFriend = async (friendId) => {
        try {
            const res = await AddFriend(friendId);
            if (res === 'added') {
                toast.success('Friend request sent!');
            } else {
                toast.error('Failed to send friend request. Please try again.');
            }
        } catch (error) {
            toast.error('Failed to send friend request.');
            console.error("Error in handleAddFriend: ", error);
        }
    }

    const handleSearch = debounce(async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const res = await searchUsers(query);
            setSearchResults(res);
            // console.log(res);
        } catch (error) {
            console.error("Error searching for users:", error);
            setSearchResults([]);
        }
    }, 300)

    useEffect(() => {
        handleSearch(search);
        return () => handleSearch.cancel();
    }, [search]);

    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box min-h-96">
                <form method="dialog" className='modal-backdrop'>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
                </form>
                <h3 className="font-bold text-lg">Find your friend!</h3>
                <div className='flex gap-4 items-center justify-between'>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='w-full my-4 px-6 py-2 rounded-4xl text-slate-50/90 tracking-wide bg-green-800/20 outline-none ' placeholder='Search...' />
                    <button onClick={() => handleSearch(search)} className='cursor-pointer py-2 h-fit px-2 text-lg font-mono'>Search</button>
                </div>

                <div className='overflow-y-auto h-80 py-4'>
                    {
                        searchResults.length > 0 ? (
                            searchResults
                                .filter((user) => user._id !== userId) // Filter out the current user
                                .map((user) => (
                                    <div key={user._id} className='flex border-b border-slate-50/50 py-2.5 px-8 justify-between items-center cursor-pointer transition-all ease-in-out duration-300 '>
                                        <div className='h-10 hover:bg-base-100 text-lg flex items-center text-slate-50/80 uppercase'>{user.username}</div>
                                        <button onClick={() => handleAddFriend(user._id)} className='bg-pink-600 font-medium px-5 py-1.5 rounded-xl text-white hover:shadow-lg uppercase tracking-wider'>Add</button>
                                    </div>
                                ))
                        ) : (
                            <div className='text-center text-slate-50/80'>No users found</div>
                        )
                    }
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default SearchUserModal