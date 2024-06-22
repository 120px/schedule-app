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
            const groupMembersData = await doc(db, "groups", groupId);
            const data = (await getDoc(groupMembersData)).data();
            await setGroupInfo(data);
            await getGroupMembersInfo(data!.groupData.members);
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
                data = doc(db, "users", users[i]);
                data2 = (await getDoc(data)).data();
                arr.push(data2!.data);
            }
        }
        console.log(arr)
        setGroupMembers(arr)
    }

    return (
        <div className="mx-auto w-3/4">
            <InviteGroupMember groupInfo={groupInfo} isOpen={isModalOpen} onClose={closeModal}></InviteGroupMember>

            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
                <div className='flex flex-row justify-between'>
                    <div className="flex justify-between items-center mb-4 flex-col">
                        <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white">{groupInfo?.groupData.name !== undefined ? groupInfo?.groupData.name : "Group name's"}</span>
                        <span className="text-lg font-bold leading-none text-gray-900 dark:text-white">Members</span>
                    </div>
                    <div>
                        <button onClick={openModal} type="button" className="bg-createButton text-white
                        px-3 py-2 rounded-md">Invite Member</button>
                    </div>
                </div>

                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {groupmembers !== undefined ? groupmembers!.map((member, index) =>
                            <GroupMemberDetails key={index} member={member} />
                        ) : "No data"}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GroupMembers