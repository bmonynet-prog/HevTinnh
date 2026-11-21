import ProductCart from "../components/productcart";
import { products } from "../utils/api";

function Homepage({ onNavigate, onAddToCart, onViewProduct }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Curated essentials</p>
          <h1>Shop sharper everyday goods in one refined storefront.</h1>
          <p>
            Discover polished products across tech, fashion, home, and travel
            with quick filtering and a focused checkout flow.
          </p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => onNavigate("products")}>
              Browse products
            </button>
            <button className="button ghost" onClick={() => onNavigate("checkout")}>
              Go to checkout
            </button>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured collection</p>
            <h2>Popular right now</h2>
          </div>
          <button className="button outline" onClick={() => onNavigate("products")}>
            View all
          </button>
        </div>
        <div className="product-grid">
          {products.slice(0, 3).map((product) => (
            <ProductCart
              key={product.id}
              product={product}
              onAdd={onAddToCart}
              onView={onViewProduct}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Homepage;
