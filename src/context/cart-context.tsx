
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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

const getInitialCartState = (): CartItem[] => {
  // This function now returns an empty array for the initial state on both server and client
  // to prevent hydration mismatch. The mock data will be loaded client-side only.
  return [];
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(getInitialCartState());

  useEffect(() => {
    // This effect runs only on the client side, after the initial render.
    // This is the correct place to initialize client-side-only state like mock data.
    const mockFile = new File([''], 'weather-station-v2.zip', { type: 'application/zip' });
    const mockConfig: PcbConfig = {
      layers: '2',
      quantity: 15,
      material: 'FR-4',
      thickness: 1.6,
      size: { width: 80, height: 60 },
      baseMaterial: 'FR4',
      discreteDesign: 1,
      deliveryFormat: 'Single PCB',
      maskColor: 'Green',
      pcbFinish: 'HASL Finish',
      copperThickness: '1 oz (35 um)',
    };
    const mockItems = [
      {
        id: 'mock-item-1',
        gerberFile: mockFile,
        config: mockConfig,
        quote: 8500,
        buildTime: '5-6',
        shippingMethod: 'standard',
      },
    ];
    setItems(mockItems);
  }, []);

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
