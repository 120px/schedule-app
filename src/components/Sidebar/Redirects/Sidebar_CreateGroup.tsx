import { NavLink, useParams } from 'react-router-dom'
import { useCurrentGroup } from '../../../provider/CurrentGroupProvider';

const Sidebar_CreateGroup = () => {
    const { currentGroup } = useCurrentGroup();
    const { groupId } = useParams();



    return (
        <NavLink
            to={"/creategroup"}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-white/10 text-white shadow-sm font-bold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white font-semibold'
                }`
            }
        >
            <span className="material-symbols-outlined text-[24px]">add_circle</span>
            <span className="text-sm">Create Group</span>
        </NavLink>
    )
}

export default Sidebar_CreateGroup
