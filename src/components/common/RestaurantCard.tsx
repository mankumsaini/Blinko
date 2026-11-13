import { useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Bike } from 'lucide-react';
import type { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="group bg-white rounded-2xl border border-gray-200/80 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Restaurant Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {restaurant.promoted && (
          <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Promoted
          </span>
        )}

        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-gray-900 flex items-center gap-1 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>{restaurant.deliveryTime}</span>
        </div>

        <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
          <span>{restaurant.rating}</span>
          <Star className="w-3 h-3 fill-white" />
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#FF6B00] transition-colors line-clamp-1">
              {restaurant.name}
            </h4>
          </div>

          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{restaurant.cuisine}</p>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1">
            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="truncate">{restaurant.address}</span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1 text-gray-500">
            <Bike className="w-3.5 h-3.5 text-gray-400" />
            {restaurant.deliveryFee === 0 ? (
              <strong className="text-emerald-600 font-bold">FREE Delivery</strong>
            ) : (
              `₹${restaurant.deliveryFee} Delivery`
            )}
          </span>
          <span className="text-gray-400">Min. ₹{restaurant.minOrder}</span>
        </div>
      </div>
    </div>
  );
}
