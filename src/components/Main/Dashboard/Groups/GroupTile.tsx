import React from 'react'
import GroupData from '../../../../models/Group/GroupData'
import { Link } from 'react-router-dom'

interface GroupTileProps {
    group: GroupData

}

const GroupTile: React.FC<GroupTileProps> = ({ group }: GroupTileProps) => {
    return (
        <div className="flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md px-10">
            <div className='mx-auto pt-8'>
                <img className='h-16 w-16 rounded-full' src='https://images.unsplash.com/photo-1519951529813-0c1a4fe5a82c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
            </div>
            <div className="p-6">
                <h5 className="text-center mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {group !== undefined ? group.groupData.name : null}
                </h5>

                {/* add images of members */}

            </div>
            <div className="p-3 pt-0 text-center flex">
                <Link to={`/group/${group.groupData.id}/dashboard`} data-ripple-light="true" type="button" className="bg-createButton">
                    info
                </Link>
                <Link to={`/group/${group.groupData.id}/dashboard`} data-ripple-light="true" type="button" className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Visit
                </Link>
            </div>
        </div>
    )
}

export default GroupTile