import { useState } from "react";
import { Link } from "react-router-dom";
import componentTree from "../data/componentTree.js";
import TreeNode from "../components/TreeNode.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import "../styles/tree.css";

// Junta los ids de todos los nodos que tienen hijos (para "Expandir todo").
function collectIds(node) {
    if (!node.children) return [];
    return [node.id, ...node.children.flatMap(collectIds)];
}

const allIds = collectIds(componentTree);
const legend = ["entrada", "rutas", "layout", "página", "componente", "condicional"];

export default function RenderTree() {
    usePageTitle("Árbol de componentes");
    // Arranca mostrando los primeros niveles: main, App, Layout y las páginas.
    const [openIds, setOpenIds] = useState(["main", "app", "layout", "outlet"]);

    const toggle = (id) => {
        setOpenIds(openIds.includes(id) ? openIds.filter((item) => item !== id) : [...openIds, id]);
    };

    return (
        <section className="page">
            <header className="page-header">
                <span className="page-kicker">DETRÁS DE ESCENA</span>
                <h1 className="page-title">Árbol de componentes</h1>
                <p className="page-intro">
                    Así se arma el festival por dentro: el componente principal y todos sus hijos, tal como
                    están en el código. Tocá <b>+</b> y <b>−</b> para expandir o contraer cada rama.
                </p>
            </header>

            <div className="tree-tools">
                <button type="button" className="chip" onClick={() => setOpenIds(allIds)}>Expandir todo</button>
                <button type="button" className="chip" onClick={() => setOpenIds([])}>Contraer todo</button>
                <ul className="tree-legend" aria-label="Referencias">
                    {legend.map((type) => (
                        <li key={type} className={`tree-node--${type}`}>{type}</li>
                    ))}
                </ul>
            </div>

            <ul className="tree">
                <TreeNode node={componentTree} openIds={openIds} onToggle={toggle} />
            </ul>

            <nav className="page-nav" aria-label="Continuar recorrido">
                <Link to="/clima" className="btn btn-outline">← Clima del festival</Link>
                <Link to="/bitacora" className="btn">Bitácora →</Link>
            </nav>
        </section>
    );
}
