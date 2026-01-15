import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import GroupSearchBar from './GroupSearchBar/GroupSearchBar'
import { useCurrentGroup } from '../../provider/CurrentGroupProvider';
import { User } from '../../models/User/User';

interface Dashboard_feedProps {
    currentUser: User | undefined
}

const Dashboard_Header: React.FC<Dashboard_feedProps> = ({ currentUser }) => {

    const { currentGroup } = useCurrentGroup();
    const { groupId } = useParams()
    useEffect(() => {

    }, [])

    return (
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-black tracking-tight text-[#181310] dark:text-white">
                    {`Welcome back, ${currentUser?.data.username || 'Friend'}!`}
                </h2>
                <p className="text-[#8d6d5e] dark:text-white/60 mt-1">You have events coming up this week.</p>
            </div>
            <div className="flex gap-3">
                <div className="relative">
                    <span className="material-symbols-outlined p-2 text-slate-sidebar dark:text-white bg-white dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 cursor-pointer">notifications</span>
                    <div className="absolute top-0 right-0 size-3 bg-primary rounded-full border-2 border-white dark:border-background-dark"></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard_Header