"use client"

import { Layout, LucideIcon, Menu } from 'lucide-react'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import React from 'react'

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors 
                ${isActive ? "bg-blue-200 text-white" : ""}}`}>
                <Icon className="w-6 h-6 !text-gray-700" />
                <span className='font-medium text-gray-700'> {label} </span>
            </div>
        </Link>
    )
}
const Sidebar = () => {
  return (
    <div>
        <div className='flex gap-3 justify-between md:justify-normal items-center pt-8'>
            <div>logo</div>
            <h1 className='font-extrabold text-2xl'>Optica</h1>
            <button 
                className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={() => {}}>
                <Menu className='w-4 h-4'/>
            </button>
        </div>

        <div className='flex-grow mt-8'>
            <SidebarLink href="/dashboard" icon={Layout} label='Dashboard'/>
            <SidebarLink href="/tracking" icon={Layout} label='Tracking'/>
            <SidebarLink href="/inventory" icon={Layout} label='Inventory'/>
            <SidebarLink href="/transaction" icon={Layout} label='Transactions'/>
        </div>
    </div>
  )
}

export default Sidebar