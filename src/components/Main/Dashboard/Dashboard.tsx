import React, { useEffect, useState } from 'react'
import MyEvents from './Events/MyEvents'
import QuickLinks from './QuickLinks/QuickLinks'
import { auth, db } from '../../../firebase-config';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import Right_Sidebar from './RightSidebar/Right_Sidebar';

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

    const [userGroups, setUserGroups] = useState<any>()
    const userGroupCollectionRef = doc(db, "user", auth.currentUser!.uid)
    
    return (
        <div className='flex flex-row w-full'>
            <MyEvents></MyEvents>
            <Right_Sidebar></Right_Sidebar>
            
        </div>
    )
}

export default Dashboard