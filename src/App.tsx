import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { trackPageView } from './lib/analytics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MarketplaceExplore from './pages/MarketplaceExplore';
import HostYourLand from './pages/HostYourLand';
import Support from './pages/Support';
import MarketplaceListing from './pages/MarketplaceListing';
import Community from './pages/Community';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import GuideDetail from "./pages/GuideDetail";
import Guides from "./pages/Guides";
import CampingGuideDetail from "./pages/CampingGuideDetail";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CancellationRefund from "./pages/CancellationRefund";
import Grievance from "./pages/Grievance";
import ResponsibleCampingPledge from "./pages/ResponsibleCampingPledge";
import SeoLanding from "./pages/SeoLanding";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import Waitlist from "./pages/Waitlist";
import SuggestCampsite from "./pages/SuggestCampsite";
import Confirmation from "./pages/Confirmation";
import About from "./pages/About";
import { AuthProvider } from "./lib/auth";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<MarketplaceExplore />} />
          <Route path="/listing/:id" element={<MarketplaceListing />} />
          <Route path="/coming-soon" element={<Waitlist />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/camping-guides" element={<Guides />} />
          <Route path="/camping-guides/:slug" element={<CampingGuideDetail />} />
          <Route path="/guides/:slug" element={<GuideDetail />} />
          <Route path="/signup" element={<Waitlist />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/suggest-campsite" element={<SuggestCampsite />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/account" element={<Account />} />
          <Route path="/host-your-land" element={<HostYourLand />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cancellation" element={<CancellationRefund />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/responsible-camping-pledge" element={<ResponsibleCampingPledge />} />
          <Route path="/camping-near-bangalore" element={<SeoLanding />} />
          <Route path="/camping-in-coorg" element={<SeoLanding />} />
          <Route path="/camping-in-wayanad" element={<SeoLanding />} />
          <Route path="/glamping-india" element={<SeoLanding />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider><Router><AppContent /></Router></AuthProvider>
  );
}
