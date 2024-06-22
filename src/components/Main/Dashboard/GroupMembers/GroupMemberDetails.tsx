import React from 'react'
import { User } from '../../../../models/User/User'

interface GroupMemberDetails {
    member: User
}

const GroupMemberDetails: React.FC<GroupMemberDetails> = ({ member }: GroupMemberDetails) => {
    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src="" alt="profile picture" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {member !== undefined ? member.username : null}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {member !== undefined ? member.email : null}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                </div>
            </div>
        </li>
    )
}

export default GroupMemberDetails