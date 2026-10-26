import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import members from "../data/members.json";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "../styles/sidebar.css";

// NavLink agrega la clase "is-active" (y aria-current="page") al enlace de la sección actual.
const linkClass = ({ isActive }) => `sidebar-link${isActive ? " is-active" : ""}`;

// "collapsed" y "onToggleCollapse" llegan desde Layout (escritorio: sidebar angosta sólo con íconos).
export default function Sidebar({ collapsed, onToggleCollapse }) {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    const { t } = useLanguage();
    const sections = [
        { to: "/", label: t("Inicio"), icon: "★", end: true },
        { to: "/cartelera", label: t("Cartelera"), icon: "🎟" },
        { to: "/clima", label: t("Clima del festival"), icon: "☁" },
        { to: "/arbol", label: t("Árbol de componentes"), icon: "⌥" },
        { to: "/bitacora", label: t("Bitácora"), icon: "✎" },
    ];

    // En celular, el panel se cierra solo al cambiar de sección.
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Con el panel abierto: Escape lo cierra y el fondo no se desplaza.
    useEffect(() => {
        if (!isOpen) return undefined;

        const closeOnEscape = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("keydown", closeOnEscape);
        document.body.classList.add("menu-open");

        return () => {
            document.removeEventListener("keydown", closeOnEscape);
            document.body.classList.remove("menu-open");
        };
    }, [isOpen]);

    return (
        <>
            {/* Barra superior: sólo se ve en pantallas chicas */}
            <header className="topbar">
                <Link to="/" className="sidebar-logo sidebar-logo--small" aria-label={t("WebFest 2026, ir al inicio")}>
                    WEB<br />FEST
                </Link>
                <button
                    type="button"
                    className="menu-toggle"
                    aria-label={isOpen ? t("Cerrar menú") : t("Abrir menú")}
                    aria-expanded={isOpen}
                    aria-controls="sidebar"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            <div
                className={`sidebar-overlay${isOpen ? " is-visible" : ""}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>

            <aside id="sidebar" className={`sidebar${isOpen ? " is-open" : ""}${collapsed ? " is-collapsed" : ""}`} aria-label={t("Menú principal")}>
                <div className="sidebar-brand">
                    <Link to="/" className="sidebar-logo" aria-label={t("WebFest 2026, ir al inicio")}>
                        WEB<br />FEST
                    </Link>
                    <div className="sidebar-text">
                        <span className="sidebar-year">2026</span>
                        <p className="sidebar-team">{t("Grupo 13 · Line up oficial")}</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to={sections[0].to} end className={linkClass} title={sections[0].label}>
                        <span className="sidebar-icon" aria-hidden="true">{sections[0].icon}</span>
                        <span className="sidebar-text">{sections[0].label}</span>
                    </NavLink>

                    <p className="sidebar-label"><span className="sidebar-text">{t("Artistas")}</span></p>
                    {members.map((member) => (
                        <NavLink
                            key={member.slug}
                            to={`/perfil/${member.slug}`}
                            className={linkClass}
                            title={member.stageName}
                            style={{ "--link-color": member.color }}
                        >
                            <span className="sidebar-dot" aria-hidden="true"></span>
                            <span className="sidebar-text">{member.stageName}</span>
                        </NavLink>
                    ))}

                    <p className="sidebar-label"><span className="sidebar-text">{t("Festival")}</span></p>
                    {sections.slice(1).map((section) => (
                        <NavLink key={section.to} to={section.to} className={linkClass} title={section.label}>
                            <span className="sidebar-icon" aria-hidden="true">{section.icon}</span>
                            <span className="sidebar-text">{section.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <p className="sidebar-footer sidebar-text">{t("ϟ 4 artistas · 1 festival")}</p>

                {/* Botón para achicar o agrandar la sidebar (sólo en escritorio) */}
                <button
                    type="button"
                    className="sidebar-collapse"
                    aria-label={collapsed ? t("Expandir menú lateral") : t("Contraer menú lateral")}
                    aria-expanded={!collapsed}
                    onClick={onToggleCollapse}
                >
                    <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
                    <span className="sidebar-text">{t("Contraer menú")}</span>
                </button>
            </aside>
        </>
    );
}
