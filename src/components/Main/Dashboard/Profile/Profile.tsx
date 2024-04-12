import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';
import { User } from '../../../../models/User/User';

const Profile = () => {

  const [user, setCurrentUser] = useState<User | undefined>()

  useEffect (() => {
    if (auth.currentUser !== null)
      setCurrentUser(auth.currentUser)

  }, [])
  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='w-3/4 mx-auto'>
      <div className='flex flex-row'>
        <div className=''>

        </div>
        <div className=''>

        </div>

        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      
    </div>
  )
}

export default Profile