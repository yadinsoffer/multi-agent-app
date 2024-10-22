// src/components/CurrentAgents.js
import React from 'react';
import { useDrop } from 'react-dnd';

const CurrentAgents = ({ currentAgents, setCurrentAgents }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'AGENT',
        drop: (item) => addAgent(item.agent),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addAgent = (agent) => {
        if (!currentAgents.includes(agent)) {
            setCurrentAgents((prev) => [...prev, agent]);
        }
    };

    return (
        <div ref={drop} style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            margin: '10px', 
            height: '300px', 
            overflowY: 'scroll', 
            borderRadius: '8px', 
            backgroundColor: isOver ? '#e0e0e0' : 'white' // Change background on hover
        }}>
            <h3>Current Agents</h3>
            <ul>
                {currentAgents.map((agent, index) => (
                    <li key={index}>{agent}</li>
                ))}
            </ul>
        </div>
    );
};

export default CurrentAgents;
