import React from 'react'
import EventInfo from '../../../models/Event/EventInfo'

interface Dashboard_eventProps {
    eventInfo: EventInfo
}

const Dashboard_event: React.FC<Dashboard_eventProps> = ({ eventInfo }) => {
    return (

        <div className='w-full flex flex-col bg-cardBackground p-6 shadow-md rounded-md'>
            <div className='flex flex-row'>
                <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                <p className='pl-4 font-bold text-lg'>{"Event Creator"}</p>
            </div>
            <div className='text-center'>
                <p>{eventInfo.name}Event Name</p>
                <p>{eventInfo.time}</p>
                <p>{eventInfo.address}</p>
            </div>
            <div className='mt-3 text-md'>
                <p>{eventInfo.description}</p>

            </div>

        </div>

    )
}

export default Dashboard_event