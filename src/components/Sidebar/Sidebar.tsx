import DashboardRedirect from './Redirects/Sidebar_Dashboard'
import Sidebar_Calendar from './Redirects/Sidebar_Calendar'
import Sidebar_Chat from './Redirects/Sidebar_Chat'
import Sidebar_Poll from './Redirects/Sidebar_Poll'
import Sidebar_PastEvents from './Redirects/Sidebar_PastEvents'
import Sidebar_Groups from './Redirects/Sidebar_Groups'
import Sidebar_Profile from './Redirects/Sidebar_Profile'
import Sidebar_Members from './Redirects/Sidebar_Members'
import Sidebar_CreateEvent from './Redirects/Sidebar_CreateEvent'
import { useCurrentGroup } from '../../provider/CurrentGroupProvider';
import Sidebar_CreateGroup from './Redirects/Sidebar_CreateGroup';

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

                    <Sidebar_Groups />
                    
                    <div className="pt-4 mt-2 border-t border-white/10">
                        <Sidebar_CreateEvent />
                        <Sidebar_CreateGroup />
                    </div>
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