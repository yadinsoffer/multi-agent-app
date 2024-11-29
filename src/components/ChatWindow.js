// src/components/ChatWindow.js
import React, { useEffect, useState } from 'react';
import ChatInput from './ChatInput'; // Import the new ChatInput component

const messages = [
    { id: 1, sender: "Lance (Synthetic Teams)", text: "Hi Lorenzo, welcome back! We just wrapped up the contract for Rachel and sent her the DocuSign. We're now scheduling the showing with John." },
    { id: 2, sender: "Lance (Synthetic Teams)", text: "@John can you please update the status of the scheduling?" },
    { id: 3, sender: "John (Synthetic Teams)", text: "Hey Lance and Lorenzo, I sent Larry 2 emails to schedule but no response. I'm going to have our voice agent Sydney try to call him directly." },
    { id: 4, sender: "John (Synthetic Teams)", text: "Sydney please let me know if you get ahold of him!" },
    { id: 5, sender: "Sydney (Synthetic Teams)", text: "📞 Calling Larry..." },
    { id: 6, sender: "Sydney (Synthetic Teams)", text: "Tour Confirmed with Larry for Dec 6, 2 PM at 455 Michigan Avenue, Miami Beach", isCalendar: true },
];

const senderColors = {
    "Lance (Synthetic Teams)": "#f0f0f0",
    "John (Synthetic Teams)": "#e0e0e0",
    "Sydney (Synthetic Teams)": "#d0d0d0",
    "Lorenzo Larini": "#c0c0c0",
};

const ChatWindow = () => {
    const [displayedMessages, setDisplayedMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [lastSender, setLastSender] = useState(null);

    useEffect(() => {
        let messageIndex = 0;

        const displayNextMessage = () => {
            if (messageIndex < messages.length) {
                const nextMessage = messages[messageIndex];

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
                    const delay = (messageIndex + 1) * 1000;
                    setTimeout(displayNextMessage, delay);
                }, typingDuration);
            }
        };

        const initialDelay = 1000;
        const timer = setTimeout(displayNextMessage, initialDelay);

        return () => clearTimeout(timer);
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
        }, 1000); // 1 second delay for Lance's response
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
            <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '0', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
                <h3 style={{ marginBottom: '10px' }}>Chat</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {displayedMessages.map((message) => (
                        <div key={message.id} style={{ 
                            padding: '10px', 
                            borderRadius: '5px', 
                            backgroundColor: senderColors[message.sender] || '#f0f0f0', 
                            color: '#000', 
                        }}>
                            {message.showSender && (
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{message.sender}</div>
                            )}
                            {message.isCalendar ? (
                                <div style={{
                                    border: '0px solid #007BFF',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    backgroundColor: '#d0d0d0', // Change background color to grey
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}>
                                    <div style={{ fontSize: '1.2em' }}>📅</div>
                                    <div>{message.text}</div>
                                </div>
                            ) : (
                                message.text
                            )}
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
