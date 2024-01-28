import React, { useEffect, useState } from 'react'
import GroupTile from './GroupTile'
import { auth, db } from '../../../../firebase-config'
import { collection, doc, getDoc, query, where } from 'firebase/firestore'
import GroupData from '../../../../models/Group/GroupData'

const MyGroups = () => {

    const [userGroups, setUserGroups] = useState<Array<GroupData>>()

    useEffect(() => {
        console.log(auth.currentUser?.uid)
        getUserGroups()

        console.log(userGroups)

        return () => {

        }
    }, [])


    const getUserGroups = async () => {
        // const userGroupCollectionRef = doc(db, "user", (auth.currentUser!.uid).toString())
        console.log(auth.currentUser)
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
            arr.push(data2)
        }

        console.log(arr)
        setUserGroups(arr)
    }

    // Tiles:
    // # of Members, icons of members
    // show the description

    return (
        <div className='mx-auto grid grid-cols-3 gap-6 h-max mt-12 w-4/5'>
            {userGroups !== undefined && userGroups.length > 0 ?
                <>{userGroups!.map(group =>
                    <GroupTile group={group}></GroupTile>)}
                </>

                : <div> You have not joined any groups yet. Try making one! </div>}

        </div>
    )
}

export default MyGroups