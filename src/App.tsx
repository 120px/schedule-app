import { useState } from 'react';
import './index.css';
import { auth } from './firebase-config';
import Authentication from './components/Authentication/Authentication';
import Dashboard from './components/Main/Dashboard/Dashboard';
import CreateEvent from './components/Main/Dashboard/Events/CreateEvent';
import Main from './components/Main/Main';
import Sidebar from './components/Main/Sidebar/Sidebar';
import UserModel from './models/auth/UserModel';
import { User } from 'firebase/auth';

function App() {

  // const [user, setUser] = useState<UserModel | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [showSidebar, toggleShowSidebar] = useState<Boolean>(false)
  const [loggedIn, toggleLoggedIn] = useState<Boolean>(false)

  const handleSidebar = () => {
    toggleShowSidebar(prev => !prev)
  }

  console.log(auth.currentUser)

  return (
    <div className="">
      {auth.currentUser == null ? <Authentication setUser={setUser} ></Authentication>
        :
      <Main></Main>}

    </div>
  );
}

export default App;
