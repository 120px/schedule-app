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
        <div className='w-64 bg-[#111111] h-screen text-white flex flex-col justify-between p-6 fixed left-0 top-0 z-10'>
            <div className='flex flex-col gap-8'>
                {/* TITLE AREA */}
                <div className='flex items-center gap-3'>
                    <div className='bg-primary size-10 rounded-lg flex items-center justify-center'>
                        <span className="material-symbols-outlined text-slate-sidebar font-bold">groups</span>
                    </div>
                    <div>
                        <span className='text-lg font-bold leading-none'>Grouphere</span>
                        <p className="text-xs text-white/60 font-medium">Friend Coordinator</p>
                    </div>
                </div>

                {/* CONTENT / BUTTON / ICON AREA */}
                <nav className='flex flex-col gap-2'>
                    <DashboardRedirect />
                    <Sidebar_Chat />
                    <Sidebar_Calendar />
                    <Sidebar_Poll />
                    <Sidebar_PastEvents />
                    {currentGroup && currentGroup?.id !== null ? <Sidebar_Members /> : null}

                    {/* Groups Link (Moved here from settings as per MyGroups layout logic which elevates it) */}
                    <Sidebar_Groups />
                </nav>
            </div>

            {/* SETTINGS AREA */}
            <div className='flex flex-col gap-4'>
                <Sidebar_Profile />
            </div>
        </div>
    )
}

export default Sidebar