import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import members from "../data/members.json";

// Ventana modal con el detalle de una banda de la cartelera.
export default function BandModal({ band, onClose }) {
    const dialogRef = useRef(null);
    const fan = members.find((member) => member.slug === band.recommendedBy);
    const titleId = `modal-banda-${band.id}`;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog.open) dialog.showModal();
        // Evita que la página de atrás se desplace mientras el modal está abierto.
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Un clic sobre el fondo (fuera de la caja) también cierra el modal.
    const handleClick = (event) => {
        if (event.target === dialogRef.current) onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            className="band-modal"
            data-genre={band.genre}
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={handleClick}
        >
            <div className="band-modal-box">
                <button type="button" className="band-modal-close" onClick={onClose} aria-label="Cerrar detalle">
                    ✕
                </button>

                <span className="band-genre">{band.genre}</span>
                <h2 className="band-name" id={titleId}>{band.name}</h2>
                <p className="band-when">
                    {band.day} - {band.time} hs - {band.stage}
                </p>

                <dl className="band-facts">
                    <div>
                        <dt>Origen</dt>
                        <dd>{band.country}</dd>
                    </div>
                    <div>
                        <dt>Disco para escuchar antes</dt>
                        <dd>{band.album}</dd>
                    </div>
                </dl>
                <p className="band-description">{band.description}</p>

                {fan && (
                    <Link to={`/perfil/${fan.slug}`} className="band-fan" style={{ "--fan-color": fan.color }}>
                        ★ Elegida por {fan.stageName} - Ver Perfil →
                    </Link>
                )}
            </div>
        </dialog>
    );
}
