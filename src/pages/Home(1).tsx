import { Link } from 'react-router-dom';
import { listings, stats, faqs } from '../data/listings';
import { 
  Shield, Star, Heart, MapPin, ArrowRight, Zap, Droplets, Bath,
  ChevronDown, Sparkles, Flame, Waves, Wind, Camera, Lock
} from 'lucide-react';
import { useState } from 'react';

const roadFeatures = [
  { icon: MapPin, label: 'GPS Verified' },
  { icon: Shield, label: 'Safety Corridor' },
  { icon: Bath, label: 'Site Washroom' },
  { icon: Flame, label: 'Fire Pit' },
  { icon: Zap, label: 'Power Access' },
  { icon: Droplets, label: 'Drinking Water' },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-offwhite selection:bg-orange selection:text-white">
      {/* SECTION 1: THE SANCTUARY HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80" 
            alt="Indian Wilderness" 
            className="w-full h-full object-cover scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/95 via-forest/40 to-forest/95" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange/20 backdrop-blur-md rounded-full text-orange font-black uppercase tracking-[0.3em] text-[10px] mb-10 border border-orange/20 animate-fade-in shadow-2xl">
              <Sparkles size={14} fill="currentColor" /> India's Outdoor Identity
            </div>
            <h1 className="text-7xl sm:text-8xl lg:text-[11rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic mb-10 animate-fade-up">
              The Wild is <br /> <span className="text-orange drop-shadow-2xl">Home</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 font-medium leading-relaxed mb-14 max-w-2xl animate-fade-up delay-200">
              India's outdoor soul is currently homeless. We find the campfires, silent forests, and safe sunrises you've been searching for. No more unverified dirt patches.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-up delay-300">
              <Link to="/explore" className="group bg-orange hover:bg-orange-dark text-white px-14 py-7 rounded-[2.5rem] text-sm font-black uppercase tracking-widest transition-all duration-500 shadow-2xl shadow-orange/40 flex items-center justify-center gap-4 italic border-b-4 border-orange-dark">
                Find Sanctuary <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/host-your-land" className="bg-white/5 hover:bg-white/10 backdrop-blur-3xl text-white border-2 border-white/20 px-14 py-7 rounded-[2.5rem] text-sm font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 hover:border-white/40">
                Host Your Land
              </Link>
            </div>
            
            <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-12 animate-fade-in delay-500">
              {stats.map(s => (
                <div key={s.label} className="relative pl-8 group">
                  <div className="absolute left-0 top-0 w-1 h-full bg-orange/30 group-hover:bg-orange transition-colors" />
                  <p className="text-4xl sm:text-5xl font-black text-white uppercase italic leading-none">{s.value}</p>
                  <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mt-2 group-hover:text-white/60 transition-colors">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE ROOT DESIRE - WHY WE EXIST */}
      <section className="py-40 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay grayscale pointer-events-none">
          <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="animate-fade-up">
              <p className="text-orange font-black uppercase tracking-[0.4em] text-[10px] mb-8">The Disconnection Deficit</p>
              <h2 className="text-5xl sm:text-7xl font-black text-white leading-[0.9] uppercase italic mb-10">
                Your Soul is <br /> <span className="text-orange underline decoration-[12px] underline-offset-[12px] decoration-orange/20">Homeless</span>
              </h2>
              <div className="space-y-8 text-white/70 text-xl font-medium leading-relaxed">
                <p>
                  In a land of a billion people, finding silence shouldn't be a gamble. You've scrolled through hotel apps, tried unverified dirt patches, and found only crowds.
                </p>
                <p className="text-white font-black italic text-2xl border-l-4 border-orange pl-8 py-2">
                  Every Indian has a campfire story in their soul, but nowhere to write it. We built the platform that lets you.
                </p>
                <p>
                  CampIn is the home for the displaced outdoor seeker. No hotel bills, no crowded lobbies, no unverified locations.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-3 gap-8">
                {[
                  { icon: Flame, label: 'Private Fire' },
                  { icon: Wind, label: 'Silent Acres' },
                  { icon: Waves, label: 'Horizon Views' }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border-2 border-white/10 flex items-center justify-center mb-4 text-orange group-hover:bg-orange group-hover:text-white transition-all duration-500 shadow-xl shadow-black/20">
                      <item.icon size={32} />
                    </div>
                    <span className="text-[11px] font-black uppercase text-white/40 tracking-widest group-hover:text-orange transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden rotate-2 shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-8 border-white/5 group-hover:rotate-0 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80" alt="Rugged mountain solitude" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
              </div>
              <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-orange rounded-[3rem] -rotate-6 p-10 flex flex-col justify-end shadow-2xl shadow-orange/30 group-hover:rotate-0 transition-transform duration-700">
                 <Lock size={40} className="text-white/20 absolute top-10 right-10" />
                <p className="text-5xl font-black text-white uppercase italic leading-none mb-3">92%</p>
                <p className="text-xs font-black uppercase text-white/60 tracking-[0.2em] leading-tight">Earnings To Hosts <br /> Keeping India Wild</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE TRUST - BACKEND ACCEPTANCE */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
             <div className="lg:w-1/2">
                <p className="text-orange font-black uppercase tracking-[0.4em] text-[10px] mb-8">Verified Infrastructure</p>
                <h2 className="text-6xl sm:text-8xl font-black text-forest leading-[0.85] uppercase italic mb-8">The CampIn <br /> <span className="text-orange">Standard</span></h2>
                <p className="text-textgrey text-xl font-medium leading-relaxed italic mb-10 border-l-4 border-forest/10 pl-8">"We reject 40% of host applications. We only accept sanctuaries."</p>
             </div>
             <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: MapPin, title: 'Google Pin Verified', desc: 'Mandatory exact location share links. No guessing.' },
                  { icon: Camera, title: 'Actual Site Proof', desc: 'High-res photos of the exact site you will use. Required.' },
                  { icon: Shield, title: 'Backend Review', desc: 'Listings only go live after manual audit and acceptance.' },
                  { icon: Star, title: 'Guardian Support', desc: 'Hosts must follow our amenity strategy for your safety.' },
                ].map((point, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-offwhite hover:shadow-2xl transition-all duration-500 group border border-gray-100">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 text-orange shadow-lg group-hover:bg-forest group-hover:text-white transition-all">
                      <point.icon size={24} />
                    </div>
                    <h3 className="font-black uppercase italic text-sm mb-3 tracking-tight text-forest">{point.title}</h3>
                    <p className="text-xs text-textgrey font-medium leading-relaxed">{point.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* FEATURED GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {listings.map((listing) => (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="group bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border border-gray-50 flex flex-col">
                <div className="relative h-80 overflow-hidden">
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute top-8 left-8 bg-orange text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest italic shadow-xl shadow-orange/30">
                    ₹{listing.price} / SUNSET
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 text-white/70 text-[10px] font-black uppercase tracking-widest mb-3">
                      <MapPin size={14} className="text-orange" /> {listing.location}
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase italic leading-none tracking-tighter">{listing.title}</h3>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 bg-forest/5 px-4 py-2 rounded-xl border border-forest/10">
                      <Star size={16} className="text-orange fill-orange" />
                      <span className="text-sm font-black text-forest">{listing.rating}</span>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-10 h-10 rounded-xl bg-offwhite flex items-center justify-center text-forest border border-gray-100" title="Verified Washroom"><Bath size={18} /></div>
                       <div className="w-10 h-10 rounded-xl bg-offwhite flex items-center justify-center text-forest border border-gray-100" title="Verified Fireplace"><Flame size={18} /></div>
                    </div>
                  </div>
                  <p className="text-base text-textgrey font-medium leading-relaxed mb-10 line-clamp-3 italic opacity-80 group-hover:opacity-100 transition-opacity">"{listing.description}"</p>
                  <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase text-forest/30 tracking-widest italic">{listing.hostName} • Host</span>
                    <div className="w-12 h-12 rounded-2xl bg-forest flex items-center justify-center text-white group-hover:bg-orange transition-all shadow-xl group-hover:shadow-orange/30">
                       <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE ROAD - CAMPERVAN DOMINANCE */}
      <section className="py-40 bg-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80" alt="The open road" className="w-full h-full object-cover opacity-15 grayscale scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <p className="text-orange font-black uppercase tracking-[0.5em] text-[11px] mb-10 italic">Indias First Verified Network</p>
              <h2 className="text-7xl sm:text-9xl font-black mb-10 leading-[0.85] uppercase italic tracking-tighter">Built for <br /> the <span className="text-orange">Road</span></h2>
              <p className="text-white/60 text-2xl font-medium leading-relaxed mb-16 italic">No more dhaba guessing. Road Stops with verified water, power, and mobile signal for your Thar or Campervan.</p>
              <Link to="/explore?type=campervan" className="bg-orange hover:bg-orange-dark text-white px-16 py-8 rounded-[3rem] text-sm font-black uppercase tracking-widest transition-all duration-500 shadow-[0_20px_50px_rgba(230,126,34,0.3)] inline-flex items-center gap-4 italic border-b-4 border-orange-dark">
                Explore Road Stops <ArrowRight size={24} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {roadFeatures.map((feat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 text-center hover:bg-white/10 transition-all group shadow-2xl">
                  <feat.icon size={48} className="mx-auto mb-6 text-orange group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">{feat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ & FINAL SUPPORT */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-24">
             <h2 className="text-6xl sm:text-8xl font-black text-forest uppercase italic leading-[0.85] mb-8">Echoes & <br /> <span className="text-orange underline decoration-[10px] underline-offset-[10px] decoration-orange/10">Answers</span></h2>
           </div>
           <div className="space-y-6">
             {faqs.map((faq, i) => (
               <div key={i} className={`rounded-[2.5rem] transition-all duration-700 overflow-hidden border-2 ${openFaq === i ? 'bg-forest border-forest shadow-2xl scale-[1.02]' : 'bg-offwhite border-transparent hover:border-forest/5'}`}>
                 <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-10 text-left group">
                   <span className={`font-black uppercase italic text-sm sm:text-xl tracking-tight pr-10 transition-colors ${openFaq === i ? 'text-white' : 'text-forest'}`}>{faq.q}</span>
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${openFaq === i ? 'bg-orange text-white rotate-180 shadow-xl shadow-orange/30' : 'bg-forest/5 text-forest group-hover:bg-forest group-hover:text-white'}`}>
                     <ChevronDown size={24} />
                   </div>
                 </button>
                 <div className={`px-10 transition-all duration-700 ease-in-out ${openFaq === i ? 'max-h-[500px] pb-12 opacity-100' : 'max-h-0 pb-0 opacity-0 pointer-events-none'}`}>
                   <p className="text-white/60 font-medium text-xl leading-relaxed italic border-t border-white/10 pt-8">{faq.a}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* SECTION 6: SUPPORT CAMPIN BANNER */}
      <section className="py-24 bg-white px-4 pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-orange rounded-[4rem] p-16 sm:p-24 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(230,126,34,0.4)] border-b-8 border-orange-dark">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none grayscale">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-forest rounded-3xl flex items-center justify-center text-white mx-auto mb-10 shadow-2xl rotate-3">
                 <Heart size={40} fill="currentColor" />
              </div>
              <h3 className="text-6xl sm:text-9xl font-black text-white uppercase italic leading-[0.8] mb-10 tracking-tighter">Support <br /> <span className="text-forest underline decoration-forest/20 underline-offset-[10px]">CampIn</span></h3>
              <p className="text-white font-black text-2xl mb-16 max-w-3xl mx-auto leading-relaxed italic opacity-90">Every Indian has a campfire story. <br /> Fuel the platform that lets them write it.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link to="/support" className="w-full sm:w-auto bg-forest hover:bg-forest-light text-white px-16 py-8 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl shadow-forest/40 italic">
                  Fuel the Movement
                </Link>
                <Link to="/explore" className="w-full sm:w-auto bg-white hover:bg-offwhite text-forest px-16 py-8 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 italic shadow-xl">
                  Explore Sanctuary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
