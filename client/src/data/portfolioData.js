/**
 * portfolioData.js
 * ---------------------------------------------------------------
 * Single source of truth for all portfolio content. Keeping the
 * text here (instead of inside the page components) makes the site
 * easy to update without touching any layout code.
 * ---------------------------------------------------------------
 */

// Personal details used across the Home, About, Contact and Footer areas
export const personalInfo = {
  legalName: "Francis Torres",
  firstName: "Francis",
  jobTitle: "Junior Full-Stack Developer",
  subTitle: "Software Engineering Technology (Co-op) Student",
  location: "Toronto, ON",
  email: "torres.francismarvin@gmail.com",
  phone: "416-219-9907",
  linkedInUrl: "https://www.linkedin.com/in/francis-torres",
  gitHubUrl: "https://github.com/francismtorres",
  resumePdfPath: "/resume/Francis_Torres_Resume.pdf",
  headshotPath: "/images/francis-headshot.jpg",
};

// Draft mission statement shown on the Home page
export const missionStatement =
  "I build clear, responsive and dependable web software that turns real-world needs into experiences people enjoy using. Drawing on a decade of customer-facing and team-lead experience, I pair analytical thinking with genuine empathy for the end user, learning continuously, collaborating openly, and shipping work I am proud to put my name on.";

// Short biography paragraphs for the About page
export const aboutParagraphs = [
  "I am a Software Engineering Technology (Co-op) student at Centennial College with a 3.98 GPA, focused on building responsive, database-driven web applications with JavaScript, HTML5, CSS3, REST APIs and SQL.",
  "Before moving into software, I spent over ten years in customer-facing, operational and team-lead roles, most recently as a Risk Associate at Aritzia. That background taught me to listen carefully, translate business requirements into organized solutions, and communicate clearly with stakeholders.",
];

// Quick-glance statistics for the Home page
export const quickStats = [
  { value: "3.98", label: "College GPA" },
  { value: "10+", label: "Years of customer-facing and leadership experience" },
  { value: "4", label: "Featured projects" },
];

// Skill groups displayed on the About page (taken from the resume)
export const skillGroups = [
  { groupName: "Languages", skills: ["JavaScript", "Python", "Java", "C#", "SQL", "HTML5", "CSS3"] },
  { groupName: "Web", skills: ["Responsive Design", "REST APIs", "AJAX", "DOM Manipulation", "HTML5 Canvas", "Google Maps API"] },
  { groupName: "Data", skills: ["Oracle Database", "Oracle SQL Developer", "ERDs (Visio)", "Relational Modelling"] },
  { groupName: "Tools", skills: ["Git", "GitHub", "Visual Studio Code", "Visual Studio", "Google Colab", "Linux"] },
  { groupName: "Practices", skills: ["OOP", "SDLC", "Agile/Scrum", "Requirements Analysis", "Debugging", "QA Testing"] },
];

