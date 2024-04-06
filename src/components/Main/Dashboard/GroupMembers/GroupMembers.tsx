import React, { useEffect, useState } from 'react'
import GroupMemberDetails from './GroupMemberDetails'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../firebase-config'
import GroupData from '../../../../models/Group/GroupData'
import { User } from '../../../../models/User/User'
import InviteGroupMember from './InviteGroupMember'

const GroupMembers = () => {

    const { groupId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupInfo, setGroupInfo] = useState<GroupData>()
    const [groupmembers, setGroupMembers] = useState<Array<User>>()

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        getGroupMembers()

        return () => {

        }
    }, [])

    const getGroupMembers = async () => {
        if (groupId) {
            const groupMembersData = await doc(db, "groups", groupId)
            const data = (await getDoc(groupMembersData)).data();
            await setGroupInfo(data)
            await getGroupMembersInfo(data!.groupData.members)
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
        <div className="mx-auto w-3/4">
            <InviteGroupMember groupInfo={groupInfo} isOpen={isModalOpen} onClose={closeModal}></InviteGroupMember>

            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className='flex flex-row justify-between'>
                    <div className="flex justify-between items-center mb-4 flex-col">
                        <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white">{groupInfo?.groupData.name !== undefined ? groupInfo?.groupData.name : "Group name's"}</span>
                        <span className="text-lg font-bold leading-none text-gray-900 dark:text-white">Members</span>
                    </div>
                    <div>
                        <button onClick={openModal} type="button" className="inline-block rounded bg-orange-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-orange-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0">Invite Member</button>
                    </div>
                </div>

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {groupmembers !== undefined ? groupmembers!.map((member, index) =>
                            <GroupMemberDetails key={index} member={member} />
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