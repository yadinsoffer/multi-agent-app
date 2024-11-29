// src/components/CurrentItem.js
import React, { useEffect, useState } from 'react';
import { FaSpinner, FaCheckCircle, FaHourglassStart } from 'react-icons/fa'; // Importing new icons

const tasks = [
    { id: 1, text: "Scheduled showing with John", status: "loading" },
    { id: 2, text: "Preparing contract for Rachel", status: "completed" },
    { id: 3, text: "Calling new lead for 455 Michigan", status: "not started" },
];

const CurrentItem = () => {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        // Stop animations after 1 second
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 1000); // 1000 milliseconds = 1 second

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    // Sort tasks to ensure the completed task is first
    const sortedTasks = tasks.sort((a, b) => {
        return a.status === "completed" ? -1 : 1; // Ensure completed tasks are first
    });

    return (
        <div style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            margin: '10px 0', 
            height: 'auto', 
            borderRadius: '8px', 
            backgroundColor: 'white' 
        }}>
            <h3>Current Tasks</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {sortedTasks.map(task => (
                    <li key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        {task.status === "loading" && <FaSpinner className={`loading-icon ${isAnimating ? 'animate' : ''}`} style={{ marginRight: '8px' }} />} 
                        {task.status === "completed" && <FaCheckCircle style={{ marginRight: '8px' }} />} 
                        {task.status === "not started" && <FaHourglassStart className={`hourglass-icon ${isAnimating ? 'animate' : ''}`} style={{ marginRight: '8px' }} />} 
                        <span>{task.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CurrentItem;

//test
