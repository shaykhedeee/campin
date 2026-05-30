import { Link } from "react-router-dom";
import { Camera, Mail, MapPin, Shield } from "lucide-react";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex">
              <BrandMark inverted />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              India's permission-first camping community. Built for private land stays, practical guides,
              host nominations, and the people who want camping to be safer and more respectful.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:hello@campin.co.in"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                <Mail size={16} />
                hello@campin.co.in
              </a>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white/70">
                <Camera size={16} />
                Instagram coming soon
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-orange">Explore</h2>
            <div className="mt-4 space-y-3 text-sm">
              <Link to="/coming-soon" className="block text-white/60 hover:text-white">
                Join waitlist
              </Link>
              <Link to="/camping-guides" className="block text-white/60 hover:text-white">
                Camping guides
              </Link>
              <Link to="/blog" className="block text-white/60 hover:text-white">
                CampIn Journal
              </Link>
              <Link to="/community" className="block text-white/60 hover:text-white">
                Community
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-orange">Host</h2>
            <div className="mt-4 space-y-3 text-sm">
              <Link to="/host-your-land" className="block text-white/60 hover:text-white">
                List your land
              </Link>
              <span className="block text-white/50">Founding host program</span>
              <span className="block text-white/50">Host verification</span>
              <span className="block text-white/50">Permission-first stays</span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-orange">Trust</h2>
            <div className="mt-4 space-y-3 text-sm">
              <span className="flex items-center gap-2 text-white/60">
                <Shield size={16} />
                Manual review first
              </span>
              <span className="flex items-center gap-2 text-white/60">
                <MapPin size={16} />
                Exact pins required
              </span>
              <Link to="/signup" className="block text-white/60 hover:text-white">
                Join community
              </Link>
              <Link to="/community" className="block text-white/60 hover:text-white">
                WhatsApp community
              </Link>
              <Link to="/responsible-camping-pledge" className="block text-white/60 hover:text-white">
                Responsible pledge
              </Link>
              <Link to="/support" className="block text-white/60 hover:text-white">
                Support CampIn
              </Link>
              <div className="pt-3 text-xs font-bold uppercase tracking-widest text-white/40">Legal</div>
              <Link to="/terms" className="block text-white/60 hover:text-white">
                Terms
              </Link>
              <Link to="/privacy" className="block text-white/60 hover:text-white">
                Privacy
              </Link>
              <Link to="/cancellation" className="block text-white/60 hover:text-white">
                Cancellation & refunds
              </Link>
              <Link to="/grievance" className="block text-white/60 hover:text-white">
                Grievance support
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 CampIn. Stay. Explore. CampIn.</p>
          <p>Built from the CampIn operating system, trust first.</p>
        </div>
      </div>
    </footer>
  );
}
