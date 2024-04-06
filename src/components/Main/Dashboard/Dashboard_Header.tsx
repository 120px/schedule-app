import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import GroupSearchBar from './GroupSearchBar/GroupSearchBar'

const Dashboard_Header = () => {

    const { groupId } = useParams()

    useEffect(() => {

    })

    return (
        <div className='flex justify-between w-full py-8'>
            <span className='text-xl font-bold'>Dashboard</span>

            <GroupSearchBar />

            <div className='flex'>
                {/* <span>Create a Post</span> */}

                <Link className='w-full rounded-lg py-3 px-5 bg-createButton text-white' to={`/group/${groupId}/createevent`}>Create</Link>
            </div>
        </div>
    )
}

export default Dashboard_Header