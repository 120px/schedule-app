import React from 'react'
import EventInfo from '../../../models/Event/EventInfo'

interface Dashboard_eventProps {
    eventInfo: EventInfo
}

const Dashboard_event: React.FC<Dashboard_eventProps> = ({ eventInfo }) => {
    return (

        <div className='w-full flex flex-col bg-slate-200 p-6 '>
            <div className='flex flex-row'>
                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                <p className='pl-4 font-bold text-lg'>Username Here</p>
            </div>
            <div className='mt-3 text-md'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae porro possimus repellendus laboriosam excepturi, provident error voluptas animi nemo, ipsam, officiis saepe nesciunt debitis sed quod quam. Sit, id incidunt?
            </div>

        </div>

    )
}

export default Dashboard_event