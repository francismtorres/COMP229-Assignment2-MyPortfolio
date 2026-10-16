import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  personalInfo,
  missionStatement,
  quickStats,
  projectList,
} from "../data/portfolioData.js";

/**
 * Home: welcome message, calls to action, mission statement and a project preview.
 * Also displays a confirmation banner when the visitor was redirected here
 * after submitting the contact form (the form passes its data via router state).
 */
export default function Home() {
  const { state: redirectState } = useLocation();
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const submittedMessage = redirectState?.submittedMessage;

  return (
    <>
      {submittedMessage && isBannerVisible && (
        <div className="container">
          <div className="notice" role="status">
            <div>
              <strong>Thank you, {submittedMessage.firstName}!</strong> Your message was captured
              and I will reply to <em>{submittedMessage.email}</em> soon.
            </div>
            <button type="button" className="notice-close" onClick={() => setIsBannerVisible(false)} aria-label="Dismiss message">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Hero / welcome section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Welcome to my portfolio</p>
            <h1>
              Hi, I&apos;m {personalInfo.firstName}. I build web applications that are{" "}
              <span className="text-accent">clear, responsive and reliable.</span>
            </h1>
            <p className="lead">
              {personalInfo.jobTitle} and {personalInfo.subTitle} based in {personalInfo.location}.
              Explore my work, my education and the services I offer.
            </p>
            <div className="button-row">
              <Link to="/about" className="button button-primary">Meet me</Link>
              <Link to="/projects" className="button button-outline">View my projects</Link>
            </div>
          </div>
          <div className="hero-photo">
            <img src={personalInfo.headshotPath} alt={`Portrait of ${personalInfo.legalName}`} width="450" height="450" />
          </div>
        </div>
      </section>

      {/* Quick statistics */}
      <section className="container stats-strip" aria-label="Highlights">
        {quickStats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Mission statement */}
      <section className="section">
        <div className="container mission">
          <p className="eyebrow">Mission statement</p>
          <blockquote>{missionStatement}</blockquote>
        </div>
      </section>

      {/* Project preview */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <h2>Recent work</h2>
            <Link to="/projects" className="text-link">See all projects &rarr;</Link>
          </div>
          <div className="card-grid card-grid-3">
            {projectList.slice(0, 3).map((project) => (
              <Link to="/projects" className="card preview-card" key={project.id}>
                <img src={project.images[0].src} alt={project.images[0].alt} loading="lazy" />
                <div className="card-body">
                  <h3>{project.title}</h3>
                  <p className="muted">{project.context}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
