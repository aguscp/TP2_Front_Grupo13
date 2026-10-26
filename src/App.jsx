import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Cartelera from "./pages/Cartelera.jsx";
import Weather from "./pages/Weather.jsx";
import RenderTree from "./pages/RenderTree.jsx";
import Bitacora from "./pages/Bitacora.jsx";
import NotFound from "./pages/NotFound.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";

// App define las rutas. Todas comparten el Layout (sidebar + footer)
// y cada página se dibuja dentro del <Outlet /> del Layout.
export default function App() {
    return (
        <LanguageProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="perfil/:slug" element={<Profile />} />
                    <Route path="cartelera" element={<Cartelera />} />
                    <Route path="clima" element={<Weather />} />
                    <Route path="arbol" element={<RenderTree />} />
                    <Route path="bitacora" element={<Bitacora />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </LanguageProvider>
    );
}
