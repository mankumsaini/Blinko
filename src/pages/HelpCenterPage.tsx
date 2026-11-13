import { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Bot,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  Sparkles
} from 'lucide-react';
import { FAQS } from '../data/faqs';
import { api } from '../services/api';

const CATEGORIES = [
  { id: 'all', label: 'All FAQs' },
  { id: 'orders', label: 'Orders & Delivery' },
  { id: 'payments', label: 'Payments & Refunds' },
  { id: 'product', label: 'Product Freshness' },
  { id: 'account', label: 'Account & Settings' },
  { id: 'cancellations', label: 'Cancellations' },
  { id: 'returns', label: 'Returns & Claims' },
  { id: 'restaurant', label: 'Blinko Eats Orders' },
  { id: 'general', label: 'General & SupportRoot AI' },
];

export default function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  // Contact Ticket Form
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketCategory, setTicketCategory] = useState('general');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketOrderId, setTicketOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch =
        searchTerm === '' ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitSupportTicket({
        name: ticketName || 'Customer',
        email: ticketEmail || 'customer@example.com',
        category: ticketCategory,
        subject: ticketSubject,
        message: ticketMessage,
        orderId: ticketOrderId || undefined,
      });
      setSubmitSuccess(true);
      setTicketSubject('');
      setTicketMessage('');
    } catch {
      alert('Error submitting ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Search Banner */}
      <div className="bg-gradient-to-br from-[#0F1B2D] via-[#1A2E4A] to-[#0A1320] rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/30">
          <Bot className="w-4 h-4 text-[#FF6B00]" />
          <span>SupportRoot AI Powered Help Center</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          How can we help you today?
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
          Search over 35+ frequently asked questions or submit an inquiry to our automated support dispatch.
        </p>

        {/* Big Search Input */}
        <div className="max-w-xl mx-auto relative pt-2">
          <input
            type="text"
            placeholder="Type your question (e.g. 'refund policy', 'delivery speed', 'cancel order')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white text-gray-900 rounded-2xl text-xs sm:text-sm outline-none shadow-lg focus:ring-4 focus:ring-orange-500/20"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-5.5" />
        </div>
      </div>

      {/* SupportRoot AI Floating Callout Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center font-bold shadow-md">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">
              Need Instant Resolution? Try SupportRoot AI
            </h4>
            <p className="text-xs text-gray-600">
              Click the floating orange assistant in the bottom-right corner for live 1-second order lookups and refunds.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#FF6B00] bg-white px-3 py-1.5 rounded-xl border border-orange-200 shrink-0">
          Available 24/7
        </span>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#0F1B2D] text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Showing {filteredFAQs.length} questions</span>
          <span>Blinko Knowledgebase 2026</span>
        </div>

        {filteredFAQs.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setExpandedId(isOpen ? null : faq.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
              >
                <span className="font-bold text-xs sm:text-sm text-gray-900">
                  {faq.question}
                </span>
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#FF6B00]" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/30">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Ticket Submission Form */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-black text-gray-900">Still have questions? Send us a ticket</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Our customer experience team and SupportRoot AI bridge will follow up within 15 minutes.
          </p>
        </div>

        {submitSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Ticket Successfully Created!</p>
              <p className="text-emerald-700">SupportRoot AI has received your message and sent a copy to your email.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={ticketEmail}
                onChange={(e) => setTicketEmail(e.target.value)}
                placeholder="aarav.sharma@example.com"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Query Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B00]"
              >
                <option value="orders">Orders & Delivery</option>
                <option value="payments">Payments & Refunds</option>
                <option value="product">Product Information</option>
                <option value="account">Account & Login</option>
                <option value="cancellations">Cancellations</option>
                <option value="returns">Returns & Replacements</option>
                <option value="restaurant">Restaurant Orders</option>
                <option value="general">General Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Order ID (Optional)</label>
              <input
                type="text"
                value={ticketOrderId}
                onChange={(e) => setTicketOrderId(e.target.value)}
                placeholder="e.g. BLK-892401"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              required
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="Brief summary of your inquiry"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B00]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Detailed Message</label>
            <textarea
              required
              rows={4}
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Describe your issue or feedback in detail..."
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FF6B00]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#FF6B00] hover:bg-[#E05300] text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Sending Request...' : 'Submit Support Request'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
