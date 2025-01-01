// src/components/SideMenu.js
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported
import { FaUser, FaCog, FaBell, FaQuestionCircle, FaSignOutAlt, FaClock, FaChartPie, FaListUl } from 'react-icons/fa';

const SideMenu = () => {
    return (
        <div style={{ padding: '10px' }}>
            <h3>Menu</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '40px 0', paddingLeft: '20px' }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>
                        <FaClock style={{ marginRight: '8px' }} /> Real-time
                    </Link>
                </li>
                <li style={{ margin: '40px 0', paddingLeft: '20px' }}>
                    <Link to="/backlog" style={{ textDecoration: 'none', color: '#333' }}>
                        <FaListUl style={{ marginRight: '8px' }} /> Backlog
                    </Link>
                </li>
                <li style={{ margin: '40px 0', paddingLeft: '20px' }}>
                    <Link to="/metrics" style={{ textDecoration: 'none', color: '#333' }}>
                        <FaChartPie style={{ marginRight: '8px' }} /> Dashboard
                    </Link>
                </li>
                <li style={{ margin: '40px 0', paddingLeft: '20px' }}>
                    <Link to="/profile" style={{ textDecoration: 'none', color: '#333' }}>
                        <FaUser style={{ marginRight: '8px' }} /> Profile
                    </Link>
                </li>
                <li style={{ margin: '40px 0', paddingLeft: '20px' }}>
                    <Link to="/settings" style={{ textDecoration: 'none', color: '#333' }}>
                        <FaCog style={{ marginRight: '8px' }} /> Settings
                    </Link>
                </li>
                <li style={{ margin: '40px 0', paddingLeft: '20px' }}>
                    <Link to="/notifications" style={{ textDecoration: 'none', color: '#333' }}>
                        <FaBell style={{ marginRight: '8px' }} /> Notifications
                    </Link>
                </li>
                <li style={{ margin: '40px 0', paddingLeft: '20px' }}>
                    <Link to="/help" style={{ textDecoration: 'none', color: '#333' }}>
                        <FaQuestionCircle style={{ marginRight: '8px' }} /> Help
                    </Link>
                </li>
                <li style={{ margin: '40px 0', paddingLeft: '20px' }}>
                    <Link to="/logout" style={{ textDecoration: 'none', color: '#333' }}>
                        <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;
