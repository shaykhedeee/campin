import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'camper',
    city: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-forest" />
          </div>
          <h2 className="text-2xl font-bold text-forest mb-3">Welcome to CampIn! 🏕️</h2>
          <p className="text-textgrey mb-6 leading-relaxed">
            You're now part of India's camping community. We'll notify you when new campsites go live near you.
          </p>
          <div className="space-y-3">
            <Link
              to="/explore"
              className="block bg-forest text-white py-3 rounded-xl font-semibold hover:bg-forest-light transition-all"
            >
              Explore Campsites
            </Link>
            <Link
              to="/"
              className="block text-forest py-2 font-medium text-sm hover:text-orange transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-3">Join the Movement</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mb-6 leading-tight">
              Be part of India's outdoor community
            </h1>
            <p className="text-textgrey text-lg leading-relaxed mb-8">
              Sign up to discover campsites, get early access to new listings, and join a community of campers, road trippers, and nature lovers across India.
            </p>
            
            <div className="space-y-4">
              {[
                'Early access to new campsites and road stops',
                'Community WhatsApp group invite',
                'Founding Member badge (first 500 signups)',
                'Camping tips and route guides in your inbox'
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-forest mt-0.5 shrink-0" />
                  <span className="text-textgrey">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-xl font-bold text-forest mb-6">Create your account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-forest mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey/50" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-offwhite border border-transparent focus:border-forest/30 focus:bg-white focus:outline-none transition-all text-textdark placeholder-textgrey/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey/50" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-offwhite border border-transparent focus:border-forest/30 focus:bg-white focus:outline-none transition-all text-textdark placeholder-textgrey/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey/50" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-offwhite border border-transparent focus:border-forest/30 focus:bg-white focus:outline-none transition-all text-textdark placeholder-textgrey/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-1.5">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Your city"
                  className="w-full px-4 py-3 rounded-xl bg-offwhite border border-transparent focus:border-forest/30 focus:bg-white focus:outline-none transition-all text-textdark placeholder-textgrey/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-3">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'camper' }))}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      formData.userType === 'camper'
                        ? 'border-forest bg-forest/5 text-forest'
                        : 'border-gray-100 bg-offwhite text-textgrey hover:border-forest/30'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🏕️</span>
                    <span className="text-sm font-semibold">Camper</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: 'host' }))}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      formData.userType === 'host'
                        ? 'border-forest bg-forest/5 text-forest'
                        : 'border-gray-100 bg-offwhite text-textgrey hover:border-forest/30'
                    }`}
                  >
                    <span className="text-2xl block mb-1">🏡</span>
                    <span className="text-sm font-semibold">Host</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-forest hover:bg-forest-light text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Join CampIn <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-5 flex items-start gap-2">
              <Shield size={16} className="text-forest shrink-0 mt-0.5" />
              <p className="text-xs text-textgrey leading-relaxed">
                We respect your privacy and never spam. Your data is stored securely and used only to improve your CampIn experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
