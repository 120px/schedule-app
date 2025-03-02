import React from 'react'
import EventInfo from '../../../../models/Event/EventInfo'
import { group } from 'console';

interface UpcomingEventProps {
  groupEvent: EventInfo;
}

interface timeStamp {
  nanoseconds: number; seconds: number;
}

const UpcomingEvent: React.FC<UpcomingEventProps> = ({ groupEvent }) => {

  // This gets called every time we call the function in the render
  // Try to find a better way
  const dateSecondsToDate = (groupDataEvent: timeStamp) => {

    let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let seconds = groupEvent.date_for.seconds;
    let date = new Date(seconds * 1000);

    let formattedDate = {
      date: date.getDate().toString(),
      day: dayNames[date.getDay()],
      month: monthNames[date.getMonth()],
      year: date.getFullYear(), // Year
      time: date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() // Hours and minutes, padding minutes to ensure two digits

    };

    return formattedDate

  }

  return (

    <div className="flex flex-col bg-white rounded-3xl shadow-xl">
      <div className="px-8 py-4 sm:p-10 sm:pb-6">
        <div className="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <h2 className="text-lg font-medium tracking-tighter lg:text-3xl">
              {groupEvent.name}
            </h2>
            <div className="mt-2 text-lg text-gray-500 text-center">
              <span>{dateSecondsToDate(groupEvent.date_for).day}. </span>
              <span>{dateSecondsToDate(groupEvent.date_for).time}</span>
            </div>
            <div className="text-md text-gray-500 text-center">
              <span>{dateSecondsToDate(groupEvent.date_for).month}</span>
              {/* <span>{dateSecondsToDate(groupEvent.data.date_for).year}</span> */}
            </div>
          </div>
          <div className="mt-6 text-center">
            <p>
              <span className="text-base font-medium text-gray-500">Accepted: {groupEvent.members.length} </span>
            </p>
          </div>
        </div>
      </div>
    </div>




  )
}

export default UpcomingEvent