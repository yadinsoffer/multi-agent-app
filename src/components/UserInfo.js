// src/components/UserInfo.js
import React from 'react';
import defaultUserIcon from '../assets/default-user-icon.png'; // Path to your default user icon

const UserInfo = ({ user }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
                src={user.profilePicture || defaultUserIcon} 
                alt="User" 
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} 
            />
            <span>{user.name}</span>
        </div>
    );
};

export default UserInfo;