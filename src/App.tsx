import { useState } from 'react';
import './App.css';
import Authentication from './components/Sidebar/Authentication/Authentication';
import Sidebar from './components/Sidebar/Sidebar';

function App() {

  const [showSidebar, toggleShowSidebar] = useState<Boolean>(false)
  const [loggedIn, toggleLoggedIn] = useState<Boolean>(false)

  const handleSidebar = () => {
    toggleShowSidebar(prev => !prev)
  }

  return (
    <div className="App">
      {/* {!loggedIn ? <Authentication></Authentication> : null} */}
      <Sidebar></Sidebar>
      

    </div>
  );
}

export default App;
