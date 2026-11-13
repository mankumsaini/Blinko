import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  RotateCcw,
  Bot
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F1B2D] text-gray-300 pt-16 pb-12 border-t border-gray-800">
      {/* Value Proposition Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-gray-800/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF6B00] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">10-Minute Lightning Delivery</h5>
              <p className="text-[11px] text-gray-400">Dense network of local micro-warehouses</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Farm Fresh Quality Guarantee</h5>
              <p className="text-[11px] text-gray-400">Triple ozone cleaned produce daily</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Instant No-Questions Refund</h5>
              <p className="text-[11px] text-gray-400">Automated instant wallet or UPI credit</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Powered by SupportRoot AI</h5>
              <p className="text-[11px] text-gray-400">Intelligent 24/7 automated resolution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-amber-500 flex items-center justify-center text-white font-black text-xl italic shadow-md">
                B
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                blinko<span className="text-[#FF6B00]">.</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Everything you need, delivered with ease. Blinko delivers farm-fresh groceries, hot meals from local master kitchens, and household essentials to your doorstep in 10 minutes.
            </p>

            <div className="space-y-1.5 text-xs text-gray-400 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                HQ: 100ft Road, Indiranagar, Bangalore, Karnataka - 560038
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                Customer Care: 1800-BLINKO-HELP (Toll Free)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
                Support: care@blinko.demo • partners@blinko.demo
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
                Dark Store Hours: 6:00 AM – 2:00 AM (Select Hubs 24/7)
              </p>
            </div>
          </div>

          {/* Service Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/daily" className="hover:text-[#FF6B00] transition-colors">
                  Blinko Daily (Groceries)
                </Link>
              </li>
              <li>
                <Link to="/eats" className="hover:text-[#FF6B00] transition-colors">
                  Blinko Eats (Hot Meals)
                </Link>
              </li>
              <li>
                <Link to="/essentials" className="hover:text-[#FF6B00] transition-colors">
                  Blinko Essentials (Household)
                </Link>
              </li>
              <li>
                <Link to="/daily?category=Fruits%20%26%20Vegetables" className="hover:text-[#FF6B00] transition-colors">
                  Fresh Fruits & Veggies
                </Link>
              </li>
              <li>
                <Link to="/daily?category=Dairy%20%26%20Bakery" className="hover:text-[#FF6B00] transition-colors">
                  Dairy & Morning Bakery
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/about" className="hover:text-[#FF6B00] transition-colors">
                  About Blinko
                </Link>
              </li>
              <li>
                <Link to="/about#story" className="hover:text-[#FF6B00] transition-colors">
                  Our Story (2021–2026)
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#FF6B00] transition-colors">
                  How Blinko Works
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#FF6B00] transition-colors">
                  Careers & Open Roles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF6B00] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                  Admin Analytics Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Help & Legal</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/help" className="hover:text-[#FF6B00] transition-colors font-medium text-white">
                  Help Center (35+ FAQs)
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=cancellation" className="hover:text-[#FF6B00] transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=shipping" className="hover:text-[#FF6B00] transition-colors">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=privacy" className="hover:text-[#FF6B00] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=terms" className="hover:text-[#FF6B00] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Demonstration Fictional Notice & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-800 text-[11px] text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-amber-300 text-left">
          <strong>Demonstration Notice:</strong> Blinko is a fictional quick-commerce showcase company inspired by Blinkit and Zomato. All company history (2021–2026), restaurants, orders, reviews, analytics, and simulated payments are sample demonstration data.
        </div>
        <p className="shrink-0 text-gray-400">
          © 2021–2026 Blinko Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
