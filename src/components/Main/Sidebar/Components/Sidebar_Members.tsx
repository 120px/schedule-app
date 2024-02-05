import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Sidebar_Members = () => {

    const { groupId } = useParams()

    return (
        <Link to={`/group/${groupId}/groupmembers`} className='flex flex-row hover:bg-orange-300 rounded-md px-1 py-1 hover:drop-shadow-md'>
            <div className=''>
                <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className='pl-1'>Members</div>
        </Link>
    )
}

export default Sidebar_Members