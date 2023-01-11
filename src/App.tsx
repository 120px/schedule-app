import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';

function App() {

  const [showSidebar, toggleShowSidebar] = useState<Boolean>(false)

  return (
    <div className="App">
      <Sidebar></Sidebar>

    </div>
  );
}

export default App;
