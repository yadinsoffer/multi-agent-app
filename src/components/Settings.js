import React from 'react';

const Settings = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Settings</h2>
            <h3>Team Management</h3>
            <div>
                <button>Create Team</button>
                <button>Edit Team</button>
                <button>Delete Team</button>
            </div>

            <h3>Task Management</h3>
            <div>
                <label>
                    <input type="checkbox" /> Scheduling Meetings/Viewings
                </label>
                <label>
                    <input type="checkbox" /> Taking Calls
                </label>
                <label>
                    <input type="checkbox" /> Preparing Documents
                </label>
                <label>
                    <input type="checkbox" /> Follow Up with Leads
                </label>
                <label>
                    <input type="checkbox" /> Prepare Listing Materials
                </label>
                <label>
                    <input type="checkbox" /> Data Entry
                </label>
                <label>
                    <input type="checkbox" /> Deadline Tracking/Reminders
                </label>
                <label>
                    <input type="checkbox" /> Prepare Transaction Documents
                </label>
                <label>
                    <input type="checkbox" /> Update Database
                </label>
                <label>
                    <input type="checkbox" /> Post Listings
                </label>
            </div>

            <h3>Notifications</h3>
            <div>
                <label>
                    <input type="checkbox" /> Email Notifications
                </label>
                <label>
                    <input type="checkbox" /> SMS Notifications
                </label>
                <label>
                    <input type="checkbox" /> Reminders for Deadlines
                </label>
            </div>

            <h3>Integrations</h3>
            <div>
                <button>Connect Calendar</button>
                <button>Connect CRM</button>
            </div>

            <h3>User Management</h3>
            <div>
                <button>Invite User</button>
                <button>Remove User</button>
            </div>

            <h3>General Settings</h3>
            <div>
                <label>
                    Default Meeting Duration: 
                    <input type="number" placeholder="30" /> minutes
                </label>
                <label>
                    <input type="file" /> Upload Logo
                </label>
            </div>
        </div>
    );
};

export default Settings;
