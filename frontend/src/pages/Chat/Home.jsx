import { useState } from 'react'
import useThemeStore from "../../store/useThemeStore";
import ChatNavbar from './ChatNavbar';
import Sidebar from './Sidebar';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import Main from './Main';

const Home = () => {
    const [screen, setScreen] = useState('');
    const navigate = useNavigate();
    const { theme } = useThemeStore();
    const user = useAuthStore((state) => state.user); // Get the user from the store
    if (!user) {
        navigate('/login');
    }


    return (
        <div data-theme={theme} className='h-screen overflow-hidden bg-base-300'>
            <div className='grid grid-cols-1 md:grid-cols-40 '>
                <div className='hidden md:block md:col-span-3 lg:col-span-2'>
                    <ChatNavbar />
                </div>
                {/* Sidebar */}
                <div className='hidden md:block md:col-span-10 '>
                    <Sidebar screen={screen} setScreen={setScreen} />
                </div>

                {/* Main */}
                <div className='col-span-1 md:col-span-27 lg:col-span-28 overflow-y-auto h-screen bg-base-100'>
                    <Main screen={screen}  />
                </div>
            </div>

        </div>
    )
}

export default Home