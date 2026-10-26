import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import members from "../data/members.json";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Ventana modal con el detalle de una banda de la cartelera.
export default function BandModal({ band, onClose }) {
    const { t, data } = useLanguage();
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
                <button type="button" className="band-modal-close" onClick={onClose} aria-label={t("Cerrar detalle")}>
                    ✕
                </button>

                <span className="band-genre">{data?.genres?.[band.genre] ?? band.genre}</span>
                <h2 className="band-name" id={titleId}>{band.name}</h2>
                <p className="band-when">
                    {t(band.day)} - {band.time} {t("hs")} - {t(band.stage)}
                </p>

                <dl className="band-facts">
                    <div>
                        <dt>{t("Origen")}</dt>
                        <dd>{t(band.country)}</dd>
                    </div>
                    <div>
                        <dt>{t("Disco para escuchar antes")}</dt>
                        <dd>{band.album}</dd>
                    </div>
                </dl>
                <p className="band-description">{data?.lineup?.[band.id] ?? band.description}</p>

                {fan && (
                    <Link to={`/perfil/${fan.slug}`} className="band-fan" style={{ "--fan-color": fan.color }}>
                        {t("★ Elegida por")} {fan.stageName}{t(" - Ver Perfil →")}
                    </Link>
                )}
            </div>
        </dialog>
    );
}
