import { currency } from "../utils/api";

function OrderPage({ orders, onNavigate }) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Purchases</p>
          <h1>Orders</h1>
        </div>
        <button className="button outline" onClick={() => onNavigate("products")}>
          Shop more
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="checkout-card empty-state">
          <h2>No orders yet</h2>
          <p>Completed checkout orders will appear here.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <article className="checkout-card order-card" key={order.id}>
              <div>
                <p className="eyebrow">{order.status}</p>
                <h2>{order.id}</h2>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <strong>{currency.format(order.totals.total)}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default OrderPage;
