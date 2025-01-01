// src/components/CurrentAgents.js
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ClipLoader } from 'react-spinners';
import { VALID_AGENT_ROLES } from '../config/agents';

const CurrentAgents = ({ currentAgents, setCurrentAgents }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'AGENT',
        drop: (item) => addAgent(item.agent),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [loading, setLoading] = useState(true);

    const addAgent = (agent) => {
        if (VALID_AGENT_ROLES.includes(agent) && !currentAgents.includes(agent)) {
            if (currentAgents.length < 4) {
                setCurrentAgents((prev) => {
                    if (prev.length === 0) {
                        setLoading(false);
                    }
                    return [...prev, agent];
                });
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={drop} className="current-agents" style={{ 
            padding: '10px', 
            margin: '10px 0', 
            height: 'auto', 
            overflowY: 'scroll', 
            borderRadius: '8px', 
            backgroundColor: isOver ? '#e0e0e0' : '#ffffff'
        }}>
            <h3 style={{ paddingBottom: '15px' }}>Current Agents</h3>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <ClipLoader color="#e0e0e0" loading={loading} size={30} />
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {currentAgents.map((agent, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                padding: '10px', 
                                borderRadius: '8px', 
                                backgroundColor: '#e0e0e0'
                            }}
                        >
                            {agent}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrentAgents;
