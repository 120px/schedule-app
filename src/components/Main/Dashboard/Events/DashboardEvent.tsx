import React from 'react'
import EventInfo from '../../../../models/Event/EventInfo'

type GroupEvent = {
  data: EventInfo;
}

interface DashboardEventProps {
  groupEvent: GroupEvent;
}

const DashboardEvent: React.FC<DashboardEventProps> = ({ groupEvent }) => {

  return (
    <>
      <div className='flex flex-col'>
        <p>{groupEvent.data.name}</p>
        <p>{groupEvent.data.dateFor}</p>
        <p>{groupEvent.data.members.length}</p>
        <p>Location: {groupEvent.data.location}</p>
      </div>
    </>

    

  )
}

export default DashboardEvent