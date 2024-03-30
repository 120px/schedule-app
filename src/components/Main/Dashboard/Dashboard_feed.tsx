import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase-config';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import EventInfo from '../../../models/Event/EventInfo';
import Dashboard_event from './Dashboard_event';
import { User } from '../../../models/User/User';

interface Dashboard_feedProps {
    currentUser: User | undefined
}

const Dashboard_feed: React.FC<Dashboard_feedProps> = ({ currentUser }) => {

    const { groupId } = useParams()
    const [events, setEvents] = useState<EventInfo[]>([]);
    const [posts, setPosts] = useState<any>();

    useEffect(() => {
        const fetchEventsAndPostsAsync = async () => {
            await fetchTenLatestEventsCreated();
            // await fetchTopTenLatestPostsCreated();
        }

        fetchEventsAndPostsAsync();
        return () => {

        }
    }, [currentUser])

    const fetchTenLatestEventsCreated = async () => {

        // if user is looking at a specific group, we will get the 10 most recent events OF THAT GROUP
        // if user is NOT looking at a group, we will get the 10 most recent events of ALL their groups
        if (groupId == null || groupId == undefined) {
            if (currentUser !== undefined) {
                try {
                    const eventsData = await Promise.all(
                        currentUser.groups.map(async (group) => {
                            const groupDocRef = doc(db, "groups", group);
                            const docSnap = await getDoc(groupDocRef);
                            return docSnap.exists() ? { ...docSnap.data() } : null;
                        })
                    );
                    // Filter out any null values that may have resulted from missing documents
                    const validEvents: EventInfo[] = eventsData.filter((event): event is EventInfo => event !== null);
                    setEvents(validEvents);
                    console.log(events)
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
                        setEvents(docSnap.data().events);
                        console.log("EVENTS: " + events)
                    } else {
                        console.log("no documents");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                });
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
            {/* {events ? events[0].location : null} */}
            {/* {events ? events.map((eventInfo, index) => (
                <Dashboard_event key={index} eventInfo={eventInfo} ></Dashboard_event>
            )) : null} */}
        </div>
    )
}

export default Dashboard_feed