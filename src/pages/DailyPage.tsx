import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ShoppingBasket,
  Search,
  Filter,
  Sparkles,
  SlidersHorizontal,
  Heart,
  CheckCircle2,
  X
} from 'lucide-react';
import type { Product } from '../types';
import { api } from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { useWishlist } from '../store/WishlistContext';

const CATEGORIES = [
  'All',
  'Fruits & Vegetables',
  'Dairy & Bakery',
  'Snacks & Beverages',
  'Rice & Grains',
  'Personal Care',
  'Frozen Foods',
  'Breakfast Items',
];

export default function DailyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items: wishlistItems } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  const wishlistOnly = searchParams.get('wishlist') === 'true';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [onlyInStock, setOnlyInStock] = useState(false);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All');
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchGroceries = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts({ type: 'grocery' });
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroceries();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Wishlist filter
    if (wishlistOnly) {
      const ids = new Set(wishlistItems.map((w) => w.id));
      result = result.filter((p) => ids.has(p.id));
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Stock filter
    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortBy, onlyInStock, wishlistOnly, wishlistItems]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-[#0F1B2D] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider">
            <ShoppingBasket className="w-3.5 h-3.5 text-orange-300" />
            <span>10-Minute Grocery Delivery</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Blinko Daily – Fresh Groceries & Staples
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-lg leading-relaxed">
            Farm-procured vegetables, dairy, pulses, and pantry essentials picked and packed within 2 minutes and delivered to your doorstep in 10 minutes.
          </p>
        </div>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#0F1B2D] text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200/80 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Control Bar: Search, Filters & Sorting */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search within groceries..."
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

        {/* Filter toggles & Sorting */}
        <div className="flex items-center flex-wrap gap-3 text-xs">
          {/* In stock toggle */}
          <button
            onClick={() => setOnlyInStock(!onlyInStock)}
            className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 font-bold transition-colors ${
              onlyInStock
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>In Stock Only</span>
          </button>

          {/* Wishlist toggle */}
          <button
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              if (wishlistOnly) {
                newParams.delete('wishlist');
              } else {
                newParams.set('wishlist', 'true');
              }
              setSearchParams(newParams);
            }}
            className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 font-bold transition-colors ${
              wishlistOnly
                ? 'bg-red-50 border-red-300 text-red-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlistOnly ? 'fill-red-500 text-red-500' : ''}`} />
            <span>Wishlist ({wishlistItems.length})</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-gray-700 outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF6B00] flex items-center justify-center mx-auto">
            <ShoppingBasket className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-gray-800">No Grocery Products Found</h3>
          <p className="text-xs text-gray-500">
            We couldn't find any items matching your selected filters or search keyword.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
              setOnlyInStock(false);
              setSearchParams(new URLSearchParams());
            }}
            className="mt-3 px-4 py-2 bg-[#FF6B00] text-white text-xs font-bold rounded-xl hover:bg-[#E05300] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Showing {filteredProducts.length} items</span>
            <span className="font-semibold text-emerald-600">⚡ Guaranteed 10-Minute Dispatch</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} itemType="grocery" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
