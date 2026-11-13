import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, CheckCircle2, RefreshCw, Settings, ExternalLink } from 'lucide-react';
import { SUPPORT_CONFIG } from '../../config/supportConfig';
import { useAuth } from '../../store/AuthContext';
import { api } from '../../services/api';

interface SupportMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: 'track' | 'refund';
    orderId?: string;
  };
}

export default function SupportWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'config'>('chat');
  const [widgetUrl, setWidgetUrl] = useState(SUPPORT_CONFIG.widgetUrl);
  const [apiKey, setApiKey] = useState(SUPPORT_CONFIG.apiKey);
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello! I am SupportRoot AI, Blinko’s automated intelligent support assistant. How can I help you today?',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'online' | 'embedded'>('connecting');

  // Check connectivity to SupportRoot AI bridge / Django endpoint
  useEffect(() => {
    let mounted = true;
    const checkBridge = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/support/supportroot/status/');
        if (res.ok && mounted) {
          setConnectionStatus('online');
          return;
        }
      } catch {
        // Django might not be running; fall back to bridge mode
      }
      if (mounted) {
        setConnectionStatus(widgetUrl ? 'embedded' : 'online');
      }
    };
    checkBridge();
    return () => {
      mounted = false;
    };
  }, [widgetUrl]);

  // Dynamically load external script if widgetUrl is configured
  useEffect(() => {
    if (!SUPPORT_CONFIG.enabled || !widgetUrl) return;

    const existingScript = document.getElementById('supportroot-ai-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'supportroot-ai-script';
      script.src = widgetUrl;
      script.async = true;
      script.setAttribute('data-api-key', apiKey);
      script.setAttribute('data-company', 'Blinko');
      document.body.appendChild(script);

      return () => {
        const s = document.getElementById('supportroot-ai-script');
        if (s) document.body.removeChild(s);
      };
    }
  }, [widgetUrl, apiKey]);

  if (!SUPPORT_CONFIG.enabled) {
    return null;
  }

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: SupportMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsTyping(true);

    // Call API / webhook
    try {
      await api.submitSupportTicket({
        name: user?.name || 'Aarav Sharma',
        email: user?.email || 'aarav.sharma@example.com',
        subject: textToSend.slice(0, 40),
        category: 'general',
        message: textToSend,
      });
    } catch {
      // ignore
    }

    // SupportRoot AI response simulation
    setTimeout(() => {
      let reply = "SupportRoot AI: I've logged your request into Blinko's fulfillment pipeline.";
      const lower = textToSend.toLowerCase();

      if (lower.includes('track') || lower.includes('where is my order') || lower.includes('status')) {
        reply = "SupportRoot AI: Order #BLK-892401 is Out for Delivery! Rider Ramesh is 1.2 km away and expected to arrive in ~10 minutes. You can also view live GPS on the Order Tracking tab.";
      } else if (lower.includes('refund') || lower.includes('damaged') || lower.includes('cancel')) {
        reply = "SupportRoot AI: I understand you have an issue with your items. Under Blinko's Freshness Guarantee, I can initiate an instant refund or replacement for order #BLK-892401. Would you like me to proceed?";
      } else if (lower.includes('delivery time') || lower.includes('how long')) {
        reply = "SupportRoot AI: Blinko Daily groceries arrive in 10-15 minutes! Hot restaurant meals typically take 30-40 minutes from partner kitchens.";
      } else {
        reply = `SupportRoot AI: Thank you for reaching out regarding "${textToSend}". Our SupportRoot AI engine has analyzed your account context and verified your delivery zone (Bangalore - Indiranagar). Is there anything else you need assistance with?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div
      className={`fixed z-40 ${
        SUPPORT_CONFIG.position === 'bottom-left' ? 'left-6' : 'right-6'
      } bottom-6 print:hidden`}
    >
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74500] text-white px-4 py-3.5 rounded-full shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
          aria-label="Open SupportRoot AI Chat"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs uppercase font-extrabold tracking-wider block opacity-90 leading-tight">
              SupportRoot AI
            </span>
            <span className="text-sm font-semibold leading-tight">Live Support</span>
          </div>
        </button>
      )}

      {/* Expanded SupportRoot AI Chat Drawer / Widget Window */}
      {isOpen && (
        <div className="w-[370px] sm:w-[410px] h-[580px] bg-white rounded-2xl shadow-2xl border border-gray-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#0F1B2D] text-white p-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-amber-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white">SupportRoot AI</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-semibold">
                    {connectionStatus.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Blinko Intelligent Customer Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab(activeTab === 'chat' ? 'config' : 'chat')}
                title="SupportRoot AI Integration Settings"
                className={`p-1.5 rounded-lg transition-colors ${
                  activeTab === 'config' ? 'bg-[#FF6B00] text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Close Support Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Integration Configuration Tab */}
          {activeTab === 'config' ? (
            <div className="p-5 flex-1 overflow-y-auto bg-gray-50 text-sm">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-4 text-amber-900">
                <p className="font-bold text-xs flex items-center gap-1.5 mb-1">
                  <Bot className="w-4 h-4 text-amber-600" />
                  SupportRoot AI Integration Settings
                </p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Blinko is pre-engineered with a clean hook for the <strong>SupportRoot AI</strong> external script or iframe.
                  You can specify your external endpoint or API key below.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Widget Script / Embed URL
                  </label>
                  <input
                    type="text"
                    value={widgetUrl}
                    onChange={(e) => setWidgetUrl(e.target.value)}
                    placeholder="https://cdn.supportroot.ai/widget.js"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none bg-white font-mono"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Leave empty to use built-in SupportRoot AI demo bridge.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    SupportRoot API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sr_live_************************"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none bg-white font-mono"
                  />
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <h4 className="font-bold text-xs text-gray-800 mb-2">Connected Context Details</h4>
                  <div className="bg-white p-3 rounded-lg border border-gray-200 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Customer:</span>
                      <span className="font-medium">{user?.name || 'Aarav Sharma'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Active Order:</span>
                      <span className="font-mono text-[#FF6B00] font-semibold">BLK-892401</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Django Backend:</span>
                      <span className="text-emerald-600 font-medium">http://localhost:8000/api</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('chat')}
                  className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#E05300] text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
                >
                  Save & Return to Support Chat
                </button>
              </div>
            </div>
          ) : widgetUrl ? (
            /* External Widget iFrame / Script Container */
            <div className="flex-1 w-full h-full bg-white relative">
              <iframe
                src={widgetUrl}
                title="SupportRoot AI Customer Portal"
                className="w-full h-full border-none"
              />
            </div>
          ) : (
            /* Built-in SupportRoot AI Client Bridge */
            <>
              {/* Quick Query Pills */}
              <div className="p-2.5 bg-gray-50 border-b border-gray-200 flex gap-2 overflow-x-auto scrollbar-hide text-xs">
                <button
                  onClick={() => handleSend('Track my order BLK-892401')}
                  className="whitespace-nowrap px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF6B00] rounded-full text-gray-700 hover:text-[#FF6B00] transition-colors shadow-2xs font-medium"
                >
                  🚚 Track Order
                </button>
                <button
                  onClick={() => handleSend('I received damaged groceries. Request refund.')}
                  className="whitespace-nowrap px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF6B00] rounded-full text-gray-700 hover:text-[#FF6B00] transition-colors shadow-2xs font-medium"
                >
                  💰 Request Refund
                </button>
                <button
                  onClick={() => handleSend('What is the estimated delivery time?')}
                  className="whitespace-nowrap px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF6B00] rounded-full text-gray-700 hover:text-[#FF6B00] transition-colors shadow-2xs font-medium"
                >
                  ⚡ Delivery Time
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FBFBFD]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#FF6B00] text-white rounded-br-xs shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {m.sender === 'ai' && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF6B00] mb-1">
                          <Bot className="w-3.5 h-3.5" />
                          <span>SupportRoot AI</span>
                        </div>
                      )}
                      <p>{m.text}</p>
                      <span
                        className={`text-[9px] mt-1 block text-right ${
                          m.sender === 'user' ? 'text-white/80' : 'text-gray-400'
                        }`}
                      >
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 text-xs flex items-center gap-1.5 text-gray-500">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF6B00]" />
                      <span>SupportRoot AI is answering...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask SupportRoot AI anything..."
                  className="flex-1 px-3 py-2 bg-gray-100 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-[#FF6B00] outline-none text-gray-800 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 bg-[#FF6B00] disabled:bg-gray-300 text-white rounded-xl hover:bg-[#E05300] transition-colors shadow-sm"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* Footer branding */}
          <div className="px-4 py-2 bg-gray-100/70 border-t border-gray-200/60 flex items-center justify-between text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              SupportRoot AI v2.4 Active
            </span>
            <span className="font-semibold text-gray-600">Blinko Fast-Commerce</span>
          </div>
        </div>
      )}
    </div>
  );
}
