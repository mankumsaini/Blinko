import { useState, useEffect } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  PackageCheck,
  RotateCcw,
  Star,
  Clock,
  ArrowUpRight,
  Shield,
  Activity,
  Calendar,
  AlertTriangle,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import type { Order } from '../types';

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'restaurants'>('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stats, orderList] = await Promise.all([
          api.getAnalytics(),
          api.getOrders(),
        ]);
        setAnalytics(stats);
        setOrders(orderList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    // save in localStorage
    const local = localStorage.getItem('blinko_orders');
    if (local) {
      const parsed: Order[] = JSON.parse(local);
      const updated = parsed.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      localStorage.setItem('blinko_orders', JSON.stringify(updated));
    }
  };

  if (loading || !analytics) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-4">
        <div className="h-40 bg-gray-100 rounded-3xl animate-pulse"></div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const { summary, growthByYear, monthlySales2026, topSellingProducts, topRestaurants } = analytics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner with Demo Label */}
      <div className="bg-[#0F1B2D] text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl border border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Executive Command Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">Blinko Operations Dashboard</h1>
            <p className="text-xs text-gray-400 mt-1">
              Real-time dark store network telemetry, fulfillment rates, and historical analytics.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-3 rounded-2xl text-xs max-w-sm">
            <span className="font-bold block flex items-center gap-1.5 mb-0.5">
              <Shield className="w-4 h-4 text-amber-400" />
              Fictional Demonstration Data (2021–2026)
            </span>
            <p className="text-[11px] text-amber-200/80 leading-snug">
              All financial figures, delivery statistics, and orders shown are simulated for showcase purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">{summary.revenueFormatted}</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4%
            </span>
          </div>
          <p className="text-[11px] text-gray-400">Total processed revenue since 2021 launch</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">
              {summary.totalOrders.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5" /> +24% YoY
            </span>
          </div>
          <p className="text-[11px] text-gray-400">Over 1.2M grocery & hot meal drop-offs</p>
        </div>

        {/* Active Customers */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Customers</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">
              {summary.totalCustomers.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-600 font-bold">4.86★ Rating</span>
          </div>
          <p className="text-[11px] text-gray-400">Monthly returning buyer frequency 3.8x</p>
        </div>

        {/* Avg Delivery Time */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Delivery Speed</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">
              {summary.avgDeliveryTimeMins} mins
            </span>
            <span className="text-xs text-gray-400">Target &lt;15m</span>
          </div>
          <p className="text-[11px] text-gray-400">Powered by 2,840 electric EV riders</p>
        </div>
      </div>

      {/* Tabs for Overview vs Live Orders vs Products */}
      <div className="flex border-b border-gray-200 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          2021–2026 Historical Growth & Analytics
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Live Orders & Dispatch ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'products'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Top Selling Products
        </button>

        <button
          onClick={() => setActiveTab('restaurants')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'restaurants'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Top Partner Kitchens
        </button>
      </div>

      {/* TAB 1: Overview & Historical Charts */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 2021-2026 Growth Timeline Table */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  Historical Business Scaling (2021–2026)
                </h3>
                <p className="text-xs text-gray-500">From 1 dark store in Bangalore to 250+ hubs nationwide</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                CAGR +88.4%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-2 font-bold">Year</th>
                    <th className="py-3 px-2 font-bold">Annual Revenue</th>
                    <th className="py-3 px-2 font-bold">Annual Orders</th>
                    <th className="py-3 px-2 font-bold">Active Users</th>
                    <th className="py-3 px-2 font-bold">Key Platform Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {growthByYear.map((row: any) => (
                    <tr key={row.year} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-2 font-black text-gray-900">{row.year}</td>
                      <td className="py-3.5 px-2 font-bold text-[#FF6B00]">
                        ₹{(row.revenue / 10000000).toFixed(2)} Cr
                      </td>
                      <td className="py-3.5 px-2 font-medium">{row.orders.toLocaleString()}</td>
                      <td className="py-3.5 px-2 font-medium">{row.activeUsers.toLocaleString()}</td>
                      <td className="py-3.5 px-2 text-gray-600">{row.milestone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Sales Growth Bar Chart */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900">
              2026 Monthly Order Velocity
            </h3>
            <p className="text-xs text-gray-500">Number of orders delivered month-by-month</p>

            <div className="pt-4 grid grid-cols-11 gap-2 items-end h-48 border-b border-gray-200">
              {monthlySales2026.map((m: any, i: number) => {
                const heightPercent = Math.round((m.orders / 140000) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {(m.orders / 1000).toFixed(0)}k
                    </span>
                    <div
                      className="w-full bg-gradient-to-t from-[#FF6B00] to-amber-400 rounded-t-lg group-hover:from-orange-600 group-hover:to-amber-500 transition-all"
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                    <span className="text-[10px] font-bold text-gray-600 mt-1">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Live Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-gray-900">Live Orders Dispatch Console</h3>
              <p className="text-xs text-gray-500">Update fulfillment status in real-time across hubs</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-2 font-bold">Order ID</th>
                  <th className="py-3 px-2 font-bold">Customer</th>
                  <th className="py-3 px-2 font-bold">Total</th>
                  <th className="py-3 px-2 font-bold">Current Status</th>
                  <th className="py-3 px-2 font-bold text-right">Update Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-2 font-mono font-black text-gray-900">{o.id}</td>
                    <td className="py-3.5 px-2">
                      <p className="font-bold text-gray-900">{o.customerName || 'Customer'}</p>
                      <p className="text-[11px] text-gray-400">{o.customerPhone || '+91 98765 43210'}</p>
                    </td>
                    <td className="py-3.5 px-2 font-black text-gray-900">₹{o.total}</td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          o.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : o.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-[#FF6B00]'
                        }`}
                      >
                        {o.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right space-x-1.5">
                      {o.status !== 'delivered' && o.status !== 'cancelled' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(o.id, 'out_for_delivery')}
                            className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-[#FF6B00] rounded-lg font-bold text-[11px] transition-colors"
                          >
                            Out for Delivery
                          </button>
                          <button
                            onClick={() => handleStatusChange(o.id, 'delivered')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-bold text-[11px] transition-colors"
                          >
                            Mark Delivered
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Top Selling Products */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900">Top-Selling Products by Volume</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px]">
                  <th className="py-3 px-2 font-bold">Product Name</th>
                  <th className="py-3 px-2 font-bold">Category</th>
                  <th className="py-3 px-2 font-bold">Units Sold</th>
                  <th className="py-3 px-2 font-bold">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {topSellingProducts.map((p: any) => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-2 font-bold text-gray-900">{p.name}</td>
                    <td className="py-3.5 px-2 text-gray-500">{p.category}</td>
                    <td className="py-3.5 px-2 font-medium">{p.sold.toLocaleString()}</td>
                    <td className="py-3.5 px-2 font-black text-[#FF6B00]">{p.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Top Partner Kitchens */}
      {activeTab === 'restaurants' && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900">Top Master Kitchens on Blinko Eats</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px]">
                  <th className="py-3 px-2 font-bold">Restaurant Name</th>
                  <th className="py-3 px-2 font-bold">Cuisine</th>
                  <th className="py-3 px-2 font-bold">Completed Orders</th>
                  <th className="py-3 px-2 font-bold">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {topRestaurants.map((r: any) => (
                  <tr key={r.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-2 font-bold text-gray-900">{r.name}</td>
                    <td className="py-3.5 px-2 text-gray-500">{r.cuisine}</td>
                    <td className="py-3.5 px-2 font-medium">{r.orders.toLocaleString()}</td>
                    <td className="py-3.5 px-2 font-bold text-emerald-600">★ {r.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
