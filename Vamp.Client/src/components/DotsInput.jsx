import React from 'react';
import Tooltip from './Tooltip';

const DotsInput = ({ value, max = 5, onChange, dotDescriptions = [] }) => {
    return (
        <div className="dots-container" style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
            {[...Array(max)].map((_, index) => {
                const dotValue = index + 1;
                const isFilled = dotValue <= value;
                const tooltipText = dotDescriptions[index] || `Set to ${dotValue}`;

                return (
                    <Tooltip key={index} text={tooltipText}>
                        <div
                            className={`dot ${isFilled ? 'filled' : ''}`}
                            onClick={() => onChange(dotValue)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                            role="radio"
                            aria-checked={isFilled}
                            aria-label={`${dotValue} dots`}
                        />
                    </Tooltip>
                );
            })}
            {/* Allow clearing to 0 for abilities */}
            <Tooltip text="Clear / Limpar">
                <div
                    style={{ width: '10px', height: '14px', marginLeft: '5px' }}
                    onClick={() => onChange(0)}
                />
            </Tooltip>
        </div>
    );
};

export default DotsInput;
