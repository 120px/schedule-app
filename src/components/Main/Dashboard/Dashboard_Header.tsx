import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import GroupSearchBar from './GroupSearchBar/GroupSearchBar'

const Dashboard_Header = () => {

    const { groupId } = useParams()

    useEffect(() =>{
        
    })

    return (
        <div className='flex justify-between w-full py-8'>
            <span className='text-2xl'>Dashboard</span>

            <GroupSearchBar/>

            <div className='flex'>
                <span>Create a Post</span>
                <Link to={`/group/${groupId}/createevent`}>Create an Event</Link>
            </div>
        </div>
    )
}

export default Dashboard_Header