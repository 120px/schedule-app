import React, { useEffect, useState } from 'react'
import MyEvents from './Events/MyEvents'
import QuickLinks from './QuickLinks/QuickLinks'
import { auth, db } from '../../../firebase-config';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import Right_Sidebar from './RightSidebar/Right_Sidebar';
import Create from './Create/Create';
import Dashboard_Header from './Dashboard_Header';
import Dashboard_feed from './Dashboard_feed';
import { User } from '../../../models/User/User';
import { useCurrentGroup } from '../../../provider/CurrentGroupProvider';

//https://dribbble.com/shots/19419939-Admin-dashboard-analytics-UX
//https://dribbble.com/shots/20203136-Citrix-Admin-Dashboard-Analytics-UX-UI
//https://dribbble.com/shots/17103862-Pansos-Social-Media-Dashboard-App

//https://dribbble.com/shots/23710244-Tribe-social-feed
//https://dribbble.com/shots/21139476-Feed-Social-Media-Web-App
//https://dribbble.com/shots/21864904-Feed-Layout-Social-Media-App
const Dashboard = () => {

    const { currentGroup } = useCurrentGroup();
    const [currentUser, setCurrentUser] = useState<User | undefined>()

    useEffect(() => {
        const fetchUser = async () => {
            await getCurrentUser()
        }
        console.log("dashboard")
        fetchUser()
    }, [currentGroup])

    const getCurrentUser = async () => {
        const userData = await doc(db, "users", auth.currentUser!.uid)
        const userDataSnap = await getDoc(userData);
        setCurrentUser(userDataSnap.data() as User)
    }

    return (
        <div className='flex flex-col mx-auto w-4/5'>
            <Dashboard_Header />
            <Dashboard_feed currentUser={currentUser}></Dashboard_feed>

        </div>
    )
}

export default Dashboard