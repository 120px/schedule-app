import React from 'react'
import Dashboard from './Dashboard/Dashboard'
import Sidebar from './Sidebar/Sidebar'
import { auth } from '../../firebase-config'

interface MainProps {

}

const Main = ({ }) => {
    return (
        <div className='flex flex-row gap-10 '>
            <Sidebar></Sidebar>
            <Dashboard></Dashboard>

        </div>

    )
}

export default Main