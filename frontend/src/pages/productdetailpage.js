import { currency, getProductById } from "../utils/api";

function ProductDetailPage({ productId, onAddToCart, onNavigate }) {
  const product = getProductById(productId) || getProductById(1);

  return (
    <section className="page-section detail-layout">
      <div className="detail-media" style={{ "--accent": product.accent }}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="detail-copy">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <dl className="product-meta">
          <div>
            <dt>Rating</dt>
            <dd>{product.rating} / 5</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd>{product.stock} available</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>{currency.format(product.price)}</dd>
          </div>
        </dl>
        <div className="hero-actions">
          <button className="button primary" onClick={() => onAddToCart(product)}>
            Add to cart
          </button>
          <button className="button outline" onClick={() => onNavigate("products")}>
            Back to products
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
