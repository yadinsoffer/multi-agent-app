import React, { useState } from 'react';
import { FiUsers, FiLink, FiActivity, FiBell, FiShield, FiCreditCard, FiGlobe, FiDatabase, FiFlag, FiHelpCircle, FiPieChart } from 'react-icons/fi';

const SettingsSection = ({ title, children }) => (
    <div style={{
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        marginBottom: '24px'
    }}>
        <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px'
        }}>{title}</h2>
        {children}
    </div>
);

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 16px',
            cursor: 'pointer',
            backgroundColor: isActive ? '#F3F4F6' : 'transparent',
            borderRadius: '6px',
            color: isActive ? '#111827' : '#6B7280',
            transition: 'all 0.2s ease',
            marginBottom: '4px',
            fontSize: '14px'
        }}
    >
        <Icon style={{ marginRight: '12px' }} />
        {label}
    </div>
);

const FormField = ({ label, children }) => (
    <div style={{ marginBottom: '16px' }}>
        <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
        }}>
            {label}
        </label>
        {children}
    </div>
);

const Button = ({ children, primary, onClick }) => (
    <button
        onClick={onClick}
        style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: primary ? 'none' : '1px solid #D1D5DB',
            backgroundColor: primary ? '#3B82F6' : 'white',
            color: primary ? 'white' : '#374151',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginRight: '8px'
        }}
    >
        {children}
    </button>
);

