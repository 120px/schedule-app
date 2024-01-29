import React from 'react'

const Dashboard_Header = () => {
    return (
        <div className='flex justify-between w-full py-8'>
            <span className='text-2xl'>Dashboard</span>

            <div className='flex'>
                <span>Create a Post</span>
                <span>Create an Event</span>
            </div>
        </div>
    )
}

export default Dashboard_Header