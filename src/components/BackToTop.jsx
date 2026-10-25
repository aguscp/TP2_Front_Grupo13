import { useEffect, useState } from "react";

// Botón flotante que aparece al bajar y lleva al principio de la página.
export default function BackToTop() {
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
            aria-label="Volver al principio de la página"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            ↑
        </button>
    );
}
