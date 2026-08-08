import React, { createContext, useContext, useState } from 'react';
import { useLocalization } from './LocalizationContext';

// Context definition
const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
    const { t } = useLocalization();
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
                            <button className="btn-confirm" onClick={() => handleClose(true)}>{t('action.yes') || 'Yes'}</button>
                            <button className="btn-cancel" onClick={() => handleClose(false)}>{t('action.no') || 'No'}</button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => useContext(ConfirmContext);
