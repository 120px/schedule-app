import { useEffect, useState } from 'react';
import './index.css';
import { auth } from './firebase-config';
import Authentication from './components/Authentication/Authentication';
import Dashboard from './components/Main/Dashboard/Dashboard';
import CreateEvent from './components/Main/Dashboard/Events/CreateEvent';
import Main from './components/Main/Main';
import Sidebar from './components/Main/Sidebar/Sidebar';
import UserModel from './models/auth/UserModel';
import { User, onAuthStateChanged } from 'firebase/auth';

function App() {

  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [showSidebar, toggleShowSidebar] = useState<Boolean>(false)
  const [loggedIn, toggleLoggedIn] = useState<Boolean>(false)

  const handleSidebar = () => {
    toggleShowSidebar(prev => !prev)
  }

  useEffect(() => {
    const checkIfUser = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => {
      checkIfUser()
    }
  }, [])

  console.log(user)

  return (
    <div className="">
      {user ? <Main user={user}/> : <Authentication />}

    </div>
  );
}

export default App;
