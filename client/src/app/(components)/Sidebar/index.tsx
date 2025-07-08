"use client"

import { Layout, LucideIcon, Clipboard, Menu, Truck, SlidersHorizontal, CircleDollarSign } from 'lucide-react'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import Image from 'next/image';
interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center text-xl hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors rounded-2xl
          ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
         ${isActive ? "bg-blue-200 text-white" : ""}
      }`}
      >
        <Icon className="w-8 h-8 !text-gray-700" />

        <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );  

  const switchSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarView = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`
  
  return (
    <div className={sidebarView}>
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
            <Image
              src="/optica-logo.png"
              alt="Optica logo"
              width={27}
              height={27}
              className="rounded w-8"
            />
            <h1 className={`font-extrabold text-2xl ${isSidebarCollapsed ? "hidden" : "block"}`}>Optica</h1>
            <button 
                className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={switchSidebar}>
                <Menu className='w-6 h-6'/>
            </button>
        </div>

        <div className='flex-grow mt-8 flex flex-col gap-y-4'>
            <SidebarLink href="/dashboard" icon={Layout} label='Dashboard' isCollapsed={isSidebarCollapsed}/>
            <SidebarLink href="/track" icon={Truck} label='Track Inventory' isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/manage" icon={Clipboard} label='Manage Stock'isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/transactions" icon={CircleDollarSign} label='Transactions' isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/settings" icon={SlidersHorizontal} label='Settings' isCollapsed={isSidebarCollapsed} />
        </div>
    </div>
  )
}

export default Sidebar