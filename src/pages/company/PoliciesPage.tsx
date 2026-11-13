import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shield, FileText, RotateCcw, Truck } from 'lucide-react';

export default function PoliciesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'cancellation' | 'shipping' | 'privacy' | 'terms') || 'cancellation';
  const [activeTab, setActiveTab] = useState<'cancellation' | 'shipping' | 'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    const t = searchParams.get('tab') as any;
    if (t) setActiveTab(t);
  }, [searchParams]);

  const handleTabChange = (t: 'cancellation' | 'shipping' | 'privacy' | 'terms') => {
    setActiveTab(t);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', t);
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Blinko Policies & Legal
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Last updated: January 2026 • Transparent, customer-friendly policies.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200 gap-3 overflow-x-auto text-xs font-bold scrollbar-hide">
        <button
          onClick={() => handleTabChange('cancellation')}
          className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'cancellation'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Cancellation & Refund</span>
        </button>

        <button
          onClick={() => handleTabChange('shipping')}
          className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'shipping'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Delivery</span>
        </button>

        <button
          onClick={() => handleTabChange('privacy')}
          className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'privacy'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => handleTabChange('terms')}
          className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'terms'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms & Conditions</span>
        </button>
      </div>

      {/* Content Body */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-2xs space-y-6 text-xs text-gray-600 leading-relaxed">
        {activeTab === 'cancellation' && (
          <div className="space-y-4">
            <h2 className="text-base font-black text-gray-900">Cancellation & Refund Policy</h2>
            <p>
              At Blinko, we strive to deliver the highest quality groceries and meals in record time. We understand plans change and quality issues can happen.
            </p>

            <h3 className="font-bold text-sm text-gray-800 pt-2">1. Order Cancellations</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Free Cancellation Window:</strong> You can cancel any grocery or essentials order free of charge within 60 seconds of order placement from the Live Tracking screen.</li>
              <li><strong>Packing In Progress:</strong> Once micro-warehouse packing commences, cancellation may be restricted or subject to a ₹25 restocking fee.</li>
              <li><strong>Restaurant Orders (Blinko Eats):</strong> Food preparation starts immediately upon kitchen receipt. Food orders cannot be cancelled once the kitchen accepts the ticket.</li>
            </ul>

            <h3 className="font-bold text-sm text-gray-800 pt-2">2. Returns & Freshness Guarantee</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Perishables (Fruits, Vegetables, Milk):</strong> 100% no-questions-asked refund or replacement within 24 hours of delivery if produce is bruised or spoiled.</li>
              <li><strong>Household Essentials:</strong> Unopened and intact non-perishable goods can be returned within 7 days.</li>
            </ul>

            <h3 className="font-bold text-sm text-gray-800 pt-2">3. Refund Timelines</h3>
            <p>
              Refunds processed via <strong>SupportRoot AI</strong> or Customer Support are disbursed immediately:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>UPI: Within 15 minutes to 2 hours</li>
              <li>Credit / Debit Cards: 2 to 4 business days</li>
              <li>Blinko Wallet Cash: Instant (0 seconds)</li>
            </ul>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="text-base font-black text-gray-900">Shipping & Delivery Policy</h2>
            <p>
              Blinko’s proprietary fulfillment network is engineered around proximity and density.
            </p>

            <h3 className="font-bold text-sm text-gray-800 pt-2">1. Guaranteed 10–15 Minute Delivery Zones</h3>
            <p>
              Blinko Daily groceries and Blinko Essentials are dispatched from local dark stores within a 2.5 km radius of your address. In active zones, delivery typically occurs within 10 to 15 minutes.
            </p>

            <h3 className="font-bold text-sm text-gray-800 pt-2">2. Blinko Eats Hot Meals</h3>
            <p>
              Hot food from partner restaurants has an estimated delivery window of 30 to 45 minutes, factoring in kitchen preparation time. Hot food is transported in thermal heating bags.
            </p>

            <h3 className="font-bold text-sm text-gray-800 pt-2">3. Delivery Fees</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Orders above ₹199: <strong>FREE Delivery</strong></li>
              <li>Orders below ₹199: Nominal ₹15 – ₹25 delivery charge</li>
              <li>Severe Weather / Late Night Surcharge: Transparently displayed before checkout</li>
            </ul>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-base font-black text-gray-900">Privacy Policy</h2>
            <p>
              Blinko Technologies Inc. is committed to protecting your personal data and privacy rights.
            </p>

            <h3 className="font-bold text-sm text-gray-800 pt-2">1. Information We Collect</h3>
            <p>
              We collect your name, phone number, delivery address coordinates, email, and anonymized device telemetry to facilitate fast doorstep dispatch and route optimization.
            </p>

            <h3 className="font-bold text-sm text-gray-800 pt-2">2. SupportRoot AI Data Integration</h3>
            <p>
              When you interact with our customer assistant SupportRoot AI, conversation logs and order numbers are processed securely to provide instant order lookup and automated issue resolution. We do not sell your personal chat transcripts.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-base font-black text-gray-900">Terms & Conditions of Service</h2>
            <p>
              By accessing the Blinko website or ordering through Blinko Daily, Eats, or Essentials, you agree to these Terms of Service.
            </p>

            <h3 className="font-bold text-sm text-gray-800 pt-2">1. Fictional Showcase Notice</h3>
            <p>
              Blinko is a fictional commercial demonstration application. All transactions, delivery partners, and orders placed on this platform are sample simulations for software demonstration and testing purposes.
            </p>

            <h3 className="font-bold text-sm text-gray-800 pt-2">2. User Conduct & Accuracy</h3>
            <p>
              Users agree to provide accurate delivery coordinates and contact information so that simulated or active fulfillment partners can complete deliveries safely.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
