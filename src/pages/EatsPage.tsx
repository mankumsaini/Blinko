import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  UtensilsCrossed,
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  Clock,
  Sparkles,
  X
} from 'lucide-react';
import type { Restaurant } from '../types';
import { api } from '../services/api';
import RestaurantCard from '../components/common/RestaurantCard';

const CUISINES = [
  'All',
  'North Indian',
  'South Indian',
  'Chinese',
  'Pizza',
  'Burgers',
  'Desserts',
  'Beverages',
  'Fast Food',
];

export default function EatsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const cuisineParam = searchParams.get('cuisine') || 'All';
  const searchParam = searchParams.get('search') || '';

  const [selectedCuisine, setSelectedCuisine] = useState(cuisineParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState<'rating' | 'delivery-time' | 'min-order'>('rating');
  const [promotedOnly, setPromotedOnly] = useState(false);

  useEffect(() => {
    setSelectedCuisine(searchParams.get('cuisine') || 'All');
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const data = await api.getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    let result = [...restaurants];

    // Cuisine filter
    if (selectedCuisine !== 'All') {
      result = result.filter(
        (r) =>
          r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase()) ||
          r.tags.some((t) => t.toLowerCase().includes(selectedCuisine.toLowerCase()))
      );
    }

    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      );
    }

    // Promoted only
    if (promotedOnly) {
      result = result.filter((r) => r.promoted);
    }

    // Sorting
    if (sortBy === 'delivery-time') {
      result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    } else if (sortBy === 'min-order') {
      result.sort((a, b) => a.minOrder - b.minOrder);
    } else {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredRestaurants(result);
  }, [restaurants, selectedCuisine, searchTerm, sortBy, promotedOnly]);

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    const newParams = new URLSearchParams(searchParams);
    if (cuisine === 'All') {
      newParams.delete('cuisine');
    } else {
      newParams.set('cuisine', cuisine);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-[#0F1B2D] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-300" />
            <span>Piping Hot Food Delivery</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Blinko Eats – Top Local Kitchens
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 max-w-lg leading-relaxed">
            Order authentic North Indian curries, crispy South Indian dosas, gourmet woodfired pizzas, and decadent desserts delivered in insulated thermal packs.
          </p>
        </div>
      </div>

      {/* Cuisines Horizontal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CUISINES.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => handleCuisineChange(cuisine)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCuisine === cuisine
                ? 'bg-[#FF6B00] text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200/80 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search restaurants, dishes (e.g. Biryani, Pizza)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#FF6B00] outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-3 text-xs">
          <button
            onClick={() => setPromotedOnly(!promotedOnly)}
            className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 font-bold transition-colors ${
              promotedOnly
                ? 'bg-orange-50 border-orange-300 text-[#FF6B00]'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Featured Kitchens</span>
          </button>

          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-gray-700 outline-none cursor-pointer"
            >
              <option value="rating">Highest Rated (4.5+)</option>
              <option value="delivery-time">Fastest Delivery</option>
              <option value="min-order">Low Min. Order</option>
            </select>
          </div>
        </div>
      </div>

      {/* Restaurants List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredRestaurants.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF6B00] flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-gray-800">No Restaurants Found</h3>
          <p className="text-xs text-gray-500">
            We couldn't find any partner kitchens matching your filters.
          </p>
          <button
            onClick={() => {
              setSelectedCuisine('All');
              setSearchTerm('');
              setPromotedOnly(false);
              setSearchParams(new URLSearchParams());
            }}
            className="mt-3 px-4 py-2 bg-[#FF6B00] text-white text-xs font-bold rounded-xl hover:bg-[#E05300] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Showing {filteredRestaurants.length} restaurants</span>
            <span className="font-semibold text-[#FF6B00]">🔥 Insulated Thermal Bag Delivery</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
