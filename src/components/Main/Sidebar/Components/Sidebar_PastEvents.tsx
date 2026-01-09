import { NavLink } from 'react-router-dom'

const Sidebar_PastEvents = () => {
    return (
        <NavLink 
            to="/pastevents" 
            className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                    ? 'bg-white/10 text-white shadow-sm font-bold' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white font-semibold'
                }`
            }
        >
            <span className="material-symbols-outlined text-[24px]">history</span>
            <span className="text-sm">Past Events</span>
        </NavLink>
    )
}

export default Sidebar_PastEvents