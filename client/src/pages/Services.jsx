import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { serviceList } from "../data/portfolioData.js";

// Services: illustrated cards describing what I can build for clients.
export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="How I can help"
        intro="Practical development services for small businesses, events and teams."
      />

      <section className="section">
        <div className="container">
          <div className="card-grid card-grid-3">
            {serviceList.map((service) => (
              <article className="card" key={service.id}>
                <img src={service.image} alt="" loading="lazy" />
                <div className="card-body">
                  <h2 className="card-title">{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
            <article className="card card-cta">
              <div className="card-body">
                <h2 className="card-title">Have a project in mind?</h2>
                <p>Tell me what you need and I will get back to you.</p>
                <Link to="/contact" className="button button-primary">Get in touch</Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
