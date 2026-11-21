import { createContext, useContext, useMemo, useState } from "react";
import { createOrder } from "../utils/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, direction) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + direction) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 && subtotal < 150 ? 12 : 0;
  const total = subtotal + shipping;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (customer) => {
    const order = createOrder({
      cartItems,
      customer,
      totals: { subtotal, shipping, total },
    });

    setOrders((current) => [order, ...current]);
    setLatestOrder(order);
    clearCart();
    return order;
  };

  const value = useMemo(
    () => ({
      cartItems,
      orders,
      latestOrder,
      subtotal,
      shipping,
      total,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
    }),
    [cartItems, orders, latestOrder, subtotal, shipping, total, cartCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
