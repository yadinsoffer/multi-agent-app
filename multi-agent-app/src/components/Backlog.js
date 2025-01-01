import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
    FiSearch, FiFilter, FiClock, FiMoreVertical, FiCheck, FiX,
    FiPhone, FiFileText, FiCalendar, FiAlertCircle, FiChevronDown,
    FiArrowUp, FiArrowDown
} from 'react-icons/fi';

const TaskStatus = {
    IN_PROGRESS: 'In Progress',
    UP_NEXT: 'Up Next',
    LATER: 'Later'
};

const TaskPriority = {
    HIGH: { label: 'High', color: '#EF4444', background: '#FEE2E2' },
    MEDIUM: { label: 'Medium', color: '#F59E0B', background: '#FEF3C7' },
    LOW: { label: 'Low', color: '#10B981', background: '#D1FAE5' }
};

const TaskCategories = {
    SCHEDULING: { label: 'Scheduling', icon: FiCalendar },
    DOCUMENTATION: { label: 'Documentation', icon: FiFileText },
    COMMUNICATION: { label: 'Communication', icon: FiPhone },
    RESEARCH: { label: 'Market Research', icon: FiSearch },
    FOLLOW_UP: { label: 'Follow-up', icon: FiCheck },
    TRANSACTION: { label: 'Transaction', icon: FiFileText },
    MARKETING: { label: 'Marketing', icon: FiFileText }
};

