import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../store/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { items, total, itemCount, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isOpen) return null;

  const deliveryFee = total > 199 || total === 0 ? 0 : 25;
  const packagingFee = total > 0 ? 5 : 0;
  const finalTotal = Math.max(0, total + deliveryFee + packagingFee - appliedDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'BLINKO50') {
      setAppliedDiscount(50);
      setCouponMessage('Coupon BLINKO50 applied! ₹50 saved.');
    } else if (code === 'QUICK100' && total >= 399) {
      setAppliedDiscount(100);
      setCouponMessage('Coupon QUICK100 applied! ₹100 saved.');
    } else {
      setCouponMessage('Invalid code or minimum cart value not met.');
    }
  };

  const handleProceed = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 bg-[#0F1B2D] text-white flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#FF6B00]" />
            <div>
              <h3 className="font-bold text-base leading-tight">My Basket</h3>
              <p className="text-xs text-gray-400">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-[#FF6B00] mb-4">
                <ShoppingBag className="w-10 h-10 stroke-1" />
              </div>
              <h4 className="text-base font-bold text-gray-800">Your basket is empty</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Explore Blinko Daily groceries, hot meals, and home essentials delivered in minutes!
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/daily');
                }}
                className="mt-5 px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E05300] text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Free delivery progress */}
              <div className="bg-white p-3 rounded-xl border border-gray-200/70 shadow-2xs">
                {total >= 199 ? (
                  <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    🎉 You have unlocked FREE Delivery!
                  </p>
                ) : (
                  <div>
                    <p className="text-xs text-gray-600 mb-1.5">
                      Add <span className="font-bold text-[#FF6B00]">₹{199 - total}</span> more for <strong className="text-emerald-600">FREE Delivery</strong>
                    </p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#FF6B00] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (total / 199) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Items */}
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-lg border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-gray-900 truncate">{item.product.name}</h5>
                    <p className="text-[11px] text-gray-500 capitalize">
                      {item.type} {('unit' in item.product && item.product.unit) ? `• ${item.product.unit}` : ''}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-xs text-gray-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-gray-400">
                          (₹{item.product.price} each)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200/70 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-[#FF6B00] hover:bg-orange-100 transition-colors"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="font-bold text-xs w-4 text-center text-[#0F1B2D]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-[#FF6B00] hover:bg-orange-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Coupon form */}
              <form onSubmit={handleApplyCoupon} className="bg-white p-3 rounded-xl border border-gray-200/70">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. BLINKO50)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none uppercase font-mono"
                    />
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-[11px] mt-1.5 font-medium ${
                      appliedDiscount > 0 ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
              </form>

              {/* Bill details */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200/70 space-y-2 text-xs">
                <h6 className="font-bold text-gray-800 uppercase text-[10px] tracking-wider mb-2">
                  Bill Summary
                </h6>
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span className="font-medium text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Partner Fee</span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Eco-Packaging & Handling</span>
                  <span className="font-medium text-gray-900">₹{packagingFee}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm text-gray-900">
                  <span>To Pay</span>
                  <span className="text-[#FF6B00]">₹{finalTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-200 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Safe & Contactless
              </span>
              <span>⚡ 10-15 Min Delivery</span>
            </div>

            <button
              onClick={handleProceed}
              className="w-full py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74500] text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-between px-4 text-sm"
            >
              <div>
                <span className="block text-[11px] opacity-90 font-normal leading-tight text-left">
                  {itemCount} items
                </span>
                <span className="font-black text-base">₹{finalTotal}</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
