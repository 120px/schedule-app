import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import Calendar from './Components/Calendar'
import Chat from './Components/Chat'
import CloseSidebarBtn from './Components/CloseSidebarBtn'
import PastEvents from './Components/PastEvents'
import Poll from './Components/Poll'


const Sidebar = () => {

    // List - make a list of things like restos, or places to visit

    return (
        <div className='bg-white w-64 h-max drop-shadow-md rounded-md'>
            <div className='pt-5 pl-4 pr-4 pb-3'>
                {/* TITLE AREA */}
                <div className='flex flex-row justify-between mb-7'>
                    <div className='pl-7'>
                        <div className='flex flex-row'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -5 30 30" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>

                            <span className='text-lg font-semibold'>Scheduler</span>
                        </div>
                    </div>
                    <div>
                        <CloseSidebarBtn></CloseSidebarBtn>
                    </div>
                </div>

                {/* CONTENT / BUTTON / ICON AREA */}
                <div className='flex flex-col gap-3'>
                    <Dashboard></Dashboard>
                    <Chat></Chat>
                    <Calendar></Calendar>
                    <Poll></Poll>
                    <PastEvents></PastEvents>
                </div>

                {/* SETTINGS AREA */}

            </div>
        </div>
    )
}

export default Sidebar