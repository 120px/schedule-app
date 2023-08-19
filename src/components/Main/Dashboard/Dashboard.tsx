import React, { useEffect, useState } from 'react'
import MyEvents from './Events/MyEvents'
import QuickLinks from './QuickLinks/QuickLinks'
import { auth, db } from '../../../firebase-config';
import Portfolio from './Portfolio/Portfolio'
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';

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

    const [userGroups, setUserGroups] = useState<any>()
    const userGroupCollectionRef = doc(db, "user", auth.currentUser!.uid)

    useEffect(() => {
        // console.log(auth.currentUser?.uid)
        const getUserGroups = async () =>{
            const data = await getDoc(userGroupCollectionRef)

            if (data)
                console.log(data.data())
            else
                console.log("no groups rn")
        }

        getUserGroups()
    
        console.log("UG: " + userGroups)
      return () => {
        
      }
    }, [])
    
    return (
        <div className='flex flex-row w-full'>
            <MyEvents></MyEvents>
            {/* <QuickLinks></QuickLinks> */}
            <Portfolio></Portfolio>
            
        </div>
    )
}

export default Dashboard