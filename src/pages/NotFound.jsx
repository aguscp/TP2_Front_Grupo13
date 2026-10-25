import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle.js";

// Se muestra si la URL no corresponde a ninguna sección (ruta "*").
export default function NotFound() {
    usePageTitle("Página no encontrada");

    return (
        <section className="page">
            <header className="page-header">
                <span className="page-kicker">ERROR 404</span>
                <h1 className="page-title">Este show no existe</h1>
                <p className="page-intro">
                    La entrada que buscás no está en la grilla del festival. Volvé al inicio o elegí
                    una sección desde el menú.
                </p>
            </header>
            <Link to="/" className="btn">← Volver al inicio</Link>
        </section>
    );
}
