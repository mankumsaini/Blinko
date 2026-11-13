import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartItem, Product, FoodItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product | FoodItem; itemType: 'grocery' | 'food' | 'essentials' } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

function computeTotals(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, itemType } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      let items: CartItem[];
      if (existing) {
        items = state.items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        items = [...state.items, { product, quantity: 1, type: itemType }];
      }
      return { items, ...computeTotals(items) };
    }
    case 'REMOVE_FROM_CART': {
      const items = state.items.filter((i) => i.product.id !== action.payload.id);
      return { items, ...computeTotals(items) };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      let items: CartItem[];
      if (quantity <= 0) {
        items = state.items.filter((i) => i.product.id !== id);
      } else {
        items = state.items.map((i) =>
          i.product.id === id ? { ...i, quantity } : i
        );
      }
      return { items, ...computeTotals(items) };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  addToCart: (product: Product | FoodItem, type?: 'grocery' | 'food' | 'essentials') => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  const addToCart = (product: Product | FoodItem, type: 'grocery' | 'food' | 'essentials' = 'grocery') => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, itemType: type } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
