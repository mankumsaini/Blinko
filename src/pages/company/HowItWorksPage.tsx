import { Zap, Clock, PackageCheck, Bike, ShieldCheck, MapPin } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Order Placed & Smart Dark Store Routing',
      desc: 'The moment you tap "Place Order", Blinko’s dispatch engine geo-locates the nearest micro-fulfillment center (within a 2.5 km radius) and syncs inventory in real time.',
      icon: Clock,
    },
    {
      num: '02',
      title: '90-Second Guided Pick & Pack',
      desc: 'Store pickers follow optimized aisle routes on handheld terminals. Perishables are triple quality-checked, cold items are retrieved from chilled lockers, and bags are barcode sealed.',
      icon: PackageCheck,
    },
    {
      num: '03',
      title: 'Electric Fleet Dispatch',
      desc: 'A dedicated rider on an electric two-wheeler is already waiting at the dispatch bay before packing completes. Bags are scanned and placed into insulated thermal carriers.',
      icon: Bike,
    },
    {
      num: '04',
      title: 'Doorstep Delivery in 10-15 Minutes',
      desc: 'Our algorithms avoid traffic congestion, delivering straight to your apartment or door with zero contact and full OTP verification.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          The Magic Behind 10 Minutes
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          How Blinko Works
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          How we deliver groceries faster than boiling an egg: A deep dive into micro-warehouses, predictive inventory, and dense neighborhood routing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3 relative overflow-hidden"
            >
              <span className="text-4xl font-black text-gray-100 absolute top-4 right-6 select-none">
                {s.num}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Safety & Environment Banner */}
      <div className="bg-[#0F1B2D] text-white p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4 text-[#FF6B00]" />
          <span>Rider Safety First</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black">
          Speed Comes From Proximity, Never Fast Driving.
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
          At Blinko, 10-minute delivery is achieved by having hyper-dense micro-warehouses every 2–3 kilometers, not by having delivery partners speed on roads. Our delivery riders are never penalized for traffic or weather delays.
        </p>
      </div>
    </div>
  );
}
