import { currency } from "../utils/api";

function CartPage({
  cartItems,
  subtotal,
  shipping,
  total,
  updateQuantity,
  removeFromCart,
  onNavigate,
}) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your cart</p>
          <h1>Shopping cart</h1>
        </div>
        <button className="button outline" onClick={() => onNavigate("products")}>
          Keep shopping
        </button>
      </div>

      <div className="checkout-layout">
        <div className="cart-panel">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Add products to begin.</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{currency.format(item.price)}</span>
                    <button
                      className="inline-link"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="cart-panel">
          <h2>Order summary</h2>
          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{currency.format(subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : currency.format(shipping)}</dd>
            </div>
            <div className="total-line">
              <dt>Total</dt>
              <dd>{currency.format(total)}</dd>
            </div>
          </dl>
          <button
            className="button primary checkout-button"
            disabled={!cartItems.length}
            onClick={() => onNavigate("checkout")}
          >
            Continue to checkout
          </button>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;
