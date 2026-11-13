import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  MapPin,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { api } from '../services/api';
import type { Order, RefundRequest } from '../types';

export default function AccountPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const tabParam = (searchParams.get('tab') as 'orders' | 'addresses' | 'refunds') || 'orders';
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'refunds'>(tabParam);
  const [orders, setOrders] = useState<Order[]>([]);
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Refund modal state
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedOrderForRefund, setSelectedOrderForRefund] = useState<Order | null>(null);
  const [refundReason, setRefundReason] = useState('Quality issue with delivered perishables');
  const [refundStatusMessage, setRefundStatusMessage] = useState('');

  useEffect(() => {
    setActiveTab((searchParams.get('tab') as any) || 'orders');
  }, [searchParams]);

  useEffect(() => {
    const loadAccountData = async () => {
      setLoading(true);
      try {
        const orderList = await api.getOrders();
        // If empty, provide realistic demo sample orders
        if (orderList.length === 0) {
          const sampleOrders: Order[] = [
            {
              id: 'BLK-892401',
              userId: 'u1',
              customerName: user?.name || 'Aarav Sharma',
              customerPhone: user?.phone || '+91 98765 43210',
              status: 'out_for_delivery',
              total: 489,
              createdAt: new Date().toISOString(),
              estimatedDelivery: '10-15 mins',
              paymentMethod: 'UPI',
              address: user?.addresses[0] || {
                id: 'addr1',
                type: 'home',
                line1: 'Flat 402, Green Glen Layout, Bellandur',
                line2: 'Near Outer Ring Road',
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560103',
                isDefault: true,
              },
              items: [
                {
                  product: {
                    id: 'g1',
                    name: 'Fresh Farm Tomatoes',
                    price: 29,
                    originalPrice: 39,
                    discount: 26,
                    rating: 4.3,
                    reviewCount: 1240,
                    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
                    category: 'Fruits & Vegetables',
                    subcategory: 'Vegetables',
                    inStock: true,
                    unit: '500g',
                    brand: 'Fresh Farm',
                    tags: ['fresh'],
                    description: 'Red ripe farm tomatoes',
                  },
                  quantity: 2,
                  type: 'grocery',
                },
                {
                  product: {
                    id: 'g9',
                    name: 'Nandini Toned Fresh Milk',
                    price: 24,
                    originalPrice: 24,
                    discount: 0,
                    rating: 4.8,
                    reviewCount: 3200,
                    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
                    category: 'Dairy & Bakery',
                    subcategory: 'Milk',
                    inStock: true,
                    unit: '500ml',
                    brand: 'Nandini',
                    tags: ['dairy'],
                    description: 'Pasteurized toned milk',
                  },
                  quantity: 2,
                  type: 'grocery',
                },
              ],
            },
            {
              id: 'BLK-734192',
              userId: 'u1',
              customerName: user?.name || 'Aarav Sharma',
              status: 'delivered',
              total: 640,
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              estimatedDelivery: 'Delivered yesterday',
              paymentMethod: 'Card',
              address: user?.addresses[0] || {
                id: 'addr1',
                type: 'home',
                line1: 'Flat 402, Green Glen Layout',
                line2: 'Bellandur',
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560103',
                isDefault: true,
              },
              items: [],
            },
          ];
          setOrders(sampleOrders);
        } else {
          setOrders(orderList);
        }

        const localRefunds = JSON.parse(localStorage.getItem('blinko_refunds') || '[]');
        if (localRefunds.length === 0) {
          setRefunds([
            {
              id: 'REF-40912',
              orderId: 'BLK-734192',
              reason: 'Damaged packaging in milk bottle',
              amount: 48,
              status: 'approved',
              createdAt: '2026-11-12T14:30:00Z',
            },
          ]);
        } else {
          setRefunds(localRefunds);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAccountData();
  }, [user]);

  const handleTabClick = (tab: 'orders' | 'addresses' | 'refunds') => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', tab);
    setSearchParams(newParams);
  };

  const openRefundModal = (order: Order) => {
    setSelectedOrderForRefund(order);
    setIsRefundModalOpen(true);
    setRefundStatusMessage('');
  };

  const handleSubmitRefund = async () => {
    if (!selectedOrderForRefund) return;
    try {
      const result = await api.requestRefund(
        selectedOrderForRefund.id,
        refundReason,
        selectedOrderForRefund.total
      );
      setRefunds((prev) => [result, ...prev]);
      setRefundStatusMessage('Refund request initiated! SupportRoot AI is processing your credit.');
      setTimeout(() => {
        setIsRefundModalOpen(false);
      }, 1200);
    } catch {
      setRefundStatusMessage('Error requesting refund.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-5">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-[#FF6B00] shadow-md"
        />
        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">{user?.name || 'Aarav Sharma'}</h1>
            <span className="text-[10px] bg-orange-100 text-[#FF6B00] font-black uppercase px-2 py-0.5 rounded-full">
              Blinko Plus Member
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {user?.email || 'aarav.sharma@example.com'} • {user?.phone || '+91 98765 43210'}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            ⚡ 10-Minute Dark Store Zone: Indiranagar & Bellandur, Bangalore
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-gray-200 gap-4 text-xs font-bold">
        <button
          onClick={() => handleTabClick('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'orders'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => handleTabClick('addresses')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'addresses'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>

        <button
          onClick={() => handleTabClick('refunds')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'refunds'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Refunds & Replacements ({refunds.length})</span>
        </button>
      </div>

      {/* TAB 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => {
            const isLive = order.status === 'out_for_delivery' || order.status === 'preparing' || order.status === 'confirmed';

            return (
              <div
                key={order.id}
                className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-gray-900">#{order.id}</span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-[#FF6B00]'
                        }`}
                      >
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-0.5 block">
                      Placed on {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isLive && (
                      <Link
                        to={`/order-tracking/${order.id}`}
                        className="px-3.5 py-1.5 bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                      >
                        Track Live
                      </Link>
                    )}

                    {order.status === 'delivered' && (
                      <button
                        onClick={() => openRefundModal(order)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
                      >
                        Request Refund
                      </button>
                    )}
                  </div>
                </div>

                {/* Items preview */}
                {order.items && order.items.length > 0 && (
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-gray-700">
                        <div className="flex items-center gap-2 truncate pr-2">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-8 h-8 rounded-lg object-cover border border-gray-100"
                          />
                          <span className="truncate">{item.product.name} × {item.quantity}</span>
                        </div>
                        <span className="font-bold text-gray-900 shrink-0">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-500">Payment: {order.paymentMethod}</span>
                  <span className="text-sm font-black text-gray-900">Total: ₹{order.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(user?.addresses || []).map((addr) => (
            <div key={addr.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black bg-orange-100 text-[#FF6B00] px-2 py-0.5 rounded">
                  {addr.type}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Default Delivery
                  </span>
                )}
              </div>
              <p className="font-bold text-xs text-gray-900">{addr.line1}</p>
              <p className="text-xs text-gray-500">{addr.line2}, {addr.city} - {addr.pincode}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Refunds */}
      {activeTab === 'refunds' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider">
              Refund & Replacement Claims
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {refunds.map((ref) => (
              <div key={ref.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-900">{ref.id}</span>
                    <span className="text-gray-400">• For Order #{ref.orderId}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{ref.reason}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-gray-900">₹{ref.amount}</span>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      ref.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ref.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {isRefundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900">
                Claim Refund for #{selectedOrderForRefund?.id}
              </h3>
              <button onClick={() => setIsRefundModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Under Blinko's Freshness Guarantee, damaged or missing items qualify for instant credit to your wallet or original payment source.
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Reason for Claim</label>
              <textarea
                rows={3}
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>

            {refundStatusMessage && (
              <p className="text-xs font-bold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                {refundStatusMessage}
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setIsRefundModalOpen(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRefund}
                className="flex-1 py-2.5 bg-[#FF6B00] text-white font-bold text-xs rounded-xl hover:bg-[#E05300]"
              >
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
