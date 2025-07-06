"use client"

import React from 'react'
import { Menu, Moon, SearchIcon, Settings} from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-full mb-7'>
        
        {/* left side */}
        <div className='flex justify-between items-center gap-5'>
            <button 
                className='px-3 py-3 bg-gray-100 rounded-full' 
                onClick={() => {}}>
                <Menu className='w-4 h-4' />
            </button>
            <div className='relative'>
                <input 
                    type='search' 
                    placeholder='Search for inventory, stockpiles and transactions...' 
                    className='pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500'/>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <SearchIcon className='text-gray-500' size={20}/>
                </div>
            </div>
        </div>

        {/* right side */}
        <div className='flex justify-between items-center gap-5'>
            <div className='hidden md:flex justify-between items-center gap-5'>
                <div>
                    {/* TO DO: write dark mode logic and integrate */}
                    <button onClick={() => {}}>
                        <Moon className='cursor-pointer text-gray-500' size={24}/>
                    </button>
                </div>
                <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3'/>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <div className='w-9 h-9'>pfp</div>
                    <span className='font-semibold'>Scrapyard Name</span>
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