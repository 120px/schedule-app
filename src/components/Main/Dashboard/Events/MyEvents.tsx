import { useEffect, useState } from 'react'
import { auth, db } from '../../../../firebase-config'
import DashboardEvent from '../../Dashboard/Events/DashboardEvent'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'

//https://dribbble.com/shots/15627005-Contentstack-CMS-UI-Updates-Content-Models
//https://dribbble.com/shots/17227772-Add-new-course
//https://dribbble.com/shots/18964945-Calendar-create-event

const MyEvents = () => {

    const { groupId } = useParams()

    // check if the user has any upcoming events in the current group
        // we only want to see the closest events
    const [groupEvents, setGroupEvents] = useState<any>([])
    
    useEffect(() => {
      getGroupEvents()
    
      return () => {
        
      }
    }, [])
    
    const getGroupEvents = async () =>{
        // check if user does actually belong to the group
        // if so, we'll get the nearest event(s) - top 3

        // TODO: do security check
        // TODO: make model for groupEvents

        const groupData = doc(db, "groups", groupId!);
        const groupDataSnap = await getDoc(groupData);
        var data;

        if (groupDataSnap.exists())
            await setGroupEvents(groupDataSnap.data().events)

        console.log(groupEvents)
    }

    return (
        <div className='w-full'>
            <p className='text-xl font-bold text-center'>Upcoming Events</p>

            {groupEvents ? groupEvents.map((element: any) => {
                <div>{element}</div>
            }) : null}
            <DashboardEvent></DashboardEvent>

        </div>
    )
}

export default MyEvents