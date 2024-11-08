import React from 'react'
import CloseSidebarBtn from './Components/CloseSidebarBtn'
import DashboardRedirect from './Components/DashboardRedirect'
import Sidebar_Calendar from './Components/Sidebar_Calendar'
import Sidebar_Chat from './Components/Sidebar_Chat'
import Sidebar_Poll from './Components/Sidebar_Poll'
import Sidebar_PastEvents from './Components/Sidebar_PastEvents'
import Sidebar_Groups from './Components/Sidebar_Groups'
import Sidebar_Profile from './Components/Sidebar_Profile'
import Sidebar_Members from './Components/Sidebar_Members'
import { useCurrentGroup } from '../../../provider/CurrentGroupProvider'

const Sidebar = () => {
    const { currentGroup } = useCurrentGroup();
    console.log(currentGroup)
    // List - make a list of things like restos, or places to visit

    return (
        <div className='w-full h-screen bg-sidebar'>
            <div className='pt-8 pl-4 pr-4 pb-3 h-full flex flex-col justify-between'>

                <div className='text-white'>
                    {/* TITLE AREA */}
                    <div className='flex flex-row justify-center mb-10'>
                        <div className='text-center'>
                            <div className='flex flex-row'>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -5 30 30" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                </svg> */}

                                <span className='text-2xl font-semibold'>Grouphere</span>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT / BUTTON / ICON AREA */}
                    <div className='flex flex-col gap-3 px-4 '>
                        <DashboardRedirect/>
                        <Sidebar_Chat/>
                        <Sidebar_Calendar/>
                        <Sidebar_Poll/>
                        <Sidebar_PastEvents/>
                        {currentGroup !== null && currentGroup?.id !== null ? <Sidebar_Members/> : null}
                            
                    </div>
                </div>

                {/* SETTINGS AREA */}
                <div className='flex flex-col gap-3 px-4 pb-10 text-white'>
                    <Sidebar_Groups/>
                    <Sidebar_Profile/>
                </div>

            </div>
        </div>
    )
}

export default Sidebar