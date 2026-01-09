import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { User } from '../../../../models/User/User';

const Profile = () => {

  const [user, setCurrentUser] = useState<User | undefined>()

  useEffect (() => {
    // @ts-ignore
    if (auth.currentUser !== null) setCurrentUser(auth.currentUser)
  }, [])
  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="flex flex-1 justify-center py-10 px-4 w-full">
        <div className="layout-content-container flex flex-col max-w-[800px] flex-1 gap-6">
            
            <div className="flex flex-col gap-2 p-4">
                <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Profile</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage your account settings and preferences.</p>
            </div>

            <div className="flex flex-col gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                     <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-gray-400 dark:text-gray-500">
                        {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <span className="material-symbols-outlined text-4xl">person</span>}
                     </div>
                     <div className="flex flex-col gap-1">
                        {/* @ts-ignore */}
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.displayName || (user?.email ? user.email.split('@')[0] : 'User')}</h2>
                        {/* @ts-ignore */}
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                     </div>
                </div>
            </div>

            <div className="p-4">
                 <button 
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 font-bold transition-colors w-full sm:w-auto"
                 >
                    <span className="material-symbols-outlined">logout</span>
                    <span>Sign Out</span>
                 </button>
            </div>

        </div>
    </div>
  )
}

export default Profile