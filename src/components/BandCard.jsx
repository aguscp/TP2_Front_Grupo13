// Tarjeta de una banda de la cartelera. Se reutiliza para los 25 registros del JSON.
// "onOpen" avisa a la Cartelera que tiene que abrir el modal con el detalle de esta banda.
export default function BandCard({ band, onOpen }) {
    return (
        <article className="band-card" data-genre={band.genre}>
            <span className="band-genre">{band.genre}</span>
            <h2 className="band-name">{band.name}</h2>
            <p className="band-when">
                {band.day} - {band.time} hs
            </p>

            <button type="button" className="band-toggle" aria-haspopup="dialog" onClick={onOpen}>
                Más info +
            </button>
        </article>
    );
}
