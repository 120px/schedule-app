import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import { User } from 'firebase/auth'
import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Right_Sidebar from './Dashboard/RightSidebar/Right_Sidebar'

interface MainProps {
    user: User
}

const Main = (props: MainProps) => {

    return (
        <div className='flex h-screen bg-mainBackground'>
            <div className='w-1/4'>
                <Sidebar></Sidebar>
            </div>
            <div className='flex flex-row w-full '>
                <Outlet></Outlet>
            </div>
            <div className='w-1/4 border-l-2 border-neutral-400'>
                <Right_Sidebar></Right_Sidebar>
            </div>
        </div>

    )
}

export default Main