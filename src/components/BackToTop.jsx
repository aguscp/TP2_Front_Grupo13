import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Botón flotante que aparece al bajar y lleva al principio de la página.
export default function BackToTop() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const update = () => setIsVisible(window.scrollY > 400);
        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, []);

    if (!isVisible) return null;

    return (
        <button
            type="button"
            className="back-to-top"
            aria-label={t("Volver al principio de la página")}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            ↑
        </button>
    );
}
