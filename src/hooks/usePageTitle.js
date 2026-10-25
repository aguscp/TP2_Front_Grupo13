import { useEffect } from "react";

// Cambia el título de la pestaña del navegador según la página.
export default function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | WebFest 2026` : "WebFest 2026 | Grupo 13";
    }, [title]);
}
