// src/components/ChatWindow.js
import React, { useEffect, useState, useRef } from 'react';
import ChatInput from './ChatInput'; // Import the new ChatInput component
import { analyzeMessage } from '../utils/openai';
import { 
    AGENT_LANCE,
    AGENT_JOHN,
    AGENT_SYDNEY,
    AGENT_RON,
    AGENT_JERRY,
    AGENT_ROLES,
    ROLE_TEAM_LEAD,
    ROLE_VOICE_COORDINATOR,
    ROLE_SALES_SPECIALIST,
    ROLE_LISTING_SPECIALIST,
    MESSAGE_LANCE_WELCOME,
    MESSAGE_LANCE_STATUS_REQUEST,
    MESSAGE_JOHN_UPDATE,
    MESSAGE_JOHN_TO_SYDNEY,
    MESSAGE_SYDNEY_CALLING,
    MESSAGE_INCOMING_CALL,
    LISTING_TASKS
} from '../config/agents';

const VoiceAnimation = () => (
    <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '4px', 
        height: '40px',
        padding: '10px',
        background: 'rgba(59, 130, 246, 0.05)',
        borderRadius: '8px'
    }}>
        {[1, 2, 3].map((i) => (
            <div
                key={i}
                style={{
                    width: '3px',
                    height: '15px',
                    backgroundColor: '#3B82F6',
                    borderRadius: '2px',
                    animation: `voiceWave 1s ease-in-out infinite ${i * 0.15}s`
                }}
            />
        ))}
        <span style={{ 
            marginLeft: '8px',
            color: '#3B82F6',
            fontSize: '13px',
            fontWeight: 500
        }}>
            Call in progress...
        </span>
    </div>
);

const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const messages = [
    { id: 1, sender: AGENT_LANCE, text: MESSAGE_LANCE_WELCOME },
    { id: 2, sender: AGENT_LANCE, text: MESSAGE_LANCE_STATUS_REQUEST },
    { id: 3, sender: AGENT_JOHN, text: MESSAGE_JOHN_UPDATE },
    { id: 4, sender: AGENT_JOHN, text: MESSAGE_JOHN_TO_SYDNEY },
    { id: 5, sender: AGENT_SYDNEY, text: MESSAGE_SYDNEY_CALLING }
];

// Separate Yadin's call message
const yadinCallMessage = { 
    id: 7, 
    sender: AGENT_LANCE, 
    text: MESSAGE_INCOMING_CALL, 
    isIncomingCall: true, 
    isActiveCall: false 
};

const senderColors = {
    [AGENT_LANCE]: "#FFFFFF",
    [AGENT_JOHN]: "#FFFFFF",
    [AGENT_SYDNEY]: "#FFFFFF",
    [AGENT_RON]: "#FFFFFF",
    "Lorenzo Larini": "#FFFFFF",
};

const roleColors = {
    [ROLE_TEAM_LEAD]: { bg: "#F3F0FF", text: "#6B46C1" },      // Purple theme
    [ROLE_VOICE_COORDINATOR]: { bg: "#E0F2FE", text: "#0369A1" }, // Blue theme
    [ROLE_SALES_SPECIALIST]: { bg: "#FEF3C7", text: "#B45309" },  // Orange theme
    [ROLE_LISTING_SPECIALIST]: { bg: "#ECFDF5", text: "#047857" }  // Green theme
};

const getRoleFromSender = (sender) => {
    return AGENT_ROLES[sender] || null;
};

