import PageHeader from "../components/PageHeader.jsx";
import { projectList } from "../data/portfolioData.js";

// Projects: one detailed card per project with image(s), my role and the outcome.
export default function Projects() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Selected work"
        intro="A mix of independent and academic projects, from responsive websites to relational databases."
      />

      <section className="section">
        <div className="container project-stack">
          {projectList.map((project, projectIndex) => (
            <article
              className={`project ${projectIndex % 2 === 1 ? "project-reverse" : ""}`}
              key={project.id}
            >
              <div className={`project-media ${project.images.length > 1 ? "project-media-multi" : ""}`}>
                {project.images.map((image) => (
                  <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
                ))}
              </div>

              <div className="project-content">
                <p className="eyebrow">{project.context} &middot; {project.period}</p>
                <h2>{project.title}</h2>
                <p><strong>My role: </strong>{project.role}</p>
                <p><strong>Outcome: </strong>{project.outcome}</p>
                <ul className="chip-list">
                  {project.technologies.map((technology) => (
                    <li className="chip" key={technology}>{technology}</li>
                  ))}
                </ul>
                {project.links.map((projectLink) => (
                  <a key={projectLink.url} className="text-link" href={projectLink.url} target="_blank" rel="noreferrer">
                    {projectLink.label} &rarr;
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
