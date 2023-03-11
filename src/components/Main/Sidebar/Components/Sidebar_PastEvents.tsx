import React from 'react'

const Sidebar_PastEvents = () => {
    return (
        <div className='flex flex-row hover:bg-orange-300 rounded-md px-1 py-1 hover:drop-shadow-md'>
            <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -3 29 29" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </div>
            <div className='pl-1'>Past Events</div>
        </div>
    )
}

export default Sidebar_PastEvents