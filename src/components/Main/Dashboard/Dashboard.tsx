import React from 'react'
import CreateEventInfo from '../../../models/auth/Event/CreateEventInfo'
import MyEvents from '../Sidebar/Components/MyEvents'
import QuickLinks from './QuickLinks/QuickLinks'


//https://dribbble.com/shots/19419939-Admin-dashboard-analytics-UX
// https://dribbble.com/shots/20203136-Citrix-Admin-Dashboard-Analytics-UX-UI
const Dashboard = () => {

    // Upcoming events
    // Recently added polls
    // Recently added events

    // const events: CreateEventInfo = {
    //     address:"",
    //     creatorId: "",
    //     dateCreated: "",
    //     dateFor: "",

    // }

    return (
        <div className='flex flex-1 flex-row'>
            <MyEvents></MyEvents>
            <QuickLinks></QuickLinks>
            

        </div>
    )
}

export default Dashboard