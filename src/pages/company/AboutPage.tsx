import { Sparkles, Shield, Rocket, Heart, Award, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    {
      year: '2021',
      title: 'Company Founding & 1st Dark Store Launch',
      desc: 'Blinko was founded in Bangalore with an audacious vision: delivering daily essentials faster than a walk to the corner store. Our first 2,500 sq.ft micro-warehouse opened in Indiranagar, clocking an average 12-minute dispatch.',
    },
    {
      year: '2022',
      title: 'Expansion into 3 Metros & Cold-Chain Technology',
      desc: 'Expanded operations to Mumbai and Delhi-NCR. Deployed sub-4°C cold-chain infrastructure directly partnering with 180+ organic farm clusters across Karnataka and Maharashtra.',
    },
    {
      year: '2023',
      title: 'Launch of Blinko Eats (Hot Meals Delivery)',
      desc: 'Introduced thermal-insulated food delivery partnering with curated master restaurants, offering 30-minute gourmet lunches and dinners without compromising temperature or crispiness.',
    },
    {
      year: '2024',
      title: 'Blinko Essentials Household Line',
      desc: 'Broadened catalog from fresh grocery to home utilities, cleaning detergents, stationery, and kitchenware at direct-to-consumer wholesale prices.',
    },
    {
      year: '2025',
      title: 'Smart Automation & 65% Electric EV Fleet',
      desc: 'Automated dark store micro-picking system reduced packing duration down to 85 seconds. Transitioned the majority of the delivery fleet to zero-emission electric two-wheelers.',
    },
    {
      year: '2026',
      title: 'SupportRoot AI Integration & National Network',
      desc: 'Integrated SupportRoot AI customer intelligence across 250+ fulfillment centers, enabling instantaneous natural language tracking, automated instant refunds, and 24/7 self-service.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Everything You Need, Delivered With Ease
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          About Blinko Technologies
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Blinko is a pioneer in ultra-fast commerce. We connect local farms, top culinary kitchens, and household manufacturers directly to consumers through an intelligent network of neighborhood dark stores.
        </p>
      </div>

      {/* Demonstration notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Demonstration Sample Data Notice:</p>
          <p className="text-amber-800 leading-relaxed">
            All company history, corporate figures, customer reviews, operational metrics, and milestones between 2021 and 2026 are fictional demonstration data created specifically for this quick-commerce showcase.
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center font-bold">
            <Rocket className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-gray-900">Unmatched Speed</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every second counts. From dark store pick-to-pack in under 90 seconds to dense neighborhood routing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-gray-900">Farm Fresh Guarantee</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Harvested daily at 2:00 AM, triple ozone sanitized, and delivered before breakfast with zero preservatives.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-gray-900">Customer Centricity</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Instant no-questions-asked refunds and 24/7 intelligent resolution powered by SupportRoot AI.
          </p>
        </div>
      </div>

      {/* Historical Milestones 2021-2026 */}
      <div id="story" className="space-y-6 pt-6 border-t border-gray-200">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900">Our Journey (2021 – 2026)</h2>
          <p className="text-xs text-gray-500 mt-1">From a local garage in Bangalore to India’s trusted fast-commerce app</p>
        </div>

        <div className="relative border-l-2 border-[#FF6B00]/30 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative group">
              {/* Year badge */}
              <div className="absolute -left-[35px] sm:-left-[125px] top-0 bg-[#0F1B2D] text-white font-black text-xs px-2.5 py-1 rounded-lg border border-gray-700 shadow-sm">
                {m.year}
              </div>

              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-3.5 h-3.5 rounded-full bg-[#FF6B00] border-4 border-white shadow-xs"></div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-1 group-hover:border-orange-200 transition-colors">
                <h3 className="font-bold text-sm text-gray-900">{m.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
