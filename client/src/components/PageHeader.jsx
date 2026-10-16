// PageHeader: consistent eyebrow label, title and intro used at the top of each inner page.
export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <section className="page-header">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
      </div>
    </section>
  );
}
