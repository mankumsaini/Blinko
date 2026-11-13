import axios from 'axios';
import type { Product, Restaurant, FoodItem, Order, RefundRequest, SupportTicket } from '../types';
import { GROCERY_PRODUCTS } from '../data/groceryProducts';
import { ESSENTIALS_PRODUCTS } from '../data/essentialsProducts';
import { RESTAURANTS, FOOD_ITEMS } from '../data/restaurants';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Products
  async getProducts(params?: { type?: 'grocery' | 'essentials'; category?: string; search?: string }): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/', { params });
      if (response.data && response.data.length > 0) {
        return response.data;
      }
    } catch {
      // Fallback to local mock data
    }

    let products = params?.type === 'essentials' ? [...ESSENTIALS_PRODUCTS] : [...GROCERY_PRODUCTS];
    if (params?.category && params.category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === params.category?.toLowerCase());
    }
    if (params?.search) {
      const s = params.search.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    return products;
  },

  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const response = await apiClient.get<Product>(`/products/${id}/`);
      return response.data;
    } catch {
      return [...GROCERY_PRODUCTS, ...ESSENTIALS_PRODUCTS].find((p) => p.id === id);
    }
  },

  // Restaurants
  async getRestaurants(params?: { cuisine?: string; search?: string }): Promise<Restaurant[]> {
    try {
      const response = await apiClient.get<Restaurant[]>('/restaurants/', { params });
      if (response.data && response.data.length > 0) {
        return response.data;
      }
    } catch {
      // Fallback
    }

    let list = [...RESTAURANTS];
    if (params?.cuisine && params.cuisine !== 'All') {
      list = list.filter((r) => r.cuisine.toLowerCase().includes(params.cuisine!.toLowerCase()) || r.tags.includes(params.cuisine!.toLowerCase()));
    }
    if (params?.search) {
      const s = params.search.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(s) || r.cuisine.toLowerCase().includes(s));
    }
    return list;
  },

  async getRestaurantById(id: string): Promise<{ restaurant: Restaurant; menu: FoodItem[] } | undefined> {
    try {
      const response = await apiClient.get<Restaurant>(`/restaurants/${id}/`);
      if (response.data) {
        // If nested menu exists from DRF
        const menu = (response.data as any).menu || FOOD_ITEMS.filter((f) => f.restaurantId === id);
        return { restaurant: response.data, menu };
      }
    } catch {
      // Fallback
    }

    const restaurant = RESTAURANTS.find((r) => r.id === id);
    if (!restaurant) return undefined;
    const menu = FOOD_ITEMS.filter((f) => f.restaurantId === id);
    return { restaurant, menu };
  },

  // Orders
  async getOrders(userId: string = 'u1'): Promise<Order[]> {
    try {
      const response = await apiClient.get<Order[]>('/orders/', { params: { user_id: userId } });
      if (response.data && response.data.length > 0) {
        return response.data;
      }
    } catch {
      // Fallback to localStorage orders
    }

    const local = localStorage.getItem('blinko_orders');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        // ignore
      }
    }
    return [];
  },

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    try {
      const response = await apiClient.post<Order>('/orders/', orderData);
      if (response.data) {
        this.saveOrderLocally(response.data);
        return response.data;
      }
    } catch {
      // Fallback to local creation
    }

    const newOrder: Order = {
      id: `BLK-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: orderData.userId || 'u1',
      customerName: orderData.customerName || 'Aarav Sharma',
      customerPhone: orderData.customerPhone || '+91 98765 43210',
      status: 'confirmed',
      total: orderData.total || 0,
      createdAt: new Date().toISOString(),
      estimatedDelivery: '15-20 mins (Lightning Fast)',
      address: orderData.address!,
      items: orderData.items || [],
      paymentMethod: orderData.paymentMethod || 'UPI',
      restaurantId: orderData.restaurantId,
    };

    this.saveOrderLocally(newOrder);
    return newOrder;
  },

  async cancelOrder(orderId: string): Promise<boolean> {
    try {
      await apiClient.post(`/orders/${orderId}/cancel/`);
    } catch {
      // Fallback
    }

    // Update in localStorage
    const local = localStorage.getItem('blinko_orders');
    if (local) {
      const orders: Order[] = JSON.parse(local);
      const updated = orders.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' as const } : o));
      localStorage.setItem('blinko_orders', JSON.stringify(updated));
    }
    return true;
  },

  async requestRefund(orderId: string, reason: string, amount: number): Promise<RefundRequest> {
    try {
      const response = await apiClient.post<RefundRequest>('/orders/refunds/create/', {
        orderId,
        reason,
        amount,
      });
      if (response.data) return response.data;
    } catch {
      // Fallback
    }

    const req: RefundRequest = {
      id: `REF-${Math.floor(10000 + Math.random() * 90000)}`,
      orderId,
      reason,
      amount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('blinko_refunds') || '[]');
    existing.unshift(req);
    localStorage.setItem('blinko_refunds', JSON.stringify(existing));
    return req;
  },

  async submitSupportTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>): Promise<SupportTicket> {
    try {
      const response = await apiClient.post<SupportTicket>('/support/tickets/', ticket);
      if (response.data) return response.data;
    } catch {
      // Fallback
    }

    const newTicket: SupportTicket = {
      ...ticket,
      id: `TCK-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'open',
      createdAt: new Date().toISOString(),
      resolvedByAi: true,
    };
    return newTicket;
  },

  async getAnalytics(): Promise<any> {
    try {
      const response = await apiClient.get('/analytics/dashboard/');
      if (response.data) return response.data;
    } catch {
      // Fallback
    }

    return {
      summary: {
        totalRevenue: 48259000,
        revenueFormatted: '₹4.82 Cr',
        totalOrders: 1248500,
        totalCustomers: 382400,
        productsSold: 3491200,
        activeOrders: 142,
        cancelledOrders: 1840,
        refundRequests: 324,
        customerSatisfaction: 4.86,
        avgDeliveryTimeMins: 12.4,
      },
      growthByYear: [
        { year: 2021, revenue: 1400000, orders: 42000, activeUsers: 18000, milestone: 'Founding & 1st Micro-warehouse in Bangalore' },
        { year: 2022, revenue: 6200000, orders: 185000, activeUsers: 72000, milestone: 'Launched 10-min Daily Grocery in 3 cities' },
        { year: 2023, revenue: 15800000, orders: 440000, activeUsers: 160000, milestone: 'Introduced Blinko Eats Food Delivery' },
        { year: 2024, revenue: 29400000, orders: 790000, activeUsers: 265000, milestone: 'Expanded to Blinko Essentials Household goods' },
        { year: 2025, revenue: 41200000, orders: 1050000, activeUsers: 340000, milestone: 'Autonomous micro-fulfillment tech deployed' },
        { year: 2026, revenue: 48259000, orders: 1248500, activeUsers: 382400, milestone: 'SupportRoot AI agent integrated across all services' },
      ],
      monthlySales2026: [
        { month: 'Jan', orders: 98400, revenue: 3850000 },
        { month: 'Feb', orders: 102100, revenue: 4010000 },
        { month: 'Mar', orders: 108300, revenue: 4230000 },
        { month: 'Apr', orders: 104500, revenue: 4090000 },
        { month: 'May', orders: 112000, revenue: 4380000 },
        { month: 'Jun', orders: 115200, revenue: 4510000 },
        { month: 'Jul', orders: 118400, revenue: 4620000 },
        { month: 'Aug', orders: 122100, revenue: 4790000 },
        { month: 'Sep', orders: 124500, revenue: 4880000 },
        { month: 'Oct', orders: 129000, revenue: 5050000 },
        { month: 'Nov', orders: 133400, revenue: 5210000 },
      ],
      topSellingProducts: [
        { id: 'g1', name: 'Fresh Farm Tomatoes', category: 'Fruits & Vegetables', sold: 48290, revenue: '₹14.0 L' },
        { id: 'g9', name: 'Nandini Toned Fresh Milk', category: 'Dairy & Bakery', sold: 44100, revenue: '₹10.6 L' },
        { id: 'g17', name: "Lay's Classic Salted Chips", category: 'Snacks & Beverages', sold: 39500, revenue: '₹7.9 L' },
        { id: 'g25', name: 'India Gate Basmati Rice', category: 'Rice & Grains', sold: 28400, revenue: '₹36.9 L' },
        { id: 'e1', name: 'Vim Dishwash Liquid Gel', category: 'Cleaning Supplies', sold: 22100, revenue: '₹23.2 L' },
      ],
      topRestaurants: [
        { id: 'r1', name: 'Punjab Grill & Co.', orders: 18240, rating: 4.6, cuisine: 'North Indian' },
        { id: 'r4', name: 'Pizza Roma Artisanal', orders: 16900, rating: 4.7, cuisine: 'Pizza' },
        { id: 'r2', name: 'Dakshin Udupi Cafe', orders: 15400, rating: 4.8, cuisine: 'South Indian' },
        { id: 'r3', name: 'Golden Dragon Wok', orders: 13800, rating: 4.5, cuisine: 'Chinese' },
        { id: 'r6', name: 'Sweet Tooth Patisserie', orders: 12100, rating: 4.8, cuisine: 'Desserts' },
      ],
      demoNotice: 'All figures, historical trends (2021–2026), and analytics are fictional sample data for demonstration purposes.',
    };
  },

  saveOrderLocally(order: Order) {
    const existing = JSON.parse(localStorage.getItem('blinko_orders') || '[]');
    const filtered = existing.filter((o: Order) => o.id !== order.id);
    filtered.unshift(order);
    localStorage.setItem('blinko_orders', JSON.stringify(filtered));
  },
};
