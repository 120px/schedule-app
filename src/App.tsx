import { useState } from 'react';
import './App.css';
import Authentication from './components/Authentication/Authentication';
import Dashboard from './components/Dashboard/Dashboard';
import MyEvents from './components/Sidebar/components/MyEvents';
import Sidebar from './components/Sidebar/Sidebar';

function App() {

  const [showSidebar, toggleShowSidebar] = useState<Boolean>(false)
  const [loggedIn, toggleLoggedIn] = useState<Boolean>(false)

  const handleSidebar = () => {
    toggleShowSidebar(prev => !prev)
  }

  return (
    <div className="App">
      {!loggedIn ? <Authentication></Authentication> : null}

      <div className='flex flex-row gap-10'>
        {/* <Sidebar></Sidebar>
        <Dashboard></Dashboard>
        <MyEvents></MyEvents> */}
      </div>

    </div>
  );
}

export default App;
