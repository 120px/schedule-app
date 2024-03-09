import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const DashboardRedirect = () => {

    const { groupId } = useParams()
    const linkRedirection = groupId ? `/group/${groupId}/dashboard` : "/"

    return (
        <Link to={linkRedirection}>
            <div className='flex flex-row hover:bg-orange-300 rounded-md px-1 py-1 hover:drop-shadow-md'>
                <div className=''>
                    <svg preserveAspectRatio="xMidYMin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -3 29 29" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </div>
                <div className='pl-1'>Dashboard</div>
            </div>
        </Link>

    )
}

export default DashboardRedirect