import React from 'react';

const DotsInput = ({ value, max = 5, onChange, dotDescriptions = [] }) => {
    return (
        <div className="dots-container" style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
            {[...Array(max)].map((_, index) => {
                const dotValue = index + 1;
                const isFilled = dotValue <= value;
                const tooltipText = dotDescriptions[index] || `Set to ${dotValue}`;

                return (
                    <div
                        key={index}
                        className={`dot ${isFilled ? 'filled' : ''}`}
                        onClick={() => onChange(dotValue)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title={tooltipText}
                        role="radio"
                        aria-checked={isFilled}
                        aria-label={`${dotValue} dots`}
                    />
                );
            })}
            {/* Allow clearing to 0 for abilities */}
            <div
                style={{ width: '10px', height: '14px' }}
                onClick={() => onChange(0)}
                title="Clear"
            />
        </div>
    );
};

export default DotsInput;
