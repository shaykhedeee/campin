import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-3 group transition-all duration-500">
    <div className="relative w-12 h-12 flex items-center justify-center bg-forest rounded-[1.25rem] shadow-[0_15px_30px_-5px_rgba(31,61,43,0.3)] group-hover:shadow-forest/40 overflow-hidden group-hover:rotate-6 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-tr from-forest-dark to-forest-light opacity-80" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 text-white relative z-10 drop-shadow-lg"
      >
        <path d="M2 20L12 2L22 20H2Z" />
        <path d="M12 12V20" />
        <path d="M9 16H15" />
      </svg>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="flex flex-col -space-y-1.5">
      <span className="text-3xl font-black text-forest tracking-tighter uppercase italic leading-none">
        Camp<span className="text-orange drop-shadow-sm">In</span>
      </span>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-[2px] bg-orange/30 rounded-full" />
        <span className="text-[10px] font-black text-textgrey/40 uppercase tracking-[0.3em] leading-none pt-0.5">Sanctuary</span>
      </div>
    </div>
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/explore', label: 'Explore' },
    { to: '/host-your-land', label: 'Host Your Land' },
    { to: '/support', label: 'Support CampIn' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Link to="/">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-bold tracking-tight uppercase transition-all duration-300 relative group ${
                  isActive(link.to)
                    ? 'text-forest'
                    : 'text-textgrey hover:text-forest'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-orange transition-transform duration-300 origin-left ${isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
            <Link
              to="/signup"
              className="bg-forest text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-forest-light transition-all duration-300 shadow-xl shadow-forest/10 hover:shadow-forest/20 hover:-translate-y-0.5 active:scale-95"
            >
              Join Movement
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-2xl bg-offwhite text-forest hover:bg-gray-100 transition-all active:scale-90 shadow-sm"
          >
            {isOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-50 transition-all duration-500 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
        <div className="px-4 py-8 space-y-4 bg-offwhite/50 backdrop-blur-3xl">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-4 rounded-2xl text-base font-bold uppercase tracking-tight transition-all ${
                isActive(link.to)
                  ? 'bg-white text-forest shadow-md'
                  : 'text-textgrey hover:bg-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block bg-forest text-white px-6 py-5 rounded-2xl text-sm font-black uppercase tracking-widest text-center shadow-lg active:scale-95 transition-all"
          >
            Join the community
          </Link>
        </div>
      </div>
    </nav>
  );
}