const mockTasks = [
    // Scheduling Tasks
    {
        id: '1',
        title: 'Schedule viewing for 123 Main St',
        type: 'SCHEDULING',
        priority: 'HIGH',
        agent: 'Sydney',
        estimatedStart: '10:30 AM',
        status: 'Pending',
        dependencies: ['Contact confirmation', 'Property availability check'],
        description: 'Client requested urgent viewing of the property'
    },
    {
        id: '2',
        title: 'Arrange property inspection',
        type: 'SCHEDULING',
        priority: 'MEDIUM',
        agent: 'Lance',
        estimatedStart: '2:00 PM',
        status: 'Queued',
        dependencies: ['Inspector availability confirmation'],
        description: 'Schedule home inspection for 456 Oak Ave'
    },
    {
        id: '3',
        title: 'Set up meeting with mortgage broker',
        type: 'SCHEDULING',
        priority: 'HIGH',
        agent: 'Ron',
        estimatedStart: '11:00 AM',
        status: 'Pending',
        dependencies: [],
        description: 'First-time homebuyer needs mortgage consultation'
    },
    {
        id: '4',
        title: 'Schedule final walkthrough',
        type: 'SCHEDULING',
        priority: 'HIGH',
        agent: 'Sydney',
        estimatedStart: '3:15 PM',
        status: 'Pending',
        dependencies: ['Closing date confirmation'],
        description: 'Pre-closing walkthrough for 789 Pine St'
    },

    // Documentation Tasks
    {
        id: '5',
        title: 'Prepare listing agreement',
        type: 'DOCUMENTATION',
        priority: 'HIGH',
        agent: 'Lance',
        estimatedStart: '9:00 AM',
        status: 'Pending',
        dependencies: ['Property details verification'],
        description: 'New listing agreement for 567 Maple Dr'
    },
    {
        id: '6',
        title: 'Draft purchase offer',
        type: 'DOCUMENTATION',
        priority: 'HIGH',
        agent: 'Sydney',
        estimatedStart: '1:45 PM',
        status: 'Queued',
        dependencies: ['Buyer approval', 'Price confirmation'],
        description: 'Prepare offer for 890 Cedar Ln'
    },
    {
        id: '7',
        title: 'Update property disclosures',
        type: 'DOCUMENTATION',
        priority: 'MEDIUM',
        agent: 'Ron',
        estimatedStart: '4:30 PM',
        status: 'Pending',
        dependencies: ['Seller input'],
        description: 'Update disclosure forms with new information'
    },
    {
        id: '8',
        title: 'Prepare closing documents',
        type: 'DOCUMENTATION',
        priority: 'HIGH',
        agent: 'Lance',
        estimatedStart: '10:15 AM',
        status: 'Queued',
        dependencies: ['Title report', 'Final walkthrough'],
        description: 'Closing documentation for 123 Elm St'
    },

    // Communication Tasks
    {
        id: '9',
        title: 'Call new leads',
        type: 'COMMUNICATION',
        priority: 'HIGH',
        agent: 'Sydney',
        estimatedStart: '9:30 AM',
        status: 'Pending',
        dependencies: [],
        description: 'Follow up with website inquiries from yesterday'
    },
    {
        id: '10',
        title: 'Send listing updates',
        type: 'COMMUNICATION',
        priority: 'MEDIUM',
        agent: 'Ron',
        estimatedStart: '2:30 PM',
        status: 'Queued',
        dependencies: ['Price changes confirmation'],
        description: 'Update clients on new listings matching their criteria'
    },
    {
        id: '11',
        title: 'Buyer feedback collection',
        type: 'COMMUNICATION',
        priority: 'LOW',
        agent: 'Lance',
        estimatedStart: '4:00 PM',
        status: 'Pending',
        dependencies: [],
        description: 'Collect feedback from weekend showings'
    },

    // Market Research Tasks
    {
        id: '12',
        title: 'Analyze market trends',
        type: 'RESEARCH',
        priority: 'MEDIUM',
        agent: 'Ron',
        estimatedStart: '11:30 AM',
        status: 'Queued',
        dependencies: ['MLS data update'],
        description: 'Prepare monthly market analysis report'
    },
    {
        id: '13',
        title: 'Compile comparable sales',
        type: 'RESEARCH',
        priority: 'HIGH',
        agent: 'Sydney',
        estimatedStart: '1:00 PM',
        status: 'Pending',
        dependencies: [],
        description: 'Research comps for 234 Birch St listing'
    },
    {
        id: '14',
        title: 'School district analysis',
        type: 'RESEARCH',
        priority: 'LOW',
        agent: 'Lance',
        estimatedStart: '3:45 PM',
        status: 'Queued',
        dependencies: [],
        description: 'Update school ratings for neighborhood report'
    },

    // Follow-up Tasks
    {
        id: '15',
        title: 'Post-showing follow-up',
        type: 'FOLLOW_UP',
        priority: 'HIGH',
        agent: 'Sydney',
        estimatedStart: '10:00 AM',
        status: 'Pending',
        dependencies: [],
        description: 'Contact buyers who viewed 345 Oak St yesterday'
    },
    {
        id: '16',
        title: 'Check inspection repairs',
        type: 'FOLLOW_UP',
        priority: 'HIGH',
        agent: 'Ron',
        estimatedStart: '2:15 PM',
        status: 'Queued',
        dependencies: ['Contractor report'],
        description: 'Verify completion of required repairs'
    },
    {
        id: '17',
        title: 'Mortgage application status',
        type: 'FOLLOW_UP',
        priority: 'MEDIUM',
        agent: 'Lance',
        estimatedStart: '11:45 AM',
        status: 'Pending',
        dependencies: [],
        description: 'Check status of pending mortgage applications'
    },

    // Transaction Tasks
    {
        id: '18',
        title: 'Review purchase agreement',
        type: 'TRANSACTION',
        priority: 'HIGH',
        agent: 'Sydney',
        estimatedStart: '9:15 AM',
        status: 'Pending',
        dependencies: ['Attorney review'],
        description: 'Final review of purchase agreement for 567 Pine St'
    },
    {
        id: '19',
        title: 'Process earnest money',
        type: 'TRANSACTION',
        priority: 'HIGH',
        agent: 'Lance',
        estimatedStart: '10:45 AM',
        status: 'Queued',
        dependencies: ['Bank confirmation'],
        description: 'Handle earnest money deposit for 789 Maple Dr'
    },
    {
        id: '20',
        title: 'Update transaction log',
        type: 'TRANSACTION',
        priority: 'LOW',
        agent: 'Ron',
        estimatedStart: '4:45 PM',
        status: 'Pending',
        dependencies: [],
        description: 'Update status of all pending transactions'
    },

    // Marketing Tasks
    {
        id: '21',
        title: 'Create property listing',
        type: 'MARKETING',
        priority: 'HIGH',
        agent: 'Sydney',
        estimatedStart: '9:45 AM',
        status: 'Pending',
        dependencies: ['Photo upload', 'Property details'],
        description: 'New listing for 890 Elm St'
    },
    {
        id: '22',
        title: 'Schedule photo shoot',
        type: 'MARKETING',
        priority: 'MEDIUM',
        agent: 'Lance',
        estimatedStart: '1:30 PM',
        status: 'Queued',
        dependencies: ['Property preparation'],
        description: 'Professional photos for 123 Oak Ave'
    },
    {
        id: '23',
        title: 'Social media updates',
        type: 'MARKETING',
        priority: 'LOW',
        agent: 'Ron',
        estimatedStart: '3:30 PM',
        status: 'Pending',
        dependencies: [],
        description: 'Post weekly property highlights'
    },

    // Additional Mixed Tasks
    {
        id: '24',
        title: 'Virtual tour setup',
        type: 'MARKETING',
        priority: 'MEDIUM',
        agent: 'Sydney',
        estimatedStart: '2:45 PM',
        status: 'Queued',
        dependencies: ['Photo completion'],
        description: 'Create virtual tour for 456 Pine St'
    },
    {
        id: '25',
        title: 'Update client preferences',
        type: 'DOCUMENTATION',
        priority: 'LOW',
        agent: 'Lance',
        estimatedStart: '4:15 PM',
        status: 'Pending',
        dependencies: [],
        description: 'Update buyer preferences in CRM'
    },
    {
        id: '26',
        title: 'Coordinate closing time',
        type: 'SCHEDULING',
        priority: 'HIGH',
        agent: 'Ron',
        estimatedStart: '10:30 AM',
        status: 'Pending',
        dependencies: ['Title company availability', 'Buyer confirmation'],
        description: 'Schedule closing for 789 Birch Rd'
    },
    {
        id: '27',
        title: 'Property value assessment',
        type: 'RESEARCH',
        priority: 'MEDIUM',
        agent: 'Sydney',
        estimatedStart: '1:15 PM',
        status: 'Queued',
        dependencies: ['Recent sales data'],
        description: 'Evaluate property value for 234 Cedar Ln'
    },
    {
        id: '28',
        title: 'Review contract addendum',
        type: 'TRANSACTION',
        priority: 'HIGH',
        agent: 'Lance',
        estimatedStart: '11:15 AM',
        status: 'Pending',
        dependencies: ['Seller approval'],
        description: 'Review price adjustment addendum'
    },
    {
        id: '29',
        title: 'Open house preparation',
        type: 'MARKETING',
        priority: 'HIGH',
        agent: 'Ron',
        estimatedStart: '9:00 AM',
        status: 'Queued',
        dependencies: ['Property cleaning', 'Marketing materials'],
        description: 'Prepare for weekend open house'
    },
    {
        id: '30',
        title: 'Loan officer communication',
        type: 'COMMUNICATION',
        priority: 'MEDIUM',
        agent: 'Sydney',
        estimatedStart: '3:00 PM',
        status: 'Pending',
        dependencies: [],
        description: 'Update on pending loan applications'
    }
].map(task => ({
    ...task,
    status: Math.random() < 0.2 ? TaskStatus.IN_PROGRESS : 
           Math.random() < 0.5 ? TaskStatus.UP_NEXT : 
           TaskStatus.LATER
}));

