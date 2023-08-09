import React from 'react'
import MyEvents from './Events/MyEvents'
import QuickLinks from './QuickLinks/QuickLinks'
import { auth } from '../../../firebase-config'
import Portfolio from './Portfolio/Portfolio'


//https://dribbble.com/shots/19419939-Admin-dashboard-analytics-UX
// https://dribbble.com/shots/20203136-Citrix-Admin-Dashboard-Analytics-UX-UI
const Dashboard = () => {

    // Right side: 
    // Upcoming events

    // Left side: more social aspect, like a feed
    // See what people are doing, comments, photos etc
    // Recently added polls
    // Recently added events

    // Group activity
    //  newly created events / polls etc

    // const events: CreateEventInfo = {
    //     address:"",
    //     creatorId: "",
    //     dateCreated: "",
    //     dateFor: "",

    // }

    return (
        <div className='flex flex-row w-full'>
            <MyEvents></MyEvents>
            {/* <QuickLinks></QuickLinks> */}
            <Portfolio></Portfolio>
            
            

        </div>
    )
}

export default Dashboard