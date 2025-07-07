"use client"

import React from 'react'
import Navbar from '@/app/(components)/Navbar'
import Sidebar from '@/app/(components)/Sidebar'
import StoreProvider, { useAppSelector } from './redux'

const CommonPageLayout = ({children} : {children: React.ReactNode}) => {
  // can edit page layout according to collapsed or not side bar to make it work for smaller screens
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <div className={`flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
        <Sidebar/>
        <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 
          ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}>
          <Navbar />
          {children}
        </main>
    </div>
  )
}

// reference: https://nextjs.org/docs/app/getting-started/server-and-client-components#using-context-providers
const CommonPageWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <CommonPageLayout>{children}</CommonPageLayout>
    </StoreProvider>
  )
}

export default CommonPageWrapper