import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';
import ChatWindow from './ChatWindow';
import CurrentItem from './CurrentItem';
import CurrentAgents from './CurrentAgents';
import AvailableAgents from './AvailableAgents';
import Settings from './Settings';
import Backlog from './Backlog';
import { FiClock, FiUsers, FiCheckCircle, FiTrendingUp, FiCalendar, FiMail, FiPhoneCall } from 'react-icons/fi';

const DashboardCard = ({ title, value, change, icon: Icon, color = '#3B82F6' }) => (
    <div style={{
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
            }}>
                <Icon size={20} color={color} />
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>{value}</div>
            {change && (
                <div style={{
                    fontSize: '14px',
                    color: change.startsWith('+') ? '#059669' : change === '0%' ? '#6B7280' : '#DC2626'
                }}>
                    {change}
                </div>
            )}
        </div>
    </div>
);

const ChartCard = ({ title, children }) => (
    <div style={{
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
        <div style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: '#111827'
        }}>
            {title}
        </div>
        {children}
    </div>
);

const MainLayout = ({ 
    currentAgents, 
    setCurrentAgents, 
    currentTasks, 
    handleTasksUpdate 
}) => {
    const [timeRange, setTimeRange] = useState('7d');

    return (
        <>
            <Header />
            <div className="container" style={{ display: 'flex', height: '100vh' }}>
                <div className="sidebar">
                    <SideMenu />
                </div>
                <Routes>
                    <Route path="/settings" element={
                        <div className="main-content" style={{ flex: 1, padding: '20px' }}>
                            <Settings />
                        </div>
                    } />
                    <Route path="/backlog" element={
                        <div className="main-content" style={{ flex: 1, padding: '20px' }}>
                            <Backlog />
                        </div>
                    } />
                    <Route path="/metrics" element={
                        <div className="main-content" style={{ 
                            flex: 1, 
                            padding: '24px',
                            backgroundColor: '#F9FAFB',
                            overflowY: 'auto'
                        }}>
                            {/* Dashboard Header */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '24px'
                            }}>
                                <div>
                                    <h1 style={{ 
                                        fontSize: '24px', 
                                        fontWeight: '600',
                                        color: '#111827',
                                        marginBottom: '8px'
                                    }}>
                                        Dashboard
                                    </h1>
                                    <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                        AI Agent Performance & Impact Overview
                                    </p>
                                </div>
                                <select 
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    style={{
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        backgroundColor: 'white',
                                        fontSize: '14px',
                                        color: '#374151'
                                    }}
                                >
                                    <option value="24h">Last 24 Hours</option>
                                    <option value="7d">Last 7 Days</option>
                                    <option value="30d">Last 30 Days</option>
                                    <option value="ytd">Year to Date</option>
                                </select>
                            </div>

                            {/* Top-Level KPIs */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '24px',
                                marginBottom: '24px'
                            }}>
                                <DashboardCard 
                                    title="Hours Saved This Month"
                                    value="1,250"
                                    change="+12.5%"
                                    icon={FiClock}
                                    color="#3B82F6"
                                />
                                <DashboardCard 
                                    title="Active AI Agents"
                                    value="8/10"
                                    change="+2"
                                    icon={FiUsers}
                                    color="#059669"
                                />
                                <DashboardCard 
                                    title="Tasks Completed"
                                    value="842"
                                    change="+15.3%"
                                    icon={FiCheckCircle}
                                    color="#6366F1"
                                />
                                <DashboardCard 
                                    title="Efficiency Score"
                                    value="94%"
                                    change="+5.2%"
                                    icon={FiTrendingUp}
                                    color="#F59E0B"
                                />
                            </div>

                            {/* Time Savings & Agent Activity */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr',
                                gap: '24px',
                                marginBottom: '24px'
                            }}>
                                <ChartCard title="Time Saved Over Time">
                                    <div style={{ 
                                        height: '300px',
                                        position: 'relative',
                                        padding: '20px 0'
                                    }}>
                                        {/* Y-axis labels */}
                                        <div style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 20,
                                            width: '50px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            fontSize: '12px',
                                            color: '#6B7280'
                                        }}>
                                            <div>100h</div>
                                            <div>75h</div>
                                            <div>50h</div>
                                            <div>25h</div>
                                            <div>0h</div>
                                        </div>

                                        {/* Chart area */}
                                        <div style={{
                                            marginLeft: '50px',
                                            height: '100%',
                                            position: 'relative',
                                            backgroundColor: '#F9FAFB',
                                            borderRadius: '8px',
                                            border: '1px solid #E5E7EB',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Grid lines */}
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <div key={i} style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    top: `${i * 25}%`,
                                                    borderBottom: '1px dashed #E5E7EB',
                                                    height: '1px'
                                                }} />
                                            ))}

                                            {/* Mock line chart */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '20%',
                                                left: 0,
                                                right: 0,
                                                height: '60%',
                                                background: `linear-gradient(180deg, 
                                                    rgba(59, 130, 246, 0.1) 0%, 
                                                    rgba(59, 130, 246, 0) 100%)`,
                                                clipPath: 'polygon(0 100%, 5% 80%, 15% 85%, 25% 65%, 35% 70%, 45% 45%, 55% 50%, 65% 35%, 75% 45%, 85% 30%, 95% 40%, 100% 20%, 100% 100%)'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '20%',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                background: '#3B82F6',
                                                clipPath: 'polygon(0 0, 5% 80%, 15% 85%, 25% 65%, 35% 70%, 45% 45%, 55% 50%, 65% 35%, 75% 45%, 85% 30%, 95% 40%, 100% 20%)'
                                            }} />

                                            {/* Data points */}
                                            {[20, 80, 85, 65, 70, 45, 50, 35, 45, 30, 40, 20].map((height, i) => (
                                                <div key={i} style={{
                                                    position: 'absolute',
                                                    bottom: `${height}%`,
                                                    left: `${i * 8.33 + 5}%`,
                                                    width: '8px',
                                                    height: '8px',
                                                    backgroundColor: '#3B82F6',
                                                    borderRadius: '50%',
                                                    transform: 'translate(-50%, 50%)'
                                                }} />
                                            ))}
                                        </div>

                                        {/* X-axis labels */}
                                        <div style={{
                                            marginLeft: '50px',
                                            marginTop: '8px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '12px',
                                            color: '#6B7280'
                                        }}>
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                                <div key={day}>{day}</div>
                                            ))}
                                        </div>
                                    </div>
                                </ChartCard>
                                <ChartCard title="Task Distribution">
                                    <div style={{ marginBottom: '16px' }}>
                                        {[
                                            { type: 'Scheduling', percentage: 40, color: '#3B82F6' },
                                            { type: 'Document Drafting', percentage: 30, color: '#059669' },
                                            { type: 'Lead Follow-ups', percentage: 20, color: '#6366F1' },
                                            { type: 'Property Research', percentage: 10, color: '#F59E0B' }
                                        ].map(task => (
                                            <div key={task.type} style={{ marginBottom: '12px' }}>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    justifyContent: 'space-between',
                                                    marginBottom: '4px',
                                                    fontSize: '14px'
                                                }}>
                                                    <span>{task.type}</span>
                                                    <span style={{ color: '#6B7280' }}>{task.percentage}%</span>
                                                </div>
                                                <div style={{ 
                                                    height: '8px',
                                                    backgroundColor: '#F3F4F6',
                                                    borderRadius: '4px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: `${task.percentage}%`,
                                                        height: '100%',
                                                        backgroundColor: task.color,
                                                        transition: 'width 0.3s ease'
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ChartCard>
                            </div>

                            {/* Agent Performance & Task Types */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '24px',
                                marginBottom: '24px'
                            }}>
                                <ChartCard title="Top Performing Agents">
                                    {[
                                        { name: 'Sydney', tasks: 245, efficiency: 98 },
                                        { name: 'Lance', tasks: 198, efficiency: 95 },
                                        { name: 'Ron', tasks: 156, efficiency: 92 }
                                    ].map((agent, index) => (
                                        <div key={agent.name} style={{
                                            padding: '12px 0',
                                            borderBottom: index < 2 ? '1px solid #E5E7EB' : 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{agent.name}</div>
                                                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                                                    {agent.tasks} tasks
                                                </div>
                                            </div>
                                            <div style={{
                                                fontSize: '14px',
                                                padding: '4px 8px',
                                                backgroundColor: '#ECFDF5',
                                                color: '#059669',
                                                borderRadius: '12px'
                                            }}>
                                                {agent.efficiency}% efficient
                                            </div>
                                        </div>
                                    ))}
                                </ChartCard>
                                <ChartCard title="Task Success Rate">
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px'
                                    }}>
                                        {[
                                            { type: 'Scheduling', icon: FiCalendar, success: 95 },
                                            { type: 'Emails', icon: FiMail, success: 92 },
                                            { type: 'Calls', icon: FiPhoneCall, success: 88 }
                                        ].map(task => (
                                            <div key={task.type}>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center',
                                                    marginBottom: '8px'
                                                }}>
                                                    <task.icon size={16} style={{ marginRight: '8px' }} />
                                                    <span style={{ fontSize: '14px' }}>{task.type}</span>
                                                </div>
                                                <div style={{ 
                                                    height: '8px',
                                                    backgroundColor: '#F3F4F6',
                                                    borderRadius: '4px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: `${task.success}%`,
                                                        height: '100%',
                                                        backgroundColor: '#3B82F6',
                                                        transition: 'width 0.3s ease'
                                                    }} />
                                                </div>
                                                <div style={{ 
                                                    fontSize: '12px',
                                                    color: '#6B7280',
                                                    marginTop: '4px'
                                                }}>
                                                    {task.success}% success rate
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ChartCard>
                                <ChartCard title="AI vs Human Intervention">
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{
                                            fontSize: '36px',
                                            fontWeight: '600',
                                            color: '#059669',
                                            marginBottom: '8px'
                                        }}>
                                            92%
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#6B7280' }}>
                                            Tasks completed without human intervention
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            height: '8px',
                                            backgroundColor: '#F3F4F6',
                                            borderRadius: '4px',
                                            margin: '16px 0',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: '92%',
                                                height: '100%',
                                                backgroundColor: '#059669',
                                                transition: 'width 0.3s ease'
                                            }} />
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#6B7280' }}>
                                            8% required human assistance
                                        </div>
                                    </div>
                                </ChartCard>
                            </div>
                        </div>
                    } />
                    <Route path="/dashboard" element={
                        <>
                            <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <ChatWindow onTasksUpdate={handleTasksUpdate} />
                            </div>
                            <div className="right-sidebar" style={{ width: '300px' }}>
                                <CurrentItem tasks={currentTasks} />
                                <CurrentAgents currentAgents={currentAgents} setCurrentAgents={setCurrentAgents} />
                                <AvailableAgents currentAgents={currentAgents} setCurrentAgents={setCurrentAgents} />
                            </div>
                        </>
                    } />
                </Routes>
            </div>
        </>
    );
};

export default MainLayout; 