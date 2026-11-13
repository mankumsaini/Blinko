import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Clock,
  MapPin,
  Bike,
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import type { Restaurant, FoodItem } from '../types';
import { api } from '../services/api';
import { useCart } from '../store/CartContext';

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { items, addToCart, updateQuantity, total, itemCount } = useCart();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await api.getRestaurantById(id);
        if (data) {
          setRestaurant(data.restaurant);
          setMenu(data.menu);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-4">
        <div className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
        <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">Restaurant Not Found</h2>
        <Link to="/eats" className="mt-4 inline-block px-4 py-2 bg-[#FF6B00] text-white rounded-xl text-xs font-bold">
          Back to Blinko Eats
        </Link>
      </div>
    );
  }

  // Get distinct categories from menu
  const menuCategories = ['All', ...Array.from(new Set(menu.map((m) => m.category)))];

  const filteredMenu = menu.filter((item) => {
    if (vegOnly && !item.isVeg) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28">
      {/* Back button */}
      <Link
        to="/eats"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#FF6B00] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all restaurants</span>
      </Link>

      {/* Restaurant Header Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm">
        <div className="relative h-48 sm:h-64 w-full">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#FF6B00] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Verified Partner
                </span>
                <span className="text-xs text-gray-200">{restaurant.cuisine}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">{restaurant.name}</h1>
              <p className="text-xs text-gray-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{restaurant.address}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
              <div className="text-center px-2 border-r border-white/20">
                <div className="flex items-center justify-center gap-1 text-emerald-400 font-black text-sm">
                  <span>{restaurant.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-emerald-400" />
                </div>
                <span className="text-[10px] text-gray-300 block">{restaurant.reviewCount}+ reviews</span>
              </div>
              <div className="text-center px-2 border-r border-white/20">
                <div className="text-sm font-black flex items-center justify-center gap-1 text-orange-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <span className="text-[10px] text-gray-300 block">Est. Time</span>
              </div>
              <div className="text-center px-2">
                <div className="text-sm font-black text-emerald-400">
                  {restaurant.deliveryFee === 0 ? 'FREE' : `₹${restaurant.deliveryFee}`}
                </div>
                <span className="text-[10px] text-gray-300 block">Delivery Fee</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-gray-50/50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <p className="text-gray-600 max-w-xl">{restaurant.description}</p>
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>FSSAI Certified Hygiene Safe Kitchen</span>
          </div>
        </div>
      </div>

      {/* Menu Filter Tabs & Veg/Non-Veg Switcher */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0F1B2D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Veg-only toggle */}
        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-colors ${
            vegOnly
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="w-3 h-3 rounded-full border-2 border-emerald-600 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
          </span>
          <span>Pure Veg Only</span>
        </button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMenu.map((dish) => {
          const inCart = items.find((i) => i.product.id === dish.id);
          const quantity = inCart?.quantity || 0;

          return (
            <div
              key={dish.id}
              className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs flex justify-between gap-4 hover:border-orange-200 transition-all"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  {/* Veg / Non-veg square badge */}
                  <div
                    className={`w-3.5 h-3.5 rounded-xs border-2 flex items-center justify-center shrink-0 ${
                      dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    ></div>
                  </div>

                  {dish.popular && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded">
                      BESTSELLER
                    </span>
                  )}

                  <span className="text-[11px] text-gray-400 capitalize">{dish.category}</span>
                </div>

                <h4 className="font-bold text-sm text-gray-900">{dish.name}</h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-black text-[#0F1B2D]">₹{dish.price}</span>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[11px]">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{dish.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Dish Image & Add Stepper */}
              <div className="relative w-28 h-28 shrink-0 flex flex-col items-center">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover rounded-xl border border-gray-100"
                />

                <div className="absolute -bottom-2">
                  {quantity === 0 ? (
                    <button
                      onClick={() => addToCart(dish, 'food')}
                      className="px-4 py-1 bg-white border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-lg font-bold text-xs shadow-md transition-all flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD</span>
                    </button>
                  ) : (
                    <div className="flex items-center bg-[#FF6B00] text-white rounded-lg px-1 py-0.5 shadow-md">
                      <button
                        onClick={() => updateQuantity(dish.id, quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-black/10 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-black">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(dish.id, quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-black/10 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar if items are added */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 animate-in slide-in-from-bottom duration-300">
          <Link
            to="/checkout"
            className="w-full bg-[#0F1B2D] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-gray-700 hover:bg-black transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{itemCount} items in basket</p>
                <p className="text-sm font-black text-[#FF6B00] leading-tight">₹{total}</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-[#FF6B00] px-3.5 py-1.5 rounded-xl text-white">
              View Cart →
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
