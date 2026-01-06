import React, { createContext, useState, useEffect, useContext } from 'react';
import { LOCALES } from '../constants/locales';
import { preferencesService } from '../services/preferencesService';

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
    const [language, setLanguageState] = useState('En-Us');

    useEffect(() => {
        const loadLang = async () => {
            const stored = await preferencesService.getLanguage();
            // Normalize backend 'en'/'pt' to 'En-Us'/'Pt-Br' maps if necessary, 
            // but assuming we store 'En-Us'/'Pt-Br' primarily now.
            // If we get 'en', map to 'En-Us'
            const map = { 'en': 'En-Us', 'pt': 'Pt-Br' };
            setLanguageState(map[stored] || stored || 'En-Us');
        };
        loadLang();
    }, []);

    const setLanguage = async (newLang) => {
        setLanguageState(newLang);
        await preferencesService.setLanguage(newLang);
    };

    const t = (key) => {
        const dict = LOCALES[language] || LOCALES['En-Us'];
        return dict[key] || key;
    };

    return (
        <LocalizationContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => useContext(LocalizationContext);
