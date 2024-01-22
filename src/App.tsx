import { useEffect, useState } from 'react';
import './index.css';
import { auth, db } from './firebase-config';
import Authentication from './components/Authentication/Authentication';
import Dashboard from './components/Main/Dashboard/Dashboard';
import CreateEvent from './components/Main/Dashboard/Events/CreateEvent';
import Main from './components/Main/Main';
import Sidebar from './components/Main/Sidebar/Sidebar';
import UserModel from './models/auth/UserModel';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function App() {

  const [user, setUser] = useState<User | null>(null)
  const [showSidebar, toggleShowSidebar] = useState<Boolean>(false)
  const [loggedIn, toggleLoggedIn] = useState<Boolean>(false)
  const [userGroups, setUserGroups] = useState<any>()

  const handleSidebar = () => {
    toggleShowSidebar(prev => !prev)
  }

  const getUserGroups = async () => {
    const userGroupCollectionRef = doc(db, "user", user!.uid)
    const data = await getDoc(userGroupCollectionRef)
    

    if (data)
      setUserGroups(data.data())
    else
      console.log("no groups rn")
  }

  useEffect(() => {
    const checkIfUser = auth.onAuthStateChanged(async (user) => {
      setUser(user)
    })

    if (user) {
      getUserGroups()
    }

    return () => {
      checkIfUser()
    }
  }, [])

  return (
    <div className="">
      {user ? <Main user={user} /> : <Authentication />}

    </div>
  );
}

export default App;
