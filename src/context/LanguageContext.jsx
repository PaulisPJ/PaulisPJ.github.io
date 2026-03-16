import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    lv: {
        app_title: "Domkapitula\nmīkla",
        select_language: "Izvēlieties valodu",
        start_game: "Sākt spēli",
        continue_game: "Turpināt",
        menu_story: "Stāsts",
        menu_riddle: "Mīkla",
        menu_questions: "Jautājumi",
        menu_tutorial: "Palīdzība",
        back: "Atpakaļ",
    },
    en: {
        app_title: "The Cathedral\nChapter Riddle",
        select_language: "Select Language",
        start_game: "Start Game",
        continue_game: "Continue",
        menu_story: "Story",
        menu_riddle: "The riddle",
        menu_questions: "Questions",
        menu_tutorial: "Help",
        back: "Back",
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('appLanguage') || 'lv';
    });

    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