const ChatWindow = ({ onTasksUpdate }) => {
    const [displayedMessages, setDisplayedMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [lastSender, setLastSender] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [expandedMessage, setExpandedMessage] = useState(null);
    const [callDuration, setCallDuration] = useState(0);
    const callInterval = useRef(null);
    const [ringCount, setRingCount] = useState(0);
    const [showActiveCall, setShowActiveCall] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loadingTask, setLoadingTask] = useState(null);
    const [confirmationSent, setConfirmationSent] = useState(false);
    const [showRonMessage, setShowRonMessage] = useState(false);
    const [currentTasks, setCurrentTasks] = useState([]);
    const debounceTimerRef = useRef(null);

    // Function to update tasks based on new messages
    const updateTasks = async (messages) => {
        try {
            // Clear any pending debounce timer
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            // Set a new debounce timer
            debounceTimerRef.current = setTimeout(async () => {
                const tasks = await analyzeMessage(messages);
                // Only update if tasks have actually changed
                if (JSON.stringify(tasks) !== JSON.stringify(currentTasks)) {
                    setCurrentTasks(tasks);
                    onTasksUpdate?.(tasks);
                }
            }, 1000); // 1 second debounce
        } catch (error) {
            console.error('Error updating tasks:', error);
        }
    };

    // Update tasks whenever messages change
    useEffect(() => {
        if (displayedMessages.length > 0) {
            updateTasks(displayedMessages);
        }
        
        // Cleanup debounce timer
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [displayedMessages]);

    useEffect(() => {
        let messageIndex = 0;

        const displayNextMessage = () => {
            if (messageIndex < messages.length) {
                const nextMessage = messages[messageIndex];

                // Custom delays for specific messages
                let delay = 1000; // Default delay

                // Add 1-minute delay for Lance's second message
                if (nextMessage.id === 2) {
                    delay = 60000; // 60 seconds
                }
                // Delay John's first message
                else if (nextMessage.id === 3) {
                    delay = 5000;
                }
                // Delay John's second message
                else if (nextMessage.id === 4) {
                    delay = 4000;
                }

                setIsTyping(true);
                const typingDuration = 1000;

                setTimeout(() => {
                    if (nextMessage && nextMessage.text) {
                        setDisplayedMessages((prev) => [
                            ...prev,
                            {
                                ...nextMessage,
                                showSender: lastSender !== nextMessage.sender,
                            },
                        ]);
                        setLastSender(nextMessage.sender);
                        messageIndex++;
                    }

                    setIsTyping(false);
                    setTimeout(displayNextMessage, delay);
                }, typingDuration);
            } else {
                // After all messages are displayed, schedule Yadin's call
                setTimeout(() => {
                    setDisplayedMessages(prev => [...prev, {
                        ...yadinCallMessage,
                        showSender: true
                    }]);
                }, 60000); // 60-second delay for Yadin's call
            }
        };

        const initialDelay = 1000;
        const timer = setTimeout(displayNextMessage, initialDelay);

        return () => clearTimeout(timer);
    }, []);

    const endCall = (messageId, finalDuration) => {
        if (confirmationSent) return; // Exit if confirmation was already sent

        setIsListening(false);
        setExpandedMessage(null);
        clearInterval(callInterval.current);
        
        // Update the call message to show completion
        setDisplayedMessages(prev => prev.map(msg => {
            if (msg.id === messageId) {
                return {
                    ...msg,
                    text: `📞 Call with Larry completed (Duration: ${formatDuration(finalDuration || callDuration)})`,
                    callEnded: true
                };
            }
            return msg;
        }));

        // Add Sydney's confirmation message after call ends
        setTimeout(() => {
            if (!confirmationSent) { // Double check to prevent race conditions
                setDisplayedMessages(prev => {
                    // Check if confirmation message already exists
                    if (prev.some(msg => msg.text.includes("Tour Confirmed with Larry"))) {
                        return prev;
                    }
                    return [...prev, {
                        id: 6,
                        sender: "Sydney (Synthetic Teams)",
                        text: "Tour Confirmed with Larry for Dec 6, 2 PM at 455 Michigan Avenue, Miami Beach",
                        isCalendar: true,
                        showSender: true
                    }];
                });
                setConfirmationSent(true);
            }
        }, 2000);
    };

    const handleCallToggle = (messageId) => {
        if (!isListening) {
            // Start call
            setIsListening(true);
            setExpandedMessage(messageId);
            setCallDuration(0);
            callInterval.current = setInterval(() => {
                setCallDuration(prev => {
                    const newDuration = prev + 1;
                    // Auto end call after 25 seconds (changed from 10)
                    if (newDuration >= 25) {
                        endCall(messageId, 25);
                        return newDuration;
                    }
                    return newDuration;
                });
            }, 1000);
        } else {
            endCall(messageId, callDuration);
        }
    };

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (callInterval.current) {
                clearInterval(callInterval.current);
            }
        };
    }, []);

    const handleSendMessage = (message) => {
        const messageToSend = {
            id: displayedMessages.length + 1,
            sender: "Lorenzo Larini",
            text: message,
            showSender: true,
        };
        setDisplayedMessages((prev) => [...prev, messageToSend]);

        // Add Lance's response after a short delay
        setTimeout(() => {
            const lanceResponse = {
                id: displayedMessages.length + 2,
                sender: "Lance (Synthetic Teams)",
                text: "Sure thing! Let me put together a new team focused on listings to take care of this.",
                showSender: true,
            };
            setDisplayedMessages((prev) => [...prev, lanceResponse]);

            // Add Jerry's message after Lance's response
            setTimeout(() => {
                const jerryMessage = {
                    id: displayedMessages.length + 3,
                    sender: "Jerry (Synthetic Teams)",
                    text: "@Ron, I'm reviewing the listing you put together now and I have some comments: (1) I reviewed comparables in the market and the price you suggested is off by $10k. Let's increase listing price to $660k. (2) The order of the images isn't optimal, I've re-arranged the order so that they are more appealing (3) The text summarizing the property sounds to \"salesy\". I edited it to be more concise as we've seen that increases conversion rates.",
                    showSender: true,
                };
                setDisplayedMessages((prev) => [...prev, jerryMessage]);
            }, 3000); // 3 seconds after Lance's message
        }, 1000); // 1 second delay for Lance's response
    };

    // Auto-progress the incoming call after 2 rings
    useEffect(() => {
        if (ringCount < 2 && displayedMessages.some(m => m.isIncomingCall && !m.isActiveCall)) {
            const timer = setTimeout(() => {
                setRingCount(prev => {
                    const newCount = prev + 1;
                    if (newCount >= 2) {
                        // Add a longer delay before showing active call
                        setTimeout(() => {
                            setShowActiveCall(true);
                            // Update the message to show active call
                            setDisplayedMessages(prev => prev.map(msg => 
                                msg.isIncomingCall ? { ...msg, isActiveCall: true } : msg
                            ));

                            // After 10 seconds, change to call complete
                            setTimeout(() => {
                                setShowActiveCall(false);
                                setDisplayedMessages(prev => prev.map(msg => 
                                    msg.isIncomingCall ? { 
                                        ...msg, 
                                        isActiveCall: false,
                                        text: "Call with Yadin completed (Duration: 0:10)"
                                    } : msg
                                ));
                                // Set flag to show Ron's message
                                setShowRonMessage(true);
                            }, 10000); // 10 seconds
                        }, 8000); // Wait 8 seconds after rings complete before showing active call
                    }
                    return newCount;
                });
            }, 4000); // Each ring takes 4 seconds now
            return () => clearTimeout(timer);
        }
    }, [ringCount, displayedMessages]);

    // Add Ron's message after call becomes active
    useEffect(() => {
        if (showRonMessage) {
            const timer = setTimeout(() => {
                const ronMessage = {
                    id: Date.now(),
                    sender: "Ron (Synthetic Teams)",
                    text: "Starting listing preparation process...",
                    showSender: true,
                    isChecklist: true
                };
                setDisplayedMessages(prev => [...prev, ronMessage]);

                // Process tasks one by one with loading states
                LISTING_TASKS.forEach((task, index) => {
                    // Start loading the task
                    setTimeout(() => {
                        setLoadingTask(task);
                    }, index * 4000); // 4 seconds between starting each task

                    // Complete the task 2 seconds after loading starts
                    setTimeout(() => {
                        setLoadingTask(null);
                        setCompletedTasks(prev => [...prev, task]);
                    }, (index * 4000) + 2000); // Complete 2 seconds after loading starts
                });
            }, 15000); // 15 seconds after call becomes active
            return () => clearTimeout(timer);
        }
    }, [showRonMessage]);

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '90vh',
            backgroundColor: '#F9FAFB',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
            <style>
                {`
                    @keyframes voiceWave {
                        0% { height: 5px; opacity: 0.3; }
                        50% { height: 20px; opacity: 0.8; }
                        100% { height: 5px; opacity: 0.3; }
                    }

                    .role-tag {
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        font-size: 11px;
                        padding: 4px 10px;
                        border-radius: 20px;
                        font-weight: 500;
                        letter-spacing: 0.3px;
                        white-space: nowrap;
                    }

                    .call-button {
                        padding: 6px 12px;
                        font-size: 12px;
                        font-weight: 500;
                        border: 1px solid #E5E7EB;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        background-color: #FFFFFF;
                        color: #4B5563;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                    }

                    .call-button:hover {
                        background-color: #F9FAFB;
                        border-color: #D1D5DB;
                        color: #374151;
                    }

                    .call-button.active {
                        background-color: #FEF2F2;
                        border-color: #FCA5A5;
                        color: #DC2626;
                    }

                    .call-button.active:hover {
                        background-color: #FEE2E2;
                        border-color: #F87171;
                    }

                    .call-button .icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 16px;
                        height: 16px;
                        font-size: 12px;
                    }

                    .incoming-call-container {
                        background: #FFFFFF;
                        border: 1px solid #E5E7EB;
                        padding: 16px;
                        border-radius: 8px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    }

                    .active-call-container {
                        background: #FFFFFF;
                        border: 1px solid #E5E7EB;
                        padding: 16px;
                        border-radius: 8px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    }

                    .checklist-container {
                        background: #FFFFFF;
                        border: 1px solid #E5E7EB;
                        border-radius: 8px;
                        padding: 16px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    }

                    .checklist-header {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin-bottom: 16px;
                        color: #111827;
                        font-weight: 600;
                        font-size: 14px;
                    }

                    .checklist-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 0;
                        font-size: 14px;
                        color: #6B7280;
                        transition: all 0.2s ease;
                        border-bottom: 1px solid #F3F4F6;
                    }

                    .checklist-item.loading {
                        color: #3B82F6;
                    }

                    .checklist-item.completed {
                        color: #047857;
                    }

                    .loading-indicator {
                        animation: pulse 1.5s infinite;
                        display: inline-block;
                    }

                    .message-container {
                        padding: 12px 16px;
                        border-radius: 8px;
                        background: #FFFFFF;
                        border: 1px solid #E5E7EB;
                        margin-bottom: 8px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                        position: relative;
                    }

                    .sender-name {
                        font-size: 14px;
                        font-weight: 600;
                        color: #111827;
                        margin-bottom: 4px;
                    }

                    .message-text {
                        font-size: 14px;
                        color: #374151;
                        line-height: 1.5;
                    }
                `}
            </style>
            <div style={{ 
                padding: '20px', 
                backgroundColor: '#FFFFFF', 
                borderBottom: '1px solid #E5E7EB',
                borderTop: '1px solid #E5E7EB'
            }}>
                <h3 style={{ 
                    margin: 0, 
                    color: '#111827', 
                    fontSize: '16px',
                    fontWeight: '600'
                }}>Team Chat</h3>
            </div>
            <div style={{ 
                padding: '20px',
                flex: 1,
                overflowY: 'auto',
                backgroundColor: '#F9FAFB'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {displayedMessages.map((message) => (
                        <div key={message.id} className="message-container">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                {message.showSender && (
                                    <div className="sender-name">{message.sender}</div>
                                )}
                                {getRoleFromSender(message.sender) && (
                                    <span 
                                        className="role-tag"
                                        style={{ 
                                            backgroundColor: roleColors[getRoleFromSender(message.sender)].bg,
                                            color: roleColors[getRoleFromSender(message.sender)].text,
                                            position: 'static',
                                            marginLeft: '8px'
                                        }}
                                    >
                                        {getRoleFromSender(message.sender)}
                                    </span>
                                )}
                            </div>
                            <div className="message-text">
                                {message.isChecklist ? (
                                    <div className="checklist-container">
                                        <div className="checklist-header">
                                            <span>📋</span> {message.text}
                                        </div>
                                        {LISTING_TASKS.map((task) => (
                                            <div 
                                                key={task} 
                                                className={`checklist-item ${loadingTask === task ? 'loading' : ''} ${completedTasks.includes(task) ? 'completed' : ''}`}
                                            >
                                                {completedTasks.includes(task) ? (
                                                    <>✅ {task}</>
                                                ) : loadingTask === task ? (
                                                    <>
                                                        <span className="loading-indicator">⏳</span> {task} - processing...
                                                    </>
                                                ) : (
                                                    <>○ {task}</>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : message.text.includes("Calling Larry") ? (
                                    <div className="call-container">
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '12px',
                                            justifyContent: 'space-between' 
                                        }}>
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '8px',
                                                color: message.callEnded ? '#4A5568' : '#2D3748',
                                                fontSize: '15px'
                                            }}>
                                                {message.text}
                                                {isListening && expandedMessage === message.id && (
                                                    <span style={{ 
                                                        color: '#007BFF',
                                                        fontSize: '14px',
                                                        fontWeight: 500
                                                    }}>
                                                        ({formatDuration(callDuration)})
                                                    </span>
                                                )}
                                            </div>
                                            {!message.callEnded && (
                                                <button
                                                    className={`call-button ${isListening ? 'active' : ''}`}
                                                    onClick={() => handleCallToggle(message.id)}
                                                    style={{
                                                        marginLeft: 'auto'
                                                    }}
                                                >
                                                    <span className="icon">
                                                        {isListening ? '⏹️' : '▶️'}
                                                    </span>
                                                    {isListening ? 'Stop Listening' : 'Listen'}
                                                </button>
                                            )}
                                        </div>
                                        {isListening && expandedMessage === message.id && <VoiceAnimation />}
                                    </div>
                                ) : message.isIncomingCall ? (
                                    <div className={message.isActiveCall ? "active-call-container" : "incoming-call-container"}>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            width: '100%'
                                        }}>
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '12px'
                                            }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#007BFF',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '20px'
                                                }}>
                                                    👤
                                                </div>
                                                <div>
                                                    <div style={{ 
                                                        fontWeight: '600', 
                                                        color: '#2D3748',
                                                        marginBottom: '4px'
                                                    }}>
                                                        {message.isActiveCall ? 'Active Call' : 'Incoming Call'}
                                                    </div>
                                                    <div style={{ 
                                                        fontSize: '14px',
                                                        color: '#4A5568'
                                                    }}>
                                                        {message.isActiveCall ? 'Lance ↔️ Yadin' : message.text}
                                                    </div>
                                                </div>
                                            </div>
                                            {message.isActiveCall && <VoiceAnimation />}
                                        </div>
                                    </div>
                                ) : (
                                    <div>{message.text}</div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div style={{ fontStyle: 'italic', color: '#888', marginTop: '5px' }}>
                            Typing...
                            <span className="typing-dots">...</span>
                        </div>
                    )}
                </div>
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
