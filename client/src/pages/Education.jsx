import PageHeader from "../components/PageHeader.jsx";
import { educationList } from "../data/portfolioData.js";

// Education: timeline of qualifications with credential, school and date.
export default function Education() {
  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="Qualifications"
        intro="Formal training in business and software engineering, with hands-on co-op experience on the way."
      />

      <section className="section">
        <div className="container">
          <ol className="timeline">
            {educationList.map((entry) => (
              <li className="timeline-item" key={entry.id}>
                <div className="timeline-date">
                  <span>{entry.dateLabel}</span>
                  <span className={`badge ${entry.status === "In progress" ? "badge-active" : ""}`}>{entry.status}</span>
                </div>
                <div className="card timeline-card">
                  <div className="card-body">
                    <h2>{entry.credential}</h2>
                    <p className="muted">{entry.school}</p>
                    <ul className="plain-list">
                      {entry.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
