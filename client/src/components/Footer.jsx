import { personalInfo } from "../data/portfolioData.js";

// Footer: copyright line and quick links to professional profiles.
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; {currentYear} {personalInfo.legalName}. Built with React.</p>
        <p className="footer-links">
          <a href={personalInfo.linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={personalInfo.gitHubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${personalInfo.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}
