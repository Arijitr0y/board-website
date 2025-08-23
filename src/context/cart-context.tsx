
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PcbConfig, BuildTime, ShippingMethod } from '@/types';

interface CartItem {
  id: string;
  gerberFile: File;
  config: PcbConfig;
  quote: number | null;
  buildTime: BuildTime;
  shippingMethod: ShippingMethod;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };
  
  const getTotal = () => {
    return items.reduce((total, item) => total + (item.quote || 0), 0);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
