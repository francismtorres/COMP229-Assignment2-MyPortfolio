import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top and updates the document title whenever the page changes.
const pageTitles = {
  "/": "Home",
  "/about": "About Me",
  "/projects": "Projects",
  "/education": "Education",
  "/services": "Services",
  "/contact": "Contact Me",
};

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const pageName = pageTitles[pathname] ?? "Page Not Found";
    document.title = `${pageName} | Francis Torres`;
  }, [pathname]);

  return null;
}
