import { useState } from "react";
import { Link } from "react-router-dom";
import lineup from "../data/lineup.json";
import BandCard from "../components/BandCard.jsx";
import BandModal from "../components/BandModal.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "../styles/cartelera.css";

// Lista de géneros sin repetir, armada a partir de los datos del JSON.
// Pasa a minúsculas y saca tildes, así "rosalia" encuentra a "Rosalía".
const normalize = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function Cartelera() {
    const { t, data } = useLanguage();
    usePageTitle(t("Cartelera"));
    const genres = ["Todos", ...new Set(lineup.map((band) => band.genre))];
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("Todos");
    // Banda elegida para ver en el modal (null = modal cerrado).
    const [selectedBand, setSelectedBand] = useState(null);

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
        setSelectedBand(null);
    };

    return (
        <section className="page">
            <header className="page-header">
                <span className="page-kicker">{t("DATOS LOCALES · JSON")}</span>
                <h1 className="page-title">{t("Cartelera")}</h1>
                <p className="page-intro">
                    {t("Las {count} bandas invitadas a la segunda edición del festival, cargadas desde un archivo lineup.json. Algunas las eligió cada integrante del equipo: buscalas por nombre, disco o país, o filtralas por género.", { count: lineup.length })}
                </p>
            </header>

            <form className="lineup-tools" role="search" onSubmit={(event) => event.preventDefault()}>
                <div className="field">
                    <label htmlFor="lineup-search">{t("Buscar")}</label>
                    <input
                        id="lineup-search"
                        type="search"
                        placeholder={t("Ej: Pearl Jam, Argentina, AM...")}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="lineup-genre">{t("Género")}</label>
                    <select id="lineup-genre" value={genre} onChange={(event) => setGenre(event.target.value)}>
                        {genres.map((option) => (
                            <option key={option} value={option}>{option === "Todos" ? t(option) : data?.genres?.[option] ?? option}</option>
                        ))}
                    </select>
                </div>

                <button type="button" className="btn btn-outline" onClick={reset} disabled={!isFiltered}>
                    {t("↺ Ver todas")}
                </button>
            </form>

            <p className="lineup-count" aria-live="polite">
                {t("Mostrando {shown} de {total} bandas", { shown: results.length, total: lineup.length })}
            </p>

            {results.length > 0 ? (
                <div className="lineup-grid">
                    {results.map((band) => (
                        <BandCard
                            key={band.id}
                            band={band}
                            onOpen={() => setSelectedBand(band)}
                        />
                    ))}
                </div>
            ) : (
                <div className="lineup-empty">
                    <p className="lineup-empty-title">{t("Ninguna banda coincide 🎸")}</p>
                    <p>{t("Probá con otra palabra u otro género, o volvé a ver la cartelera completa.")}</p>
                    <button type="button" className="btn" onClick={reset}>{t("↺ Ver todas las bandas")}</button>
                </div>
            )}

            {selectedBand && <BandModal band={selectedBand} onClose={() => setSelectedBand(null)} />}

            <nav className="page-nav" aria-label={t("Continuar recorrido")}>
                <Link to="/" className="btn btn-outline">{t("← Inicio")}</Link>
                <Link to="/clima" className="btn">{t("Clima del festival →")}</Link>
            </nav>
        </section>
    );
}
