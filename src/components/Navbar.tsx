import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import BrandMark from "./BrandMark";
import { useAuth } from "../lib/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showCampsites, setShowCampsites] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [{ to: "/explore", label: "Campsites" }, { to: "/explore", label: "Destinations" }, { to: "/about", label: "About us" }];
  const categories = [["/explore?category=bring-your-own-tent", "Own-tent camping"], ["/explore?type=overland", "Hosted tents"], ["/explore?category=pre-pitched-glamping", "Glamping"], ["/explore?vehicle=campervan", "Campervan & RV sites"], ["/explore?category=farms-estates", "Farm stays"], ["/explore?vehicle=road-stop", "Road stops"]];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isHome
          ? hasScrolled
            ? "border-b border-white/10 bg-[#0a1e14]/95 text-white backdrop-blur-md shadow-lg"
            : "border-b border-transparent bg-transparent text-white"
          : "border-b border-forest/10 bg-offwhite/95 text-forest backdrop-blur-xl"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-8 lg:px-10 ${
          isHome && hasScrolled ? "h-14 sm:h-20" : "h-16 sm:h-24"
        }`}
      >
        <Link to="/" aria-label="CampIn home" onClick={() => setIsOpen(false)} className="min-w-0">
          <BrandMark compact inverted={isHome} className="sm:hidden" />
          <BrandMark inverted={isHome} className="hidden sm:flex" />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <div className="relative" onMouseEnter={()=>setShowCampsites(true)} onMouseLeave={()=>setShowCampsites(false)}>
            <Link to="/explore" onFocus={()=>setShowCampsites(true)} className={`inline-flex items-center gap-1 rounded-lg px-1 py-2 text-base font-extrabold tracking-[-0.035em] ${isHome ? "text-white" : "text-textgrey hover:text-forest"}`}>Campsites <ChevronDown size={16}/></Link>
            {showCampsites && <div className="absolute left-0 top-full w-56 rounded-xl border border-forest/10 bg-white p-2 shadow-xl">{categories.map(([to,label])=><Link key={to} to={to} onClick={()=>setShowCampsites(false)} className="block rounded-lg px-3 py-2 text-sm font-bold text-forest hover:bg-offwhite">{label}</Link>)}</div>}
          </div>
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-1 py-2 text-base font-extrabold tracking-[-0.035em] transition-colors ${
                isActive(link.to)
                  ? isHome
                    ? "bg-white/14 text-white"
                    : "bg-forest text-white"
                  : isHome
                    ? "text-white hover:bg-white/10"
                    : "text-textgrey hover:bg-white hover:text-forest"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/explore" aria-label="Search campsites" className={`ml-3 ${isHome ? "text-white" : "text-forest"}`}><Search size={20}/></Link>
          <Link to="/host-your-land" className="premium-focus ml-2 inline-flex items-center rounded-lg bg-orange px-5 py-3 text-sm font-black text-white transition hover:bg-orange-dark">List your campsite</Link>
          <Link to={user ? "/account" : "/auth"} className={`ml-1 text-sm font-black ${isHome ? "text-white" : "text-forest"}`}>{user ? "Account" : "Sign in"}</Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-forest shadow-sm md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-forest/10 bg-offwhite px-4 py-4 shadow-xl md:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-4 py-3 text-base font-semibold ${
                  isActive(link.to) ? "bg-forest text-white" : "bg-white text-forest"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/host-your-land"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-orange px-4 py-3 text-base font-bold text-white"
            >
              List your campsite
            </Link>
            <Link to={user ? "/account" : "/auth"} onClick={()=>setIsOpen(false)} className="block rounded-lg bg-forest px-4 py-3 text-center text-base font-bold text-white">{user ? "Account" : "Sign in"}</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
