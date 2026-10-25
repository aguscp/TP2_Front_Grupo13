// Árbol de renderizado de la aplicación.
// Refleja los componentes reales de src/: si se agrega un componente, hay que sumarlo acá.
const componentTree = {
    id: "main",
    name: "main.jsx",
    type: "entrada",
    description: "Punto de entrada: monta React en el <div id=\"root\"> y envuelve la app en BrowserRouter.",
    children: [
        {
            id: "app",
            name: "App",
            file: "src/App.jsx",
            type: "rutas",
            description: "Define las rutas con React Router. Todas comparten el mismo Layout.",
            children: [
                {
                    id: "layout",
                    name: "Layout",
                    file: "src/components/Layout.jsx",
                    type: "layout",
                    description: "Estructura fija de todas las pantallas. Guarda si la sidebar está contraída y en su <Outlet /> dibuja la página de la ruta actual.",
                    children: [
                        {
                            id: "sidebar",
                            name: "Sidebar",
                            file: "src/components/Sidebar.jsx",
                            type: "componente",
                            description: "Menú lateral compartido: identidad del equipo, enlaces con NavLink y sección activa. En escritorio se contrae a sólo íconos; en celular se abre como panel.",
                        },
                        {
                            id: "splashes",
                            name: "Splashes",
                            file: "src/components/Splashes.jsx",
                            type: "componente",
                            description: "Manchas decorativas de fondo con los colores del line up.",
                        },
                        {
                            id: "outlet",
                            name: "Outlet (página según la ruta)",
                            type: "rutas",
                            description: "React Router muestra acá una sola de estas páginas, según la URL.",
                            children: [
                                {
                                    id: "home",
                                    name: "Home",
                                    file: "src/pages/Home.jsx",
                                    route: "/",
                                    type: "página",
                                    description: "Portada: presentación del equipo, tarjetas que se dan vuelta y perfil al azar.",
                                    children: [
                                        {
                                            id: "artist-card",
                                            name: "ArtistCard",
                                            count: "×4",
                                            file: "src/components/ArtistCard.jsx",
                                            type: "componente",
                                            description: "Tarjeta de cada integrante. El mismo componente se usa 4 veces con distintas props.",
                                        },
                                    ],
                                },
                                {
                                    id: "profile",
                                    name: "Profile",
                                    file: "src/pages/Profile.jsx",
                                    route: "/perfil/:slug",
                                    type: "página",
                                    description: "Lee el slug de la URL y busca los datos del integrante en members.json.",
                                    children: [
                                        {
                                            id: "profile-view",
                                            name: "ProfileView",
                                            file: "src/pages/Profile.jsx",
                                            type: "componente",
                                            description: "Arma el perfil con los datos recibidos por props.",
                                            children: [
                                                {
                                                    id: "pick-list",
                                                    name: "PickList",
                                                    count: "×2",
                                                    file: "src/components/PickList.jsx",
                                                    type: "componente",
                                                    description: "Lista numerada de favoritos: una para películas y otra para discos.",
                                                },
                                                {
                                                    id: "interaction",
                                                    name: "Interacción del integrante (una sola)",
                                                    type: "condicional",
                                                    description: "Se renderiza la interacción que indica el dato \"interaction\" de cada integrante.",
                                                    children: [
                                                        { id: "hype", name: "HypeMeter", file: "src/components/interactions/HypeMeter.jsx", type: "componente", description: "Sebas: medidor de hype con un slider." },
                                                        { id: "random", name: "RandomPick", file: "src/components/interactions/RandomPick.jsx", type: "componente", description: "Valen: recomendador al azar de película o disco." },
                                                        { id: "player", name: "FakePlayer", file: "src/components/interactions/FakePlayer.jsx", type: "componente", description: "Agus: reproductor ficticio de sus discos." },
                                                        { id: "quotes", name: "QuoteGenerator", file: "src/components/interactions/QuoteGenerator.jsx", type: "componente", description: "Celi: generador de frases de autores hispanos." },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            id: "profile-not-found",
                                            name: "NotFound",
                                            file: "src/pages/NotFound.jsx",
                                            type: "condicional",
                                            description: "Sólo si el slug no corresponde a ningún integrante.",
                                        },
                                    ],
                                },
                                {
                                    id: "cartelera",
                                    name: "Cartelera",
                                    file: "src/pages/Cartelera.jsx",
                                    route: "/cartelera",
                                    type: "página",
                                    description: "Muestra lineup.json con búsqueda por texto y filtro por género.",
                                    children: [
                                        {
                                            id: "band-card",
                                            name: "BandCard",
                                            count: "×25",
                                            file: "src/components/BandCard.jsx",
                                            type: "componente",
                                            description: "Una tarjeta por banda filtrada, con el botón para ver más info.",
                                        },
                                        {
                                            id: "band-modal",
                                            name: "BandModal",
                                            file: "src/components/BandModal.jsx",
                                            type: "condicional",
                                            description: "Ventana modal con el detalle de la banda. Sólo se dibuja cuando se elige una.",
                                        },
                                    ],
                                },
                                {
                                    id: "weather",
                                    name: "Weather",
                                    file: "src/pages/Weather.jsx",
                                    route: "/clima",
                                    type: "página",
                                    description: "Consulta la API de Open-Meteo y maneja los estados de carga, error y éxito.",
                                    children: [
                                        {
                                            id: "weather-result",
                                            name: "WeatherResult",
                                            file: "src/pages/Weather.jsx",
                                            type: "componente",
                                            description: "Clima actual y pronóstico de 3 días, sólo cuando la consulta salió bien.",
                                        },
                                    ],
                                },
                                {
                                    id: "render-tree",
                                    name: "RenderTree",
                                    file: "src/pages/RenderTree.jsx",
                                    route: "/arbol",
                                    type: "página",
                                    description: "Esta sección. Dibuja el árbol a partir de los datos de componentTree.js.",
                                    children: [
                                        {
                                            id: "tree-node",
                                            name: "TreeNode",
                                            count: "recursivo",
                                            file: "src/components/TreeNode.jsx",
                                            type: "componente",
                                            description: "Cada nodo del árbol. Se llama a sí mismo para dibujar a sus hijos.",
                                        },
                                    ],
                                },
                                {
                                    id: "bitacora",
                                    name: "Bitacora",
                                    file: "src/pages/Bitacora.jsx",
                                    route: "/bitacora",
                                    type: "página",
                                    description: "Registros del proceso con filtro por TP y tickets desplegables.",
                                    children: [
                                        { id: "ticket-entry", name: "TicketEntry", count: "×10", file: "src/components/TicketEntry.jsx", type: "componente", description: "Cada entrada de la bitácora con forma de ticket." },
                                        { id: "merch-card", name: "MerchCard", count: "×3", file: "src/pages/Bitacora.jsx", type: "componente", description: "Productos de la tienda oficial." },
                                        { id: "back-to-top", name: "BackToTop", file: "src/components/BackToTop.jsx", type: "componente", description: "Botón flotante para volver arriba." },
                                    ],
                                },
                                {
                                    id: "not-found",
                                    name: "NotFound",
                                    file: "src/pages/NotFound.jsx",
                                    route: "*",
                                    type: "página",
                                    description: "Cualquier URL que no exista.",
                                },
                            ],
                        },
                        {
                            id: "footer",
                            name: "Footer",
                            file: "src/components/Footer.jsx",
                            type: "componente",
                            description: "Pie de página con enlaces internos.",
                        },
                    ],
                },
            ],
        },
    ],
};

export default componentTree;
