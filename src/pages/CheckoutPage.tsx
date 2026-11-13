import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  Smartphone,
  Banknote,
  ShieldCheck,
  ArrowRight,
  Clock,
  Plus,
  Check,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';
import { api } from '../services/api';
import type { Address } from '../types';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr1');
  const [deliveryInstruction, setDeliveryInstruction] = useState('Leave at door if not reachable');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample default addresses
  const addresses: Address[] = user?.addresses || [
    {
      id: 'addr1',
      type: 'home',
      line1: 'Flat 402, Green Glen Layout, Bellandur',
      line2: 'Near Outer Ring Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560103',
      isDefault: true,
    },
    {
      id: 'addr2',
      type: 'work',
      line1: 'Tech Park Tower 3, 5th Floor',
      line2: 'Whitefield Main Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066',
      isDefault: false,
    },
  ];

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const deliveryFee = total > 199 || total === 0 ? 0 : 25;
  const packagingFee = total > 0 ? 5 : 0;
  const finalTotal = total + deliveryFee + packagingFee;

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      setError('Your basket is empty!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const order = await api.createOrder({
        userId: user?.id || 'u1',
        customerName: user?.name || 'Aarav Sharma',
        customerPhone: user?.phone || '+91 98765 43210',
        total: finalTotal,
        items,
        address: selectedAddress,
        paymentMethod: paymentMethod.toUpperCase(),
        estimatedDelivery: '10-15 mins',
      });

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch {
      setError('Unable to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF6B00] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your basket is empty</h2>
        <p className="text-xs text-gray-500">Add products from Blinko Daily or Eats to proceed to checkout.</p>
        <Link to="/daily" className="inline-block px-5 py-2.5 bg-[#FF6B00] text-white rounded-xl text-xs font-bold">
          Explore Groceries
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Checkout</h1>
        <p className="text-xs text-gray-500 mt-0.5">Complete your order with 10-minute lightning delivery</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Address, Instructions, Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Delivery Address */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF6B00]" />
                <h3 className="font-bold text-sm text-gray-900">1. Delivery Address</h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                ⚡ 10-15 Min Zone
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#FF6B00] bg-orange-50/40 text-gray-900 shadow-2xs'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                        {addr.type}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#FF6B00]" />}
                    </div>
                    <p className="text-xs font-bold text-gray-900 leading-tight">{addr.line1}</p>
                    <p className="text-[11px] text-gray-500 mt-1">{addr.line2}, {addr.city} - {addr.pincode}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Delivery Instructions */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-gray-900">2. Delivery Instructions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                'Leave at door if not reachable',
                'Avoid ringing doorbell',
                'Call before arrival',
                'Leave with security guard',
                'Hand to me personally',
              ].map((instruction) => (
                <button
                  key={instruction}
                  type="button"
                  onClick={() => setDeliveryInstruction(instruction)}
                  className={`p-2 rounded-xl border text-left font-medium transition-all ${
                    deliveryInstruction === instruction
                      ? 'border-[#FF6B00] bg-orange-50 text-[#FF6B00]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {instruction}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900">3. Select Payment Mode</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                100% Secure Sample Processing
              </span>
            </div>

            <div className="space-y-2.5">
              {/* UPI */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#FF6B00] bg-orange-50/40'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 accent-[#FF6B00]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#FF6B00]" />
                      UPI (Google Pay / PhonePe / Paytm / CRED)
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      FASTEST
                    </span>
                  </div>
                  {paymentMethod === 'upi' && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter your UPI ID (e.g. mobile@upi)"
                        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#FF6B00]"
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Sample payment verification simulates instant approval.</p>
                    </div>
                  )}
                </div>
              </label>

              {/* Cards */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#FF6B00] bg-orange-50/40'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 accent-[#FF6B00]"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    Credit / Debit Card (Visa, MasterCard, RuPay)
                  </span>
                  {paymentMethod === 'card' && (
                    <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="Card Number (4111 2222 3333 4444)"
                        defaultValue="4111 •••• •••• 4242"
                        className="col-span-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg outline-none"
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg outline-none"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="123"
                        className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg outline-none"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#FF6B00] bg-orange-50/40'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#FF6B00]"
                />
                <div>
                  <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    Cash on Delivery (Pay at Doorstep)
                  </span>
                  <p className="text-[11px] text-gray-500 mt-0.5">Pay via cash or UPI to rider upon delivery.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase text-[11px] tracking-wider">
              Basket Summary ({items.length} items)
            </h3>

            <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1 divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.product.id} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg border border-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-black text-gray-900 shrink-0">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="pt-3 border-t border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Partner Fee</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Packaging & Handling</span>
                <span>₹{packagingFee}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-black text-base text-gray-900">
                <span>Total to Pay</span>
                <span className="text-[#FF6B00]">₹{finalTotal}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74500] text-white font-black rounded-xl shadow-lg shadow-orange-500/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order • ₹{finalTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Simulated demonstration checkout. No real card charge.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
