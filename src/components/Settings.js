import React from 'react';

const SettingSection = ({ title, children }) => (
    <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
        <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#111827',
            marginTop: 0,
            marginBottom: '16px'
        }}>{title}</h3>
        {children}
    </div>
);

const Button = ({ children, variant = 'primary', ...props }) => (
    <button
        style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: variant === 'primary' ? '#3B82F6' : '#F3F4F6',
            color: variant === 'primary' ? 'white' : '#374151',
            marginRight: '12px',
            marginBottom: '8px',
        }}
        {...props}
    >
        {children}
    </button>
);

const Checkbox = ({ label, ...props }) => (
    <label style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        color: '#374151',
        marginBottom: '12px',
        cursor: 'pointer'
    }}>
        <input
            type="checkbox"
            style={{
                marginRight: '8px',
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                border: '1px solid #D1D5DB',
                cursor: 'pointer'
            }}
            {...props}
        />
        {label}
    </label>
);

const Settings = () => {
    return (
        <div style={{ 
            maxWidth: '800px',
            margin: '0 auto',
            padding: '32px 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
            <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827',
                marginBottom: '24px'
            }}>Settings</h2>

            <SettingSection title="Team Management">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Button>Create Team</Button>
                    <Button variant="secondary">Edit Team</Button>
                    <Button variant="secondary">Delete Team</Button>
                </div>
            </SettingSection>

            <SettingSection title="Task Management">
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '12px'
                }}>
                    <Checkbox label="Scheduling Meetings/Viewings" />
                    <Checkbox label="Taking Calls" />
                    <Checkbox label="Preparing Documents" />
                    <Checkbox label="Follow Up with Leads" />
                    <Checkbox label="Prepare Listing Materials" />
                    <Checkbox label="Data Entry" />
                    <Checkbox label="Deadline Tracking/Reminders" />
                    <Checkbox label="Prepare Transaction Documents" />
                    <Checkbox label="Update Database" />
                    <Checkbox label="Post Listings" />
                </div>
            </SettingSection>

            <SettingSection title="Notifications">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Checkbox label="Email Notifications" />
                    <Checkbox label="SMS Notifications" />
                    <Checkbox label="Reminders for Deadlines" />
                </div>
            </SettingSection>

            <SettingSection title="Integrations">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Button>Connect Calendar</Button>
                    <Button>Connect CRM</Button>
                </div>
            </SettingSection>

            <SettingSection title="User Management">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Button>Invite User</Button>
                    <Button variant="secondary">Remove User</Button>
                </div>
            </SettingSection>

            <SettingSection title="General Settings">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <label style={{ 
                            fontSize: '14px',
                            color: '#374151'
                        }}>
                            Default Meeting Duration:
                        </label>
                        <input
                            type="number"
                            defaultValue="30"
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                width: '80px',
                                fontSize: '14px'
                            }}
                        />
                        <span style={{ 
                            fontSize: '14px',
                            color: '#374151'
                        }}>minutes</span>
                    </div>
                    
                    <div>
                        <label 
                            htmlFor="logo-upload"
                            style={{
                                display: 'inline-block',
                                padding: '8px 16px',
                                backgroundColor: '#F3F4F6',
                                color: '#374151',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            Upload Logo
                        </label>
                        <input
                            id="logo-upload"
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                </div>
            </SettingSection>
        </div>
    );
};

export default Settings;
