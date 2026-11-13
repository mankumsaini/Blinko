import { useState } from 'react';
import { X, User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'login') {
        await login(email || 'aarav.sharma@example.com', password || 'password123');
      } else {
        await register(name || 'Aarav Sharma', email || 'aarav.sharma@example.com', password || 'password123');
      }
      onClose();
    } catch {
      setError('Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    await login('aarav.sharma@example.com', 'demo123');
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        {/* Header banner */}
        <div className="bg-gradient-to-r from-[#0F1B2D] to-[#1A2E4A] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center font-black text-white text-base">
              B
            </span>
            <span className="text-xl font-black tracking-tight">Blinko</span>
          </div>
          <h2 className="text-xl font-bold">
            {tab === 'login' ? 'Welcome Back!' : 'Create Your Blinko Account'}
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Order groceries in 10 mins & hot meals from 500+ top kitchens.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => {
              setTab('login');
              setError('');
            }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              tab === 'login'
                ? 'border-[#FF6B00] text-[#FF6B00] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab('register');
              setError('');
            }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              tab === 'register'
                ? 'border-[#FF6B00] text-[#FF6B00] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="p-3 mb-4 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
              {error}
            </div>
          )}

          {/* 1-Click Demo Login Banner */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={loading}
            className="w-full mb-4 p-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 hover:border-[#FF6B00] rounded-xl flex items-center justify-between text-left group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold text-xs">
                AS
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                  1-Click Demo Account
                </p>
                <p className="text-[11px] text-gray-500">Sign in as Aarav Sharma (Customer)</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-2 text-[10px] uppercase font-bold text-gray-400 absolute">
              or enter credentials
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#FF6B00] outline-none"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aarav.sharma@example.com"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#FF6B00] outline-none"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#FF6B00] outline-none"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-[#FF6B00] hover:bg-[#E05300] text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              {loading ? 'Authenticating...' : tab === 'login' ? 'Sign In to Blinko' : 'Create Free Account'}
            </button>
          </form>

          <p className="text-[11px] text-gray-400 text-center mt-4">
            By continuing, you agree to Blinko's Terms of Service & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
