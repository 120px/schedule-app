import React from 'react'
import EventInfo from '../../../models/Event/EventInfo'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

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
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row'>
                        <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                        <p className='pl-4 font-bold text-lg'>{eventInfo.creatorName}</p>
                    </div>
                    {/* <div className='flex self-center'>
                        <FontAwesomeIcon icon={faClock} size='1x' className='pr-3'/>
                        <p className='text-sm'>{eventInfo.date_for}</p>
                    </div> */}
                </div>
                <div className='text-center text-xl'>
                    <p>{eventInfo.name}</p>
                </div>
                <div className='mx-auto'>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <p> <FontAwesomeIcon icon={faClock} className='' />{eventInfo.time}</p>
                            <p> <FontAwesomeIcon icon={faLocationDot} />{eventInfo.date_for}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p> <FontAwesomeIcon icon={faClock} className='' />{eventInfo.address}</p>
                            <p> <FontAwesomeIcon icon={faLocationDot} />{eventInfo.address}</p>
                        </div>
                    </div>
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