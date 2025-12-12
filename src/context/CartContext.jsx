import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('shopflow_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopflow_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const increase = (productId) => {
    setItems((prev) => prev.map((it) => it.product.id === productId ? { ...it, quantity: it.quantity + 1 } : it));
  };

  const decrease = (productId) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.product.id === productId);
      if (idx === -1) return prev;
      const target = prev[idx];
      if (target.quantity <= 1) {
        // remove
        return prev.filter((it) => it.product.id !== productId);
      }
      const next = [...prev];
      next[idx] = { ...target, quantity: target.quantity - 1 };
      return next;
    });
  };

  const remove = (productId) => setItems((prev) => prev.filter((it) => it.product.id !== productId));

  const total = useMemo(() => {
    return items.reduce((sum, it) => sum + (Number(it.product.price) || 0) * it.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => items.reduce((s, it) => s + it.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, increase, decrease, remove, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

// no default export; use named exports
