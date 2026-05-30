import { useParams, Link } from 'react-router-dom';
import { listings } from '../data/listings';
import { 
  MapPin, ArrowLeft, Shield, CheckCircle, Heart, Share2, 
  Bath, Flame, Droplets, Zap, Signal, ArrowRight, Camera, ExternalLink, Lock as LockIcon
} from 'lucide-react';

export default function ListingDetail() {
  const { id } = useParams();
  const listing = listings.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-offwhite pt-32 flex items-center justify-center px-4 text-center">
        <div className="bg-white rounded-[3rem] p-12 sm:p-20 shadow-xl max-w-xl border border-gray-100">
          <div className="text-8xl mb-8 opacity-20 italic">🏜️</div>
          <h2 className="text-3xl font-black text-forest mb-4 uppercase italic leading-none">Trail Gone Cold</h2>
          <p className="text-textgrey font-medium mb-10 leading-relaxed italic">This sanctuary does not exist in our verified database.</p>
          <Link to="/explore" className="bg-forest text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-forest/20 flex items-center justify-center gap-3">
             <ArrowLeft size={18} /> Back to Horizons
          </Link>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('washroom')) return <Bath size={20} />;
    if (n.includes('fire')) return <Flame size={20} />;
    if (n.includes('water')) return <Droplets size={20} />;
    if (n.includes('electricity')) return <Zap size={20} />;
    if (n.includes('signal')) return <Signal size={20} />;
    return <CheckCircle size={20} />;
  };

  return (
    <div className="min-h-screen bg-offwhite pt-32 pb-24 selection:bg-orange selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ACTIONS */}
        <div className="flex items-center justify-between mb-8">
           <Link to="/explore" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-forest/40 hover:text-orange transition-colors">
              <ArrowLeft size={14} /> Back to Horizons
           </Link>
           <div className="flex gap-4">
              <button className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-textgrey hover:text-orange transition-all shadow-sm active:scale-90">
                <Heart size={20} />
              </button>
              <button className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-textgrey hover:text-orange transition-all shadow-sm active:scale-90">
                <Share2 size={20} />
              </button>
           </div>
        </div>

        {/* BOLD HERO IMAGE */}
        <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] mb-20 group">
           <img src={listing.images[0]} alt={listing.title} className="w-full h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms]" />
           <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-transparent opacity-80" />
           
           <div className="absolute bottom-12 left-12 right-12 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                 <div className="bg-orange text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-2xl flex items-center gap-2">
                    <Shield size={14} fill="currentColor" /> Verified Sanctuary
                 </div>
                 <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Camera size={14} /> Actual Site Proof Attached
                 </div>
              </div>
              <h1 className="text-5xl sm:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter drop-shadow-2xl">{listing.title}</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* SOUL SECTION */}
            <section className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full -mr-16 -mt-16" />
               
               <div className="flex flex-wrap items-center justify-between gap-8 mb-12 border-b border-gray-100 pb-12">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange italic">GPS Horizon</p>
                     <a href={listing.googlePin} target="_blank" rel="noopener" className="flex items-center gap-2 text-forest font-black text-2xl italic uppercase group hover:text-orange transition-colors">
                        <MapPin size={24} className="text-orange" /> {listing.location} <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                     </a>
                  </div>
                  <div className="flex items-center gap-10">
                     <div className="text-center">
                        <p className="text-4xl font-black text-forest leading-none mb-1 italic">{listing.rating}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-textgrey/40">Rating</p>
                     </div>
                     <div className="text-center border-l border-gray-100 pl-10">
                        <p className="text-4xl font-black text-forest leading-none mb-1 italic">{listing.reviews}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-textgrey/40">Seekers</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-2xl font-black text-forest uppercase italic">The Roots of Desire</h3>
                  <p className="text-textgrey font-medium leading-relaxed italic text-xl opacity-90">"{listing.longDescription}"</p>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 mt-12 border-t border-gray-50">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase tracking-widest text-textgrey/30">Guest Limit</p>
                     <p className="font-black text-forest uppercase italic text-sm flex items-center gap-2 tracking-tight">{listing.maxGuests} Souls</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase tracking-widest text-textgrey/30">Verified Parking</p>
                     <p className="font-black text-forest uppercase italic text-sm flex items-center gap-2 tracking-tight">{listing.campervanFriendly ? 'Unrestricted' : 'Limited'}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase tracking-widest text-textgrey/30">Platform Fee</p>
                     <p className="font-black text-orange uppercase italic text-sm tracking-tight">Startup (8%)</p>
                  </div>
               </div>
            </section>

            {/* SITE PROOF SECTION - NEW MANDATORY REQUIREMENT */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-forest/40 flex items-center gap-3">
                   <span className="w-12 h-px bg-forest/20" /> Actual Site Proof
                </h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-orange italic px-3 py-1 bg-orange/5 rounded-lg border border-orange/10">No Stock Images</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {listing.sitePhotos.map((img, i) => (
                    <div key={i} className="group relative rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white aspect-video">
                       <img src={img} alt="Exact camping site" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                       <div className="absolute top-6 right-6">
                          <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-forest shadow-lg">
                             <Camera size={16} />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              <p className="text-[10px] text-textgrey font-bold italic mt-6 text-center">"These images depict the exact ground where you will pitch your sanctuary."</p>
            </section>

            {/* AMENITIES - BOLDIER */}
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-forest/40 mb-8 flex items-center gap-3">
                 <span className="w-12 h-px bg-forest/20" /> Verified Comforts
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 {listing.amenities.map((a, i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                       <div className="mb-4 text-orange group-hover:scale-125 transition-transform duration-500 flex justify-center">
                          {getAmenityIcon(a)}
                       </div>
                       <p className="text-[10px] font-black text-forest uppercase tracking-widest leading-tight">{a}</p>
                    </div>
                 ))}
              </div>
            </section>

            {/* GUARDIAN CARD */}
            <section className="bg-forest rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[100px]" />
               <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                  <div className="w-24 h-24 rounded-[2rem] bg-white/10 flex items-center justify-center text-6xl shadow-2xl border border-white/10 rotate-3 transition-transform hover:rotate-0 duration-500">
                    👤
                  </div>
                  <div className="text-center sm:text-left">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange mb-2">Guardian of the Sanctuary</p>
                     <h3 className="text-3xl font-black uppercase italic leading-none">{listing.hostName}</h3>
                     <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                        <span className="text-xs text-white/50 font-bold uppercase tracking-widest">{listing.location}</span>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-[10px] font-black uppercase text-orange italic">92% Revenue Contributor</span>
                     </div>
                  </div>
                  <div className="sm:ml-auto flex flex-col items-center gap-2">
                     <div className="w-16 h-16 rounded-2xl bg-orange/20 flex items-center justify-center text-orange border border-orange/10 shadow-inner">
                        <Shield size={32} fill="currentColor" />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Verified Identity</span>
                  </div>
               </div>
            </section>
          </div>

          {/* BOOKING SIDEBAR - LESS TRANSPARENT, MORE AUTHORITY */}
          <div className="lg:col-span-4">
             <div className="bg-white rounded-[3rem] p-10 shadow-[0_30px_70px_rgba(0,0,0,0.1)] border border-gray-50 sticky top-32">
                <div className="flex items-center justify-between mb-12">
                   <div className="space-y-1">
                      <p className="text-5xl font-black text-forest italic leading-none tracking-tighter">₹{listing.price}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-textgrey/30 italic">per sunset</p>
                   </div>
                   <div className="bg-offwhite px-5 py-2.5 rounded-2xl border border-gray-100 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-forest italic leading-none mb-1">Stay Fee</p>
                      <p className="text-[9px] font-bold text-orange uppercase tracking-tight">Verified Route</p>
                   </div>
                </div>

                <div className="space-y-4 mb-10">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-forest/40 ml-2">Arrive</label>
                         <input type="date" className="w-full bg-offwhite px-5 py-5 rounded-[1.5rem] text-xs font-bold text-forest focus:outline-none focus:ring-4 focus:ring-orange/5 transition-all border border-transparent focus:border-forest/5" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-forest/40 ml-2">Depart</label>
                         <input type="date" className="w-full bg-offwhite px-5 py-5 rounded-[1.5rem] text-xs font-bold text-forest focus:outline-none focus:ring-4 focus:ring-orange/5 transition-all border border-transparent focus:border-forest/5" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-forest/40 ml-2">Seekers</label>
                      <select className="w-full bg-offwhite px-5 py-5 rounded-[1.5rem] text-xs font-bold text-forest focus:outline-none focus:ring-4 focus:ring-orange/5 transition-all border border-transparent focus:border-forest/5 appearance-none">
                         {[...Array(listing.maxGuests)].map((_, i) => (
                           <option key={i + 1} value={i + 1}>{i + 1} Soul{i > 0 ? 's' : ''}</option>
                         ))}
                      </select>
                   </div>
                </div>

                <button className="w-full bg-orange hover:bg-orange-dark text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] italic shadow-2xl shadow-orange/30 transition-all duration-500 transform hover:-translate-y-2 active:scale-95 mb-8 flex items-center justify-center gap-4 text-sm border-b-4 border-orange-dark">
                   Request Sanctuary <ArrowRight size={22} />
                </button>

                <div className="bg-forest/5 p-6 rounded-3xl mb-10 border border-forest/10 flex items-start gap-4">
                   <LockIcon size={20} className="text-forest shrink-0 mt-1" />
                   <p className="text-[11px] font-bold text-textgrey leading-relaxed italic">Backend Verification Enforced: Request will be audited and accepted within 24 hours.</p>
                </div>

                <div className="space-y-5 pt-8 border-t border-gray-100">
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-textgrey/60">
                      <span>Per Sunset x 1</span>
                      <span className="text-forest italic">₹{listing.price}</span>
                   </div>
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-textgrey/60">
                      <span>Verification & Support</span>
                      <span className="text-forest italic">₹{Math.round(listing.price * 0.08)}</span>
                   </div>
                   <div className="flex justify-between text-2xl font-black uppercase italic border-t border-gray-100 pt-8">
                      <span className="text-forest tracking-tighter">Contribution</span>
                      <span className="text-orange tracking-tighter">₹{listing.price + Math.round(listing.price * 0.08)}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
