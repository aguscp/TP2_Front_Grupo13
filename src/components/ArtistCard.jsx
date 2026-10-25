import { Link } from "react-router-dom";

// Tarjeta que se da vuelta (flip) al tocarla.
// Es un solo componente que se reutiliza 4 veces con distintos datos (props).
export default function ArtistCard({ member, isFlipped, onToggle }) {
    const handleKeyDown = (event) => {
        if (event.target.closest("a")) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
        }
    };

    return (
        <article
            className={`artist-card ${member.cardColor}${isFlipped ? " is-flipped" : ""}`}
            role="button"
            tabIndex={0}
            aria-pressed={isFlipped}
            aria-label={`${isFlipped ? "Volver a la portada de" : "Ver información de"} ${member.stageName}`}
            onClick={(event) => {
                if (!event.target.closest("a")) onToggle();
            }}
            onKeyDown={handleKeyDown}
        >
            <div className="artist-card-inner">
                <div className="artist-card-face artist-card-front" aria-hidden={isFlipped}>
                    <div className="artist-image">
                        <img src={member.photo} alt={member.photoAlt} />
                    </div>
                    <div className="artist-info">
                        <h2>{member.stageName}</h2>
                        <span>{member.number}</span>
                    </div>
                    <span className="flip-hint front-hint">VER MÁS</span>
                </div>

                <div className="artist-card-face artist-card-back" aria-hidden={!isFlipped}>
                    <h2>{member.stageName}</h2>
                    <dl className="artist-details">
                        <div>
                            <dt>Sobre {member.stageName}</dt>
                            <dd>{member.summary}</dd>
                        </div>
                        <div>
                            <dt>Skills</dt>
                            <dd>{member.skills.join(", ")}</dd>
                        </div>
                    </dl>
                    <Link to={`/perfil/${member.slug}`} className="profile-link" tabIndex={isFlipped ? 0 : -1}>
                        VER PERFIL →
                    </Link>
                    <span className="flip-hint">Tocá para volver</span>
                </div>
            </div>
        </article>
    );
}
