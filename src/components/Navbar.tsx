import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandMark from "./BrandMark";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
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

  const navLinks = [
    { to: "/camping-guides", label: "Guides" },
    { to: "/blog", label: "Journal" },
    { to: "/community", label: "Community" },
    { to: "/host-your-land", label: "Host" },
  ];

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
          {navLinks.map((link) => (
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
          <Link
            to="/coming-soon"
            className="premium-focus ml-12 inline-flex items-center gap-2 rounded-lg bg-orange px-10 py-4 text-base font-black tracking-[-0.025em] text-white shadow-[0_18px_45px_rgba(230,126,34,0.26)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-dark"
          >
            Join Waitlist
          </Link>
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
              to="/coming-soon"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-orange px-4 py-3 text-base font-bold text-white"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
