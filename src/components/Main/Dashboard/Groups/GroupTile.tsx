import React from 'react'
import GroupData from '../../../../models/Group/GroupData'
import { useCurrentGroup } from "../../../../provider/CurrentGroupProvider"
import { Link } from 'react-router-dom'

interface GroupTileProps {
    group: GroupData

}

const GroupTile: React.FC<GroupTileProps> = ({ group }: GroupTileProps) => {
    const { setCurrentGroup } = useCurrentGroup();

    const handleGroupClick = () => {
        setCurrentGroup({id: group.groupData.id, name: group.groupData.groupName});
    }

    return (
        <div className="flex flex-col rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
            <div className='h-48 w-full bg-center bg-no-repeat bg-cover relative' style={{backgroundImage: `url('https://source.unsplash.com/random/400x300/?group,team,${group.groupData.id}')`}}>
                {/* <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Active</div> */}
            </div>
            <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-[#181310] dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{group.groupData.groupName}</h3>
                        <p className="text-[#8d6d5e] text-sm font-normal mt-1 line-clamp-2">{group.groupData.description || "No description provided."}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="text-[#8d6d5e] text-xs font-medium">{group.groupData.members ? group.groupData.members.length : 0} Members</span>
                    </div>
                    <Link 
                        to={`/group/${group.groupData.id}/dashboard`} 
                        onClick={handleGroupClick}
                        className="flex items-center justify-center rounded-lg h-8 px-3 bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-colors">
                        View Group
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GroupTile