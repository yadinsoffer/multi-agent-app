import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import ChatWindow from './components/ChatWindow';
import CurrentItem from './components/CurrentItem';
import AvailableAgents from './components/AvailableAgents';
import CurrentAgents from './components/CurrentAgents';
import Settings from './components/Settings';
import Login from './components/Login';
import './App.css';

const MIN_AVAILABLE_AGENTS = 2;

const MainLayout = ({ currentAgents, setCurrentAgents, availableAgents, isAnimating }) => (
  <>
    <Header />
    <div className="container" style={{ display: 'flex', height: '100vh' }}>
      <div className="sidebar">
        <SideMenu />
      </div>
      <Routes>
        <Route path="/settings" element={
          <div className="main-content" style={{ flex: 1, padding: '20px' }}>
            <Settings />
          </div>
        } />
        <Route path="/dashboard" element={
          <>
            <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <ChatWindow />
            </div>
            <div className="right-sidebar" style={{ width: '300px' }}>
              <CurrentItem isAnimating={isAnimating} />
              <CurrentAgents currentAgents={currentAgents} setCurrentAgents={setCurrentAgents} />
              <AvailableAgents currentAgents={currentAgents} setCurrentAgents={setCurrentAgents} />
            </div>
          </>
        } />
      </Routes>
    </div>
  </>
);

function App() {
  const [currentAgents, setCurrentAgents] = useState([]);
  const [availableAgents, setAvailableAgents] = useState([
    'Scheduling Coordinator',
    'Sales Call Specialist',
    'Administrative Assistant',
    'Data Specialist',
    'Legal Counsel'
  ]);
  const [isAnimating, setIsAnimating] = useState(false);

  const transferAgents = () => {
    const transferInterval = setInterval(() => {
      if (availableAgents.length <= MIN_AVAILABLE_AGENTS) {
        clearInterval(transferInterval); // Stop if we can't transfer without going below the minimum
        return;
      }

      // Randomly select an agent to transfer
      const randomIndex = Math.floor(Math.random() * availableAgents.length);
      const agentToTransfer = availableAgents[randomIndex];

      // Update state to transfer the agent
      setCurrentAgents((prev) => [...prev, agentToTransfer]);
      setAvailableAgents((prev) => prev.filter((_, index) => index !== randomIndex));

      // Animate the transfer
      setIsAnimating(true);

      // Stop the animation after 1 second
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }, 2000); // Transfer every 2 seconds

    // Stop the transfer after 10 seconds
    const stopTransferTimeout = setTimeout(() => {
      clearInterval(transferInterval); // Clear the interval
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearInterval(transferInterval);
      clearTimeout(stopTransferTimeout);
    };
  };

  useEffect(() => {
    // Start the transfer of agents after 1 second
    const timer = setTimeout(() => {
      transferAgents();
    }, 1000); // Start after 1 second

    return () => {
      clearTimeout(timer); // Cleanup the timer on component unmount
      // Ensure transferAgents cleanup is handled
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/*"
          element={
            <MainLayout
              currentAgents={currentAgents}
              setCurrentAgents={setCurrentAgents}
              availableAgents={availableAgents}
              isAnimating={isAnimating}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
