import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import EventInfo from '../../../models/Event/EventInfo';
import Dashboard_event from './Dashboard_event';
import { User } from '../../../models/User/User';

interface Dashboard_feedProps{
    currentUser: User | undefined
}

const Dashboard_feed: React.FC<Dashboard_feedProps> = ({currentUser}) => {

    const { groupId } = useParams()
    const [events, setEvents] = useState<EventInfo[]>([]);
    const [posts, setPosts] = useState<any>();

    useEffect(() => {
        const fetchEventsAndPostsAsync = async () => {
            await fetchTenLatestEventsCreated();
            await fetchTopTenLatestPostsCreated();
        }

        fetchEventsAndPostsAsync();
        return () => {

        }
    }, [])

    const fetchTenLatestEventsCreated = async () => {

        // if user is looking at a specific group, we will get the 10 most recent events OF THAT GROUP
        // if user is NOT looking at a group, we will get the 10 most recent events of ALL their groups

        if (groupId == null || groupId == undefined) {
            console.log(currentUser)

        } else {
            console.log(groupId)
            const eventsDocRef = await doc(db, "groups", groupId)
            getDoc(eventsDocRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        setEvents(docSnap.data().events);
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
            {events ? events.map((eventInfo, index) => (
                <Dashboard_event key={index} eventInfo={eventInfo} ></Dashboard_event>
            )) : null}
        </div>
    )
}

export default Dashboard_feed