import React from 'react'
import Dashboard from './Dashboard/Dashboard'
import Sidebar from './Sidebar/Sidebar'

interface MainProps {

}

const Main = ({ }) => {
    return (
        <div className=''>
            <div className='flex flex-row gap-10 '>
                <Sidebar></Sidebar>
                <Dashboard></Dashboard>
                
            </div>
        </div>
    )
}

export default Main