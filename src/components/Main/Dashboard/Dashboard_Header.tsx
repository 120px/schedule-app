import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import GroupSearchBar from './GroupSearchBar/GroupSearchBar'
import { useCurrentGroup } from '../../../provider/CurrentGroupProvider';

const Dashboard_Header = () => {

    const { currentGroup } = useCurrentGroup();
    const { groupId } = useParams()

    useEffect(() => {

    }, [])
    console.log(currentGroup?.id)

    return (
        <div className='flex justify-between w-full py-8 align-middle'>
            {currentGroup?.id !== null && currentGroup !== null ? <span className='text-2xl self-center font-bold'>{currentGroup?.name}</span> :
                <span className='text-2xl self-center font-bold'>My Dashboard</span>}

            <GroupSearchBar />

            <div className='flex'>
                {/* <span>Create a Post</span> */}

                <Link className='w-full rounded-lg py-3 px-5 bg-createButton text-white' 
                to={currentGroup != null && currentGroup.id != undefined ? `/group/${groupId}/createevent` : "/createevent"}>Create</Link>
            </div>
        </div>
    )
}

export default Dashboard_Header