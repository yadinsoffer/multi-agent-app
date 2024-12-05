import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';
import ChatWindow from './ChatWindow';
import CurrentItem from './CurrentItem';
import CurrentAgents from './CurrentAgents';
import AvailableAgents from './AvailableAgents';
import Settings from './Settings';

const MainLayout = ({ 
    currentAgents, 
    setCurrentAgents, 
    currentTasks, 
    handleTasksUpdate 
}) => (
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
                            <ChatWindow onTasksUpdate={handleTasksUpdate} />
                        </div>
                        <div className="right-sidebar" style={{ width: '300px' }}>
                            <CurrentItem tasks={currentTasks} />
                            <CurrentAgents currentAgents={currentAgents} setCurrentAgents={setCurrentAgents} />
                            <AvailableAgents currentAgents={currentAgents} setCurrentAgents={setCurrentAgents} />
                        </div>
                    </>
                } />
            </Routes>
        </div>
    </>
);

export default MainLayout; 