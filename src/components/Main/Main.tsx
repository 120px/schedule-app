import React from 'react'
import Dashboard from './Dashboard/Dashboard'
import Sidebar from './Sidebar/Sidebar'
import { auth } from '../../firebase-config'
import { User } from 'firebase/auth'
import { Outlet } from 'react-router-dom'

interface MainProps {
    user: User
}

const Main = (props: MainProps) => {
    return (
        <>
            <Sidebar></Sidebar>
            <div className='flex flex-row w-full'>
                <Outlet></Outlet>
            </div>
        </>

    )
}

export default Main