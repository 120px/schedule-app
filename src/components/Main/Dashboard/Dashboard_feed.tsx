import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase-config';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import EventInfo from '../../../models/Event/EventInfo';
import Dashboard_event from './Dashboard_event';
import { User } from '../../../models/User/User';
import GroupEvents from '../../../models/Group/GroupEvents';

interface Dashboard_feedProps {
    currentUser: User | undefined
}

const Dashboard_feed: React.FC<Dashboard_feedProps> = ({ currentUser }) => {

    const { groupId } = useParams()
    const [eventIds, setEventIds] = useState<GroupEvents[]>([]);
    const [events, setEvents] = useState<EventInfo[]>()
    const [posts, setPosts] = useState<any>();

    useEffect(() => {
        const fetchEventsAndPostsAsync = async () => {
            let eventIds = await fetchEventIds();
            await getEventInformation(eventIds as string[])
            // await fetchTopTenLatestPostsCreated();
        }

        fetchEventsAndPostsAsync();
        return () => {

        }
    }, [currentUser])

    const fetchEventIds = async () => {

        // if user is looking at a specific group, we will get the 10 most recent events OF THAT GROUP
        // if user is NOT looking at a group, we will get the 10 most recent events of ALL their groups
        if (groupId == null || groupId == undefined) {
            if (currentUser !== undefined) {
                try {
                    const eventsData = await Promise.all(
                        currentUser.groups.map(async (group) => {
                            const groupDocRef = await doc(db, "groups", group);
                            const docSnap = await getDoc(groupDocRef);
                            if (docSnap.exists() && docSnap.data().events !== undefined) {
                                const eventsObject = docSnap.data().events;
                                const combinedEventsArray = Object.values(eventsObject).flat();
                                return combinedEventsArray;
                            } else {
                                return null;
                            }
                        })
                    );
                    const validEvents = eventsData.filter(data => data !== null).flat();
                    return await validEvents;
                } catch (error) {
                    console.error("Error getting group documents:", error);
                }
            }
        } else {
            console.log("in the ELSE")
            const eventsDocRef = await doc(db, "groups", groupId)
            await getDoc(eventsDocRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        setEventIds(docSnap.data().events);
                        console.log("EVENTS: " + eventIds)
                    } else {
                        console.log("no documents");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                });
        }

    }

    const getEventInformation = async (groupEventsArray : string[]) => {
        if (groupEventsArray.length > 0){
            const eventsData = await Promise.all(
                groupEventsArray.map(async (event) => {
                    const groupDocRef = await doc(db, "events", event);
                    const docSnap = await getDoc(groupDocRef);
                    if (docSnap.exists()) {
                        const eventsObject = docSnap.data();
                        return eventsObject

                    } else {
                        return null;
                    }
                
                })
            );
            const validEvents = eventsData.filter(data => data !== null)
            setEvents(validEvents as EventInfo[])
            return await validEvents;
        }

    }

    const fetchTopTenLatestPostsCreated = async () => {
        const postsQuery = query(collection(db, 'posts'), orderBy('data.created_at'), limit(10));
        const queryEventsSnapshot = await getDocs(postsQuery);

        const posts = queryEventsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setPosts(posts)
    }

    return (
        <div className='w-1/2 mx-auto'>
            {/* {events ? events[0].address : null} */}
            {events ? events.map((eventInfo, index) => (
                <Dashboard_event key={index} eventInfo={eventInfo} ></Dashboard_event>
            )) : null}
        </div>
    )
}

export default Dashboard_feed