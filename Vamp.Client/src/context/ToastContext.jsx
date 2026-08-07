import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 3500) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div
                className="toast-container"
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    maxWidth: '380px',
                    pointerEvents: 'none'
                }}
            >
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        onClick={() => removeToast(toast.id)}
                        style={{
                            pointerEvents: 'auto',
                            background: toast.type === 'error'
                                ? 'linear-gradient(135deg, #4a0000 0%, #1a0000 100%)'
                                : 'linear-gradient(135deg, #1f1a1a 0%, #0d0d0d 100%)',
                            color: toast.type === 'error' ? '#ff8888' : '#e0e0e0',
                            borderLeft: `4px solid ${toast.type === 'error' ? '#e60000' : '#8b0000'}`,
                            borderTop: '1px solid #444',
                            borderRight: '1px solid #444',
                            borderBottom: '1px solid #444',
                            padding: '12px 18px',
                            borderRadius: '6px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.8), 0 0 10px rgba(139,0,0,0.3)',
                            fontFamily: 'Cinzel, sans-serif',
                            fontSize: '0.9rem',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            animation: 'toastFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <span>{toast.message}</span>
                        <span style={{ marginLeft: '12px', opacity: 0.6, fontSize: '0.8rem' }}>✕</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
