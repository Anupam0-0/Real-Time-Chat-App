import React from 'react'
import useThemeStore from "../../store/useThemeStore";
import ChatNavbar from './ChatNavbar';
import Sidebar from './Sidebar';

const Home = () => {

    const { theme } = useThemeStore();

    return (

        <div data-theme={theme} className='h-screen overflow-hidden bg-base-300'>
            <div className='grid grid-cols-1 md:grid-cols-20 '>
                <div className='hidden md:block md:col-span-1'>
                    <ChatNavbar />
                </div>
                {/* Sidebar */}
                <div className='hidden md:block md:col-span-5'>
                    <Sidebar />
                </div>



                {/* Main */}
                <div className='col-span-1 md:col-span-14 overflow-y-auto h-screen bg-base-100'>

                </div>
            </div>

        </div>
    )
}

export default Home