import { useState } from "react";
import entries from "../data/bitacora.json";
import TicketEntry from "../components/TicketEntry.jsx";
import BackToTop from "../components/BackToTop.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import "../styles/bitacora.css";

const filters = ["Todas", "TP1", "TP2"];

const merch = [
    { img: "/img/merch-1.png", alt: "Remera naranja con la frase 'Mi div está centrado, yo no.' en el pecho.", name: "REMERA DE SUPERACIÓN PERSONAL" },
    { img: "/img/merch-2.png", alt: "Remera lila con la frase 'En mi máquina funciona' en el pecho.", name: "REMERA PARA TRIUNFADORES" },
    { img: "/img/merch-3.png", alt: "Remera verde neón con la frase 'Estudié programación para enseñarle a la IA a programar' en el pecho.", name: "REMERA MOTIVACIONAL" },
];

export default function Bitacora() {
    usePageTitle("Bitácora");
    const [filter, setFilter] = useState("Todas");
    // Ids de los tickets desplegados. Arranca abierto el más reciente.
    const [openIds, setOpenIds] = useState([entries[entries.length - 1].id]);
    const [showEncore, setShowEncore] = useState(false);

    const visibleEntries = entries.filter((entry) => filter === "Todas" || entry.tp === filter);
    const allOpen = visibleEntries.every((entry) => openIds.includes(entry.id));

    const toggleEntry = (id) => {
        setOpenIds(openIds.includes(id) ? openIds.filter((item) => item !== id) : [...openIds, id]);
    };

    const toggleAll = () => {
        setOpenIds(allOpen ? [] : visibleEntries.map((entry) => entry.id));
    };

    return (
        <>
            <section className="tour" id="tour">
                <div className="tour-title">
                    <span>BITÁCORA</span>
                    <h1 className="page-title">TOUR DATES</h1>
                </div>

                <div className="tour-tools">
                    <div className="tour-filter" role="group" aria-label="Filtrar entradas por trabajo práctico">
                        {filters.map((option) => (
                            <button
                                key={option}
                                type="button"
                                className="chip"
                                aria-pressed={filter === option}
                                onClick={() => setFilter(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <button type="button" className="chip" onClick={toggleAll}>
                        {allOpen ? "Cerrar todas" : "Abrir todas"}
                    </button>
                    <p className="tour-count" aria-live="polite">
                        {visibleEntries.length} {visibleEntries.length === 1 ? "fecha" : "fechas"}
                    </p>
                </div>

                <div className="tour-list">
                    {visibleEntries.map((entry) => (
                        <TicketEntry
                            key={entry.id}
                            entry={entry}
                            isOpen={openIds.includes(entry.id)}
                            onToggle={() => toggleEntry(entry.id)}
                        />
                    ))}
                </div>

                {/* ENCORE / BACKSTAGE PASS */}
                <div className="encore-section">
                    <button
                        type="button"
                        className="btn-encore"
                        aria-expanded={showEncore}
                        aria-controls="backstage-pass"
                        onClick={() => setShowEncore(!showEncore)}
                    >
                        🎤 UNA MÁS
                    </button>
                    <div id="backstage-pass" className={`backstage-pass${showEncore ? " show" : ""}`} aria-hidden={!showEncore}>
                        <div className="backstage-pass-inner">
                            <div className="backstage-header">
                                <h3>BACKSTAGE PASS</h3>
                                <span>VIP</span>
                            </div>
                            <div className="backstage-content">
                                <p>
                                    Gracias por bancar el show. Aprendimos a repartir tareas, pelearnos por la
                                    paleta de colores y cerrar el proyecto a tiempo. Y volvimos para la segunda edición.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OFFICIAL STORE */}
            <section className="store">
                <div className="store-title">
                    <span>MERCH</span>
                    <h2>OFFICIAL STORE</h2>
                </div>
                <div className="store-grid">
                    {merch.map((item) => (
                        <MerchCard key={item.name} item={item} />
                    ))}
                </div>
            </section>

            <BackToTop />
        </>
    );
}

// Tarjeta de la tienda: el botón de compra avisa que la remera se agotó.
function MerchCard({ item }) {
    const [soldOut, setSoldOut] = useState(false);

    return (
        <article className="store-card">
            <div className="store-image">
                <img src={item.img} alt={item.alt} />
            </div>
            <h3>{item.name}</h3>
            <button type="button" className="buy" onClick={() => setSoldOut(true)} aria-live="polite">
                {soldOut ? "¡AGOTADA! 😅" : "COMPRAR AHORA"}
            </button>
        </article>
    );
}
