import "./header.css";
import { useAuth } from "../context/Authcontext";
import { useCart } from "../context/Cartcontext";

function Header({ currentPage, onNavigate }) {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const links = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "cart", label: `Cart (${cartCount})` },
    { id: "checkout", label: "Checkout" },
    { id: "orders", label: "Orders" },
  ];

  return (
    <header className="site-header">
      <button className="brand reset-button" onClick={() => onNavigate("home")}>
        <span className="brand-mark">S</span>
        ShopEasy
      </button>

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map((link) => (
          <button
            className={currentPage === link.id ? "active reset-button" : "reset-button"}
            key={link.id}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="account-actions">
        {user ? (
          <>
            <button className="text-button" onClick={() => onNavigate("profile")}>
              {user.name}
            </button>
            <button className="button small ghost-light" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="text-button" onClick={() => onNavigate("login")}>
              Login
            </button>
            <button className="button small" onClick={() => onNavigate("register")}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
