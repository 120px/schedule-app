import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import MyEvents from '../Sidebar/components/MyEvents'
import Sidebar from '../Sidebar/Sidebar'

interface MainProps{
    
}

const Main = ({}) => {
    return (
        <div className='flex flex-row gap-10'>
            <Sidebar></Sidebar>
            <Dashboard></Dashboard>
            <MyEvents></MyEvents>
        </div>
    )
}

export default Main