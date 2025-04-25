import React from 'react'
import useThemeStore from "../../store/useThemeStore";
import ChatNavbar from './ChatNavbar';

const Home = () => {

    const { theme } = useThemeStore();

    return (

        <div data-theme={theme} className='h-screen overflow-hidden bg-base-300'>
            <ChatNavbar />
            <div className='grid grid-cols-1 md:grid-cols-15 '>
                {/* Sidebar */}
                <div className='hidden md:block md:col-span-3 border-r border-gray-300 overflow-y-auto h-screen'>
                    {
                        Array.from({ length: 100 }, (_, i) => (
                            <div key={i} className='p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer'>
                                <p className='p-4' >Number {i}</p>
                            </div>
                        ))
                    }
                </div>


                {/* Main */}
                <div>

                </div>
            </div>

        </div>
    )
}

export default Home