import { currency } from "../utils/api";

function OrderConfirmationPage({ order, onNavigate }) {
  if (!order) {
    return (
      <section className="page-section narrow">
        <p className="eyebrow">No order found</p>
        <h1>There is no recent order to confirm.</h1>
        <button className="button primary" onClick={() => onNavigate("products")}>
          Browse products
        </button>
      </section>
    );
  }

  return (
    <section className="page-section narrow">
      <div className="success-state checkout-card">
        <p className="eyebrow">Order received</p>
        <h1>Thanks for shopping with ShopEasy.</h1>
        <p>
          Order {order.id} is now {order.status.toLowerCase()}. A confirmation
          has been prepared for {order.customer.email}.
        </p>
        <dl className="totals full-width">
          <div>
            <dt>Items</dt>
            <dd>{order.items.length}</dd>
          </div>
          <div className="total-line">
            <dt>Total</dt>
            <dd>{currency.format(order.totals.total)}</dd>
          </div>
        </dl>
        <div className="hero-actions">
          <button className="button primary" onClick={() => onNavigate("orders")}>
            View orders
          </button>
          <button className="button outline" onClick={() => onNavigate("products")}>
            Continue shopping
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmationPage;
