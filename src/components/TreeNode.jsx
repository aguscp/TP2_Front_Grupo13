// Un nodo del árbol de componentes. Si tiene hijos, se puede expandir o contraer,
// y para dibujarlos se usa a sí mismo (componente recursivo).
export default function TreeNode({ node, openIds, onToggle }) {
    const hasChildren = Boolean(node.children?.length);
    const isOpen = openIds.includes(node.id);

    return (
        <li className={`tree-node tree-node--${node.type}`}>
            <div className="tree-row">
                {hasChildren ? (
                    <button
                        type="button"
                        className="tree-toggle"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Contraer" : "Expandir"} ${node.name}`}
                        onClick={() => onToggle(node.id)}
                    >
                        {isOpen ? "−" : "+"}
                    </button>
                ) : (
                    <span className="tree-leaf" aria-hidden="true">•</span>
                )}

                <div className="tree-card">
                    <p className="tree-name">
                        {`<${node.name.split(" ")[0]}>`}
                        {node.name.includes(" ") && <span className="tree-aside"> {node.name.slice(node.name.indexOf(" ") + 1)}</span>}
                        {node.count && <span className="tree-count">{node.count}</span>}
                        <span className="tree-type">{node.type}</span>
                    </p>
                    <p className="tree-description">{node.description}</p>
                    {(node.file || node.route) && (
                        <p className="tree-meta">
                            {node.file && <code>{node.file}</code>}
                            {node.route && <code>ruta: {node.route}</code>}
                        </p>
                    )}
                </div>
            </div>

            {hasChildren && isOpen && (
                <ul className="tree-children">
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} openIds={openIds} onToggle={onToggle} />
                    ))}
                </ul>
            )}
        </li>
    );
}
