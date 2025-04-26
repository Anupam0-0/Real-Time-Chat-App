import useThemeStore from "../../store/useThemeStore";
import ChatNavbar from './ChatNavbar';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { theme } = useThemeStore();
    const user = useAuthStore.getState().user;
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
                    <Sidebar />
                </div>

                {/* Main */}
                <div className='col-span-1 md:col-span-27 lg:col-span-28 overflow-y-auto h-screen bg-base-100'>



                </div>
            </div>

        </div>
    )
}

export default Home