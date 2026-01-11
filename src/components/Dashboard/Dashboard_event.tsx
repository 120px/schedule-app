import React from 'react'
import EventInfo from '../../../models/Event/EventInfo'

interface Dashboard_eventProps {
    eventInfo: EventInfo
    index: number
}

const Dashboard_event: React.FC<Dashboard_eventProps> = ({ eventInfo, index }) => {

    return (
        <div className="bg-white dark:bg-[#2d1e16] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex border border-gray-100 dark:border-white/5 min-h-[200px]">
            {/* Image Placeholder - Random image based on index/name for variety */}
            <div className="w-48 bg-center bg-cover bg-gray-200 shrink-0 hidden sm:block" style={{backgroundImage: `url('https://source.unsplash.com/random/400x400/?event,party,${index}')`}}></div>
            
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">Event</span>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">Attending</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#181310] dark:text-white mb-1">{eventInfo.name}</h3>
                    <p className="text-sm text-[#8d6d5e] dark:text-white/60 mb-4 italic">Posted by {eventInfo.creatorName}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-[#181310] dark:text-white/80">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-lg text-primary">calendar_today</span>
                            {/* Simple date display - can be improved with date filtering/formatting lib */}
                            <span>{new Date(eventInfo.date_for.seconds * 1000).toLocaleDateString()} at {eventInfo.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-lg text-primary">location_on</span>
                            <span>{eventInfo.location || eventInfo.address}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                        <span className="text-xs text-[#8d6d5e] dark:text-white/40">{eventInfo.members ? eventInfo.members.length : 0} friends going</span>
                    </div>
                    <button className="bg-primary/10 hover:bg-primary/20 text-primary font-bold px-4 py-2 rounded-lg text-sm transition-colors">View Details</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard_event