import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Dashboard_Header = () => {

    const { groupId } = useParams()

    return (
        <div className='flex justify-between w-full py-8'>
            <span className='text-2xl'>Dashboard</span>

            <div className='flex'>
                <span>Create a Post</span>
                <Link to={`/group/${groupId}/createevent`}>Create an Event</Link>
            </div>
        </div>
    )
}

export default Dashboard_Header