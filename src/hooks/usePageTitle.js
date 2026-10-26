import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Cambia el título de la pestaña del navegador según la página.
export default function usePageTitle(title) {
    const { t } = useLanguage();
    useEffect(() => {
        document.title = title ? `${title} | WebFest 2026` : `WebFest 2026 | ${t("Grupo 13")}`;
    }, [title, t]);
}
