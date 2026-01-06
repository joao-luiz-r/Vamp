import React from 'react';

const DotInput = ({ value, onChange, max = 5, readOnly = false }) => {
    const dots = [];
    for (let i = 1; i <= max; i++) {
        dots.push(
            <div
                key={i}
                onClick={() => !readOnly && onChange(i)}
                style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid #8a0303',
                    backgroundColor: i <= value ? '#8a0303' : 'transparent',
                    cursor: readOnly ? 'default' : 'pointer',
                    boxShadow: i <= value ? '0 0 5px #ff0000' : 'none',
                    transition: 'all 0.2s ease'
                }}
            ></div>
        );
    }

    return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Zero listener (hidden overlay or small x) - For now, clicking 1 sets to 1. 
                In VTM usually 1 is minimum for attributes, 0 for abilities. 
                But for simplicity let's stick to simple dots. */}
            {dots}
        </div>
    );
};

export default DotInput;
