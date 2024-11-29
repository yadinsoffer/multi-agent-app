import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            onSendMessage(newMessage);
            setNewMessage("");
        }
    };

    return (
        <div style={{ padding: '10px', borderTop: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button onClick={handleSendMessage} style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#3FC78A', color: '#fff', border: 'none' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
