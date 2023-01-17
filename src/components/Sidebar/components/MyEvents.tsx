import React from 'react'


//https://dribbble.com/shots/15627005-Contentstack-CMS-UI-Updates-Content-Models
//https://dribbble.com/shots/17227772-Add-new-course
//https://dribbble.com/shots/18964945-Calendar-create-event

const MyEvents = () => {

    const currentEvents = 0

    return (
        <div className=''>
            <div className=''>
                <div className=''>
                    <span className='text-xl font-bold'>My Events</span>
                </div>
                <div className=''>
                    <div >
                        <span className='text-lg font-medium '>My planned events</span>
                    </div>
                    <div>
                        {currentEvents !== null ?
                            <div className='flex flex-col'>
                                <div className='text-center'>
                                    A
                                </div>
                                <div className='text-center'>
                                    B
                                </div>
                                <div className='text-center'>
                                    C
                                </div>
                            </div>

                            : <span>You don't have any upcoming events</span>}
                    </div>
                </div>
                <div className=''>
                    <div>
                        <span>My past events</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyEvents