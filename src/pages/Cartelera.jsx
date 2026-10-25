import { useState } from "react";
import { Link } from "react-router-dom";
import lineup from "../data/lineup.json";
import BandCard from "../components/BandCard.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import "../styles/cartelera.css";

// Lista de géneros sin repetir, armada a partir de los datos del JSON.
const genres = ["Todos", ...new Set(lineup.map((band) => band.genre))];

// Pasa a minúsculas y saca tildes, así "rosalia" encuentra a "Rosalía".
const normalize = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function Cartelera() {
    usePageTitle("Cartelera");
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("Todos");
    const [openId, setOpenId] = useState(null);

    // Se recalcula en cada render: búsqueda por texto + filtro por género.
    const results = lineup.filter((band) => {
        const text = normalize(`${band.name} ${band.album} ${band.country}`);
        const matchesSearch = text.includes(normalize(search.trim()));
        const matchesGenre = genre === "Todos" || band.genre === genre;
        return matchesSearch && matchesGenre;
    });

    const isFiltered = search !== "" || genre !== "Todos";

    const reset = () => {
        setSearch("");
        setGenre("Todos");
        setOpenId(null);
    };

    return (
        <section className="page">
            <header className="page-header">
                <span className="page-kicker">DATOS LOCALES · JSON</span>
                <h1 className="page-title">Cartelera</h1>
                <p className="page-intro">
                    Las {lineup.length} bandas invitadas a la segunda edición del festival, cargadas desde un
                    archivo <code>lineup.json</code>. Algunas las eligió cada integrante del equipo: buscalas
                    por nombre, disco o país, o filtralas por género.
                </p>
            </header>

            <form className="lineup-tools" role="search" onSubmit={(event) => event.preventDefault()}>
                <div className="field">
                    <label htmlFor="lineup-search">Buscar</label>
                    <input
                        id="lineup-search"
                        type="search"
                        placeholder="Ej: Pearl Jam, Argentina, AM..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="lineup-genre">Género</label>
                    <select id="lineup-genre" value={genre} onChange={(event) => setGenre(event.target.value)}>
                        {genres.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <button type="button" className="btn btn-outline" onClick={reset} disabled={!isFiltered}>
                    ↺ Ver todas
                </button>
            </form>

            <p className="lineup-count" aria-live="polite">
                Mostrando {results.length} de {lineup.length} bandas
            </p>

            {results.length > 0 ? (
                <div className="lineup-grid">
                    {results.map((band) => (
                        <BandCard
                            key={band.id}
                            band={band}
                            isOpen={openId === band.id}
                            onToggle={() => setOpenId(openId === band.id ? null : band.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="lineup-empty">
                    <p className="lineup-empty-title">Ninguna banda coincide 🎸</p>
                    <p>Probá con otra palabra u otro género, o volvé a ver la cartelera completa.</p>
                    <button type="button" className="btn" onClick={reset}>↺ Ver todas las bandas</button>
                </div>
            )}

            <nav className="page-nav" aria-label="Continuar recorrido">
                <Link to="/" className="btn btn-outline">← Inicio</Link>
                <Link to="/clima" className="btn">Clima del festival →</Link>
            </nav>
        </section>
    );
}
