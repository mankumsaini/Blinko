import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, FoodItem } from '../types';

interface WishlistState {
  items: (Product | FoodItem)[];
}

interface WishlistContextValue extends WishlistState {
  addToWishlist: (item: Product | FoodItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}

interface WishlistProviderProps {
  children: ReactNode;
}

export default function WishlistProvider({ children }: WishlistProviderProps) {
  const [items, setItems] = useState<(Product | FoodItem)[]>([]);

  const addToWishlist = (item: Product | FoodItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isInWishlist = (id: string): boolean => {
    return items.some((i) => i.id === id);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
