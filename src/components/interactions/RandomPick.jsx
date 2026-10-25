import { useState } from "react";

// Valen: elige al azar una película o un disco, lo anuncia y lo resalta en la lista.
// "items" llega por props; "onPick" avisa al perfil qué elemento resaltar.
export default function RandomPick({ items, onPick }) {
    const [last, setLast] = useState(null);

    const pickRandom = () => {
        const options = items.filter((item) => item.id !== last?.id);
        const pick = options[Math.floor(Math.random() * options.length)];
        setLast(pick);
        onPick(pick.id);
    };

    return (
        <div className="profile-random">
            <button type="button" className="profile-random-btn" onClick={pickRandom}>
                🎲 ¿Qué escucho / veo hoy?
            </button>
            <p className="profile-random-result" aria-live="polite">
                {last && `Hoy toca ${last.kind}: ${last.label}`}
            </p>
        </div>
    );
}
