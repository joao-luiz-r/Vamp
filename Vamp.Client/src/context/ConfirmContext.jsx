import React, { createContext, useContext, useState } from 'react';

// Context definition
const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
    const [confirmState, setConfirmState] = useState({
        open: false,
        message: '',
        resolve: null,
    });

    const requestConfirm = (message) => {
        return new Promise((resolve) => {
            setConfirmState({ open: true, message, resolve });
        });
    };

    const handleClose = (result) => {
        if (confirmState.resolve) {
            confirmState.resolve(result);
        }
        setConfirmState({ ...confirmState, open: false, resolve: null });
    };

    return (
        <ConfirmContext.Provider value={{ requestConfirm }}>
            {children}
            {confirmState.open && (
                <div className="confirm-overlay" onClick={() => handleClose(false)}>
                    <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
                        <p className="confirm-message">{confirmState.message}</p>
                        <div className="confirm-actions">
                            <button className="btn-confirm" onClick={() => handleClose(true)}>{'Yes'}</button>
                            <button className="btn-cancel" onClick={() => handleClose(false)}>{'No'}</button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => useContext(ConfirmContext);
