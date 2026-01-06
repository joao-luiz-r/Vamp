import React, { createContext, useState, useEffect, useContext } from 'react';
import { en } from '../locales/en';
import { pt } from '../locales/pt';

const LanguageContext = createContext();

const dictionaries = { en, pt };

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        // Fetch preference from backend
        fetch('https://localhost:7165/api/preferences/language')
            .then(res => res.json())
            .then(data => {
                if (data.language) setLanguage(data.language);
            })
            .catch(err => console.error("Failed to load language preference", err));
    }, []);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        // Save to backend
        fetch('https://localhost:7165/api/preferences/language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: lang })
        }).catch(err => console.error("Failed to save language preference", err));
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = dictionaries[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
