import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { describeWeather } from "../data/weatherCodes.js";
import usePageTitle from "../hooks/usePageTitle.js";
import "../styles/weather.css";

// Sedes del tour (las mismas ciudades de la bitácora) con sus coordenadas.
const venues = [
    { id: "san-isidro", name: "Hipódromo de San Isidro", city: "Buenos Aires", lat: -34.4789, lon: -58.5236 },
    { id: "cordoba", name: "Estadio Kempes", city: "Córdoba", lat: -31.3687, lon: -64.2464 },
    { id: "la-plata", name: "Estadio Único", city: "La Plata", lat: -34.9137, lon: -57.9892 },
];

const API_URL = "https://api.open-meteo.com/v1/forecast";

function buildUrl(venue) {
    const params = new URLSearchParams({
        latitude: venue.lat,
        longitude: venue.lon,
        current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        timezone: "auto",
        forecast_days: 3,
    });
    return `${API_URL}?${params}`;
}

// Recomendación según la probabilidad de lluvia del día.
function festivalTip(rainChance) {
    if (rainChance >= 60) return "Llevá piloto: hay muchas chances de pogo en el barro.";
    if (rainChance >= 30) return "Puede caer algo. Un piloto en la mochila no ocupa lugar.";
    return "Día de festival: protector solar, agua y a disfrutar.";
}

export default function Weather() {
    usePageTitle("Clima del festival");
    const [venueId, setVenueId] = useState(venues[0].id);
    const [status, setStatus] = useState("loading"); // "loading" | "error" | "success"
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState("");
    const [reloadCount, setReloadCount] = useState(0);

    const venue = venues.find((item) => item.id === venueId);

    // Se vuelve a consultar la API cuando cambia la sede o se toca "Actualizar".
    useEffect(() => {
        // Permite cancelar el pedido si el usuario cambia de sede antes de que termine.
        const controller = new AbortController();

        async function getForecast() {
            setStatus("loading");
            try {
                const response = await fetch(buildUrl(venue), { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`La API respondió con el código ${response.status}`);
                }
                const data = await response.json();
                setForecast(data);
                setStatus("success");
            } catch (err) {
                if (err.name === "AbortError") return; // pedido cancelado a propósito: no es un error
                setError(err.message);
                setStatus("error");
            }
        }

        getForecast();

        return () => controller.abort();
    }, [venueId, reloadCount]);

    const retry = () => setReloadCount(reloadCount + 1);

    return (
        <section className="page">
            <header className="page-header">
                <span className="page-kicker">API PÚBLICA · OPEN-METEO</span>
                <h1 className="page-title">Clima del festival</h1>
                <p className="page-intro">
                    Antes de armar la mochila, consultamos la API pública y gratuita de{" "}
                    <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>. Nos da
                    el clima actual y el pronóstico de los próximos 3 días (temperatura, estado del cielo y
                    probabilidad de lluvia) para cada sede del tour. No necesita clave, así que se consulta
                    directo desde el navegador.
                </p>
            </header>

            <div className="weather-tools">
                <div className="tour-filter" role="group" aria-label="Elegir sede">
                    {venues.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="chip"
                            aria-pressed={item.id === venueId}
                            onClick={() => setVenueId(item.id)}
                        >
                            {item.city}
                        </button>
                    ))}
                </div>
                <button type="button" className="btn btn-outline" onClick={retry} disabled={status === "loading"}>
                    ↻ Actualizar
                </button>
            </div>

            <div className="weather-panel" aria-live="polite" aria-busy={status === "loading"}>
                {status === "loading" && (
                    <div className="weather-state">
                        <span className="weather-spinner" aria-hidden="true"></span>
                        <p>Consultando el pronóstico para {venue.city}...</p>
                    </div>
                )}

                {status === "error" && (
                    <div className="weather-state weather-state--error" role="alert">
                        <p className="weather-state-title">⚡ Se cortó el sonido</p>
                        <p>No pudimos traer el clima ({error}). Revisá tu conexión y probá de nuevo.</p>
                        <button type="button" className="btn" onClick={retry}>Reintentar</button>
                    </div>
                )}

                {status === "success" && forecast && (
                    <WeatherResult venue={venue} forecast={forecast} />
                )}
            </div>

            <nav className="page-nav" aria-label="Continuar recorrido">
                <Link to="/cartelera" className="btn btn-outline">← Cartelera</Link>
                <Link to="/arbol" className="btn">Árbol de componentes →</Link>
            </nav>
        </section>
    );
}

function WeatherResult({ venue, forecast }) {
    const now = forecast.current;
    const today = describeWeather(now.weather_code);
    const days = forecast.daily.time.map((date, index) => ({
        date,
        weather: describeWeather(forecast.daily.weather_code[index]),
        max: Math.round(forecast.daily.temperature_2m_max[index]),
        min: Math.round(forecast.daily.temperature_2m_min[index]),
        rain: forecast.daily.precipitation_probability_max[index],
    }));

    return (
        <>
            <article className="weather-now">
                <div>
                    <p className="weather-venue">{venue.name} · {venue.city}</p>
                    <p className="weather-temp">
                        <span aria-hidden="true">{today.icon}</span> {Math.round(now.temperature_2m)}°C
                    </p>
                    <p>{today.label} · Sensación térmica {Math.round(now.apparent_temperature)}°C · Viento {Math.round(now.wind_speed_10m)} km/h</p>
                </div>
                <p className="weather-tip">{festivalTip(days[0].rain)}</p>
            </article>

            <ul className="weather-days">
                {days.map((day) => (
                    <li key={day.date} className="weather-day">
                        <p className="weather-day-name">
                            {new Date(`${day.date}T12:00`).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "short" })}
                        </p>
                        <p className="weather-day-icon" aria-hidden="true">{day.weather.icon}</p>
                        <p>{day.weather.label}</p>
                        <p className="weather-day-temps">{day.max}° / {day.min}°</p>
                        <p>💧 {day.rain}% de lluvia</p>
                    </li>
                ))}
            </ul>

            <p className="weather-source">Datos actualizados: {now.time.replace("T", " ")} hs · Fuente: Open-Meteo</p>
        </>
    );
}
