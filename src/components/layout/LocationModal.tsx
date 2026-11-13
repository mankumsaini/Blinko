import { useState } from 'react';
import { MapPin, X, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

const CITIES = [
  { city: 'Bangalore', area: 'Indiranagar, 100ft Road', pincode: '560038', time: '10 mins' },
  { city: 'Bangalore', area: 'Bellandur, Outer Ring Road', pincode: '560103', time: '12 mins' },
  { city: 'Bangalore', area: 'Koramangala, 4th Block', pincode: '560034', time: '9 mins' },
  { city: 'Mumbai', area: 'Bandra West, Hill Road', pincode: '400050', time: '14 mins' },
  { city: 'Mumbai', area: 'Andheri East, Chakala', pincode: '400093', time: '11 mins' },
  { city: 'Delhi-NCR', area: 'Cyber City, Gurgaon', pincode: '122002', time: '12 mins' },
  { city: 'Hyderabad', area: 'Hitec City, Madhapur', pincode: '500081', time: '10 mins' },
  { city: 'Pune', area: 'Koregaon Park, Lane 7', pincode: '411001', time: '13 mins' },
];

export default function LocationModal({ isOpen, onClose, currentLocation, onSelectLocation }: LocationModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.pincode.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#0F1B2D] text-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FF6B00]" />
            <h3 className="font-bold text-base">Select Delivery Location</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search area, city or pincode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#FF6B00] outline-none"
              autoFocus
            />
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          </div>

          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Available 10-Minute Dark Store Zones
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
            {filtered.map((item, idx) => {
              const fullLabel = `${item.area}, ${item.city} - ${item.pincode}`;
              const isSelected = currentLocation.includes(item.area);

              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectLocation(fullLabel);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#FF6B00] bg-orange-50/60 text-[#0F1B2D]'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#FF6B00]' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-semibold text-xs text-gray-900">{item.area}</p>
                      <p className="text-[11px] text-gray-500">{item.city} • Pincode {item.pincode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ⚡ {item.time}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#FF6B00]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
