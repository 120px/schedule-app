import React, { useEffect, useState } from 'react'
import GroupTile from './GroupTile'
import { auth, db } from '../../../../firebase-config'
import { collection, doc, getDoc, query, where } from 'firebase/firestore'
import GroupData from '../../../../models/Group/GroupData'
import { Link } from 'react-router-dom'

// https://dribbble.com/shots/5257657-Group-List-UI-Design

const MyGroups = () => {

    const [userGroups, setUserGroups] = useState<Array<GroupData>>()

    useEffect(() => {
        getUserGroups()
        return () => {

        }
    }, [])

    const getUserGroups = async () => {
        const userData = doc(db, "users", auth.currentUser!.uid)
        const userDataSnap = await getDoc(userData);

        if (userDataSnap.exists()) {
            // Access a specific field, for example, 'username'
            const groups = userDataSnap.data().groups;
            if (groups)
                getGroupData(groups)
        } else {
            // Handle the case where the document doesn't exist
            console.log("No such document!");
        }
    }

    const getGroupData = async (groups: Array<{ id: string }>): Promise<void> => {
        try {
            const promises = groups.map(async (group) => {
                const docRef = doc(db, "groups", group.id);
                const docSnap = await getDoc(docRef);
                const data = docSnap.data()

                if (data) {
                    data.groupData.id = group.id;
                }

                return data;
            });

            const results = await Promise.all(promises);
            const filteredResults = results.filter((result) => result !== undefined) as GroupData[];

            setUserGroups(filteredResults);
        } catch (error) {
            console.error("Error fetching group data:", error);
        }
    };

    // Tiles:
    // # of Members, icons of members
    // show the description

    return (
        <div className="max-w-7xl mx-auto px-8 py-10 w-full">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[#181310] dark:text-white text-4xl font-black leading-tight tracking-tight">My Groups</h2>
                    <p className="text-[#8d6d5e] text-base font-normal">You are managing {userGroups ? userGroups.length : 0} groups.</p>
                </div>
                <Link to={"/creategroup"} className="flex items-center gap-2 cursor-pointer rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Create Group</span>
                </Link>
            </div>

            {/* Search/Filter Bar */}
            <div className="mb-8">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[#8d6d5e]">search</span>
                    </div>
                    <input className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-none rounded-xl text-[#181310] dark:text-white placeholder:text-[#8d6d5e] shadow-sm focus:ring-2 focus:ring-primary/50 transition-all text-sm" placeholder="Search groups by name or keyword..." type="text"/>
                </div>
            </div>

            {/* Groups Grid */}
            <>
                {userGroups !== undefined && userGroups.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {userGroups!.map(group =>
                            <GroupTile key={group.groupData.id} group={group}></GroupTile>
                        )}
                         
                        {/* Add New Group Card (as displayed in design) */}
                         <Link to="/creategroup" className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/30 p-10 hover:border-primary/50 hover:bg-primary/5 transition-all group min-h-[350px]">
                            <div className="size-16 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">add</span>
                            </div>
                            <p className="text-lg font-bold">Add New Group</p>
                        </Link>
                    </div>

                    : <div className='text-center pt-6'> You have not joined any groups yet. Try making one! </div>}
            </>
        </div>
    )
}

export default MyGroups