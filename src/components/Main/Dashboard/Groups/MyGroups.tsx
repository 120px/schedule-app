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
        // const userGroupCollectionRef = doc(db, "user", (auth.currentUser!.uid).toString())
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

    const getGroupData = async (groups: Array<string>) => {
        let arr: any = []
        let data
        let data2
        for (let i = 0; i < groups.length; i++) {
            data = doc(db, "groups", groups[i])
            data2 = (await getDoc(data)).data()
            data2!.groupData.id = groups[i]
            arr.push(data2)
        }

        setUserGroups(arr)
    }

    // Tiles:
    // # of Members, icons of members
    // show the description

    return (

        <div className='flex flex-col w-full mt-4'>
            <div className='mx-auto flex w-full justify-center gap-10'>
                <form className="max-w-md w-64">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for your group" required />

                    </div>
                </form>

                <Link className='rounded-lg py-3 px-4 bg-createButton text-white' to={"/creategroup"}>Create a Group</Link>

            </div>
            <div className='mx-auto grid grid-cols-3 gap-6 h-max mt-12 w-4/5'>
                {userGroups !== undefined && userGroups.length > 0 ?
                    <>{userGroups!.map(group =>
                        <GroupTile key={group.groupData.id} group={group}></GroupTile>)}
                    </>

                    : <div> You have not joined any groups yet. Try making one! </div>}

            </div>
        </div>
    )
}

export default MyGroups