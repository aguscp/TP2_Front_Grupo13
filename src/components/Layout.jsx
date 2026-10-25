import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import Splashes from "./Splashes.jsx";
import "../styles/layout.css";

// Estructura compartida por todas las pantallas:
// la sidebar queda fija y en el <Outlet /> cambia el contenido de cada sección.
export default function Layout() {
    const { pathname } = useLocation();
    // Sidebar contraída o expandida (en escritorio). Vive acá porque también cambia el margen del contenido.
    const [collapsed, setCollapsed] = useState(false);

    // Al cambiar de sección, la nueva pantalla arranca desde arriba.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className={`app-shell${collapsed ? " sidebar-collapsed" : ""}`}>
            <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
            <div className="app-main">
                <Splashes />
                <main className="app-content" id="contenido">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
