import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  const [saved, setSaved] = useState([]);

  const persist = (next) => {
    localStorage.setItem("cart", JSON.stringify(next));
    setItems(next);
  };

  const addItem = (product, quantity = 1) => {
    const next = items.some((item) => item.id === product.id)
      ? items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      : [...items, { ...product, quantity }];
    persist(next);
  };

  const updateQuantity = (id, quantity) => persist(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  const removeItem = (id) => persist(items.filter((item) => item.id !== id));
  const saveForLater = (item) => {
    setSaved((current) => [...current, item]);
    removeItem(item.id);
  };
  const subtotal = items.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 18;
  const total = subtotal + tax + shipping;

  const value = useMemo(
    () => ({ items, saved, addItem, updateQuantity, removeItem, saveForLater, subtotal, tax, shipping, total }),
    [items, saved, subtotal, tax, shipping, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
