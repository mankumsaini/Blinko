import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBasket,
  UtensilsCrossed,
  Package,
  Zap,
  ArrowRight,
  ShieldCheck,
  Star,
  Tag,
  Clock,
  Sparkles,
  ChevronRight,
  ThumbsUp,
  Percent
} from 'lucide-react';
import type { Product, Restaurant } from '../types';
import { api } from '../services/api';
import ProductCard from '../components/common/ProductCard';
import RestaurantCard from '../components/common/RestaurantCard';

export default function HomePage() {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [topRestaurants, setTopRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, restaurants] = await Promise.all([
          api.getProducts({ type: 'grocery' }),
          api.getRestaurants(),
        ]);
        setPopularProducts(products.slice(0, 8));
        setTopRestaurants(restaurants.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const serviceCategories = [
    {
      id: 'daily',
      title: 'Blinko Daily',
      subtitle: 'Grocery & Fresh Produce',
      delivery: '10 Mins',
      desc: 'Farm-fresh veggies, dairy, morning bakery, snacks, and pulses.',
      icon: ShoppingBasket,
      link: '/daily',
      color: 'from-emerald-500 to-teal-600',
      tagColor: 'bg-emerald-100 text-emerald-800',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    },
    {
      id: 'eats',
      title: 'Blinko Eats',
      subtitle: 'Food Delivery',
      delivery: '30 Mins',
      desc: 'Piping-hot meals from top local restaurants, biryani, pizzas, and desserts.',
      icon: UtensilsCrossed,
      link: '/eats',
      color: 'from-orange-500 to-amber-600',
      tagColor: 'bg-orange-100 text-orange-800',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    },
    {
      id: 'essentials',
      title: 'Blinko Essentials',
      subtitle: 'Household & Home Care',
      delivery: '15 Mins',
      desc: 'Cleaning supplies, kitchen utilities, stationery, and personal hygiene.',
      icon: Package,
      link: '/essentials',
      color: 'from-blue-600 to-indigo-700',
      tagColor: 'bg-blue-100 text-blue-800',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80',
    },
  ];

  const groceryCategories = [
    { name: 'Fruits & Veg', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200', count: '12 Items' },
    { name: 'Dairy & Bakery', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200', count: '8 Items' },
    { name: 'Snacks & Drinks', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200', count: '10 Items' },
    { name: 'Rice & Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200', count: '6 Items' },
    { name: 'Personal Care', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200', count: '6 Items' },
    { name: 'Breakfast & Frozen', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200', count: '8 Items' },
  ];

  const testimonials = [
    {
      name: 'Rohan Mehra',
      city: 'Bangalore (Indiranagar)',
      rating: 5,
      comment: 'Blinko Daily is unbelievable. I ordered tomatoes, coriander, and bread while making tea, and the doorbell rang in 9 minutes flat!',
      date: '2 days ago',
    },
    {
      name: 'Ananya Deshmukh',
      city: 'Mumbai (Bandra)',
      rating: 5,
      comment: 'The Blinko Eats food delivery keeps meals genuinely hot with insulated bags. SupportRoot AI resolved a missing dessert instantly with zero hassle.',
      date: '1 week ago',
    },
    {
      name: 'Vikram Joshi',
      city: 'Delhi-NCR (Gurgaon)',
      rating: 5,
      comment: 'Wholesale pricing on Blinko Essentials for household detergents and kitchenware delivered on the same morning. A true commercial-grade app!',
      date: '3 days ago',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#0F1B2D] via-[#162740] to-[#0A1320] text-white overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF6B00_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Everything you need, delivered with ease</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Groceries & Hot Meals Delivered in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-amber-400 to-orange-300">10 Minutes</span>.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
              Experience India’s fastest quick-commerce platform. Farm-fresh groceries from local dark stores, mouth-watering restaurant dishes, and household essentials at your door.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/daily"
                className="px-6 py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74500] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2"
              >
                <ShoppingBasket className="w-4 h-4" />
                <span>Shop Blinko Daily</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/eats"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4 text-orange-400" />
                <span>Order Food (Blinko Eats)</span>
              </Link>
            </div>

            {/* Micro badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800/80 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF6B00]" />
                <span>10-min speed</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Freshness</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>6 AM - 2 AM</span>
              </div>
            </div>
          </div>

          {/* Promotional Deal Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 p-5 rounded-2xl backdrop-blur-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-[#FF6B00] text-white px-2 py-0.5 rounded-full">
                  FLAT 50% OFF
                </span>
                <h3 className="text-lg font-black text-white mt-2">Welcome Offer</h3>
                <p className="text-xs text-gray-300 mt-1">Use coupon <strong>BLINKO50</strong> on your first grocery basket.</p>
              </div>
              <Link to="/daily" className="mt-4 text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1">
                Claim Offer <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 p-5 rounded-2xl backdrop-blur-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  FREE DELIVERY
                </span>
                <h3 className="text-lg font-black text-white mt-2">No Delivery Fee</h3>
                <p className="text-xs text-gray-300 mt-1">On all grocery & essentials orders above ₹199.</p>
              </div>
              <Link to="/daily" className="mt-4 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                Shop Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Pillars (Daily, Eats, Essentials) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Explore Blinko Services
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Three dedicated vertical stores engineered for speed, quality, and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceCategories.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => navigate(service.link)}
                className="group relative bg-white rounded-3xl border border-gray-200/80 hover:border-orange-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Cover */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-gray-900 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#FF6B00]" />
                    {service.delivery}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-black leading-tight flex items-center justify-between">
                      <span>{service.title}</span>
                      <Icon className="w-6 h-6 text-orange-400" />
                    </h3>
                    <p className="text-xs text-gray-300 mt-0.5">{service.subtitle}</p>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#FF6B00] group-hover:underline flex items-center gap-1">
                      Enter Store <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Explore Catalog
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Best-Selling Grocery Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              Popular Grocery Categories
            </h2>
            <p className="text-xs text-gray-500">Farm fresh daily staples at your fingertips</p>
          </div>
          <Link
            to="/daily"
            className="text-xs font-bold text-[#FF6B00] hover:text-[#E05300] flex items-center gap-1"
          >
            View All Categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {groceryCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/daily?category=${encodeURIComponent(cat.name)}`)}
              className="group bg-white p-4 rounded-2xl border border-gray-200/80 hover:border-orange-200 hover:shadow-lg transition-all text-center cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-50 mb-2 p-1 border border-gray-100 group-hover:scale-105 transition-transform">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                {cat.name}
              </h4>
              <span className="text-[10px] text-gray-400 mt-0.5">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Grocery Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]"></span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Trending on Blinko Daily
              </h2>
            </div>
            <p className="text-xs text-gray-500">Delivered straight to your kitchen in 10 minutes</p>
          </div>
          <Link
            to="/daily"
            className="text-xs font-bold text-[#FF6B00] hover:text-[#E05300] flex items-center gap-1"
          >
            Explore All 50+ Groceries <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularProducts.map((p) => (
              <ProductCard key={p.id} product={p} itemType="grocery" />
            ))}
          </div>
        )}
      </section>

      {/* Promotional Banner: Food Delivery (Blinko Eats) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-[#FF6B00] to-orange-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Blinko Eats Special
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Craving Biryani, Gourmet Pizza, or Freshly Baked Desserts?
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
              Order from over 15 handpicked partner restaurants. Hot meals delivered in thermal temperature-controlled packaging within 30 minutes.
            </p>
            <div className="pt-2">
              <Link
                to="/eats"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F1B2D] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-colors"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Explore Restaurants & Menus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top-Rated Restaurants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Top-Rated Restaurants on Blinko Eats
              </h2>
            </div>
            <p className="text-xs text-gray-500">Curated master kitchens with top food safety ratings</p>
          </div>
          <Link
            to="/eats"
            className="text-xs font-bold text-[#FF6B00] hover:text-[#E05300] flex items-center gap-1"
          >
            View All 15 Restaurants <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </section>

      {/* Customer Testimonials */}
      <section className="bg-gray-100/70 py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-black text-gray-900">Loved by Thousands Daily</h2>
            <p className="text-xs text-gray-500 mt-1">See what our customers say about Blinko’s 10-minute speed and quality</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-gray-900">{t.name}</h5>
                    <p className="text-[11px] text-gray-400">{t.city}</p>
                  </div>
                  <span className="text-[10px] text-gray-400">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
