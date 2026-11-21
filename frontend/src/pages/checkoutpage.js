import { useState } from "react";
import { currency } from "../utils/api";

function CheckoutPage({ cartItems, subtotal, shipping, total, placeOrder, onNavigate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submitCheckout = (event) => {
    event.preventDefault();
    placeOrder(form);
    onNavigate("confirmation");
  };

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Secure checkout</p>
          <h1>Payment and shipping</h1>
        </div>
      </div>

      <div className="checkout-layout">
        <aside className="cart-panel">
          <h2>Order summary</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="summary-row" key={item.id}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <strong>{currency.format(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
          )}
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
        </aside>

        <section className="checkout-card">
          <div className="checkout-progress">
            <span className="active">Shipping</span>
            <span className="active">Payment</span>
            <span>Done</span>
          </div>
          <form className="checkout-form" onSubmit={submitCheckout}>
            <div className="form-grid">
              <label>
                Full name
                <input required name="name" value={form.name} onChange={updateField} />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                />
              </label>
              <label className="wide">
                Shipping address
                <input
                  required
                  name="address"
                  value={form.address}
                  onChange={updateField}
                />
              </label>
              <label>
                City
                <input required name="city" value={form.city} onChange={updateField} />
              </label>
              <label>
                Card number
                <input
                  required
                  inputMode="numeric"
                  name="card"
                  value={form.card}
                  onChange={updateField}
                  placeholder="4242 4242 4242 4242"
                />
              </label>
              <label>
                Expiry
                <input
                  required
                  name="expiry"
                  value={form.expiry}
                  onChange={updateField}
                  placeholder="MM / YY"
                />
              </label>
              <label>
                CVC
                <input
                  required
                  inputMode="numeric"
                  name="cvc"
                  value={form.cvc}
                  onChange={updateField}
                  placeholder="123"
                />
              </label>
            </div>
            <button className="button primary checkout-button" disabled={!cartItems.length}>
              {cartItems.length ? `Pay ${currency.format(total)}` : "Add items to checkout"}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}

export default CheckoutPage;
