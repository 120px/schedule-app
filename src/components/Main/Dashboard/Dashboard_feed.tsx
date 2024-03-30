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
    const [posts, setPosts] = useState<any>();

    useEffect(() => {
        const fetchEventsAndPostsAsync = async () => {
            let eventIds = await fetchEventIds();
            await getEventInformation(eventIds!)
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
                            return await docSnap.exists() ? { ...docSnap.data()!.events } : null;
                        })
                    );
                    // Filter out any null values that may have resulted from missing documents
                    const validEvents: GroupEvents[] = eventsData.filter((data): data is GroupEvents => data !== null);
                    await setEventIds(validEvents as GroupEvents[]);
                    return validEvents;
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

    const getEventInformation = async (eventIds: GroupEvents[]) => {
        if (eventIds.length > 0) {
            try {
                const eventsData = await Promise.all(
                    eventIds.map(async (event) => {
                        const eventsDocRef = await doc(db, "events", event);
                        const docSnap = await getDoc(eventsDocRef);
                        return await docSnap.exists() ? { ...docSnap.data() } : null;
                    })
                );
                // Filter out any null values that may have resulted from missing documents
                const validEvents: GroupEvents[] = eventsData.filter((data): data is GroupEvents => data !== null);
                await setEventIds(validEvents as GroupEvents[]);
                return validEvents;
            } catch (error) {
                console.error("Error getting group documents:", error);
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
                {/* {events ? events.map((eventInfo, index) => (
                <Dashboard_event key={index} eventInfo={eventInfo} ></Dashboard_event>
            )) : null} */}
            </div>
        )
    }

    export default Dashboard_feed