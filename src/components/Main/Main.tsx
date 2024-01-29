import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import { User } from 'firebase/auth'
import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom';

interface MainProps {
    user: User
}

const Main = (props: MainProps) => {

    const { groupId } = useParams()

    return (
        <>
            <Sidebar></Sidebar>
            <div className='flex flex-row w-full'>
                {/* {groupId ? groupId : null} */}
                <Outlet></Outlet>
            </div>
        </>

    )
}

export default Main