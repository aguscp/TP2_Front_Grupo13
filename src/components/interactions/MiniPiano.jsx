import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const pianoKeys = [
    { id: "c4", es: "Do4", en: "C4", whiteIndex: 0 },
    { id: "c-sharp4", es: "Do♯4", en: "C♯4", afterWhite: 1 },
    { id: "d4", es: "Re4", en: "D4", whiteIndex: 1 },
    { id: "d-sharp4", es: "Re♯4", en: "D♯4", afterWhite: 2 },
    { id: "e4", es: "Mi4", en: "E4", whiteIndex: 2 },
    { id: "f4", es: "Fa4", en: "F4", whiteIndex: 3 },
    { id: "f-sharp4", es: "Fa♯4", en: "F♯4", afterWhite: 4 },
    { id: "g4", es: "Sol4", en: "G4", whiteIndex: 4 },
    { id: "g-sharp4", es: "Sol♯4", en: "G♯4", afterWhite: 5 },
    { id: "a4", es: "La4", en: "A4", whiteIndex: 5 },
    { id: "a-sharp4", es: "La♯4", en: "A♯4", afterWhite: 6 },
    { id: "b4", es: "Si4", en: "B4", whiteIndex: 6 },
    { id: "c5", es: "Do5", en: "C5", whiteIndex: 7 },
];

export default function MiniPiano() {
    const { language, t } = useLanguage();
    const [lastNote, setLastNote] = useState(null);
    const [pressedKey, setPressedKey] = useState(null);
    const pressTimer = useRef(null);

    useEffect(() => () => clearTimeout(pressTimer.current), []);

    const pressKey = (key) => {
        clearTimeout(pressTimer.current);
        setLastNote(key);
        setPressedKey(key.id);
        pressTimer.current = setTimeout(() => setPressedKey(null), 140);
    };

    return (
        <div className="profile-block">
            <h2>{t("Mini piano")}</h2>
            <div className="mini-piano">
                <div className="mini-piano-keys" role="group" aria-label={t("Teclas del piano")}>
                    {pianoKeys.map((key) => {
                        const note = language === "en" ? key.en : key.es;
                        const isBlackKey = key.whiteIndex === undefined;
                        const style = isBlackKey
                            ? { left: `${(key.afterWhite / 8) * 100}%` }
                            : { gridColumn: key.whiteIndex + 1 };

                        return (
                            <button
                                key={key.id}
                                type="button"
                                className={`piano-key ${isBlackKey ? "piano-key--black" : "piano-key--white"}${pressedKey === key.id ? " is-pressed" : ""}`}
                                style={style}
                                aria-label={t("Tecla {note}", { note })}
                                onClick={() => pressKey(key)}
                            />
                        );
                    })}
                </div>
                <p className="mini-piano-note" aria-live="polite" aria-atomic="true">
                    {lastNote
                        ? <>
                            <span className="mini-piano-label">{t("Nota:")}</span>{" "}
                            <span className="mini-piano-value">{language === "en" ? lastNote.en : lastNote.es}</span>
                        </>
                        : t("Tocá una tecla para ver su nota")}
                </p>
            </div>
        </div>
    );
}
