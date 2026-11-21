import { useMemo, useState } from "react";
import ProductCart from "../components/productcart";
import { getCategories, getProducts } from "../utils/api";

function ProductPage({ onAddToCart, onViewProduct }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => getCategories(), []);
  const filteredProducts = useMemo(
    () => getProducts({ query, category }),
    [query, category],
  );

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Shop collection</p>
          <h1>Products</h1>
        </div>
        <span className="result-count">{filteredProducts.length} items</span>
      </div>

      <div className="toolbar" aria-label="Product search and filters">
        <label className="search-field">
          <span>Search products</span>
          <input
            type="search"
            placeholder="Search by product name"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="select-field">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCart
            key={product.id}
            product={product}
            onAdd={onAddToCart}
            onView={onViewProduct}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductPage;
