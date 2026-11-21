import "./productcart.css";
import { currency } from "../utils/api";

function ProductCart({ product, onAdd, onView }) {
  return (
    <article className="product-card">
      <button
        className="product-media reset-button"
        onClick={() => onView(product.id)}
        style={{ "--accent": product.accent }}
      >
        <img src={product.image} alt={product.name} />
      </button>
      <div className="product-info">
        <div>
          <p>{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <span className="rating">Rating {product.rating}</span>
      </div>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <strong>{currency.format(product.price)}</strong>
        <button className="button compact" onClick={() => onAdd(product)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCart;
