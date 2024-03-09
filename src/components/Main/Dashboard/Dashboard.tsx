import React, { useEffect, useState } from 'react'
import MyEvents from './Events/MyEvents'
import QuickLinks from './QuickLinks/QuickLinks'
import { auth, db } from '../../../firebase-config';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import Right_Sidebar from './RightSidebar/Right_Sidebar';
import Create from './Create/Create';
import Dashboard_Header from './Dashboard_Header';
import Dashboard_feed from './Dashboard_feed';

//https://dribbble.com/shots/19419939-Admin-dashboard-analytics-UX
//https://dribbble.com/shots/20203136-Citrix-Admin-Dashboard-Analytics-UX-UI
//https://dribbble.com/shots/17103862-Pansos-Social-Media-Dashboard-App
//https://dribbble.com/shots/23710244-Tribe-social-feed

const Dashboard = () => {
    // Right side: 
    // Upcoming events

    // Left side: more social aspect, like a feed
    // See what people are doing, comments, photos etc
    // Recently added polls
    // Recently added events

    // Group activity
    //  newly created events / polls etc

    const [userGroups, setUserGroups] = useState<any>()
    const userGroupCollectionRef = doc(db, "user", auth.currentUser!.uid)
    

    return (
        <div className='flex flex-col mx-auto w-4/5'>
            <Dashboard_Header/>
            <MyEvents></MyEvents>
            <Dashboard_feed></Dashboard_feed>


        </div>
    )
}

export default Dashboard