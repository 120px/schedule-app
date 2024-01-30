import React, { useEffect, useState } from 'react'
import GroupMemberDetails from './GroupMemberDetails'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../firebase-config'
import GroupData from '../../../../models/Group/GroupData'
import { User } from '../../../../models/User/User'

const GroupMembers = () => {

    const { groupId } = useParams()
    const [groupInfo, setGroupInfo] = useState<GroupData | undefined>()
    const [groupmembers, setGroupMembers] = useState<Array<User>>()

    useEffect(() => {
        getGroupMembers()

        return () => {

        }
    }, [])

    const getGroupMembers = async () => {
        if (groupId) {
            const groupMembersData = doc(db, "groups", groupId)
            const data = (await getDoc(groupMembersData)).data()!.groupData;
            setGroupInfo(data!.members)
            getGroupMembersInfo(data!.members)
        }
        else
            console.log("nothing here")
    }

    const getGroupMembersInfo = async (users: Array<string>) => {
        let arr: any = []
        let data
        let data2
        if (users.length) {
            for (let i = 0; i < users.length; i++) {
                data = doc(db, "users", users[i])
                console.log(users[i])
                data2 = (await getDoc(data)).data()
                arr.push(data2!.data)
            }
        }
        setGroupMembers(arr)
    }


    return (
        <div className="ml-auto w-3/4">

            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4 flex-col">
                    <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">Group Name's</span>
                    <span className="text-lg font-bold leading-none text-gray-900 dark:text-white">Members</span>
                </div>

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {groupmembers !== undefined ? groupmembers!.map((member) =>
                            <GroupMemberDetails member={member} />
                        ) : "No data"}

                        <li className="pt-3 pb-0 sm:pt-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Thomes Lean
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GroupMembers