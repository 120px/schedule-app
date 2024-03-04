import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase-config';

const Profile = () => {

    const handleSignOut = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
        });
    }

  return (
    <div>
        <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default Profile