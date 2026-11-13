import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  MapPin,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Bike
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-8 text-center">
      {/* Animated Success Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 border-2 border-emerald-200 flex items-center justify-center mx-auto shadow-xl animate-in zoom-in duration-300">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Order Successfully Placed
        </span>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Thank you for choosing Blinko!
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Your order has been transmitted to our nearest micro-dark store. Our automated packing system is picking your items right now.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm text-left space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Order Reference</span>
            <span className="text-sm font-black text-[#FF6B00] font-mono">{id || 'BLK-892401'}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Estimated Delivery</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 10-15 Minutes
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-start gap-2.5">
            <Bike className="w-4 h-4 text-[#FF6B00] mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-gray-900">Delivery Status: Order Confirmed</p>
              <p className="text-[11px] text-gray-500">A rider will be assigned in under 60 seconds.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-gray-900">Delivery Address</p>
              <p className="text-[11px] text-gray-500">Indiranagar, 100ft Road, Bangalore - 560038</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to={`/order-tracking/${id || 'BLK-892401'}`}
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74500] text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Track Order in Real-Time</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/daily"
          className="w-full sm:w-auto px-6 py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-bold rounded-xl text-xs transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="pt-4 text-center">
        <p className="text-[11px] text-gray-400">
          Need help with this order? Use the <strong>SupportRoot AI</strong> floating widget in the bottom-right corner for instantaneous 24/7 assistance.
        </p>
      </div>
    </div>
  );
}
