import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const offices = [
    {
      city: 'Bangalore (Corporate Headquarters)',
      address: '100ft Road, HAL 2nd Stage, Indiranagar, Bangalore, Karnataka - 560038',
      phone: '+91 80 4912 0000',
      email: 'bangalore@blinko.demo',
    },
    {
      city: 'Mumbai Regional Center',
      address: 'Bandra-Kurla Complex (BKC), G Block, Bandra East, Mumbai, Maharashtra - 400051',
      phone: '+91 22 6821 0000',
      email: 'mumbai@blinko.demo',
    },
    {
      city: 'Delhi-NCR Hub',
      address: 'DLF Cyber City, Building 10, Tower B, Phase 2, Gurgaon, Haryana - 122002',
      phone: '+91 124 4590 0000',
      email: 'delhi@blinko.demo',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Contact Blinko
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          Whether you are a customer, restaurant partner, supplier, or job seeker, our regional teams are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Details & Offices */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider text-xs">
              Direct Contact Lines
            </h3>

            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                <div>
                  <p className="font-bold text-gray-900">Customer Helpline (Toll Free)</p>
                  <p className="text-[11px] text-gray-500">1800-BLINKO-HELP • 6:00 AM – 2:00 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Mail className="w-4 h-4 text-[#FF6B00]" />
                <div>
                  <p className="font-bold text-gray-900">Email Inquiries</p>
                  <p className="text-[11px] text-gray-500">care@blinko.demo • partnerships@blinko.demo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-900">Regional Fulfillment Offices</h3>
            {offices.map((off, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2 text-xs">
                <h4 className="font-bold text-gray-900">{off.city}</h4>
                <p className="text-gray-500 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                  {off.address}
                </p>
                <div className="pt-1 flex items-center gap-4 text-gray-600">
                  <span>Tel: {off.phone}</span>
                  <span>Email: {off.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900">Send an Inquiry</h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-emerald-800 space-y-2 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm">Message Sent!</h4>
              <p>Thank you for reaching out. A representative will contact you shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Inquiry Type</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none">
                  <option>Customer Support</option>
                  <option>Restaurant Partner Onboarding</option>
                  <option>Supplier / Vendor Procurement</option>
                  <option>Media & Press Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you?"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6B00] hover:bg-[#E05300] text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
