import { useState } from "react";
import { Link } from "react-router-dom";
import ArtistCard from "../components/ArtistCard.jsx";
import members from "../data/members.json";
import lineup from "../data/lineup.json";
import usePageTitle from "../hooks/usePageTitle.js";
import "../styles/home.css";

export default function Home() {
    usePageTitle("");
    // Guarda qué tarjeta está dada vuelta (sólo una a la vez).
    const [flippedSlug, setFlippedSlug] = useState(null);

    const toggleCard = (slug) => {
        setFlippedSlug(flippedSlug === slug ? null : slug);
    };

    // Da vuelta una tarjeta al azar, distinta de la que ya está abierta.
    const showRandomProfile = () => {
        const options = members.filter((member) => member.slug !== flippedSlug);
        const pick = options[Math.floor(Math.random() * options.length)];
        setFlippedSlug(pick.slug);
        document.getElementById("artistas")?.scrollIntoView({ block: "center" });
    };

    return (
        <section className="hero">
            <div className="decor decor-pink" aria-hidden="true"></div>
            <div className="decor decor-green" aria-hidden="true"></div>
            <div className="lightning" aria-hidden="true">ϟ</div>

            <div className="hero-content">
                <h1>LINE UP</h1>

                <p className="subtitle">
                    4 ARTISTAS <span>•</span> 4 HISTORIAS <span>•</span> UN MISMO FESTIVAL
                </p>
                <p className="hero-description">
                    WebFest es nuestra presentación como equipo: usamos la temática de un festival para
                    mostrar quiénes somos, qué hacemos y nuestros perfiles. En esta edición el festival
                    se muda a React: tocá cada tarjeta para conocer a sus artistas y recorré la cartelera,
                    el clima del predio y la bitácora del tour desde el menú.
                </p>

                <ul className="hero-stats" aria-label="El festival en números">
                    <li><strong>{members.length}</strong> artistas</li>
                    <li><strong>{lineup.length}</strong> bandas en cartelera</li>
                    <li><strong>1</strong> festival</li>
                </ul>

                <section className="artists" id="artistas" aria-label="Integrantes del equipo">
                    {members.map((member) => (
                        <ArtistCard
                            key={member.slug}
                            member={member}
                            isFlipped={flippedSlug === member.slug}
                            onToggle={() => toggleCard(member.slug)}
                        />
                    ))}
                </section>

                <div className="hero-actions">
                    <button className="explore" type="button" onClick={showRandomProfile}>
                        🎲 PERFIL AL AZAR
                    </button>
                    <Link className="explore explore-outline" to="/cartelera">
                        VER CARTELERA →
                    </Link>
                </div>
            </div>
        </section>
    );
}
