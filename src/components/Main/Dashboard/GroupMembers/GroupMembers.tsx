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
        setGroupMembers(arr)
    }

    return (
        <div className="flex flex-1 justify-center py-10 px-4 w-full">
            <InviteGroupMember groupInfo={groupInfo} isOpen={isModalOpen} onClose={closeModal}></InviteGroupMember>
            
            <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
                {/* Header */}
                <div className="flex flex-wrap items-end justify-between gap-4 p-4 mb-4">
                    <div className="flex min-w-72 flex-col gap-2">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                            <span>Groups</span>
                            <span>/</span>
                            <span>{groupInfo?.groupData.name}</span>
                        </div>
                        <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                            {groupInfo?.groupData.name !== undefined ? groupInfo?.groupData.name : "Group"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">{groupmembers ? groupmembers.length : 0} Members</p>
                    </div>
                    <button onClick={openModal} className="flex min-w-[140px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-xl">person_add</span>
                        <span className="truncate">Invite Member</span>
                    </button>
                </div>

                {/* Tabs (Static for now) */}
                <div className="pb-3 px-4">
                    <div className="flex border-b border-gray-200 dark:border-gray-800 gap-8">
                        <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-gray-900 dark:text-white pb-[13px] pt-4" href="#">
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">All Members</p>
                        </a>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="px-4 py-4">
                    <label className="flex flex-col min-w-40 h-12 w-full">
                        <div className="flex w-full flex-1 items-stretch rounded-xl h-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
                            <div className="text-gray-400 flex items-center justify-center pl-4">
                                <span className="material-symbols-outlined">person_search</span>
                            </div>
                            <input className="form-input flex w-full min-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-gray-400 px-4 pl-2 text-base font-normal" placeholder="Find a member..." />
                        </div>
                    </label>
                </div>

                {/* Member List */}
                <div className="flex flex-col gap-1 px-2">
                    {groupmembers !== undefined ? groupmembers!.map((member, index) =>
                        <GroupMemberDetails key={index} member={member} />
                    ) : <p className="px-4">No members found.</p>}
                </div>
            </div>
        </div>
    )
}

export default GroupMembers