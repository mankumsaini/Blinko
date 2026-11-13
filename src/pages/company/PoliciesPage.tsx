import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shield, FileText, RotateCcw, Truck, AlertCircle, CheckCircle2, Scale, HeartHandshake } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Badge */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF6B00] text-xs font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Commercial Regulatory & Consumer Policies</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Blinko Legal & Operational Policies
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Modeled after leading Indian quick-commerce and food delivery standards (Blinkit & Zomato). Effective Date: January 1, 2026.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-3 overflow-x-auto text-xs font-bold scrollbar-hide">
        <button
          onClick={() => handleTabChange('cancellation')}
          className={`pb-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'cancellation'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Cancellation & Refund Policy</span>
        </button>

        <button
          onClick={() => handleTabChange('shipping')}
          className={`pb-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'shipping'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping, Delivery & Partner Safety</span>
        </button>

        <button
          onClick={() => handleTabChange('terms')}
          className={`pb-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'terms'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms & Conditions of Service</span>
        </button>

        <button
          onClick={() => handleTabChange('privacy')}
          className={`pb-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'privacy'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Privacy & SupportRoot AI Data Policy</span>
        </button>
      </div>

      {/* Main Content Box */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
        {/* ============================================================== */}
        {/* TAB 1: CANCELLATION & REFUND POLICY (Blinkit + Zomato Reference) */}
        {/* ============================================================== */}
        {activeTab === 'cancellation' && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-black text-gray-900">
                Cancellation, Returns & Refund Policy
              </h2>
              <p className="text-gray-500 mt-1">
                Governing grocery purchases on Blinko Daily, household items on Blinko Essentials, and restaurant meals on Blinko Eats.
              </p>
            </div>

            {/* Quick Policy Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-2xl">
                <span className="text-[10px] font-black uppercase text-[#FF6B00] block">Groceries & Essentials</span>
                <p className="font-bold text-gray-900 mt-1">60-Second Free Cancel</p>
                <p className="text-[11px] text-gray-600 mt-0.5">Cancel freely before dark store aisle picking starts.</p>
              </div>
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl">
                <span className="text-[10px] font-black uppercase text-amber-700 block">Restaurant Food (Blinko Eats)</span>
                <p className="font-bold text-gray-900 mt-1">Zero Cancellation Once Cooking</p>
                <p className="text-[11px] text-gray-600 mt-0.5">Zomato standard: Kitchens cannot re-sell freshly cooked meals.</p>
              </div>
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                <span className="text-[10px] font-black uppercase text-emerald-700 block">Instant Automated Refunds</span>
                <p className="font-bold text-gray-900 mt-1">Instant via SupportRoot AI</p>
                <p className="text-[11px] text-gray-600 mt-0.5">Processed directly to Blinko Wallet or source UPI in minutes.</p>
              </div>
            </div>

            {/* 1. Cancellation Rules */}
            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                1. Order Cancellation Terms
              </h3>
              
              <div className="space-y-2.5">
                <p className="font-bold text-gray-800">A. Blinko Daily & Blinko Essentials (Grocery & Household)</p>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                  <li>
                    <strong>Immediate Cancellation (Within 60 Seconds):</strong> Users can cancel their order free of charge within 60 seconds of order placement directly from the Order Tracking screen or via the <strong>SupportRoot AI</strong> chatbot. 100% of the transaction amount is refunded immediately.
                  </li>
                  <li>
                    <strong>Post-60 Seconds (Picking In Progress):</strong> As our automated dark store pickers initiate item retrieval within 90 seconds, cancellation after the 60-second window is subject to a <strong>₹25 cancellation / restocking fee</strong>.
                  </li>
                  <li>
                    <strong>Dispatched Orders:</strong> Once the delivery partner has departed the micro-fulfillment center, cancellation is not permissible unless there is an extraordinary operational delay exceeding 25 minutes past the guaranteed window.
                  </li>
                </ul>

                <p className="font-bold text-gray-800 pt-2">B. Blinko Eats (Prepared Restaurant Orders)</p>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                  <li>
                    <strong>Restaurant Food Non-Cancellation Policy:</strong> As per standard food industry norms (reference: Zomato Terms of Service), once a merchant restaurant accepts an order and commences food preparation, cancellations are strictly prohibited and non-refundable, as freshly prepared perishable food cannot be restocked or reused.
                  </li>
                  <li>
                    <strong>Exceptions for 100% Food Order Cancellation:</strong>
                    <ul className="list-circle pl-5 mt-1 space-y-1 text-gray-600">
                      <li>The partner restaurant communicates an inability to fulfill an ordered dish due to ingredient stock-out.</li>
                      <li>Delivery partner has not been assigned for over 30 minutes.</li>
                      <li>Total delivery time exceeds 60 minutes from order placement without prior customer intimation.</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Returns & Freshness Guarantee */}
            <div className="space-y-3 pt-2">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                2. Freshness Guarantee & Damaged Item Claims
              </h3>
              <p>
                Blinko operates a <strong>"No Questions Asked Freshness Guarantee"</strong> modeled after Blinkit’s consumer quality commitment:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li>
                  <strong>Fruits, Vegetables & Perishable Dairy:</strong> If any fruit, vegetable, dairy pouch, or bakery product is bruised, spoiled, or past optimal freshness, customers can raise a claim within <strong>24 hours of delivery</strong>. Uploading a photograph via the Help Center or SupportRoot AI initiates an instant full refund or replacement item credit.
                </li>
                <li>
                  <strong>Missing or Wrong Items:</strong> If any item is missing from a sealed tamper-evident bag, a pro-rata instant refund for that specific item is credited within 5 minutes.
                </li>
                <li>
                  <strong>Household Essentials & Utilities:</strong> Non-perishable goods (kitchenware, organizers, stationery) may be returned within <strong>7 days</strong> provided they remain unused with intact original packaging and barcodes.
                </li>
              </ul>
            </div>

            {/* 3. Refund Timelines & Settlement Modes */}
            <div className="space-y-3 pt-2">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                3. Refund Disbursement Timelines (RBI & Banking Standards)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-[10px]">
                    <tr>
                      <th className="p-3 font-bold">Payment Method</th>
                      <th className="p-3 font-bold">Settlement Channel</th>
                      <th className="p-3 font-bold">Turnaround Time (TAT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr>
                      <td className="p-3 font-bold">Blinko Wallet / Store Credit</td>
                      <td className="p-3">Automated SupportRoot AI Credit</td>
                      <td className="p-3 font-bold text-emerald-600">Instant (0 Seconds)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">UPI (GPay / PhonePe / Paytm / CRED)</td>
                      <td className="p-3">Direct NPCI VPA Transfer</td>
                      <td className="p-3 font-bold text-emerald-600">15 Minutes to 2 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Credit & Debit Cards</td>
                      <td className="p-3">Acquiring Bank Reversal</td>
                      <td className="p-3">5 to 7 Business Banking Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Net Banking</td>
                      <td className="p-3">Core Banking NEFT/IMPS</td>
                      <td className="p-3">3 to 5 Working Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Cash on Delivery (COD)</td>
                      <td className="p-3">Blinko Wallet or Verified UPI VPA</td>
                      <td className="p-3">Instant to Wallet or 2 Hours to UPI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Fraud Prevention & Abuse */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-gray-600 space-y-1">
              <h4 className="font-bold text-gray-900">4. Return Abuse & Anti-Fraud Safeguard</h4>
              <p>
                To protect our delivery partners and local suppliers, Blinko tracks account return frequencies using algorithmic fraud detection. Accounts demonstrating persistent fraudulent claims (e.g. claiming missing items on over 40% of delivered orders) will be flagged for mandatory physical inspection by our audit team, and cash refund privileges may be suspended.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: SHIPPING, DELIVERY & PARTNER SAFETY (Blinkit Standard)  */}
        {/* ============================================================== */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-black text-gray-900">
                Shipping, Delivery & Partner Protection Policy
              </h2>
              <p className="text-gray-500 mt-1">
                How Blinko delivers in 10–15 minutes safely without compromising delivery partner welfare.
              </p>
            </div>

            {/* Partner Safety Pledge Banner */}
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex items-start gap-3.5">
              <HeartHandshake className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-950 text-sm">Our Rider Welfare Pledge: Proximity Over Speed</h4>
                <p className="text-blue-900/90 mt-1 leading-relaxed">
                  Blinko strictly adheres to ethical gig-worker safety principles. <strong>Delivery partners are NEVER penalized, fined, or evaluated based on delivery speed.</strong> Our 10-minute speed is achieved solely through physical dark store density (every 2–3 km) and 90-second automated warehouse picking, never by unsafe road driving.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                1. Delivery Zones & Fulfillment Network
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li>
                  <strong>Micro-Fulfillment Centers (Dark Stores):</strong> Blinko Daily and Essentials operate out of hyper-local, climate-controlled hubs strategically situated within a 2.5 km radius of active urban clusters in Bangalore, Mumbai, Delhi-NCR, Hyderabad, and Pune.
                </li>
                <li>
                  <strong>Blinko Eats Kitchens:</strong> Partner restaurants prepare meals upon order dispatch. Expected delivery times range from <strong>25 to 45 minutes</strong> depending on kitchen cooking complexity.
                </li>
                <li>
                  <strong>Serviceable Pincodes:</strong> Delivery is restricted to verified delivery polygons. If an address is outside current dark store boundaries, the app transparently marks the basket as unserviceable.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                2. Temperature Controlled Cold-Chain & Thermal Bags
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li>
                  <strong>Chilled Groceries & Ice Creams:</strong> Ice creams, dairy, and frozen meats are transferred into insulated secondary freezer bags with dry gel cooling pads, guaranteeing delivery at under 4°C.
                </li>
                <li>
                  <strong>Hot Restaurant Meals:</strong> All Blinko Eats couriers carry thermal insulated boxes equipped with heating retention fabric, ensuring your curries, pizzas, and biryanis arrive steam-hot (&gt;65°C).
                </li>
                <li>
                  <strong>Tamper-Evident Seals:</strong> Every bag is sealed with a single-use holographic security sticker. If the seal appears severed or broken upon arrival, customers are advised to reject the package and report via SupportRoot AI for immediate re-dispatch.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                3. Delivery Charges, Surge & Weather Surcharges
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li>
                  <strong>Free Delivery Threshold:</strong> Orders with a product value of <strong>₹199 and above</strong> qualify for 100% Free Delivery.
                </li>
                <li>
                  <strong>Standard Delivery Fee:</strong> For baskets under ₹199, a nominal delivery fee of <strong>₹15 to ₹25</strong> is applied to cover delivery partner logistics.
                </li>
                <li>
                  <strong>Severe Weather & Rain Surge:</strong> During extreme monsoon downpours or public emergencies, a transparent surcharge of ₹10–₹20 may be added, 100% of which is directly remitted to the active delivery partner for hazardous weather compensation.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: TERMS & CONDITIONS (Zomato / Blinkit Standard)          */}
        {/* ============================================================== */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-black text-gray-900">
                Terms and Conditions of Service
              </h2>
              <p className="text-gray-500 mt-1">
                Legal terms governing platform usage, account security, marketplace liability, and consumer conduct.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                1. Platform Overview & Contractual Relationship
              </h3>
              <p>
                Blinko Technologies Inc. ("Blinko", "Company", "We", "Us") operates an electronic commerce and food delivery platform consisting of:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Direct micro-fulfillment inventory commerce (<strong>Blinko Daily & Essentials</strong>).</li>
                <li>A three-sided marketplace connecting end-users, independent third-party restaurant partners, and independent logistics partners (<strong>Blinko Eats</strong>).</li>
              </ul>
              <p className="text-gray-600">
                By browsing, registering, or transacting on the Blinko website, you irrevocably agree to comply with and be bound by these Terms.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                2. User Eligibility & Account Security
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li>Users must be at least 18 years of age to establish an account or place orders.</li>
                <li>You agree to provide true, accurate, and complete registration details. You are solely responsible for maintaining the confidentiality of OTPs and session tokens.</li>
                <li>One person may not register or maintain multiple accounts for promotional coupon abuse. Blinko reserves the right to terminate accounts exploiting introductory referral vouchers.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                3. Restaurant Food Quality & Food Safety Disclaimers (FSSAI)
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li>
                  <strong>Merchant Liability:</strong> Partner restaurants listed on Blinko Eats represent that they possess valid and subsisting licenses under the Food Safety and Standards Authority of India (FSSAI).
                </li>
                <li>
                  <strong>Allergen & Dietary Notices:</strong> While Blinko displays Veg, Non-Veg, and allergen tags as provided by merchant menus, customers with severe allergies (e.g. peanuts, gluten, shellfish) are advised to communicate directly through the cooking instructions field or verify with restaurant representatives. Blinko disclaims liability for inadvertent cross-contamination in partner kitchens.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                4. Zero Tolerance Partner Harassment Policy
              </h3>
              <p>
                Blinko maintains an unconditional zero-tolerance policy regarding abusive, discriminatory, or aggressive behavior toward delivery partners or customer support representatives. Any physical harassment, abusive language, or deliberate withholding of delivery partners at residential gates will result in instantaneous blacklisting and referral to local law enforcement authorities.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                5. Demonstration Data Notice
              </h3>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                <strong>Showcase & Testing Notice:</strong> Blinko is a fictional commercial demonstration application. All transactions, delivery partners, and orders placed on this platform are sample simulations for software demonstration and testing purposes.
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: PRIVACY POLICY & SUPPORTROOT AI DATA GOVERNANCE         */}
        {/* ============================================================== */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-black text-gray-900">
                Privacy Policy & SupportRoot AI Governance
              </h2>
              <p className="text-gray-500 mt-1">
                Compliant with the Digital Personal Data Protection (DPDP) Act and international data privacy regulations.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                1. Information We Collect
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li><strong>Identity & Contact:</strong> Full name, verified mobile phone number, email address.</li>
                <li><strong>Geolocation & Spatial Data:</strong> Precise GPS coordinates, delivery address pincodes, floor/apartment details to guide doorstep navigation.</li>
                <li><strong>Transaction Records:</strong> Order IDs, items purchased, payment mode metadata (we never store card CVVs or net-banking passwords).</li>
              </ul>
            </div>

            {/* Special Section: SupportRoot AI Integration Privacy */}
            <div className="p-5 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2 text-orange-950 font-black text-sm">
                <Shield className="w-5 h-5 text-[#FF6B00]" />
                <span>SupportRoot AI Customer Support Integration Privacy</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Blinko integrates an external automated customer intelligence platform, <strong>SupportRoot AI</strong>, to provide 24/7 self-service order tracking, instant refund calculations, and natural language query assistance:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>
                  <strong>Contextual Data Handoff:</strong> When initiating a conversation with SupportRoot AI, the widget accesses active order identifiers (`BLK-XXXXXX`), customer first name, and delivery status to provide instant resolution without requiring repetitive explanations.
                </li>
                <li>
                  <strong>Chat Transcript Processing:</strong> Conversation transcripts are processed strictly for resolving the current customer inquiry, computing automated refund eligibility, and fine-tuning customer experience models.
                </li>
                <li>
                  <strong>No Data Monetization:</strong> Neither Blinko nor SupportRoot AI sells, rents, or distributes customer transcripts, contact numbers, or purchasing profiles to third-party ad brokers.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                2. User Rights & Data Deletion
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Under the Indian DPDP Act, customers have the right to review their personal information, revoke marketing consent, or request complete account erasure by contacting <strong>privacy@blinko.demo</strong> or submitting a data deletion ticket via the Help Center.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