const Backlog = () => {
    const [tasks, setTasks] = useState(mockTasks);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        type: 'All',
        priority: 'All',
        agent: 'All',
        status: 'All'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [expandedSections, setExpandedSections] = useState({
        [TaskStatus.IN_PROGRESS]: true,
        [TaskStatus.UP_NEXT]: true,
        [TaskStatus.LATER]: true
    });
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        type: 'SCHEDULING',
        priority: 'MEDIUM',
        agent: 'Sydney',
        estimatedStart: '',
        description: '',
        dependencies: []
    });

    const toggleTaskSelection = (taskId) => {
        setSelectedTasks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(taskId)) {
                newSet.delete(taskId);
            } else {
                newSet.add(taskId);
            }
            return newSet;
        });
    };

    const handleBulkAction = (action) => {
        const selectedTasksList = Array.from(selectedTasks);
        
        switch (action) {
            case 'move_up':
                setTasks(prev => {
                    const newTasks = [...prev];
                    selectedTasksList.forEach(taskId => {
                        const task = newTasks.find(t => t.id === taskId);
                        if (task) {
                            if (task.status === TaskStatus.LATER) {
                                task.status = TaskStatus.UP_NEXT;
                            } else if (task.status === TaskStatus.UP_NEXT) {
                                task.status = TaskStatus.IN_PROGRESS;
                            }
                        }
                    });
                    return newTasks;
                });
                break;

            case 'move_down':
                setTasks(prev => {
                    const newTasks = [...prev];
                    selectedTasksList.forEach(taskId => {
                        const task = newTasks.find(t => t.id === taskId);
                        if (task) {
                            if (task.status === TaskStatus.IN_PROGRESS) {
                                task.status = TaskStatus.UP_NEXT;
                            } else if (task.status === TaskStatus.UP_NEXT) {
                                task.status = TaskStatus.LATER;
                            }
                        }
                    });
                    return newTasks;
                });
                break;

            case 'cancel':
                setTasks(prev => prev.filter(task => !selectedTasks.has(task.id)));
                setSelectedTasks(new Set());
                break;

            default:
                break;
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        
        // Update status based on destination droppable
        if (result.destination.droppableId !== result.source.droppableId) {
            reorderedItem.status = result.destination.droppableId;
        }
        
        items.splice(result.destination.index, 0, reorderedItem);
        setTasks(items);
    };

    const toggleSectionExpansion = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getTaskCountsByStatus = () => {
        return tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
    };

    const taskCounts = getTaskCountsByStatus();

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = activeFilters.type === 'All' || task.type === activeFilters.type;
        const matchesPriority = activeFilters.priority === 'All' || task.priority === activeFilters.priority;
        const matchesAgent = activeFilters.agent === 'All' || task.agent === activeFilters.agent;
        const matchesStatus = activeFilters.status === 'All' || task.status === activeFilters.status;
        
        return matchesSearch && matchesType && matchesPriority && matchesAgent && matchesStatus;
    });

    const groupedTasks = {
        [TaskStatus.IN_PROGRESS]: filteredTasks.filter(t => t.status === TaskStatus.IN_PROGRESS),
        [TaskStatus.UP_NEXT]: filteredTasks.filter(t => t.status === TaskStatus.UP_NEXT),
        [TaskStatus.LATER]: filteredTasks.filter(t => t.status === TaskStatus.LATER)
    };

    const renderTaskCard = (task, provided) => {
        const CategoryIcon = TaskCategories[task.type]?.icon || FiFileText;
        
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    padding: '16px',
                    marginBottom: '8px',
                    backgroundColor: selectedTasks.has(task.id) ? '#F3F4F6' : 'white',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    ...provided.draggableProps.style
                }}
                onClick={() => setSelectedTask(task)}
            >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <input
                        type="checkbox"
                        checked={selectedTasks.has(task.id)}
                        onChange={() => toggleTaskSelection(task.id)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div style={{ flex: 1 }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                fontWeight: '500' 
                            }}>
                                <CategoryIcon size={16} />
                                {task.title}
                            </div>
                            <div style={{ 
                                fontSize: '12px',
                                padding: '2px 8px',
                                backgroundColor: TaskPriority[task.priority].background,
                                color: TaskPriority[task.priority].color,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <FiAlertCircle size={12} />
                                {TaskPriority[task.priority].label}
                            </div>
                        </div>
                        <div style={{ 
                            display: 'flex',
                            gap: '16px',
                            fontSize: '14px',
                            color: '#6B7280'
                        }}>
                            <div>{task.type}</div>
                            <div>•</div>
                            <div>{task.agent}</div>
                            <div>•</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <FiClock size={14} />
                                {task.estimatedStart}
                            </div>
                        </div>
                    </div>
                    <button
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer'
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            // Toggle task menu
                        }}
                    >
                        <FiMoreVertical />
                    </button>
                </div>
            </div>
        );
    };

    const renderSection = (status) => {
        const sectionTasks = groupedTasks[status];
        const isExpanded = expandedSections[status];
        
        return (
            <div style={{ marginBottom: '24px' }}>
                <div 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '16px',
                        cursor: 'pointer'
                    }}
                    onClick={() => toggleSectionExpansion(status)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h2 style={{ 
                            fontSize: '18px', 
                            fontWeight: '600',
                            color: '#111827'
                        }}>
                            {status}
                        </h2>
                        <span style={{ 
                            fontSize: '14px',
                            color: '#6B7280',
                            backgroundColor: '#F3F4F6',
                            padding: '2px 8px',
                            borderRadius: '12px'
                        }}>
                            {sectionTasks.length}
                        </span>
                    </div>
                    <FiChevronDown 
                        style={{ 
                            transform: isExpanded ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s'
                        }} 
                    />
                </div>
                
                {isExpanded && (
                    <Droppable droppableId={status}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {sectionTasks.map((task, index) => (
                                    <Draggable 
                                        key={task.id} 
                                        draggableId={task.id} 
                                        index={index}
                                    >
                                        {(provided) => renderTaskCard(task, provided)}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )}
            </div>
        );
    };

    const handleCreateTask = () => {
        const task = {
            ...newTask,
            id: Date.now().toString(),
            status: TaskStatus.LATER,
            dependencies: newTask.dependencies.filter(d => d.trim() !== '')
        };
        
        setTasks(prev => [...prev, task]);
        setShowNewTaskModal(false);
        setNewTask({
            title: '',
            type: 'SCHEDULING',
            priority: 'MEDIUM',
            agent: 'Sydney',
            estimatedStart: '',
            description: '',
            dependencies: []
        });
    };

    return (
        <div style={{ 
            padding: '24px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Summary Bar */}
            <div style={{ 
                marginBottom: '24px',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                flexShrink: 0
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h1 style={{ 
                            fontSize: '24px', 
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '8px'
                        }}>
                            Task Backlog
                        </h1>
                        <div style={{ 
                            display: 'flex',
                            gap: '16px',
                            color: '#6B7280',
                            fontSize: '14px'
                        }}>
                            <span>In Progress: {taskCounts[TaskStatus.IN_PROGRESS] || 0}</span>
                            <span>|</span>
                            <span>Up Next: {taskCounts[TaskStatus.UP_NEXT] || 0}</span>
                            <span>|</span>
                            <span>Later: {taskCounts[TaskStatus.LATER] || 0}</span>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => setShowNewTaskModal(true)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>+ New Task</span>
                        </button>
                        
                        {selectedTasks.size > 0 && (
                            <div style={{ 
                                display: 'flex', 
                                gap: '8px',
                                padding: '8px 16px',
                                backgroundColor: '#F3F4F6',
                                borderRadius: '6px'
                            }}>
                                <button 
                                    onClick={() => handleBulkAction('move_up')}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        border: 'none',
                                        backgroundColor: '#3B82F6',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    <FiArrowUp size={14} />
                                    Move Up
                                </button>
                                <button 
                                    onClick={() => handleBulkAction('move_down')}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #D1D5DB',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    <FiArrowDown size={14} />
                                    Move Down
                                </button>
                                <button 
                                    onClick={() => handleBulkAction('cancel')}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid #EF4444',
                                        color: '#EF4444',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        
                        <div style={{ position: 'relative' }}>
                            <FiSearch style={{ 
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#6B7280'
                            }} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '8px 12px 8px 36px',
                                    borderRadius: '6px',
                                    border: '1px solid #D1D5DB',
                                    width: '250px'
                                }}
                            />
                        </div>
                        
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            style={{
                                padding: '8px',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                backgroundColor: Object.values(activeFilters).some(v => v !== 'All') 
                                    ? '#EBF5FF' 
                                    : 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <FiFilter style={{ 
                                color: Object.values(activeFilters).some(v => v !== 'All') 
                                    ? '#3B82F6' 
                                    : '#6B7280' 
                            }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ 
                    flex: 1,
                    overflowY: 'auto',
                    padding: '4px'  // Prevents shadow cutoff
                }}>
                    {renderSection(TaskStatus.IN_PROGRESS)}
                    {renderSection(TaskStatus.UP_NEXT)}
                    {renderSection(TaskStatus.LATER)}
                </div>
            </DragDropContext>

            {/* Task Details Modal */}
            {selectedTask && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 50
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        width: '500px',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '16px'
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Task Details</h2>
                            <button
                                onClick={() => setSelectedTask(null)}
                                style={{
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                <FiX />
                            </button>
                        </div>
                        
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '8px'
                            }}>
                                {TaskCategories[selectedTask.type]?.icon({ size: 16 })}
                                <h3 style={{ fontSize: '16px' }}>{selectedTask.title}</h3>
                            </div>
                            <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                {selectedTask.description}
                            </p>
                        </div>
                        
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <div style={{ 
                                    fontSize: '14px', 
                                    fontWeight: '500', 
                                    marginBottom: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    Status
                                    <div style={{
                                        padding: '2px 8px',
                                        backgroundColor: selectedTask.status === TaskStatus.IN_PROGRESS
                                            ? '#D1FAE5'
                                            : selectedTask.status === TaskStatus.UP_NEXT
                                            ? '#FEF3C7'
                                            : '#F3F4F6',
                                        borderRadius: '12px',
                                        fontSize: '12px'
                                    }}>
                                        {selectedTask.status}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                                    Dependencies
                                </div>
                                {selectedTask.dependencies.length > 0 ? (
                                    <ul style={{ 
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        {selectedTask.dependencies.map((dep, index) => (
                                            <li key={index} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                fontSize: '14px',
                                                color: '#6B7280',
                                                marginBottom: '4px'
                                            }}>
                                                <FiCheck size={14} />
                                                {dep}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div style={{ fontSize: '14px', color: '#6B7280' }}>
                                        No dependencies
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                                    Assignment
                                </div>
                                <div style={{ 
                                    fontSize: '14px', 
                                    color: '#6B7280',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    Assigned to {selectedTask.agent}
                                </div>
                            </div>
                            
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                                    Timing
                                </div>
                                <div style={{ fontSize: '14px', color: '#6B7280' }}>
                                    Estimated start: {selectedTask.estimatedStart}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* New Task Modal */}
            {showNewTaskModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 50
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        width: '500px',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '24px'
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Create New Task</h2>
                            <button
                                onClick={() => setShowNewTaskModal(false)}
                                style={{
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                <FiX />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB'
                                    }}
                                    placeholder="Enter task title"
                                />
                            </div>

                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Type
                                </label>
                                <select
                                    value={newTask.type}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, type: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB'
                                    }}
                                >
                                    {Object.entries(TaskCategories).map(([key, { label }]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Priority
                                </label>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB'
                                    }}
                                >
                                    {Object.entries(TaskPriority).map(([key, { label }]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Agent
                                </label>
                                <select
                                    value={newTask.agent}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, agent: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB'
                                    }}
                                >
                                    {['Sydney', 'Lance', 'Ron'].map(agent => (
                                        <option key={agent} value={agent}>{agent}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Estimated Start Time
                                </label>
                                <input
                                    type="time"
                                    value={newTask.estimatedStart}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, estimatedStart: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Description
                                </label>
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        minHeight: '100px',
                                        resize: 'vertical'
                                    }}
                                    placeholder="Enter task description"
                                />
                            </div>

                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}>
                                    Dependencies (one per line)
                                </label>
                                <textarea
                                    value={newTask.dependencies.join('\n')}
                                    onChange={(e) => setNewTask(prev => ({ 
                                        ...prev, 
                                        dependencies: e.target.value.split('\n') 
                                    }))}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        minHeight: '80px',
                                        resize: 'vertical'
                                    }}
                                    placeholder="Enter dependencies (one per line)"
                                />
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'flex-end',
                                gap: '12px',
                                marginTop: '16px'
                            }}>
                                <button
                                    onClick={() => setShowNewTaskModal(false)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateTask}
                                    disabled={!newTask.title.trim()}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        backgroundColor: newTask.title.trim() ? '#3B82F6' : '#93C5FD',
                                        color: 'white',
                                        cursor: newTask.title.trim() ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    Create Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Backlog; 