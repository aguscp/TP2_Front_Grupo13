import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Tarjeta que se da vuelta (flip) al tocarla.
// Es un solo componente que se reutiliza 4 veces con distintos datos (props).
export default function ArtistCard({ member, isFlipped, onToggle }) {
    const { t, data } = useLanguage();
    const translatedMember = data?.members?.[member.slug];
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
            aria-label={`${t(isFlipped ? "Volver a la portada de" : "Ver información de")} ${member.stageName}`}
            onClick={(event) => {
                if (!event.target.closest("a")) onToggle();
            }}
            onKeyDown={handleKeyDown}
        >
            <div className="artist-card-inner">
                <div className="artist-card-face artist-card-front" aria-hidden={isFlipped}>
                    <div className="artist-image">
                        <img src={member.photo} alt={translatedMember?.photoAlt ?? member.photoAlt} />
                    </div>
                    <div className="artist-info">
                        <h2>{member.stageName}</h2>
                        <span>{member.number}</span>
                    </div>
                    <span className="flip-hint front-hint">{t("VER MÁS")}</span>
                </div>

                <div className="artist-card-face artist-card-back" aria-hidden={!isFlipped}>
                    <h2>{member.stageName}</h2>
                    <dl className="artist-details">
                        <div>
                            <dt>{t("Sobre")} {member.stageName}</dt>
                            <dd>{translatedMember?.summary ?? member.summary}</dd>
                        </div>
                        <div>
                            <dt>Skills</dt>
                            <dd>{member.skills.map((skill) => t(skill)).join(", ")}</dd>
                        </div>
                    </dl>
                    <Link to={`/perfil/${member.slug}`} className="profile-link" tabIndex={isFlipped ? 0 : -1}>
                        {t("VER PERFIL →")}
                    </Link>
                    <span className="flip-hint">{t("Tocá para volver")}</span>
                </div>
            </div>
        </article>
    );
}
