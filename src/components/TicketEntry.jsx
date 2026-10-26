// Una entrada de la bitácora con forma de ticket de concierto.
// El título funciona como desplegable: al tocarlo muestra u oculta el detalle.
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function TicketEntry({ entry, isOpen, onToggle }) {
    const { t, data } = useLanguage();
    const translatedEntry = data?.journal?.[entry.id];
    const detailId = `ticket-detail-${entry.id}`;

    return (
        <article className="tour-date">
            <div className="ticket-info">
                <div className="ticket-heading">
                    <span>
                        WEBFEST 2026 <span aria-hidden="true">/</span> WORLD TOUR ·{" "}
                        <span className="ticket-tp">{entry.tp}</span>
                    </span>
                    <span className="ticket-number">{t("ENTRADA")} {entry.id}</span>
                </div>
                <div className="date">
                    <span className="day">{entry.day}</span>
                    <span className="month">{entry.month}</span>
                    <span className="year">{entry.year}</span>
                </div>
                <div className="venue">
                    <h3>{entry.venue}</h3>
                    <p>{entry.city}</p>
                </div>
            </div>

            <aside className="ticket-stub" aria-label={t("Talón de la entrada")}>
                <span className="ticket-admit">{t("ACCESO GENERAL")}</span>
                <span className="sold">SOLD OUT</span>
                <span className="ticket-barcode" aria-hidden="true"></span>
                <span className="ticket-code">WF-{entry.day}-{entry.month}</span>
            </aside>

            <div className="tour-comment">
                <button
                    type="button"
                    className="ticket-toggle"
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    onClick={onToggle}
                >
                    {translatedEntry?.title ?? entry.title}
                    <span className="ticket-toggle-icon" aria-hidden="true">▼</span>
                </button>

                {isOpen && (
                    <div className="ticket-detail" id={detailId}>
                        {entry.paragraphs.map((paragraph, index) => (
                            <p key={index}>
                                {(translatedEntry?.paragraphs?.[index]?.label ?? paragraph.label) && (
                                    <b>{translatedEntry?.paragraphs?.[index]?.label ?? paragraph.label}: </b>
                                )}
                                {translatedEntry?.paragraphs?.[index]?.text ?? paragraph.text}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
