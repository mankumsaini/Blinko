import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './store/AuthContext';
import CartProvider from './store/CartContext';
import WishlistProvider from './store/WishlistContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SupportWidget from './components/support/SupportWidget';

import HomePage from './pages/HomePage';
import DailyPage from './pages/DailyPage';
import EatsPage from './pages/EatsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import EssentialsPage from './pages/EssentialsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AccountPage from './pages/AccountPage';
import HelpCenterPage from './pages/HelpCenterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import AboutPage from './pages/company/AboutPage';
import HowItWorksPage from './pages/company/HowItWorksPage';
import CareersPage from './pages/company/CareersPage';
import ContactPage from './pages/company/ContactPage';
import PoliciesPage from './pages/company/PoliciesPage';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#1A1A2E] font-sans antialiased selection:bg-orange-500 selection:text-white">
              {/* Sticky Global Navigation */}
              <Navbar />

              {/* Main Page Content */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/daily" element={<DailyPage />} />
                  <Route path="/eats" element={<EatsPage />} />
                  <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
                  <Route path="/essentials" element={<EssentialsPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
                  <Route path="/order-tracking/:id" element={<OrderTrackingPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/help" element={<HelpCenterPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />

                  {/* Company & Policy Pages */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/policies" element={<PoliciesPage />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* SupportRoot AI Floating Customer Support Widget */}
              <SupportWidget />

              {/* Comprehensive Global Footer */}
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
