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
    <div className="p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-background-light/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors cursor-pointer group">
      <div className="flex gap-3">
        <div className="flex flex-col items-center justify-center bg-primary text-slate-sidebar font-black size-12 rounded-lg shrink-0">
          <span className="text-[10px] leading-none uppercase">{dateSecondsToDate(groupEvent.date_for).month.substring(0, 3)}</span>
          <span className="text-lg leading-none">{dateSecondsToDate(groupEvent.date_for).date}</span>
        </div>
        <div>
          <p className="text-sm font-bold group-hover:text-primary transition-colors">{groupEvent.name}</p>
          <p className="text-xs text-[#8d6d5e] dark:text-white/50">{dateSecondsToDate(groupEvent.date_for).day} • {groupEvent.time}</p>
          <div className="mt-2 flex -space-x-2 overflow-hidden">
             {/* Avatars would go here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingEvent