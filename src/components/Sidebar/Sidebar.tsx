import React from 'react'

const Sidebar = () => {
    return (
        <div className="drop-shadow-md bg-slate-50 h-screen w-64 fixed top-0 left-0 z-50">
            <div className="py-4 px-6">
                <h3 className="text-center text-lg text-sky-500 font-medium text-purple-400">Schedoolie</h3>
            </div>
            <div className="py-3 px-5 border-t border-gray-300">
                <a href="#" className="rounded text-center py-5 block text-base font-medium text-sky-500 hover:bg-neutral-200 hover:text-sky-700 focus:outline-none focus:text-sky-700 focus:bg-gray-100">Chat</a>
                <a href="#" className="rounded text-center py-5 block text-base font-medium text-sky-500 hover:bg-neutral-200 hover:text-sky-700 focus:outline-none focus:text-sky-700 focus:bg-gray-100">Calendar</a>
                <a href="#" className="rounded text-center py-5 block text-base font-medium text-sky-500 hover:bg-neutral-200 hover:text-sky-700 focus:outline-none focus:text-sky-700 focus:bg-gray-100">Polls</a>

            </div>
        </div>

    )
}

export default Sidebar