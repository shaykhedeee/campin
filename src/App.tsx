import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { trackPageView } from './lib/analytics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const Home = lazy(() => import('./pages/Home'));
const MarketplaceExplore = lazy(() => import('./pages/MarketplaceExplore'));
const HostYourLand = lazy(() => import('./pages/HostYourLand'));
const Support = lazy(() => import('./pages/Support'));
const MarketplaceListing = lazy(() => import('./pages/MarketplaceListing'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const GuideDetail = lazy(() => import('./pages/GuideDetail'));
const Guides = lazy(() => import('./pages/Guides'));
const CampingGuideDetail = lazy(() => import('./pages/CampingGuideDetail'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const CancellationRefund = lazy(() => import('./pages/CancellationRefund'));
const Grievance = lazy(() => import('./pages/Grievance'));
const ResponsibleCampingPledge = lazy(() => import('./pages/ResponsibleCampingPledge'));
const SeoLanding = lazy(() => import('./pages/SeoLanding'));
const Auth = lazy(() => import('./pages/Auth'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Account = lazy(() => import('./pages/Account'));
const Waitlist = lazy(() => import('./pages/Waitlist'));
const SuggestCampsite = lazy(() => import('./pages/SuggestCampsite'));
const Confirmation = lazy(() => import('./pages/Confirmation'));
const About = lazy(() => import('./pages/About'));
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
        <Suspense fallback={<div className="mx-auto min-h-[45vh] max-w-7xl px-4 py-16 text-forest" role="status">Loading Campin…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<MarketplaceExplore />} />
          <Route path="/listing/:id" element={<MarketplaceListing />} />
          <Route path="/coming-soon" element={<Waitlist />} />
          <Route path="/community" element={<Navigate to="/waitlist" replace />} />
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
        </Suspense>
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
