// src/components/AvailableAgents.js
import React from 'react';
import { useDrag } from 'react-dnd';

const agents = [
    'Frontend Engineer',
    'Backend Engineer',
    'QA',
    'Data Analyst',
    'Production Engineer',
    'Dev Ops',
];

const AvailableAgents = ({ currentAgents, setCurrentAgents }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', height: '300px', overflowY: 'scroll' }}>
            <h3>Available Agents</h3>
            <ul>
                {agents
                    .filter(agent => !currentAgents.includes(agent)) // Only show agents not in currentAgents
                    .map((agent) => (
                        <DraggableAgent key={agent} agent={agent} setCurrentAgents={setCurrentAgents} />
                    ))}
            </ul>
        </div>
    );
};

const DraggableAgent = ({ agent, setCurrentAgents }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'AGENT',
        item: { agent },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            {agent}
        </li>
    );
};

export default AvailableAgents;
