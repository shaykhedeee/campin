import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-forest text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
               <div className="w-10 h-10 flex items-center justify-center bg-orange rounded-xl shadow-lg shadow-orange/20 transition-transform group-hover:rotate-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <path d="M2 20L12 2L22 20H2Z" />
                  <path d="M12 12V20" />
                  <path d="M9 16H15" />
                </svg>
              </div>
              <span className="text-2xl font-black text-white italic uppercase tracking-tighter">Camp<span className="text-orange">In</span></span>
            </Link>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed mb-6">Building India's Outdoor Identity since 2025.</p>
            <a href="https://instagram.com/campin.india" target="_blank" rel="noopener" className="text-xs font-black uppercase tracking-widest text-orange hover:text-white transition-colors italic">@campin.india</a>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-orange italic">Horizons</h4>
            <div className="space-y-4">
              <Link to="/explore" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">All Sanctuaries</Link>
              <Link to="/explore?type=terrace" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Terrace</Link>
              <Link to="/explore?type=farm" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Farm</Link>
              <Link to="/explore?type=forest" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Forest</Link>
              <Link to="/explore?type=campervan" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Road Stops</Link>
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-orange italic">Guardians</h4>
            <div className="space-y-4">
              <Link to="/host-your-land" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Host Your Land</Link>
              <Link to="/host-your-land" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">92% Earnings</Link>
              <span className="block text-xs font-bold uppercase tracking-widest text-white/20 italic">Backend Acceptance</span>
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-orange italic">Kinship</h4>
            <div className="space-y-4">
              <Link to="/signup" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Join Movement</Link>
              <Link to="/support" className="block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">Support CampIn</Link>
              <span className="block text-xs font-bold uppercase tracking-widest text-white/20 italic">WhatsApp Community</span>
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-orange italic">Echo</h4>
            <div className="space-y-4">
              <span className="block text-xs font-bold uppercase tracking-widest text-white/40">hello@campin.co.in</span>
              <span className="block text-xs font-bold uppercase tracking-widest text-white/20 italic">Voice coming soon</span>
              <span className="block text-xs font-bold uppercase tracking-widest text-white/40 italic underline underline-offset-4 decoration-orange/20">campin.co.in</span>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Stewardship</span>
            <span>© 2025 CampIn</span>
          </div>
          <p className="text-xs font-black uppercase italic tracking-[0.2em] text-white/40">
            Stay. Explore. <span className="text-orange">CampIn.</span> 🏕️
          </p>
        </div>
      </div>
    </footer>
  );
}
