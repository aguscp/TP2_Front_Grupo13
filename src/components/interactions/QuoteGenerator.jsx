import { useState } from "react";

// Celi: muestra una frase al azar de autores hispanos, sin repetir la anterior.
const quotes = [
    "La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla — Gabriel García Márquez, Vivir para contarla",
    "El que lee mucho y anda mucho, ve mucho y sabe mucho — Miguel de Cervantes, Don Quijote de la Mancha",
    "La libertad, Sancho, es uno de los más preciosos dones que a los hombres dieron los cielos — Miguel de Cervantes, Don Quijote de la Mancha",
    "Podrán cortar todas las flores, pero no podrán detener la primavera — Pablo Neruda",
    "Un libro es el mejor medio de transporte: te lleva lejos, no contamina, llega puntual, sale barato y nunca marea — Juan Villoro",
    "Caminante, no hay camino, se hace camino al andar — Antonio Machado, Proverbios y cantares",
    "La duda es uno de los nombres de la inteligencia — Jorge Luis Borges",
    "Los días más felices son aquellos que nos hacen sabios — Gabriela Mistral",
    "Escribo para los amigos que todavía no conozco. Los que conozco ya están hartos de escucharme — Eduardo Galeano",
    "Si me caí, es porque estaba caminando. Y caminar vale la pena, aunque te caigas — Eduardo Galeano",
];

export default function QuoteGenerator() {
    const [quote, setQuote] = useState(null);

    const newQuote = () => {
        const options = quotes.filter((item) => item !== quote);
        setQuote(options[Math.floor(Math.random() * options.length)]);
    };

    return (
        <div className="profile-block">
            <h2>Generador de frases</h2>
            <div className="profile-random">
                <button type="button" className="profile-random-btn" onClick={newQuote}>
                    📚 Generá una frase random
                </button>
                {quote && (
                    <div className="frase-generada">
                        <p className="profile-random-result" aria-live="polite">“{quote}”</p>
                    </div>
                )}
            </div>
        </div>
    );
}
