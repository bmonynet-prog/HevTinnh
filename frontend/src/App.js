import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import PrivateRoute from "./components/privateroute";
import { useAuth } from "./context/Authcontext";
import { useCart } from "./context/Cartcontext";
import CartPage from "./pages/cartpage";
import CheckoutPage from "./pages/checkoutpage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/loginppage";
import NotFoundPage from "./pages/notfoundpage";
import OrderConfirmationPage from "./pages/orderconfirmationpage";
import OrderPage from "./pages/orderpage";
import ProductDetailPage from "./pages/productdetailpage";
import ProductPage from "./pages/productpage";
import ProfilePage from "./pages/profiepage";
import RegisterPage from "./pages/registerpage";

const knownPages = new Set([
  "home",
  "products",
  "product",
  "cart",
  "checkout",
  "confirmation",
  "orders",
  "login",
  "register",
  "profile",
]);

function readRoute() {
  const hash = window.location.hash.replace("#", "");
  const [page = "home", id = ""] = hash.split("/");

  return {
    page: knownPages.has(page) ? page : "not-found",
    productId: id,
  };
}

function App() {
  const [route, setRoute] = useState(readRoute);
  const auth = useAuth();
  const cart = useCart();

  useEffect(() => {
    const handleRouteChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  const navigate = (page, productId) => {
    window.location.hash = productId ? `${page}/${productId}` : page;
  };

  const viewProduct = (productId) => {
    navigate("product", productId);
  };

  const renderPage = () => {
    switch (route.page) {
      case "home":
        return (
          <Homepage
            onNavigate={navigate}
            onAddToCart={cart.addToCart}
            onViewProduct={viewProduct}
          />
        );
      case "products":
        return (
          <ProductPage
            onAddToCart={cart.addToCart}
            onViewProduct={viewProduct}
          />
        );
      case "product":
        return (
          <ProductDetailPage
            productId={route.productId}
            onAddToCart={cart.addToCart}
            onNavigate={navigate}
          />
        );
      case "cart":
        return <CartPage {...cart} onNavigate={navigate} />;
      case "checkout":
        return (
          <PrivateRoute
            fallback={
              <LoginPage
                login={auth.login}
                onNavigate={navigate}
              />
            }
          >
            <CheckoutPage {...cart} onNavigate={navigate} />
          </PrivateRoute>
        );
      case "confirmation":
        return (
          <OrderConfirmationPage
            order={cart.latestOrder}
            onNavigate={navigate}
          />
        );
      case "orders":
        return (
          <PrivateRoute
            fallback={<LoginPage login={auth.login} onNavigate={navigate} />}
          >
            <OrderPage orders={cart.orders} onNavigate={navigate} />
          </PrivateRoute>
        );
      case "login":
        return <LoginPage login={auth.login} onNavigate={navigate} />;
      case "register":
        return <RegisterPage register={auth.register} onNavigate={navigate} />;
      case "profile":
        return (
          <PrivateRoute
            fallback={<LoginPage login={auth.login} onNavigate={navigate} />}
          >
            <ProfilePage user={auth.user} updateProfile={auth.updateProfile} />
          </PrivateRoute>
        );
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <main className="app-shell">
      <Header currentPage={route.page} onNavigate={navigate} />
      {renderPage()}
      <Footer />
    </main>
  );
}

export default App;
