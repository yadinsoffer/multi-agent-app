import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableAgent = ({ agent }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'AGENT',
        item: { agent },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div 
            ref={drag} 
            style={{ 
                padding: '10px', 
                borderRadius: '8px', 
                backgroundColor: isDragging ? '#e0e0e0' : '#f0f0f0', // Change color when dragging
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {agent}
        </div>
    );
};

export default DraggableAgent;
