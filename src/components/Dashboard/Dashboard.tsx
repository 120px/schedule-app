import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import Dashboard_Header from './Dashboard_Header';
import Dashboard_feed from './Dashboard_feed';
import { User } from '../../models/User/User';
import { useCurrentGroup } from '../../provider/CurrentGroupProvider';
import AuthGroup from '../Authentication/Groups/AuthGroup';

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
            await getCurrentUser();
        };
        fetchUser();
    }, [currentGroup]);

    const getCurrentUser = async () => {
        const userData = await doc(db, "users", auth.currentUser!.uid)
        const userDataSnap = await getDoc(userData);
        setCurrentUser(userDataSnap.data() as User)
    }

    return (
        <AuthGroup>
            <div className='p-8 w-full'>
                <Dashboard_Header currentUser={currentUser} />
                <Dashboard_feed currentUser={currentUser}></Dashboard_feed>
            </div>
        </AuthGroup>
    )
}

export default Dashboard