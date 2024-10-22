import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'; // Ensure this path is correct
import SideMenu from './components/SideMenu'; // Import the SideMenu component
import ChatWindow from './components/ChatWindow'; // Import the ChatWindow component
import CurrentItem from './components/CurrentItem'; // Import CurrentItem
import AvailableAgents from './components/AvailableAgents'; // Import AvailableAgents
import CurrentAgents from './components/CurrentAgents'; // Import CurrentAgents
import './App.css';

function App() {
  const [currentAgents, setCurrentAgents] = useState([]);

  return (
    <Router>
      <Header />
      <div className="container">
        <div className="sidebar">
          <SideMenu />
        </div>
        <div className="main-content">
          <ChatWindow />
        </div>
        <div className="right-sidebar">
          <CurrentItem />
          <AvailableAgents currentAgents={currentAgents} setCurrentAgents={setCurrentAgents} />
          <CurrentAgents currentAgents={currentAgents} setCurrentAgents={setCurrentAgents} />
        </div>
      </div>
    </Router>
  );
}

export default App;