// Projects page content (each project has an image, role and outcome)
export const projectList = [
  {
    id: "wedding-website",
    title: "Wedding Website",
    period: "May 2026 - August 2026",
    context: "Independent Web Development Project",
    images: [
      { src: "/images/wedding-itinerary.jpg", alt: "Itinerary section of the wedding website showing ceremony, cocktail hour, brunch buffet and reception cards" },
      { src: "/images/wedding-venue.jpg", alt: "Venue section of the wedding website showing the address, parking and accommodation cards" },
    ],
    role: "Sole designer and developer. I researched, designed, built and troubleshot the whole site on my own.",
    outcome: "Delivered a responsive, mobile-friendly information hub for a real wedding, organized around what guests actually need: schedule, venue, parking and accommodations.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    links: [{ label: "View on GitHub", url: "https://github.com/francismtorres/wedding-rsvp-site" }],
  },
  {
    id: "bug-smasher",
    title: "Bug Smasher Canvas Game",
    period: "January 2026 - April 2026",
    context: "Centennial College, COMP 125",
    images: [{ src: "/images/bug-smasher.jpg", alt: "Bug Smasher game screen with a score and speed counter, a red-bordered play area and a dark blue bug" }],
    role: "Developer. I built the interactive game with HTML5 Canvas and JavaScript, including touch and pointer support.",
    outcome: "A playable game where a bug hops around the board and speeds up as you score, with Reset Speed and Reset Score controls that work on desktop and mobile.",
    technologies: ["HTML5 Canvas", "JavaScript", "Touch Events"],
    links: [],
  },
  {
    id: "flame-grill",
    title: "Flame Grill Restaurant Web Application",
    period: "January 2026 - April 2026",
    context: "Centennial College, COMP 125",
    images: [{ src: "/images/flame-grill.svg", alt: "Illustration of the Flame Grill restaurant website with menu, online ordering and location cards" }],
    role: "Developer. I built a multi-page responsive site with menu browsing, online ordering, a gallery and location services.",
    outcome: "Integrated REST APIs through AJAX for live weather data, embedded the Google Maps API for locations and transit routes, and created a CSV-driven data visualization dashboard using data cleaning, normalization and linear regression.",
    technologies: ["HTML5", "CSS3", "JavaScript", "AJAX", "REST APIs", "Google Maps API"],
    links: [],
  },
  {
    id: "sock-box-database",
    title: "Subscription Sock Box Database System",
    period: "January 2026 - April 2026",
    context: "Centennial College, COMP 122",
    images: [{ src: "/images/sock-box-erd.svg", alt: "Simplified entity relationship diagram showing customer, orders, payment, shipment, subscription and returns tables" }],
    role: "Database designer. I modelled conceptual and logical ERDs in Microsoft Visio and implemented them in Oracle.",
    outcome: "A normalized 15-table relational database for a subscription e-commerce platform, with constraints, indexes, triggers for business rules and SQL reports for shipment tracking and monthly sales analysis.",
    technologies: ["Oracle SQL Developer", "SQL", "Microsoft Visio", "Database Design"],
    links: [],
  },
];

// Education page entries (most recent first)
export const educationList = [
  {
    id: "centennial",
    credential: "Advanced Diploma, Software Engineering Technology (Co-op)",
    school: "Centennial College, Toronto, ON",
    dateLabel: "Expected April 2028",
    status: "In progress",
    details: [
      "Current GPA: 3.98",
      "Relevant courses: Object-Oriented Programming, Client-Side Web Development, Database Concepts, Software Requirements, Software Testing & QA, Mobile Application Development",
    ],
  },
  {
    id: "george-brown",
    credential: "Advanced Diploma, Business Administration - Marketing",
    school: "George Brown College, Toronto, ON",
    dateLabel: "June 2017",
    status: "Completed",
    details: [
      "Foundation in marketing, business operations and customer insight that now informs how I design user-focused software.",
    ],
  },
];

// Services page content
export const serviceList = [
  {
    id: "web-development",
    title: "Responsive Web Development",
    image: "/images/services/web-development.svg",
    description: "Mobile-friendly HTML5, CSS3 and JavaScript websites and web apps, from event pages to multi-page business sites.",
  },
  {
    id: "api-integration",
    title: "REST API and Maps Integration",
    image: "/images/services/api-integration.svg",
    description: "Connecting your site to live data such as weather feeds and the Google Maps API using AJAX and RESTful services.",
  },
  {
    id: "database-design",
    title: "Database Design and SQL",
    image: "/images/services/database-design.svg",
    description: "Normalized Oracle schemas with ERDs, constraints, indexes, triggers and SQL reports tailored to your business rules.",
  },
  {
    id: "data-visualization",
    title: "Data Analysis and Dashboards",
    image: "/images/services/data-visualization.svg",
    description: "Cleaning, analyzing and presenting your data through reports and interactive dashboards that support decisions.",
  },
  {
    id: "testing-qa",
    title: "Testing, QA and Debugging",
    image: "/images/services/testing-qa.svg",
    description: "Careful testing, debugging and requirements review so what you ship works the way users expect.",
  },
];
