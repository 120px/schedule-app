import { useState } from 'react';
import './index.css';
import Authentication from './components/Authentication/Authentication';
import Dashboard from './components/Main/Dashboard/Dashboard';
import CreateEvent from './components/Main/Dashboard/Events/CreateEvent';
import Main from './components/Main/Main';
import Sidebar from './components/Main/Sidebar/Sidebar';
import UserModel from './models/auth/UserModel';

function App() {

  const [user, setUser] = useState<UserModel | undefined>(undefined)
  const [showSidebar, toggleShowSidebar] = useState<Boolean>(false)
  const [loggedIn, toggleLoggedIn] = useState<Boolean>(false)

  const handleSidebar = () => {
    toggleShowSidebar(prev => !prev)
  }

  console.log(user)

  return (
    <div className="">
      {user === undefined ? <Authentication setUser={setUser}></Authentication>
        :
        <Main ></Main>}

      {/* {user === undefined ? <Main ></Main>
        :
        <Main ></Main>} */}

      {/* <CreateEvent></CreateEvent> */}

    </div>
  );
}

export default App;
