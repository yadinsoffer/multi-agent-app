import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './components/Login';
import { AVAILABLE_AGENT_ROLES } from './config/agents';
import './App.css';

const MIN_AVAILABLE_AGENTS = 2;

function App() {
  const [currentAgents, setCurrentAgents] = useState([]);
  const [availableAgents, setAvailableAgents] = useState(AVAILABLE_AGENT_ROLES);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTasks, setCurrentTasks] = useState([]);

  const handleTasksUpdate = (tasks) => {
    setCurrentTasks(tasks);
  };

  const transferAgents = () => {
    const transferInterval = setInterval(() => {
      if (availableAgents.length <= MIN_AVAILABLE_AGENTS) {
        clearInterval(transferInterval);
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableAgents.length);
      const agentToTransfer = availableAgents[randomIndex];

      setCurrentAgents((prev) => [...prev, agentToTransfer]);
      setAvailableAgents((prev) => prev.filter((_, index) => index !== randomIndex));

      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }, 2000);

    const stopTransferTimeout = setTimeout(() => {
      clearInterval(transferInterval);
    }, 10000);

    return () => {
      clearInterval(transferInterval);
      clearTimeout(stopTransferTimeout);
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      transferAgents();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/*" element={
          <MainLayout
            currentAgents={currentAgents}
            setCurrentAgents={setCurrentAgents}
            currentTasks={currentTasks}
            handleTasksUpdate={handleTasksUpdate}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;
