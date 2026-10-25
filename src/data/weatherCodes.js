// Códigos de clima de Open-Meteo (estándar WMO) traducidos al español.
const weatherCodes = {
    0: { label: "Despejado", icon: "☀️" },
    1: { label: "Mayormente despejado", icon: "🌤️" },
    2: { label: "Parcialmente nublado", icon: "⛅" },
    3: { label: "Nublado", icon: "☁️" },
    45: { label: "Niebla", icon: "🌫️" },
    48: { label: "Niebla con escarcha", icon: "🌫️" },
    51: { label: "Llovizna leve", icon: "🌦️" },
    53: { label: "Llovizna", icon: "🌦️" },
    55: { label: "Llovizna intensa", icon: "🌧️" },
    61: { label: "Lluvia leve", icon: "🌦️" },
    63: { label: "Lluvia", icon: "🌧️" },
    65: { label: "Lluvia intensa", icon: "🌧️" },
    71: { label: "Nevada leve", icon: "🌨️" },
    73: { label: "Nevada", icon: "🌨️" },
    75: { label: "Nevada intensa", icon: "❄️" },
    80: { label: "Chaparrones leves", icon: "🌦️" },
    81: { label: "Chaparrones", icon: "🌧️" },
    82: { label: "Chaparrones fuertes", icon: "⛈️" },
    95: { label: "Tormenta", icon: "⛈️" },
    96: { label: "Tormenta con granizo", icon: "⛈️" },
    99: { label: "Tormenta fuerte con granizo", icon: "⛈️" },
};

export function describeWeather(code) {
    return weatherCodes[code] ?? { label: "Sin datos", icon: "❔" };
}
