import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // [{id, name, price, ... , quantity}]

  const addItem = useCallback((product, qty = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { ...product, quantity: qty }];
    });
  }, []);

  const increment = useCallback((productId) => {
    setCart(prev =>
      prev.map(p => (p.id === productId ? { ...p, quantity: p.quantity + 1 } : p))
    );
  }, []);

  const decrement = useCallback((productId) => {
    setCart(prev =>
      prev
        .map(p => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p))
        .filter(p => p.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const { totalItems, subtotal } = useMemo(() => {
    const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
    const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
    return { totalItems, subtotal };
  }, [cart]);

  const value = {
    cart,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
