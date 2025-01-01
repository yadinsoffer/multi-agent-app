// src/components/AvailableAgents.js
import React, { useState } from 'react';
import DraggableAgent from './DraggableAgent';
import {
    ROLE_TEAM_LEAD,
    ROLE_VOICE_COORDINATOR,
    ROLE_SALES_SPECIALIST,
    ROLE_LISTING_SPECIALIST,
    ROLE_DATA_SPECIALIST
} from '../config/agents';

const AvailableAgents = ({ currentAgents, setCurrentAgents }) => {
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    
    const agents = [
        ROLE_TEAM_LEAD,
        ROLE_VOICE_COORDINATOR,
        ROLE_SALES_SPECIALIST,
        ROLE_LISTING_SPECIALIST,
        ROLE_DATA_SPECIALIST
    ];

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle the file upload here
            console.log('File uploaded:', file);
            setShowUploadPopup(false);
        }
    };

    return (
        <div className="agent-container" style={{ 
            padding: '10px', 
            margin: '10px 0', 
            height: 'auto', 
            overflowY: 'scroll', 
            borderRadius: '8px', 
            backgroundColor: '#ffffff' 
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingBottom: '15px'
            }}>
                <h3>Available Agents</h3>
                <span 
                    onClick={() => setShowUploadPopup(true)}
                    style={{ 
                        cursor: 'pointer',
                        color: '#3FC78A',
                        fontSize: '14px'
                    }}
                >
                    Add New
                </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {agents.map((agent, index) => (
                    <DraggableAgent key={index} agent={agent} />
                ))}
            </div>

            {showUploadPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '32px',
                        borderRadius: '12px',
                        width: '960px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}>
                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ 
                                fontSize: '24px',
                                fontWeight: '600',
                                color: '#1e293b',
                                marginBottom: '12px'
                            }}>Add New Agent</h4>
                            <p style={{ 
                                color: '#64748b',
                                fontSize: '16px',
                                marginBottom: '20px'
                            }}>Upload a job description file to create a new agent</p>
                        </div>

                        <div style={{
                            border: '2px dashed #e2e8f0',
                            borderRadius: '12px',
                            padding: '48px',
                            textAlign: 'center',
                            backgroundColor: '#f8fafc',
                            marginBottom: '24px',
                            cursor: 'pointer'
                        }}>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    border: '2px dashed #ccc',
                                    borderRadius: '4px',
                                    marginTop: '10px'
                                }}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px'
                        }}>
                            <button
                                onClick={() => setShowUploadPopup(false)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: 'white',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f8fafc';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white';
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFileUpload}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    backgroundColor: '#f1f5f9',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e2e8f0';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                                }}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailableAgents;
