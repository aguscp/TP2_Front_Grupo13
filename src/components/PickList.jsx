// Lista numerada de favoritos (películas o discos). Se reutiliza con distintos datos.
export default function PickList({ title, items, pickedId }) {
    return (
        <div className="profile-block profile-block--picks">
            <h2>{title}</h2>
            <ol className="profile-list profile-picks">
                {items.map((item) => (
                    <li key={item.id} className={item.id === pickedId ? "is-picked" : undefined}>
                        {item.title} <small>{item.extra}</small>
                    </li>
                ))}
            </ol>
        </div>
    );
}
