import { useState } from 'react';
import { Briefcase, MapPin, Users, ArrowRight, CheckCircle2, X } from 'lucide-react';

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [applied, setApplied] = useState(false);

  const jobs = [
    {
      id: 'job-1',
      title: 'Senior Frontend Engineer (React 19 / TypeScript)',
      dept: 'Engineering',
      location: 'Bangalore (Indiranagar HQ) / Hybrid',
      type: 'Full-time',
      desc: 'Build high-throughput customer web apps, checkout optimizations, and integrate AI assistant platforms like SupportRoot AI.',
    },
    {
      id: 'job-2',
      title: 'Backend Systems Architect (Django / Python / Microservices)',
      dept: 'Engineering',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      desc: 'Scale high-concurrency order placement and inventory reservation engines handling 100,000+ orders per hour.',
    },
    {
      id: 'job-3',
      title: 'Dark Store Operations Manager',
      dept: 'Supply Chain & Fulfillment',
      location: 'Mumbai (Bandra West)',
      type: 'Full-time',
      desc: 'Oversee daily inbound cold-chain dock operations, 90-second packing SLAs, and inventory audits.',
    },
    {
      id: 'job-4',
      title: 'Growth & Merchant Partnerships Lead (Blinko Eats)',
      dept: 'Business Development',
      location: 'Delhi-NCR / Gurgaon',
      type: 'Full-time',
      desc: 'Onboard top-tier restaurant kitchens and bakeries onto Blinko Eats with exclusive food combinations.',
    },
    {
      id: 'job-5',
      title: 'Customer Experience & AI Operations Specialist',
      dept: 'Customer Support',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      desc: 'Manage customer satisfaction loops, supervise SupportRoot AI ticket escalation, and optimize self-serve refund workflows.',
    },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setSelectedRole(null);
      setApplied(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Build The Future Of Quick Commerce
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Careers at Blinko
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          Join a team of passionate engineers, logistics pioneers, and customer advocates reimagining commerce for millions of people across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center space-y-1">
          <h4 className="text-2xl font-black text-[#FF6B00]">2,800+</h4>
          <p className="text-xs font-bold text-gray-800">Team Members</p>
          <p className="text-[11px] text-gray-400">Across 8 metro zones</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center space-y-1">
          <h4 className="text-2xl font-black text-emerald-600">4.7 / 5</h4>
          <p className="text-xs font-bold text-gray-800">Glassdoor Score</p>
          <p className="text-[11px] text-gray-400">Comprehensive health insurance & ESOPs</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center space-y-1">
          <h4 className="text-2xl font-black text-blue-600">10 Mins</h4>
          <p className="text-xs font-bold text-gray-800">Every Second Matters</p>
          <p className="text-[11px] text-gray-400">High speed execution culture</p>
        </div>
      </div>

      {/* Open Roles */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-gray-900">Current Openings</h2>

        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs hover:border-orange-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {job.dept} • {job.type}
                </span>
                <h3 className="font-bold text-sm text-gray-900">{job.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xl">{job.desc}</p>
                <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {job.location}
                </p>
              </div>

              <button
                onClick={() => setSelectedRole(job)}
                className="px-4 py-2 bg-[#0F1B2D] hover:bg-[#FF6B00] text-white font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900">Apply for Role</h3>
                <p className="text-xs text-gray-500">{selectedRole.title}</p>
              </div>
              <button onClick={() => setSelectedRole(null)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {applied ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">Application Submitted!</h4>
                <p className="text-xs text-emerald-700">Thank you for your interest. Our talent team will review your profile.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    defaultValue="Aarav Sharma"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    defaultValue="aarav.sharma@example.com"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">LinkedIn / Portfolio URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/..."
                    defaultValue="https://linkedin.com/in/aarav-sharma-demo"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#E05300] transition-colors"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
