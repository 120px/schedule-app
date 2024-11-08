import React from 'react'
import EventInfo from '../../../models/Event/EventInfo'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Dashboard_eventProps {
    eventInfo: EventInfo
    index: number
}

const Dashboard_event: React.FC<Dashboard_eventProps> = ({ eventInfo, index }) => {

    return (

        // Need to keep track of which group this event is coming from
        // should have a small footnote or something. a link that redirects to the group or post

        <div className={index == 0 ? 'mb-5' : "mb-5 mt-5"}>
            <div className='w-full flex flex-col bg-cardBackground p-6 shadow-md rounded-md'>
                <div className='flex flex-row'>
                    <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                    <p className='pl-4 font-bold text-lg'>{eventInfo.creatorName}</p>
                </div>
                <div className='w-3/4 mx-auto'>
                    <div className="">
                        <p className='font-bold text-xl'>{eventInfo.name}</p> 
                        <p className='pl-10 self-baseline'>@ {eventInfo.time}</p>
                    </div>
                    <p>{eventInfo.address}</p>
                    <p></p>
                </div>
                <div className='mt-3 text-md'>
                    <p>{eventInfo.description}</p>
                </div>

                <div className='w-full '>
                    <div className='flex '>
                        <FontAwesomeIcon className='fa-flip-horizontal' icon={faComment} size='1x' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard_event