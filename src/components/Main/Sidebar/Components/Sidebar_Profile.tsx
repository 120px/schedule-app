import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Sidebar_Profile = () => {
    return (
        <div className='flex flex-row hover:bg-orange-300 rounded-md px-1 py-1 hover:drop-shadow-md'>
            <div className=''>
                <FontAwesomeIcon icon={faUser} />

            </div>
            <div className='pl-1'>Profile</div>
        </div>
    )
}

export default Sidebar_Profile