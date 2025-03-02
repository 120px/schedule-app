import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import GroupSearchBar from './GroupSearchBar/GroupSearchBar'
import { useCurrentGroup } from '../../../provider/CurrentGroupProvider';
import { User } from '../../../models/User/User';

interface Dashboard_feedProps {
    currentUser: User | undefined
}

const Dashboard_Header: React.FC<Dashboard_feedProps> = ({ currentUser }) => {

    const { currentGroup } = useCurrentGroup();
    const { groupId } = useParams()
    useEffect(() => {

    }, [])

    return (
        <div className='flex justify-between w-full py-8 align-middle'>
            {currentGroup?.id !== null && currentGroup !== null ? <span className='text-2xl self-center font-bold'>{currentGroup?.name}</span> :
                <span className='text-2xl self-center font-bold'>My Dashboard</span>}

            <GroupSearchBar />

            {/* <div className='flex'>
                
                <Link className='w-full rounded-lg py-2 px-4 bg-createButton text-white text-md' 
                to={currentGroup != null && currentGroup.id != undefined ? `/group/${groupId}/createevent` : "/createevent"} state={{groups: currentUser?.groups}}>Create</Link>
            </div> */}
        </div>
    )
}

export default Dashboard_Header