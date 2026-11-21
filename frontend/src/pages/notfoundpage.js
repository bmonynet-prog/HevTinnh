function NotFoundPage({ onNavigate }) {
  return (
    <section className="page-section narrow">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="muted-copy">
        The page you requested does not exist in this storefront.
      </p>
      <button className="button primary" onClick={() => onNavigate("home")}>
        Back home
      </button>
    </section>
  );
}

export default NotFoundPage;
