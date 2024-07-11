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
                <img className='h-16 w-16 rounded-full' src='https://images.unsplash.com/photo-1519951529813-0c1a4fe5a82c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
            </div>
            <div className="p-6">
                <h5 className="text-center mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {group !== undefined ? group.groupData.groupName : null}
                </h5>

            </div>
            <div className="p-3 pt-0 text-center flex mx-auto">
                {/* <Link to={`/group/${group.groupData.id}/dashboard`} data-ripple-light="true" type="button" className="bg-createButton"
                >
                    info
                </Link> */}
                <Link to={`/group/${group.groupData.id}/dashboard`} data-ripple-light="true" type="button" className="rounded-lg bg-createButton py-3 px-6 text-white"
                    onClick={() => setCurrentGroup({ id: group.groupData.id, name: group.groupData.groupName })}>
                    Visit
                </Link>
            </div>
        </div>
    )
}

export default GroupTile