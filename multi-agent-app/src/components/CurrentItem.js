// src/components/CurrentItem.js
import React, { useEffect, useState } from 'react';

const TaskStatus = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
};

const getStatusIcon = (status) => {
    switch (status) {
        case TaskStatus.COMPLETED:
            return '✅';
        case TaskStatus.IN_PROGRESS:
            return '⏳';
        case TaskStatus.NOT_STARTED:
        default:
            return '○';
    }
};

const CurrentItem = ({ tasks }) => {
    const [displayedTasks, setDisplayedTasks] = useState(tasks || []);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            setDisplayedTasks(tasks);
        }
    }, [tasks]);

    return (
        <div style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            margin: '10px 0', 
            height: 'auto', 
            borderRadius: '8px',
            backgroundColor: 'white' 
        }}>
            <style>
                {`
                    .task-item {
                        opacity: 1;
                        transition: all 0.3s ease-in-out;
                    }
                `}
            </style>
            <h3 style={{ 
                margin: '0 0 10px 0',
                fontSize: '14px',
                fontWeight: '600'
            }}>Current Tasks</h3>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                minHeight: '50px'
            }}>
                {displayedTasks.map((task, index) => (
                    <div 
                        key={`${task.text}-${index}`}
                        className="task-item"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                            color: task.status === TaskStatus.COMPLETED ? '#047857' : '#374151',
                            textDecoration: task.status === TaskStatus.COMPLETED ? 'line-through' : 'none',
                        }}
                    >
                        <span>{getStatusIcon(task.status)}</span>
                        <span>{task.text}</span>
                    </div>
                ))}
                {displayedTasks.length === 0 && (
                    <div style={{
                        color: '#6B7280',
                        fontSize: '13px',
                    }}>
                        No active tasks
                    </div>
                )}
            </div>
        </div>
    );
};

export { CurrentItem as default, TaskStatus };

//test
