import { useEffect, useState } from 'react'
import { db } from '../../../../firebase-config'
import DashboardEvent from '../../Dashboard/Events/DashboardEvent'
import { doc, getDoc, collection } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import GroupEvents from '../../../../models/Group/GroupEvents'
import ClosestEventsInfo from '../../../../models/Event/ClosestEventsInfo'
import EventInfo from '../../../../models/Event/EventInfo'

//https://dribbble.com/shots/15627005-Contentstack-CMS-UI-Updates-Content-Models
//https://dribbble.com/shots/17227772-Add-new-course
//https://dribbble.com/shots/18964945-Calendar-create-event

const MyEvents = () => {

    const { groupId } = useParams()

    // check if the user has any upcoming events in the current group
    // we only want to see the closest events
    const [groupEvents, setGroupEvents] = useState<GroupEvents>()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // First, get the event IDs
                const eventIds = await getGroupEventsIds();
                if (eventIds) {
                    // Then, get the information for each event
                    await getClosestEventsByData(eventIds);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, [])

    const getGroupEventsIds = async () => {
        // check if user does actually belong to the group
        // if so, we'll get the nearest event(s) - top 3

        // TODO: do security check
        // TODO: make model for groupEvents

        const groupData = doc(db, "groups", groupId!);
        const groupDataSnap = await getDoc(groupData);

        if (groupDataSnap.exists())
            return await groupDataSnap.data().events

    }

    const getClosestEventsByData = async (events: [string]) => {

        const eventPromises = events.map(async (id) => doc(db, "events", id))
        const eventDocSnap = await Promise.all(eventPromises)
        const eventsData = eventDocSnap.map(docSnap => docSnap.exists() ? docSnap.data() : null).filter(doc => doc !== null);

        console.log(eventDocSnap)


    }

    return (
        <div className='w-full'>
            <p className='text-xl font-bold text-center'>Upcoming Events</p>

            {/* {groupEvents ? groupEvents.events.map((element: any) => {
                <div>{element}</div>
            }) : null} */}
            <DashboardEvent></DashboardEvent>

        </div>
    )
}

export default MyEvents