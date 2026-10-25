import { useEffect, useState } from "react";

// Agus: reproductor ficticio que recorre sus discos favoritos.
// Play/Pausa anima el ecualizador y la barra; al llenarse, pasa al siguiente disco.
export default function FakePlayer({ albums, onPick }) {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [started, setStarted] = useState(false);

    // Cambia de disco, reinicia la barra y avisa al perfil cuál resaltar en la lista.
    const goTo = (index) => {
        setCurrent(index);
        setProgress(0);
        onPick(albums[index].id);
    };

    // Mientras suena, la barra avanza un poco cada 150 ms.
    useEffect(() => {
        if (!isPlaying) return undefined;
        const timer = setInterval(() => setProgress((value) => value + 2), 150);
        return () => clearInterval(timer);
    }, [isPlaying]);

    // Cuando la barra se llena, pasa solo al disco siguiente.
    useEffect(() => {
        if (progress >= 100) goTo((current + 1) % albums.length);
    }, [progress]);

    const togglePlay = () => {
        if (!started) {
            setStarted(true);
            onPick(albums[current].id);
        }
        setIsPlaying(!isPlaying);
    };

    const next = () => {
        setStarted(true);
        setIsPlaying(true);
        goTo((current + 1) % albums.length);
    };

    return (
        <div className="profile-block">
            <h2>Sonando ahora</h2>
            <div className={`agus-player${isPlaying ? " is-playing" : ""}`}>
                <div className="agus-player-info">
                    <div className="agus-eq" aria-hidden="true">
                        <span></span><span></span><span></span><span></span>
                    </div>
                    <p className="agus-now" aria-live="polite">
                        {started ? `🎧 ${albums[current].label}` : "Elegí play para arrancar el show"}
                    </p>
                </div>
                <div className="agus-progress" aria-hidden="true">
                    <span style={{ width: `${progress}%` }}></span>
                </div>
                <div className="agus-controls">
                    <button type="button" className="profile-random-btn" onClick={togglePlay}>
                        {isPlaying ? "⏸ Pausa" : "▶ Play"}
                    </button>
                    <button type="button" className="profile-random-btn" onClick={next}>
                        ⏭ Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
