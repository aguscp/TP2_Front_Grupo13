import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Footer() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <Link className="site-footer-brand" to="/" aria-label={t("WEBFEST 2026, volver al inicio")}>
                    WEBFEST <span>2026</span>
                </Link>
                <p className="site-footer-credit">{t("Proyecto del Grupo 13 · TP2 Desarrollo Front End")}</p>
                <nav className="site-footer-nav" aria-label={t("Navegación del pie de página")}>
                    <Link to="/">{t("Inicio")}</Link>
                    <Link to="/cartelera">{t("Cartelera")}</Link>
                    <Link to="/clima">{t("Clima")}</Link>
                    <Link to="/arbol">{t("Árbol")}</Link>
                    <Link to="/bitacora">{t("Bitácora")}</Link>
                </nav>
                <label className="site-footer-language">
                    <span>{t("Idioma")}</span>
                    <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t("Idioma")}>
                        <option value="es">{t("Español")}</option>
                        <option value="en">{t("Inglés")}</option>
                    </select>
                </label>
                <small className="site-footer-copyright">© 2026 {t("Grupo 13")}</small>
            </div>
        </footer>
    );
}
