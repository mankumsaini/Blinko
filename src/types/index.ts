export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  subcategory: string;
  inStock: boolean;
  unit: string;
  brand: string;
  tags: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  promoted: boolean;
  address: string;
  isOpen: boolean;
  tags: string[];
  description: string;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
  popular: boolean;
}

export interface CartItem {
  product: Product | FoodItem;
  quantity: number;
  type: 'grocery' | 'food' | 'essentials';
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  avatar: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName?: string;
  customerPhone?: string;
  items: CartItem[];
  status: 'processing' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  estimatedDelivery: string;
  address: Address;
  paymentMethod: string;
  restaurantId?: string;
}

export interface RefundRequest {
  id: string;
  orderId: string;
  reason: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface SupportConfig {
  enabled: boolean;
  widgetUrl: string;
  apiKey: string;
  position: 'bottom-right' | 'bottom-left';
  companyName?: string;
  primaryColor?: string;
}

export interface FAQItem {
  id: string;
  category: 'orders' | 'payments' | 'product' | 'account' | 'cancellations' | 'returns' | 'restaurant' | 'general';
  question: string;
  answer: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  message: string;
  orderId?: string;
  status: 'open' | 'in_progress' | 'resolved';
  resolvedByAi?: boolean;
  createdAt: string;
}
