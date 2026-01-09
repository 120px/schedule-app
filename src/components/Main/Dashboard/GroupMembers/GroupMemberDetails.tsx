import React from 'react'
import { User } from '../../../../models/User/User'

interface GroupMemberDetails {
    member: User
}

const GroupMemberDetails: React.FC<GroupMemberDetails> = ({ member }: GroupMemberDetails) => {
    // Handling potential data structure inconsistency safely
    // @ts-ignore
    const username = member?.username || member?.data?.username || "Unknown";
     // @ts-ignore
    const email = member?.email || "No email";

    return (
        <div className="flex items-center gap-4 bg-white dark:bg-gray-800/50 px-4 min-h-[84px] py-3 justify-between rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-shadow hover:shadow-md border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 bg-gray-200" style={{backgroundImage: `url('https://ui-avatars.com/api/?name=${username}')`}}></div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-900 dark:text-white text-base font-bold leading-normal line-clamp-1">{username}</p>
                        <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider">Member</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2">{email}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-primary p-2 transition-colors rounded-full hover:bg-primary/10">
                    <span className="material-symbols-outlined">chat_bubble</span>
                </button>
            </div>
        </div>
    )
}

export default GroupMemberDetails