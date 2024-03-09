import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import EventInfo from '../../../models/Event/EventInfo';

const Dashboard_feed = () => {

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
        const eventsQuery = query(collection(db, 'events'), orderBy('created_at'), limit(10));
        const queryEventsSnapshot = await getDocs(eventsQuery);

        const fetchedEvents = queryEventsSnapshot.docs.map(doc => ({
            ...doc.data(),
        } as EventInfo));

        setEvents(fetchedEvents)
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
        <div>
            {events ? events.map((doc, index) => (
                <div key={index}>{doc.description}</div>
            )) : null}
        </div>
    )
}

export default Dashboard_feed