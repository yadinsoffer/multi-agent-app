// src/components/AvailableAgents.js
import React from 'react';
import DraggableAgent from './DraggableAgent';

const AvailableAgents = ({ currentAgents, setCurrentAgents }) => {
    const agents = [
        'Scheduling Coordinator',
        'Sales Call Specialist',
        'Legal Counsel',
        'Video Editor',
        'Administrative Assistant'
    ];

    return (
        <div className="agent-container" style={{ 
            padding: '10px', 
            margin: '10px 0', 
            height: 'auto', 
            overflowY: 'scroll', 
            borderRadius: '8px', 
            backgroundColor: '#ffffff' 
        }}>
            <h3 style={{ paddingBottom: '15px' }}>Available Agents</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {agents.map((agent, index) => (
                    <DraggableAgent key={index} agent={agent} />
                ))}
            </div>
        </div>
    );
};

export default AvailableAgents;
