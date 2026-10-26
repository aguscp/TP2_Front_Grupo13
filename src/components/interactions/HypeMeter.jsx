import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

// Sebas: un slider que cambia el mensaje y el emoji según el nivel de hype.
const levels = [
    { max: 20, emoji: "🥱", text: "Probando sonido..." },
    { max: 40, emoji: "🤔", text: "¡Entrando en calor!" },
    { max: 60, emoji: "🎸", text: "¡Afinando la guitarra!" },
    { max: 85, emoji: "🔥", text: "¡Rompemos toda!" },
    { max: 101, emoji: "🚀", text: "¡A tocar!" },
];

export default function HypeMeter() {
    const { t } = useLanguage();
    const [hype, setHype] = useState(0);
    const level = levels.find((item) => hype < item.max);

    return (
        <div className="profile-block">
            <h2>{t("Medidor de Hype")}</h2>
            <div className="hype-meter">
                <label htmlFor="hype-range" className="sr-only">{t("Nivel de hype")}</label>
                <input
                    type="range"
                    id="hype-range"
                    className="hype-range"
                    min="0"
                    max="100"
                    value={hype}
                    onChange={(event) => setHype(Number(event.target.value))}
                />
                <div className="hype-result" aria-live="polite">
                    <span className="hype-emoji">{level.emoji}</span>
                    <span className="hype-text">{t(level.text)}</span>
                </div>
            </div>
        </div>
    );
}
