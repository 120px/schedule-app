import { NavLink, useParams } from 'react-router-dom'
import { useCurrentGroup } from '../../../provider/CurrentGroupProvider';

const Sidebar_CreateEvent = () => {
    const { currentGroup } = useCurrentGroup();
    const { groupId } = useParams();

    // Determine the route: if we are in a group context (via URL or provider), pass it?
    // The CreateEvent page handles logic if groupId is missing.
    // However, if we are in a group, we probably want to pre-select it.
    // The route /group/:groupId/createevent exists.

    const targetPath = currentGroup?.id ? `/group/${currentGroup.id}/createevent` : "/createevent";

    return (
        <NavLink
            to={targetPath}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-white/10 text-white shadow-sm font-bold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white font-semibold'
                }`
            }
        >
            <span className="material-symbols-outlined text-[24px]">add_circle</span>
            <span className="text-sm">Create Event</span>
        </NavLink>
    )
}

export default Sidebar_CreateEvent
