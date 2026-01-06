import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="tooltip-container"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            style={{ position: 'relative', display: 'inline-block', width: '100%' }}
        >
            {children}
            {isVisible && (
                <div className="tooltip-text">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
