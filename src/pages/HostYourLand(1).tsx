import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Phone, MapPin, FileText, Upload, 
  ArrowRight, Shield, Star, Zap, Info, Camera, Lock
} from 'lucide-react';

const propertyTypes = [
  { id: 'farm', label: 'Farm / Agricultural Land', icon: '🌾' },
  { id: 'terrace', label: 'Terrace / Hillside', icon: '🏔️' },
  { id: 'forest', label: 'Forest / Woodland', icon: '🌲' },
  { id: 'lakeside', label: 'Lakeside / Riverside', icon: '🏞️' },
  { id: 'desert', label: 'Desert / Arid Land', icon: '🏜️' },
  { id: 'orchard', label: 'Orchard / Plantation', icon: '🍎' },
  { id: 'roadside', label: 'Roadside / Highway Stop', icon: '🛣️' },
  { id: 'other', label: 'Other', icon: '📍' },
];

const amenitiesList = [
  { id: 'fireplace', label: 'Fire Place', icon: '🔥' },
  { id: 'washroom', label: 'Proper Washroom', icon: '🚿' },
  { id: 'water', label: 'Drinking Water', icon: '🚰' },
  { id: 'electricity', label: 'Electricity', icon: '⚡' },
  { id: 'parking', label: 'Parking', icon: '🚗' },
  { id: 'food', label: 'Local Food', icon: '🍲' },
  { id: 'tent', label: 'Tent Pitching Area', icon: '⛺' },
  { id: 'signal', label: 'Mobile Signal', icon: '📶' },
  { id: 'guides', label: 'Local Guides', icon: '🚶' },
];

