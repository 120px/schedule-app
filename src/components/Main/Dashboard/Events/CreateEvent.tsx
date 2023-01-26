import React from 'react'

const CreateEvent = () => {

    //https://dribbble.com/shots/14182509-Create-event
    //https://dribbble.com/shots/18964945-Calendar-create-event
    //https://dribbble.com/shots/3085179-Create-event-flow-Under-construction

    return (
        <div className='shadow-xl max-w-xl bg-white h-fit mx-auto p-20 mt-12'>

            <form >
                <div className='mb-8 '>
                    <h3 className='text-3xl font-semibold mb-4'>Create an event</h3>
                    <span className='text-slate-500'>Create a new event & notify everyone in your group</span>
                </div>

                <div className='flex flex-row justify-between' >
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>

                    <div className='sm:divide-x'></div>

                    <div className="relative max-w-sm">
                        <input type="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>

                </div>

                <div className='mb-6'>
                    <div className='flex flex-row justify-between mb-6'>
                        
                    </div>
                </div>
                <div className='mb-6'>
                    <div className=''>
                        <div>
                            <button className='bg-orange-400 w-full rounded-lg text-white py-3 hover:bg-orange-600'>Create event</button>
                        </div>
                    </div>
                </div>

            </form>

        </div>

    )
}

export default CreateEvent