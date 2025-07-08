"use client"

import React from 'react'
import { Menu, Moon, SearchIcon, Settings} from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import Image from 'next/image'

const Navbar = () => {

    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
    );  

    const switchSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    return (
    <div className='flex justify-between items-center w-full mb-7'>
        <div className='flex justify-between items-center gap-5'>
            <button 
                className='px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' 
                onClick={switchSidebar}>
                <Menu className='w-6 h-6' />
            </button>
            <div className='relative'>
                <input 
                    type='search' 
                    placeholder='Search for... (Future task! - system wide search)'
                    className="pl-10 pr-4 py-2 w-48 md:w-80 lg:w-[30rem] border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500" />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <SearchIcon className='text-gray-500' size={20}/>
                </div>
            </div>
        </div>

        <div className='flex justify-between items-center gap-5'>
            <div className='hidden md:flex justify-between items-center gap-5 pl-4'>
                <div>
                    {/* TO DO: write dark mode logic and integrate */}
                    <button onClick={() => {alert("Future task! - light/dark mode");}}>
                        <Moon className='cursor-pointer text-gray-500' size={24}/>
                    </button>
                </div>
                <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3'/>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <Image
                        src="/scrapyard-pfp.png"
                        alt="Scrapyard profile pic"
                        width={27}
                        height={27}
                        className="rounded"
                    />
                    <span className='font-semibold'>Krusty Scrap</span>
                </div>
            </div>
            {/* TO DO: create settings page and link */}
            <Link href="/settings">
                <Settings className='cursor-pointer text-gray-500' size={24}/>
            </Link>
        </div>
    </div>
    )
}

export default Navbar