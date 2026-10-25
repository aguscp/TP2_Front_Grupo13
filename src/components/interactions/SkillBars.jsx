import { useState } from "react";

// Sebas: barras de skills interactivas con botones + / −
// Cada skill tiene un nivel del 1 al 5 y un mensaje distinto al llegar al máximo.

const SKILLS = [
    {
        name: "HTML y CSS",
        emoji: "🎨",
        maxMsg: "¡El layout ya no me da miedo!",
    },
    {
        name: "JavaScript",
        emoji: "⚡",
        maxMsg: "¡Asincronía dominada!",
    },
    {
        name: "React",
        emoji: "⚛️",
        maxMsg: "¡Hooks y componentes: sin problemas!",
    },
    {
        name: "SQL",
        emoji: "🗄️",
        maxMsg: "¡La base de datos responde!",
    },
];

const MAX = 5;

export default function SkillBars() {
    // Estado: un objeto { "HTML y CSS": 3, "JavaScript": 2, ... }
    const [levels, setLevels] = useState(
        Object.fromEntries(SKILLS.map((s) => [s.name, 3]))
    );

    function change(name, delta) {
        setLevels((prev) => ({
            ...prev,
            [name]: Math.max(1, Math.min(MAX, prev[name] + delta)),
        }));
    }

    return (
        <div className="profile-block">
            <h2>Skills — ¿En qué nivel estoy hoy?</h2>
            <div className="skill-bars">
                {SKILLS.map((skill) => {
                    const lvl = levels[skill.name];
                    const isMax = lvl === MAX;
                    return (
                        <div key={skill.name} className="skill-row">
                            <div className="skill-header">
                                <span className="skill-emoji">{skill.emoji}</span>
                                <span className="skill-name">{skill.name}</span>
                                <span className="skill-level">
                                    {lvl}/{MAX}
                                </span>
                            </div>

                            <div className="skill-track" aria-label={`Nivel de ${skill.name}: ${lvl} de ${MAX}`}>
                                {Array.from({ length: MAX }, (_, i) => (
                                    <span
                                        key={i}
                                        className={`skill-pip${i < lvl ? " skill-pip--on" : ""}`}
                                    />
                                ))}
                            </div>

                            <div className="skill-controls">
                                <button
                                    className="skill-btn"
                                    onClick={() => change(skill.name, -1)}
                                    disabled={lvl === 1}
                                    aria-label={`Bajar nivel de ${skill.name}`}
                                >
                                    −
                                </button>
                                <button
                                    className="skill-btn"
                                    onClick={() => change(skill.name, +1)}
                                    disabled={isMax}
                                    aria-label={`Subir nivel de ${skill.name}`}
                                >
                                    +
                                </button>
                            </div>

                            {isMax && (
                                <p className="skill-max-msg" aria-live="polite">
                                    🏆 {skill.maxMsg}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
