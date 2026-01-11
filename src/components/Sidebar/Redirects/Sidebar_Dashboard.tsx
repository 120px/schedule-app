import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useCurrentGroup } from '../../../provider/CurrentGroupProvider';

const Sidebar_Dashboard = () => {

    const { groupId } = useParams();
    const { setCurrentGroup } = useCurrentGroup();
    const linkRedirection = groupId ? `/group/${groupId}/dashboard` : "/"

    return (
        <NavLink 
            to={"/"} 
            onClick={() => setCurrentGroup({id : null, name: null})} 
            className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                    ? 'bg-white/10 text-white shadow-sm font-bold' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white font-semibold'
                }`
            }
        >
            <span className="material-symbols-outlined text-[24px]">dashboard</span>
            <span className="text-sm">Dashboard</span>
        </NavLink>

    )
}

export default Sidebar_Dashboard