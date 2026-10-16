import PageHeader from "../components/PageHeader.jsx";
import {
  personalInfo,
  aboutParagraphs,
  skillGroups,
} from "../data/portfolioData.js";

// About: legal name, head-and-shoulders photo, short bio, resume PDF link and skills.
export default function About() {
  return (
    <>
      <PageHeader eyebrow="About me" title="Who I am" />

      <section className="section">
        <div className="container about-grid">
          <figure className="about-photo">
            <img src={personalInfo.headshotPath} alt={`Head and shoulders photo of ${personalInfo.legalName}`} width="450" height="450" />
          </figure>

          <div className="about-copy">
            <h2>{personalInfo.legalName}</h2>
            <p className="muted">{personalInfo.jobTitle} &middot; {personalInfo.location}</p>
            {aboutParagraphs.map((paragraphText) => (
              <p key={paragraphText}>{paragraphText}</p>
            ))}

            <div className="button-row">
              {/* Link to the PDF version of my resume (opens in a new tab) */}
              <a className="button button-primary" href={personalInfo.resumePdfPath} target="_blank" rel="noreferrer">
                View my resume (PDF)
              </a>
              <a className="button button-outline" href={personalInfo.resumePdfPath} download>
                Download
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Skills</h2>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.groupName}>
                <h3>{group.groupName}</h3>
                <ul className="chip-list">
                  {group.skills.map((skillName) => (
                    <li className="chip" key={skillName}>{skillName}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
