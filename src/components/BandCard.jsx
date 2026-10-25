import { Link } from "react-router-dom";
import members from "../data/members.json";

// Tarjeta de una banda de la cartelera. Se reutiliza para los 25 registros del JSON.
// "isOpen" decide si se ve el detalle; "onToggle" lo abre o cierra.
export default function BandCard({ band, isOpen, onToggle }) {
    const fan = members.find((member) => member.slug === band.recommendedBy);
    const detailId = `banda-${band.id}`;

    return (
        <article className={`band-card${isOpen ? " is-open" : ""}`} data-genre={band.genre}>
            <span className="band-genre">{band.genre}</span>
            <h2 className="band-name">{band.name}</h2>
            <p className="band-when">
                {band.day} · {band.time} hs
            </p>

            <button
                type="button"
                className="band-toggle"
                aria-expanded={isOpen}
                aria-controls={detailId}
                onClick={onToggle}
            >
                {isOpen ? "Ocultar info −" : "Más info +"}
            </button>

            {isOpen && (
                <div className="band-detail" id={detailId}>
                    <dl className="band-facts">
                        <div>
                            <dt>Origen</dt>
                            <dd>{band.country}</dd>
                        </div>
                        <div>
                            <dt>Escenario</dt>
                            <dd>{band.stage}</dd>
                        </div>
                        <div>
                            <dt>Disco para escuchar antes</dt>
                            <dd>{band.album}</dd>
                        </div>
                    </dl>
                    <p className="band-description">{band.description}</p>
                    {fan && (
                        <Link to={`/perfil/${fan.slug}`} className="band-fan" style={{ "--fan-color": fan.color }}>
                            ★ Elegida por {fan.stageName} · ver perfil →
                        </Link>
                    )}
                </div>
            )}
        </article>
    );
}
