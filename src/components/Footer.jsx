import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <Link className="site-footer-brand" to="/" aria-label="WebFest 2026, volver al inicio">
                    WEBFEST <span>2026</span>
                </Link>
                <p className="site-footer-credit">Proyecto del Grupo 13 · TP2 Desarrollo Front End</p>
                <nav className="site-footer-nav" aria-label="Navegación del pie de página">
                    <Link to="/">Inicio</Link>
                    <Link to="/cartelera">Cartelera</Link>
                    <Link to="/bitacora">Bitácora</Link>
                </nav>
                <small className="site-footer-copyright">© 2026 Grupo 13</small>
            </div>
        </footer>
    );
}
