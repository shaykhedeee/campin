import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listings } from '../data/listings';
import { Search, SlidersHorizontal, MapPin, Star, Bath, Flame, Shield, Camera, ArrowRight } from 'lucide-react';

const allTypes = ['all', 'terrace', 'farm', 'forest', 'campervan', 'car-camping', 'desert', 'lakeside', 'orchard'] as const;
const typeLabels: Record<string, string> = {
  all: 'All Sanctuaries', terrace: '🏔️ Terrace', farm: '🌾 Farm', forest: '🌲 Forest',
  campervan: '🚐 Road Stop', 'car-camping': '🚗 Car Camp', desert: '🏜️ Desert',
  lakeside: '🏞️ Lakeside', orchard: '🍎 Orchard',
};
const amenityFilters = ['Washroom', 'Fireplace', 'Water', 'Electricity', 'Parking', 'Local Food'];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = searchQuery === '' || listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || listing.location.toLowerCase().includes(searchQuery.toLowerCase()) || listing.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === 'all' || listing.type === activeType;
    const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.every(a => listing.amenities.some(amenity => amenity.toLowerCase().includes(a.toLowerCase())));
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
    return matchesSearch && matchesType && matchesAmenities && matchesPrice;
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
  };

  return (
    <div className="min-h-screen bg-offwhite pt-32 pb-24 selection:bg-orange selection:text-white">
      {/* SEARCH HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-forest rounded-[4rem] p-12 sm:p-24 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none grayscale">
            <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600&q=80" alt="" className="w-full h-full object-cover scale-110" />
          </div>
          <div className="max-w-3xl relative z-10">
             <p className="text-orange font-black uppercase tracking-[0.5em] text-[10px] mb-8 italic">The Disconnection Directory</p>
             <h1 className="text-5xl sm:text-8xl font-black mb-12 leading-[0.8] uppercase italic tracking-tighter">Find your <br /> <span className="text-orange">Sanctuary</span></h1>
             <div className="relative group">
                <Search size={28} className="absolute left-8 top-1/2 -translate-y-1/2 text-textgrey group-focus-within:text-orange transition-all duration-500" />
                <input 
                  type="text" 
                  placeholder="Search by valley, orchard, or highway..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-20 pr-10 py-8 rounded-[2.5rem] bg-white text-textdark text-xl font-black placeholder:text-textgrey/20 focus:outline-none focus:ring-8 focus:ring-orange/5 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] italic" 
                />
             </div>
          </div>
        </div>
      </section>

      {/* FILTER STICKY */}
      <section className="bg-white/80 backdrop-blur-3xl border-y border-gray-100 sticky top-20 sm:top-24 z-30 mb-20 shadow-xl shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            {allTypes.map(type => (
              <button 
                key={type} 
                onClick={() => setActiveType(type)} 
                className={`whitespace-nowrap px-8 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeType === type ? 'bg-forest text-white shadow-2xl shadow-forest/30 italic' : 'bg-offwhite text-forest hover:bg-forest/5'}`}
              >
                {typeLabels[type]}
              </button>
            ))}
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className={`whitespace-nowrap flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${showFilters ? 'bg-orange text-white italic shadow-2xl shadow-orange/30' : 'bg-offwhite text-forest hover:bg-forest/5'}`}
            >
              <SlidersHorizontal size={16} /> Filters
              {selectedAmenities.length > 0 && <span className="bg-white text-forest text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">{selectedAmenities.length}</span>}
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-12 pt-12 border-t border-gray-100 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-forest/30 mb-6 italic">Mandatory Site Comforts</p>
                <div className="flex flex-wrap gap-3">
                  {amenityFilters.map(amenity => (
                    <button 
                      key={amenity} 
                      onClick={() => toggleAmenity(amenity)} 
                      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedAmenities.includes(amenity) ? 'bg-forest text-white' : 'bg-offwhite text-textgrey hover:bg-forest/10'}`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-forest/30 mb-6 italic">Investment per Sunset (Limit: ₹{priceRange[1]})</p>
                <input 
                  type="range" 
                  min={0} 
                  max={5000} 
                  step={100} 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} 
                  className="w-full h-3 bg-offwhite rounded-full appearance-none cursor-pointer accent-orange" 
                />
                <div className="flex justify-between mt-4">
                  <span className="text-[10px] font-black text-textgrey tracking-widest uppercase">Free</span>
                  <span className="text-[10px] font-black text-textgrey tracking-widest uppercase">₹5,000</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16 px-4">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-forest/20 italic">
             Found <span className="text-forest underline decoration-orange decoration-4 underline-offset-4">{filteredListings.length}</span> Verified Locations
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-40 bg-white rounded-[4rem] shadow-2xl border border-gray-50 max-w-2xl mx-auto">
            <div className="text-[10rem] mb-12 grayscale opacity-10 italic leading-none">🏜️</div>
            <h3 className="text-4xl font-black text-forest mb-6 uppercase italic tracking-tighter">Trail Gone Cold</h3>
            <p className="text-textgrey font-bold text-lg max-w-sm mx-auto italic mb-12">No sanctuaries match this path. Re-evaluate your search or reset horizons.</p>
            <button onClick={() => {setSearchQuery(''); setActiveType('all'); setSelectedAmenities([]); setPriceRange([0, 5000]);}} className="bg-forest text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs italic shadow-2xl shadow-forest/20 hover:scale-105 transition-all">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredListings.map((listing) => (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="group bg-white rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4 border border-gray-100 flex flex-col">
                <div className="relative h-80 overflow-hidden">
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 shadow-xl shadow-black/10">
                    <span className="text-xs font-black text-forest italic leading-none tracking-tighter">₹{listing.price}<span className="text-[9px] opacity-30 uppercase tracking-widest ml-1 font-bold">/sunset</span></span>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-white/70 text-[9px] font-black uppercase tracking-[0.3em] mb-3">
                      <MapPin size={12} className="text-orange" /> {listing.location}
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase italic leading-[0.85] tracking-tighter">{listing.title}</h3>
                  </div>
                </div>
                
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 bg-orange/10 px-4 py-2 rounded-xl border border-orange/10">
                      <Star size={16} className="text-orange fill-orange" />
                      <span className="text-sm font-black text-forest italic">{listing.rating}</span>
                    </div>
                    <div className="flex gap-2">
                       {listing.amenities.some(a => a.toLowerCase().includes('washroom')) && <div className="w-10 h-10 rounded-xl bg-offwhite flex items-center justify-center text-forest shadow-inner" title="Verified Washroom"><Bath size={18} /></div>}
                       {listing.amenities.some(a => a.toLowerCase().includes('fire')) && <div className="w-10 h-10 rounded-xl bg-offwhite flex items-center justify-center text-forest shadow-inner" title="Verified Fire Pit"><Flame size={18} /></div>}
                    </div>
                  </div>
                  
                  <p className="text-sm text-textgrey font-medium leading-relaxed mb-10 line-clamp-3 italic opacity-70 group-hover:opacity-100 transition-opacity">"{listing.description}"</p>
                  
                  <div className="mt-auto pt-10 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black uppercase text-forest/20 tracking-[0.3em] mb-1 italic">Guardian Status</span>
                       <div className="flex items-center gap-1.5">
                          <Shield size={12} className="text-orange" />
                          <span className="text-[10px] font-black uppercase text-forest/50 tracking-widest">{listing.hostName}</span>
                       </div>
                    </div>
                    <div className="w-14 h-14 rounded-3xl bg-forest flex items-center justify-center text-white group-hover:bg-orange group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-forest/20 group-hover:shadow-orange/40">
                       <ArrowRight size={24} />
                    </div>
                  </div>
                  
                  {/* Actual Proof Badge */}
                  <div className="mt-6 flex items-center justify-center gap-2 py-3 bg-forest/5 rounded-2xl border border-forest/5">
                     <Camera size={14} className="text-forest/30" />
                     <span className="text-[9px] font-black uppercase text-forest/30 tracking-widest italic leading-none pt-0.5">Site Verified via Actual Proof</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
