import React from 'react';
import { useLocalization } from '../context/LocalizationContext';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLocalization();

    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div
                onClick={() => setLanguage('En-Us')}
                style={{
                    cursor: 'pointer',
                    opacity: language === 'En-Us' ? 1 : 0.5,
                    border: language === 'En-Us' ? '2px solid #a00' : '2px solid transparent',
                    borderRadius: '4px',
                    padding: '2px'
                }}
                title="English"
            >
                {/* Simple US Flag SVG */}
                <svg width="30" height="20" viewBox="0 0 30 20">
                    <rect width="30" height="20" fill="#b22234" />
                    <rect y="2" width="30" height="2" fill="white" />
                    <rect y="6" width="30" height="2" fill="white" />
                    <rect y="10" width="30" height="2" fill="white" />
                    <rect y="14" width="30" height="2" fill="white" />
                    <rect width="12" height="10" fill="#3c3b6e" />
                </svg>
            </div>
            <div
                onClick={() => setLanguage('Pt-Br')}
                style={{
                    cursor: 'pointer',
                    opacity: language === 'Pt-Br' ? 1 : 0.5,
                    border: language === 'Pt-Br' ? '2px solid #a00' : '2px solid transparent',
                    borderRadius: '4px',
                    padding: '2px'
                }}
                title="Português"
            >
                {/* Simple Brazil Flag SVG */}
                <svg width="30" height="20" viewBox="0 0 30 20">
                    <rect width="30" height="20" fill="#009c3b" />
                    <path d="M15 2 L28 10 L15 18 L2 10 Z" fill="#ffdf00" />
                    <circle cx="15" cy="10" r="3.5" fill="#002776" />
                </svg>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