const Settings = () => {
    const [activeSection, setActiveSection] = useState('users');

    const sections = [
        { id: 'dashboard', label: 'Dashboard', icon: FiPieChart },
        { id: 'users', label: 'User & Role Management', icon: FiUsers },
        { id: 'integrations', label: 'Integrations', icon: FiLink },
        { id: 'workflows', label: 'Workflow & Automation', icon: FiActivity },
        { id: 'notifications', label: 'Notifications', icon: FiBell },
        { id: 'compliance', label: 'Compliance & Security', icon: FiShield },
        { id: 'billing', label: 'Billing', icon: FiCreditCard },
        { id: 'localization', label: 'Localization', icon: FiGlobe },
        { id: 'data', label: 'Data Management', icon: FiDatabase },
        { id: 'experimental', label: 'Experimental Features', icon: FiFlag },
        { id: 'support', label: 'Support', icon: FiHelpCircle }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return (
                    <div>
                        <SettingsSection title="Dashboard Layout">
                            <FormField label="Default View">
                                <select style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px',
                                    marginBottom: '16px'
                                }}>
                                    <option>Grid Layout</option>
                                    <option>List Layout</option>
                                    <option>Compact View</option>
                                </select>
                            </FormField>
                            <FormField label="Widgets">
                                <div style={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '6px',
                                    overflow: 'hidden'
                                }}>
                                    {[
                                        { name: 'Active Calls', enabled: true },
                                        { name: 'Agent Status', enabled: true },
                                        { name: 'Recent Activities', enabled: true },
                                        { name: 'Performance Metrics', enabled: false }
                                    ].map((widget, index, arr) => (
                                        <div key={widget.name} style={{
                                            padding: '12px',
                                            borderBottom: index < arr.length - 1 ? '1px solid #E5E7EB' : 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '500' }}>{widget.name}</div>
                                                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                                                    {widget.enabled ? 'Visible on dashboard' : 'Hidden from dashboard'}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <Button>{widget.enabled ? 'Hide' : 'Show'}</Button>
                                                <Button>Configure</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FormField>
                        </SettingsSection>

                        <SettingsSection title="Data Display">
                            <FormField label="Refresh Rate">
                                <select style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px'
                                }}>
                                    <option>Real-time</option>
                                    <option>Every 5 seconds</option>
                                    <option>Every 15 seconds</option>
                                    <option>Every 30 seconds</option>
                                </select>
                            </FormField>
                            <FormField label="Data Retention">
                                <div style={{
                                    padding: '16px',
                                    backgroundColor: '#F9FAFB',
                                    borderRadius: '6px',
                                    border: '1px solid #E5E7EB',
                                    fontSize: '14px',
                                    color: '#374151'
                                }}>
                                    <div style={{ marginBottom: '12px' }}>Historical data is kept for:</div>
                                    <select style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px'
                                    }}>
                                        <option>Last 24 hours</option>
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>Last 90 days</option>
                                    </select>
                                </div>
                            </FormField>
                        </SettingsSection>
                    </div>
                );
            case 'users':
                return (
                    <div>
                        <SettingsSection title="User Accounts & Profiles">
                            <FormField label="Default User Role">
                                <select style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px'
                                }}>
                                    <option>Agent Operator</option>
                                    <option>Team Lead</option>
                                    <option>Manager</option>
                                    <option>Admin</option>
                                </select>
                            </FormField>
                            <FormField label="User Import">
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button>Import from CSV</Button>
                                    <Button>Sync with Directory</Button>
                                </div>
                            </FormField>
                        </SettingsSection>

                        <SettingsSection title="Role-Based Permissions">
                            <FormField label="Permission Templates">
                                <div style={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '6px',
                                    overflow: 'hidden'
                                }}>
                                    {['Admin', 'Manager', 'Team Lead', 'Agent Operator'].map((role, index) => (
                                        <div key={role} style={{
                                            padding: '12px',
                                            borderBottom: index < 3 ? '1px solid #E5E7EB' : 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ fontSize: '14px' }}>{role}</span>
                                            <Button>Edit Permissions</Button>
                                        </div>
                                    ))}
                                </div>
                            </FormField>
                            <Button primary>Create Custom Role</Button>
                        </SettingsSection>
                    </div>
                );
            case 'integrations':
                return (
                    <div>
                        <SettingsSection title="Email & Calendar Integration">
                            <FormField label="Email Service">
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                    <Button primary>Connect Outlook</Button>
                                    <Button>Connect Gmail</Button>
                                </div>
                                <div style={{
                                    padding: '12px',
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    color: '#374151'
                                }}>
                                    Connected to: outlook@company.com
                                </div>
                            </FormField>
                            <FormField label="Calendar Sync Settings">
                                <select style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px',
                                    marginBottom: '8px'
                                }}>
                                    <option>Every 5 minutes</option>
                                    <option>Every 15 minutes</option>
                                    <option>Every 30 minutes</option>
                                    <option>Every hour</option>
                                </select>
                            </FormField>
                        </SettingsSection>

                        <SettingsSection title="Communication Platforms">
                            <FormField label="Team Chat Integration">
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                    <Button primary>Connect Slack</Button>
                                    <Button>Connect MS Teams</Button>
                                </div>
                            </FormField>
                            <FormField label="Voice Services">
                                <div style={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '6px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        padding: '12px',
                                        borderBottom: '1px solid #E5E7EB',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>Twilio</div>
                                            <div style={{ fontSize: '13px', color: '#6B7280' }}>Voice and SMS services</div>
                                        </div>
                                        <Button>Configure</Button>
                                    </div>
                                    <div style={{ padding: '12px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '500' }}>Call Recording</div>
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            marginTop: '8px'
                                        }}>
                                            <input type="checkbox" id="call-recording" />
                                            <label 
                                                htmlFor="call-recording" 
                                                style={{ 
                                                    marginLeft: '8px',
                                                    fontSize: '13px',
                                                    color: '#374151'
                                                }}
                                            >
                                                Enable automatic call recording
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </FormField>
                        </SettingsSection>

                        <SettingsSection title="CRM & Property Systems">
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '16px'
                            }}>
                                {['Salesforce', 'HubSpot', 'MLS Database', 'DocuSign'].map(system => (
                                    <div key={system} style={{
                                        padding: '16px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '6px',
                                        backgroundColor: '#F9FAFB'
                                    }}>
                                        <div style={{ 
                                            fontSize: '14px', 
                                            fontWeight: '500',
                                            marginBottom: '8px'
                                        }}>{system}</div>
                                        <Button>Connect</Button>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>
                    </div>
                );
            case 'workflows':
                return (
                    <div>
                        <SettingsSection title="Workflow Templates">
                            <div style={{ marginBottom: '16px' }}>
                                <Button primary>Create New Workflow</Button>
                            </div>
                            <div style={{
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                overflow: 'hidden'
                            }}>
                                {[
                                    'Listing Preparation',
                                    'Showing Schedule',
                                    'Contract Processing',
                                    'Lead Follow-up'
                                ].map((workflow, index, arr) => (
                                    <div key={workflow} style={{
                                        padding: '12px',
                                        borderBottom: index < arr.length - 1 ? '1px solid #E5E7EB' : 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{workflow}</div>
                                            <div style={{ fontSize: '13px', color: '#6B7280' }}>Last modified: 2 days ago</div>
                                        </div>
                                        <div>
                                            <Button>Edit</Button>
                                            <Button>Duplicate</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>

                        <SettingsSection title="AI Agent Configuration">
                            <FormField label="Default Behavior Profile">
                                <select style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px'
                                }}>
                                    <option>Balanced (Recommended)</option>
                                    <option>Concise Scheduler</option>
                                    <option>Empathetic Negotiator</option>
                                    <option>Diligent Data Collector</option>
                                </select>
                            </FormField>
                            <FormField label="Task Assignment Rules">
                                <div style={{
                                    padding: '12px',
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '6px',
                                    fontSize: '13px'
                                }}>
                                    <div style={{ marginBottom: '8px' }}>
                                        <input 
                                            type="checkbox" 
                                            id="load-balance" 
                                            defaultChecked 
                                        />
                                        <label 
                                            htmlFor="load-balance"
                                            style={{ marginLeft: '8px' }}
                                        >
                                            Enable load balancing
                                        </label>
                                    </div>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            id="auto-escalate" 
                                            defaultChecked 
                                        />
                                        <label 
                                            htmlFor="auto-escalate"
                                            style={{ marginLeft: '8px' }}
                                        >
                                            Auto-escalate complex tasks
                                        </label>
                                    </div>
                                </div>
                            </FormField>
                        </SettingsSection>
                    </div>
                );
            case 'compliance':
                return (
                    <div>
                        <SettingsSection title="Security Settings">
                            <FormField label="Two-Factor Authentication">
                                <div style={{
                                    padding: '16px',
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '6px',
                                    marginBottom: '16px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '12px'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>2FA Status</div>
                                            <div style={{ fontSize: '13px', color: '#6B7280' }}>Required for all admin users</div>
                                        </div>
                                        <div style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#059669',
                                            color: 'white',
                                            borderRadius: '4px',
                                            fontSize: '12px'
                                        }}>
                                            Enabled
                                        </div>
                                    </div>
                                    <Button>Configure 2FA</Button>
                                </div>
                            </FormField>
                            
                            <FormField label="Session Management">
                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>Session Timeout</div>
                                    <select style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px'
                                    }}>
                                        <option>30 minutes</option>
                                        <option>1 hour</option>
                                        <option>4 hours</option>
                                        <option>8 hours</option>
                                    </select>
                                </div>
                            </FormField>
                        </SettingsSection>

                        <SettingsSection title="Compliance Controls">
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '16px',
                                marginBottom: '16px'
                            }}>
                                {[
                                    { name: 'GDPR Controls', status: 'Enabled' },
                                    { name: 'CCPA Compliance', status: 'Configuring' },
                                    { name: 'Data Retention', status: 'Active' },
                                    { name: 'Audit Logging', status: 'Enabled' }
                                ].map(item => (
                                    <div key={item.name} style={{
                                        padding: '16px',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '6px',
                                        backgroundColor: '#F9FAFB'
                                    }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '12px'
                                        }}>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</div>
                                            <div style={{
                                                fontSize: '12px',
                                                padding: '2px 8px',
                                                backgroundColor: '#E5E7EB',
                                                borderRadius: '4px'
                                            }}>{item.status}</div>
                                        </div>
                                        <Button>Configure</Button>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>
                    </div>
                );
            case 'notifications':
                return (
                    <div>
                        <SettingsSection title="Notification Preferences">
                            <FormField label="Default Channels">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { id: 'email', label: 'Email Notifications', defaultChecked: true },
                                        { id: 'sms', label: 'SMS Alerts', defaultChecked: false },
                                        { id: 'slack', label: 'Slack Messages', defaultChecked: true },
                                        { id: 'inapp', label: 'In-App Notifications', defaultChecked: true }
                                    ].map(channel => (
                                        <div key={channel.id} style={{ display: 'flex', alignItems: 'center' }}>
                                            <input 
                                                type="checkbox" 
                                                id={channel.id} 
                                                defaultChecked={channel.defaultChecked}
                                            />
                                            <label 
                                                htmlFor={channel.id}
                                                style={{ marginLeft: '8px', fontSize: '14px' }}
                                            >
                                                {channel.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </FormField>
                        </SettingsSection>

                        <SettingsSection title="Notification Types">
                            <div style={{
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                overflow: 'hidden'
                            }}>
                                {[
                                    { type: 'Task Assignments', description: 'When new tasks are assigned' },
                                    { type: 'Deal Updates', description: 'Changes in deal status or progress' },
                                    { type: 'System Alerts', description: 'Important system notifications' },
                                    { type: 'Team Activity', description: 'Updates from team members' }
                                ].map((item, index, arr) => (
                                    <div key={item.type} style={{
                                        padding: '12px',
                                        borderBottom: index < arr.length - 1 ? '1px solid #E5E7EB' : 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{item.type}</div>
                                            <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.description}</div>
                                        </div>
                                        <Button>Configure</Button>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>
                    </div>
                );
            case 'billing':
                return (
                    <div>
                        <SettingsSection title="Current Plan">
                            <div style={{
                                padding: '20px',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                marginBottom: '24px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <div>
                                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Enterprise Plan</div>
                                        <div style={{ fontSize: '14px', color: '#6B7280' }}>Unlimited agents and features</div>
                                    </div>
                                    <div style={{
                                        padding: '4px 12px',
                                        backgroundColor: '#059669',
                                        color: 'white',
                                        borderRadius: '16px',
                                        fontSize: '14px'
                                    }}>Active</div>
                                </div>
                                <div style={{ fontSize: '14px', color: '#374151' }}>
                                    Next billing date: December 1, 2023
                                </div>
                            </div>
                            <Button primary>Manage Subscription</Button>
                        </SettingsSection>

                        <SettingsSection title="Usage & Limits">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                                {[
                                    { metric: 'Active Agents', used: 45, total: 50 },
                                    { metric: 'API Calls', used: 8750, total: 10000 },
                                    { metric: 'Storage', used: 85, total: 100 },
                                    { metric: 'Voice Minutes', used: 950, total: 1000 }
                                ].map(item => (
                                    <div key={item.metric} style={{
                                        padding: '16px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '6px',
                                        border: '1px solid #E5E7EB'
                                    }}>
                                        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>{item.metric}</div>
                                        <div style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                                            {item.used} <span style={{ fontSize: '14px', color: '#6B7280' }}>/ {item.total}</span>
                                        </div>
                                        <div style={{
                                            height: '4px',
                                            backgroundColor: '#E5E7EB',
                                            borderRadius: '2px',
                                            marginTop: '8px'
                                        }}>
                                            <div style={{
                                                width: `${(item.used / item.total) * 100}%`,
                                                height: '100%',
                                                backgroundColor: (item.used / item.total) > 0.9 ? '#EF4444' : '#3B82F6',
                                                borderRadius: '2px',
                                                transition: 'width 0.3s ease'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>
                    </div>
                );
            case 'localization':
                return (
                    <div>
                        <SettingsSection title="Language & Region">
                            <FormField label="Default Language">
                                <select style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px',
                                    marginBottom: '16px'
                                }}>
                                    <option>English (US)</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                    <option>German</option>
                                </select>
                            </FormField>
                            <FormField label="Time Zone">
                                <select style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '14px'
                                }}>
                                    <option>Pacific Time (PT)</option>
                                    <option>Eastern Time (ET)</option>
                                    <option>Central European Time (CET)</option>
                                    <option>Japan Standard Time (JST)</option>
                                </select>
                            </FormField>
                        </SettingsSection>

                        <SettingsSection title="Format Preferences">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <FormField label="Date Format">
                                    <select style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px'
                                    }}>
                                        <option>MM/DD/YYYY</option>
                                        <option>DD/MM/YYYY</option>
                                        <option>YYYY-MM-DD</option>
                                    </select>
                                </FormField>
                                <FormField label="Currency">
                                    <select style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        fontSize: '14px'
                                    }}>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>JPY (¥)</option>
                                    </select>
                                </FormField>
                            </div>
                        </SettingsSection>
                    </div>
                );
            case 'data':
                return (
                    <div>
                        <SettingsSection title="Data Import/Export">
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                                <Button primary>Import Data</Button>
                                <Button>Export Data</Button>
                            </div>
                            <div style={{
                                padding: '16px',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '6px',
                                border: '1px solid #E5E7EB',
                                fontSize: '14px',
                                color: '#374151'
                            }}>
                                Last backup: Today at 3:45 PM
                            </div>
                        </SettingsSection>

                        <SettingsSection title="API Access">
                            <FormField label="API Keys">
                                <div style={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '6px',
                                    overflow: 'hidden'
                                }}>
                                    {[
                                        { name: 'Production Key', status: 'Active' },
                                        { name: 'Development Key', status: 'Active' },
                                        { name: 'Testing Key', status: 'Inactive' }
                                    ].map((key, index, arr) => (
                                        <div key={key.name} style={{
                                            padding: '12px',
                                            borderBottom: index < arr.length - 1 ? '1px solid #E5E7EB' : 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '500' }}>{key.name}</div>
                                                <div style={{ fontSize: '13px', color: '#6B7280' }}>Status: {key.status}</div>
                                            </div>
                                            <div>
                                                <Button>Rotate</Button>
                                                <Button>View</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FormField>
                        </SettingsSection>
                    </div>
                );
            case 'experimental':
                return (
                    <div>
                        <SettingsSection title="Beta Features">
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#FEF3C7',
                                    color: '#92400E',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    marginBottom: '16px'
                                }}>
                                    Beta features may be unstable and are subject to change
                                </div>
                                {[
                                    { 
                                        name: 'Advanced AI Scheduling',
                                        description: 'Use machine learning to optimize meeting schedules',
                                        enabled: true
                                    },
                                    {
                                        name: 'Smart Property Matching',
                                        description: 'AI-powered property recommendations',
                                        enabled: false
                                    },
                                    {
                                        name: 'Automated Market Analysis',
                                        description: 'Generate market reports automatically',
                                        enabled: false
                                    }
                                ].map(feature => (
                                    <div key={feature.name} style={{
                                        padding: '16px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '6px',
                                        border: '1px solid #E5E7EB',
                                        marginBottom: '8px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '8px'
                                        }}>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{feature.name}</div>
                                            <div style={{
                                                padding: '2px 8px',
                                                backgroundColor: feature.enabled ? '#ECFDF5' : '#F3F4F6',
                                                color: feature.enabled ? '#059669' : '#6B7280',
                                                borderRadius: '12px',
                                                fontSize: '12px'
                                            }}>
                                                {feature.enabled ? 'Enabled' : 'Disabled'}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#6B7280' }}>{feature.description}</div>
                                        <div style={{ marginTop: '12px' }}>
                                            <Button>{feature.enabled ? 'Disable' : 'Enable'}</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>
                    </div>
                );
            case 'support':
                return (
                    <div>
                        <SettingsSection title="Help & Documentation">
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '16px',
                                marginBottom: '24px'
                            }}>
                                {[
                                    { title: 'Documentation', icon: '📚', link: 'View Docs' },
                                    { title: 'Video Tutorials', icon: '🎥', link: 'Watch Now' },
                                    { title: 'API Reference', icon: '🔧', link: 'Explore API' },
                                    { title: 'Community Forum', icon: '👥', link: 'Join Discussion' }
                                ].map(resource => (
                                    <div key={resource.title} style={{
                                        padding: '16px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '6px',
                                        border: '1px solid #E5E7EB',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>{resource.icon}</div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>{resource.title}</div>
                                        <Button>{resource.link}</Button>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>

                        <SettingsSection title="Contact Support">
                            <div style={{
                                padding: '16px',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '6px',
                                border: '1px solid #E5E7EB',
                                marginBottom: '16px'
                            }}>
                                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Enterprise Support</div>
                                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
                                    24/7 priority support with 1-hour response time
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button primary>Contact Support</Button>
                                    <Button>Schedule Call</Button>
                                </div>
                            </div>
                        </SettingsSection>
                    </div>
                );
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <div style={{ display: 'flex', height: '100%', backgroundColor: '#F9FAFB' }}>
            {/* Sidebar */}
            <div style={{
                width: '280px',
                borderRight: '1px solid #E5E7EB',
                padding: '24px 16px',
                backgroundColor: 'white'
            }}>
                {sections.map(section => (
                    <SidebarItem
                        key={section.id}
                        icon={section.icon}
                        label={section.label}
                        isActive={activeSection === section.id}
                        onClick={() => setActiveSection(section.id)}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: '24px',
                overflowY: 'auto'
            }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Settings;
