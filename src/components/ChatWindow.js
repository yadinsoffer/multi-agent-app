// src/components/ChatWindow.js
import React, { useState } from 'react';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setMessages((prevMessages) => [...prevMessages, { sender: 'User', text: inputValue }]);
            setInputValue(''); // Clear the input field
            // Simulate a response from an agent
            setTimeout(() => {
                setMessages((prevMessages) => [...prevMessages, { sender: 'Agent', text: 'This is a response from the agent.' }]);
            }, 1000);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-messages">
                <h2>Chat Window</h2>
                <div style={{ marginBottom: '20px' }}>
                    {messages.map((message, index) => (
                        <div key={index} style={{ textAlign: 'left', color: message.sender === 'User' ? 'darkgreen' : 'black' }}> {/* Dark green for user messages */}
                            <strong>{message.sender}:</strong> {message.text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // Add keydown event listener
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;

//hey
