import React from 'react'
import DashboardEvent from '../../Dashboard/Events/DashboardEvent'

//https://dribbble.com/shots/15627005-Contentstack-CMS-UI-Updates-Content-Models
//https://dribbble.com/shots/17227772-Add-new-course
//https://dribbble.com/shots/18964945-Calendar-create-event

const MyEvents = () => {

    const currentEvents = 0

    return (
        <div className='w-full'>
            <p className='text-xl font-bold text-center'>Upcoming Events</p>

            <DashboardEvent></DashboardEvent>

        </div>
    )
}

export default MyEvents