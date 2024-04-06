import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar_Groups = () => {
    return (
        <Link to={"/mygroups"} className='flex flex-row hover:bg-sidebarHover px-1 py-1 rounded-md hover:drop-shadow-md'>
            <div className=''>
                <FontAwesomeIcon icon={faUsersRectangle} />
            </div>
            <div className='pl-1'>My Groups</div>
        </Link>
    )
}

export default Sidebar_Groups