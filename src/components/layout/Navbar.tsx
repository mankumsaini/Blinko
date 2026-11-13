import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  ChevronDown,
  Sparkles,
  UtensilsCrossed,
  Package,
  Shield,
  HelpCircle,
  Menu,
  X,
  LogOut,
  ShoppingBasket
} from 'lucide-react';
import { useCart } from '../../store/CartContext';
import { useWishlist } from '../../store/WishlistContext';
import { useAuth } from '../../store/AuthContext';
import LocationModal from './LocationModal';
import AuthModal from '../auth/AuthModal';
import CartDrawer from '../cart/CartDrawer';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total, itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Indiranagar, Bangalore - 560038');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/daily?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Blinko Daily', path: '/daily', icon: ShoppingBasket, badge: '10 Mins' },
    { name: 'Blinko Eats', path: '/eats', icon: UtensilsCrossed, badge: 'Hot Meals' },
    { name: 'Blinko Essentials', path: '/essentials', icon: Package, badge: 'Household' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
        {/* Top Announcement Bar */}
        <div className="bg-[#0F1B2D] text-white text-[11px] py-1.5 px-4 font-medium flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-1.5 text-orange-300">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
              Superfast 10-Minute Delivery Active in Bangalore & Metro Hubs!
            </span>
            <div className="hidden md:flex items-center gap-4 text-gray-300">
              <Link to="/how-it-works" className="hover:text-white transition-colors">How Blinko Works</Link>
              <span>•</span>
              <Link to="/help" className="hover:text-white transition-colors flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> 24/7 Help & Support
              </Link>
              <span>•</span>
              <Link to="/supportroot-tests" className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/30">
                <Sparkles className="w-3 h-3 text-[#FF6B00]" /> AI Test Lab (30 Test Cases)
              </Link>
              <span>•</span>
              <Link to="/admin" className="text-gray-300 hover:text-white font-medium flex items-center gap-1">
                <Shield className="w-3 h-3" /> Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="font-black text-xl italic tracking-tighter">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#0F1B2D] leading-none group-hover:text-[#FF6B00] transition-colors">
                  blinko<span className="text-[#FF6B00]">.</span>
                </span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-0.5">
                  10 Min Quick Store
                </span>
              </div>
            </Link>

            {/* Location Selector Pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-orange-50/70 border border-gray-200/80 hover:border-orange-200 transition-colors text-left max-w-[210px]"
            >
              <div className="w-7 h-7 rounded-lg bg-orange-100/70 text-[#FF6B00] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase text-gray-400 leading-tight">Deliver To</p>
                <p className="text-xs font-bold text-gray-900 truncate leading-tight flex items-center gap-0.5">
                  {selectedLocation.split('-')[0]}
                  <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
                </p>
              </div>
            </button>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg relative hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 'milk', 'farm tomatoes', 'biryani', 'detergent'..."
                  className="w-full pl-10 pr-12 py-2 bg-gray-100/80 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-[#FF6B00] rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-orange-500/20"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
                {searchQuery && (
                  <button
                    type="submit"
                    className="absolute right-2 top-1.5 px-2 py-0.5 bg-[#FF6B00] text-white text-[10px] font-bold rounded-md hover:bg-[#E05300] transition-colors"
                  >
                    Go
                  </button>
                )}
              </div>
            </form>

            {/* Actions: Wishlist, Account, Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Wishlist Button */}
              <Link
                to="/daily?wishlist=true"
                className="relative p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-orange-50 rounded-xl transition-colors hidden sm:flex items-center justify-center"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* User Account / Login */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#FF6B00]"
                    />
                    <span className="text-xs font-bold text-gray-800 hidden xl:block">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden xl:block" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 text-xs z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="font-bold text-gray-900">{user?.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00]"
                      >
                        My Account & Profile
                      </Link>
                      <Link
                        to="/account?tab=orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00]"
                      >
                        Order History & Tracking
                      </Link>
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-3 py-2 text-orange-600 font-semibold hover:bg-orange-50"
                      >
                        Admin Dashboard
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-800 hover:text-[#FF6B00] hover:bg-orange-50 rounded-xl transition-colors border border-gray-200 hover:border-orange-200"
                >
                  <UserIcon className="w-4 h-4 text-gray-600" />
                  <span>Login</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74500] text-white shadow-md shadow-orange-500/20 transition-all font-bold text-xs"
                aria-label="View Shopping Basket"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#0F1B2D] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black border border-white">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">
                  {total > 0 ? `₹${total}` : 'My Cart'}
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#FF6B00] lg:hidden rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Navigation Category Bar */}
          <nav className="hidden lg:flex items-center gap-1 py-2.5 border-t border-gray-100">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#FF6B00] text-white shadow-sm'
                      : 'text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {link.badge}
                  </span>
                </Link>
              );
            })}
            <div className="ml-auto flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Instant Delivery Available in Your Area
              </span>
            </div>
          </nav>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white p-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products & dishes..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </form>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-orange-50 font-bold text-xs text-gray-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#FF6B00]" />
                      <span>{link.name}</span>
                    </div>
                    <span className="text-[10px] bg-orange-100 text-[#FF6B00] px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <button
                onClick={() => {
                  setIsLocationModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-gray-700 font-semibold"
              >
                <MapPin className="w-4 h-4 text-[#FF6B00]" />
                <span>Change Area</span>
              </button>
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-orange-600 font-bold"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Modals & Slide-out Cart */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
