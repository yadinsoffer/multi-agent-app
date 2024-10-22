// src/components/SideMenu.js
import React from 'react';
import { Link } from 'react-router-dom'; // Optional: If you're using React Router for navigation

const SideMenu = () => {
    return (
        <div style={{ padding: '10px' }}>
            <h3>Menu</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/settings" style={{ textDecoration: 'none', color: '#333' }}>Settings</Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/notifications" style={{ textDecoration: 'none', color: '#333' }}>Notifications</Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/help" style={{ textDecoration: 'none', color: '#333' }}>Help</Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/logout" style={{ textDecoration: 'none', color: '#333' }}>Logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;
