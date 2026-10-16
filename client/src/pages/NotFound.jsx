import { Link } from "react-router-dom";

// NotFound: shown for any address that does not match a page.
export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow center">
        <p className="eyebrow">Error 404</p>
        <h1>That page does not exist</h1>
        <p>The link may be broken or the page may have moved.</p>
        <Link to="/" className="button button-primary">Back to Home</Link>
      </div>
    </section>
  );
}