export default function HostYourLand() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', googleLocation: '', state: '',
    propertyType: '', description: '',
  });
  const [amenities, setAmenities] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-offwhite pt-32 flex items-center justify-center px-4">
        <div className="bg-white rounded-[2rem] p-10 sm:p-16 max-w-xl w-full text-center shadow-2xl border border-gray-100">
          <div className="w-24 h-24 bg-forest rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-forest/20 rotate-3">
            <Lock size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-forest mb-4 uppercase italic">Under Manual Review</h2>
          <p className="text-textgrey mb-8 leading-relaxed font-medium">
            Thank you for trusting CampIn. To ensure the safety of our community and the quality of our listings, your land application is now in our <span className="text-forest font-bold">Backend Review Queue</span>.
          </p>
          <div className="bg-forest/5 p-6 rounded-2xl mb-10 text-left border border-forest/10">
            <h4 className="text-xs font-black uppercase tracking-widest text-forest mb-3 flex items-center gap-2">
              <Shield size={14} /> What happens next?
            </h4>
            <ul className="space-y-2 text-sm text-textgrey font-medium">
              <li className="flex items-center gap-2">1. We verify your Google Maps Pin</li>
              <li className="flex items-center gap-2">2. We audit your site photographs</li>
              <li className="flex items-center gap-2">3. Our team contacts you for acceptance</li>
            </ul>
          </div>
          <Link to="/" className="inline-flex items-center justify-center gap-2 bg-forest text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-forest-light transition-all shadow-xl shadow-forest/20">
            Return Home <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 rounded-full text-orange font-black uppercase tracking-widest text-[10px] mb-6 border border-orange/10">
            <Star size={12} fill="currentColor" /> Become a Guardian of the Land
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-forest mb-8 leading-[0.95] tracking-tighter uppercase italic">
            Host Your <span className="text-orange">Land</span>
          </h1>
          <p className="text-xl text-textgrey leading-relaxed font-medium max-w-2xl mx-auto">
            India's outdoor soul is currently homeless. Open your gates and help us build a home for every seeker of campfires and silent forests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Benefits Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-forest rounded-[2.5rem] p-10 text-white shadow-2xl shadow-forest/20 sticky top-32 overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
              <h3 className="text-2xl font-black italic uppercase mb-8">The Host Promise</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <Zap size={22} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-black uppercase text-sm mb-1 italic">Keep 92%</p>
                    <p className="text-white/60 text-xs leading-relaxed font-medium">We take a minimal 8% to fuel the platform. You keep the rest. Your land, your wealth.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <Camera size={22} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-black uppercase text-sm mb-1 italic">Manual Acceptance</p>
                    <p className="text-white/60 text-xs leading-relaxed font-medium">We verify every site. No unverified spots. No compromises. We only host the best.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <Info size={22} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-black uppercase text-sm mb-1 italic">Amenity Strategy</p>
                    <p className="text-white/60 text-xs leading-relaxed font-medium">Add Fire Places and Washrooms to double your daily rate. More amenities = More desire.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <MapPin size={24} className="text-orange" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Location Accuracy</p>
                    <p className="text-xs font-bold">Verified Google Pin Required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Contact Info */}
                <section>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-forest/40 mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-forest/20" /> Contact Identity
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-forest ml-1">Full Name</label>
                      <div className="relative group">
                        <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-textgrey group-focus-within:text-forest transition-colors" />
                        <input
                          type="text" required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Proprietor Name"
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-offwhite border-2 border-transparent focus:border-forest/20 focus:bg-white focus:outline-none transition-all text-textdark font-bold placeholder:text-textgrey/30"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-forest ml-1">Phone (OTP Verified)</label>
                      <div className="relative group">
                        <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-textgrey group-focus-within:text-forest transition-colors" />
                        <input
                          type="tel" required
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91"
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-offwhite border-2 border-transparent focus:border-forest/20 focus:bg-white focus:outline-none transition-all text-textdark font-bold placeholder:text-textgrey/30"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Exact Location */}
                <section>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-forest/40 mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-forest/20" /> Precise Location Verification
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-forest ml-1">Google Maps Pin Link *</label>
                      <div className="relative group">
                        <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-textgrey group-focus-within:text-forest transition-colors" />
                        <input
                          type="url" required
                          value={formData.googleLocation}
                          onChange={(e) => setFormData(prev => ({ ...prev, googleLocation: e.target.value }))}
                          placeholder="Paste the exact share link from Google Maps"
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-offwhite border-2 border-transparent focus:border-forest/20 focus:bg-white focus:outline-none transition-all text-textdark font-bold placeholder:text-textgrey/30"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-textgrey font-bold ml-1 flex items-center gap-2">
                      <Info size={12} className="text-orange" /> We use this to verify the surroundings and safety of your land.
                    </p>
                  </div>
                </section>

                {/* Property Type */}
                <section>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-forest/40 mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-forest/20" /> Landscape Category
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {propertyTypes.map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, propertyType: type.id }))}
                        className={`p-5 rounded-2xl border-2 transition-all group ${
                          formData.propertyType === type.id
                            ? 'border-forest bg-forest text-white shadow-xl shadow-forest/20'
                            : 'border-transparent bg-offwhite text-textgrey hover:border-forest/20 hover:bg-white'
                        }`}
                      >
                        <span className="text-3xl block mb-2">{type.icon}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest leading-tight block ${formData.propertyType === type.id ? 'text-white' : 'text-forest'}`}>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Amenities */}
                <section>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-forest/40 mb-2 flex items-center gap-2">
                    <span className="w-8 h-px bg-forest/20" /> Available Amenities
                  </h3>
                  <p className="text-[10px] text-textgrey font-black uppercase italic mb-6">Boost your earnings by adding more verified amenities</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {amenitiesList.map(amenity => (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-tight transition-all flex items-center justify-center gap-2 ${
                          amenities.includes(amenity.id)
                            ? 'bg-forest text-white shadow-lg'
                            : 'bg-offwhite text-textgrey hover:bg-forest/5'
                        }`}
                      >
                        <span className="text-lg">{amenity.icon}</span> {amenity.label}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Description */}
                <section>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-forest/40 mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-forest/20" /> The Soul of your Land
                  </h3>
                  <div className="relative group">
                    <FileText size={18} className="absolute left-5 top-5 text-textgrey group-focus-within:text-forest transition-colors" />
                    <textarea
                      rows={4} required
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Why should a camper choose your land? Tell them about the silence, the views, and the campfire stories waiting to be written..."
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-offwhite border-2 border-transparent focus:border-forest/20 focus:bg-white focus:outline-none transition-all text-textdark font-bold placeholder:text-textgrey/30 resize-none"
                    />
                  </div>
                </section>

                {/* Actual Site Photos */}
                <section>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-forest/40 mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-forest/20" /> Actual Location Proof
                  </h3>
                  <div className="border-4 border-dashed border-offwhite rounded-[2rem] p-12 text-center group hover:border-forest/10 transition-all cursor-pointer bg-offwhite/30">
                    <Upload size={48} className="mx-auto text-forest/20 mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-black text-forest uppercase italic mb-2 tracking-widest">Mandatory Proof</p>
                    <p className="text-xs text-textgrey font-medium max-w-xs mx-auto mb-6">Upload actual photos of the campsite area campers will use. No stock images allowed.</p>
                    <button type="button" className="bg-forest text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">Browse Site Photos</button>
                  </div>
                </section>

                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center shrink-0">
                      <Shield size={20} className="text-forest" />
                    </div>
                    <p className="text-[10px] text-textgrey font-black uppercase leading-tight tracking-widest">
                      Backend verification <br /> <span className="text-forest">strictly enforced</span>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-orange hover:bg-orange-dark text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-orange/20 hover:-translate-y-1 active:scale-95 text-sm italic"
                  >
                    Submit for Backend Review <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
