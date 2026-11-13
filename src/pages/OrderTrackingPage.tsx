import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Bike,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  ShieldCheck,
  AlertCircle,
  X,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { api } from '../services/api';
import type { Order } from '../types';

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [statusStep, setStatusStep] = useState(2); // 0: Confirmed, 1: Preparing, 2: Out for Delivery, 3: Delivered
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const orders = await api.getOrders();
      const found = orders.find((o) => o.id === id);
      if (found) {
        setOrder(found);
        if (found.status === 'cancelled') {
          setIsCancelled(true);
        }
      }
    };
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!id) return;
    await api.cancelOrder(id);
    setIsCancelled(true);
    setIsCancelModalOpen(false);
  };

  const steps = [
    { title: 'Order Placed', time: '11:32 AM', desc: 'Received & routed to micro-store' },
    { title: 'Packed & Quality Checked', time: '11:34 AM', desc: 'Triple inspected & bagged' },
    { title: 'Out for Delivery', time: '11:36 AM', desc: 'Rider on electric EV is on the way' },
    { title: 'Delivered', time: 'Est. 11:45 AM', desc: 'At your doorstep' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/account"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#FF6B00]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Account Orders</span>
        </Link>
        <span className="text-xs font-mono font-bold text-gray-500">Order Ref: {id || 'BLK-892401'}</span>
      </div>

      {isCancelled ? (
        <div className="bg-red-50 border border-red-200 p-8 rounded-3xl text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-red-900">Order #{id} has been Cancelled</h2>
          <p className="text-xs text-red-700 max-w-md mx-auto">
            Your cancellation request was processed. Any paid amount has been initiated for 100% instant refund via SupportRoot AI.
          </p>
          <Link
            to="/daily"
            className="inline-block mt-3 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold"
          >
            Return to Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Live Delivery Hero Card */}
          <div className="bg-gradient-to-br from-[#0F1B2D] to-[#1A2E4A] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            <div className="max-w-xl space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Live GPS Tracking Active
              </span>

              <h1 className="text-2xl sm:text-4xl font-black">
                Arriving in <span className="text-[#FF6B00]">9 Minutes</span>
              </h1>
              <p className="text-xs text-gray-300">
                Delivery partner <strong>Ramesh Kumar</strong> has picked up your order and is currently 1.2 km away on 100ft Road.
              </p>
            </div>

            {/* Visual Simulated Route Card */}
            <div className="mt-6 bg-gray-900/60 border border-gray-700/60 rounded-2xl p-4 flex items-center justify-between text-xs backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#FF6B00] flex items-center justify-center font-bold">
                  <Bike className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <p className="font-bold text-white">Blinko Hub Indiranagar → Your Address</p>
                  <p className="text-[11px] text-gray-400">EV Scooter • Vehicle KA-03-HA-8921</p>
                </div>
              </div>

              <button
                onClick={() => alert('Simulated tracking link copied to clipboard!')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-1.5 text-xs font-bold transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share Live Link</span>
              </button>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-gray-900 uppercase text-[11px] tracking-wider">
              Order Milestone Progression
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {steps.map((s, idx) => {
                const isCompleted = idx <= statusStep;
                const isCurrent = idx === statusStep;

                return (
                  <div key={idx} className="flex md:flex-col items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isCompleted
                          ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/20'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                          {s.title}
                        </h4>
                        {isCurrent && (
                          <span className="text-[9px] bg-orange-100 text-[#FF6B00] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                            LIVE
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{s.time}</span>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Partner Card & Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                  alt="Delivery Partner"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#FF6B00]"
                />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Ramesh Kumar</h4>
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Vaccinated & Temperature 98.4°F
                  </p>
                  <p className="text-[10px] text-gray-400">4.9 ★ (1,420+ safe deliveries)</p>
                </div>
              </div>

              <button
                onClick={() => alert('Dialing simulated rider hotline: +91 98765 00122')}
                className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                title="Call Rider"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-gray-900">Need to cancel or modify?</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Orders can be cancelled before arrival.
                </p>
              </div>

              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </>
      )}

      {/* Cancel Order Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900">Cancel Order #{id}</h3>
              <button onClick={() => setIsCancelModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Please select a reason for cancellation. Once cancelled, an automated refund will be initiated immediately to your original payment mode.
            </p>

            <div className="space-y-2 text-xs">
              {[
                'Ordered by mistake / duplicate order',
                'Delivery time is taking longer than expected',
                'Need to change delivery address or items',
                'Emergency / Not available at doorstep',
              ].map((reason) => (
                <label key={reason} className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="reason"
                    checked={cancelReason === reason}
                    onChange={() => setCancelReason(reason)}
                    className="accent-[#FF6B00]"
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className="flex-1 py-2.5 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
