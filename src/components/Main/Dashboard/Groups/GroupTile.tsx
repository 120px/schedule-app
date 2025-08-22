import React from 'react'
import GroupData from '../../../../models/Group/GroupData'
import { useCurrentGroup } from "../../../../provider/CurrentGroupProvider"
import { Link } from 'react-router-dom'

interface GroupTileProps {
    group: GroupData

}

const GroupTile: React.FC<GroupTileProps> = ({ group }: GroupTileProps) => {
    const { setCurrentGroup } = useCurrentGroup();

    return (
        <div className="flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md px-10">
            <div className='mx-auto pt-8'>
                <img className='w-full h-full' src="../../assets/group_placeholder2.jpeg"></img>
            </div>
            <div className="p-6">
                <h5 className="text-center mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {group !== undefined ? group.groupData.groupName : null}
                </h5>

            </div>
            <div className="p-3 pt-0 text-center flex mx-auto">

            </div>
        </div>
    )
}

export default GroupTile