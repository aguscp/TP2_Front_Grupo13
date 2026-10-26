import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./en.json";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = window.localStorage.getItem("webfest-language");
        return savedLanguage === "en" ? "en" : "es";
    });

    useEffect(() => {
        window.localStorage.setItem("webfest-language", language);
        document.documentElement.lang = language;
    }, [language]);

    const value = useMemo(() => ({
        language,
        setLanguage,
        t: (key, values = {}) => {
            const translation = language === "en" ? (en[key] ?? key) : key;
            return translation.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
        },
        data: language === "en" ? en.data : null,
    }), [language]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
