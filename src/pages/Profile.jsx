import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import members from "../data/members.json";
import usePageTitle from "../hooks/usePageTitle.js";
import PickList from "../components/PickList.jsx";
import HypeMeter from "../components/interactions/HypeMeter.jsx";
import RandomPick from "../components/interactions/RandomPick.jsx";
import FakePlayer from "../components/interactions/FakePlayer.jsx";
import QuoteGenerator from "../components/interactions/QuoteGenerator.jsx";
import SkillBars from "../components/interactions/SkillBars.jsx";
import NotFound from "./NotFound.jsx";
import "../styles/profile.css";
import "../styles/interactions.css";

// Una sola página de perfil para los 4 integrantes:
// lee el ":slug" de la URL (/perfil/agus) y busca sus datos en members.json.
export default function Profile() {
    const { slug } = useParams();
    const index = members.findIndex((member) => member.slug === slug);

    if (index === -1) return <NotFound />;

    // "key" hace que al cambiar de perfil se reinicien sus interacciones.
    return <ProfileView key={slug} member={members[index]} index={index} />;
}

function ProfileView({ member, index }) {
    usePageTitle(member.stageName);
    // Id del elemento resaltado en las listas (lo usan el recomendador y el reproductor).
    const [pickedId, setPickedId] = useState(null);

    const movies = member.movies.map((movie, i) => ({
        id: `pelicula-${i}`,
        kind: "película",
        label: `${movie.title} (${movie.year})`,
        title: movie.title,
        extra: `(${movie.year})`,
    }));

    const albums = member.albums.map((album, i) => ({
        id: `disco-${i}`,
        kind: "disco",
        label: `${album.title} — ${album.artist}`,
        title: album.title,
        extra: `— ${album.artist}`,
    }));

    const previous = members[(index - 1 + members.length) % members.length];
    const next = members[(index + 1) % members.length];

    return (
        <section className={`profile profile--${member.slug}`} style={{ "--profile-color": member.color }}>
            <div className="profile-poster">
                <figure className="profile-photo">
                    <img src={member.photo} alt={member.photoAlt} />
                    <figcaption>{member.photoCaption}</figcaption>
                </figure>

                <div className="profile-heading">
                    <span className="profile-number">{member.number}</span>
                    <h1>{member.stageName}</h1>
                    <p className="profile-fullname">{member.fullName}</p>
                </div>
            </div>

            <div className="profile-data" aria-label={`Datos de ${member.fullName}`}>
                <dl className="profile-facts">
                    <div>
                        <dt>Ciudad</dt>
                        <dd>{member.city}</dd>
                    </div>
                    <div>
                        <dt>Edad</dt>
                        <dd>{member.age} años</dd>
                    </div>
                </dl>

                <p className="profile-bio">{member.bio}</p>

                <div className="profile-block">
                    <h2>Skills</h2>
                    <ul className="profile-list profile-skills">
                        {member.skills.map((skill) => (
                            <li key={skill}>{skill}</li>
                        ))}
                    </ul>
                </div>

                <PickList title="Películas favoritas" items={movies} pickedId={pickedId} />
                <PickList title="Discos favoritos" items={albums} pickedId={pickedId} />

                {/* Cada integrante tiene su propia interacción */}
                {member.interaction === "hype" && <HypeMeter />}
                {member.interaction === "random" && (
                    <RandomPick items={[...movies, ...albums]} onPick={setPickedId} />
                )}
                {member.interaction === "player" && <FakePlayer albums={albums} onPick={setPickedId} />}
                {member.interaction === "quotes" && <QuoteGenerator />}
                {member.interaction === "skills" && <SkillBars />}
            </div>

            <nav className="profile-actions" aria-label="Navegación entre perfiles">
                <Link to={`/perfil/${previous.slug}`} className="profile-btn profile-btn-outline">
                    ← {previous.stageName}
                </Link>
                <Link to="/" className="profile-btn">Volver al line up</Link>
                <Link to={`/perfil/${next.slug}`} className="profile-btn profile-btn-outline">
                    {next.stageName} →
                </Link>
            </nav>
        </section>
    );
}
