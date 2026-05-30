import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Signup from './pages/Signup';
import HostYourLand from './pages/HostYourLand';
import Support from './pages/Support';
import ListingDetail from './pages/ListingDetail';
import ValidationMachine from './pages/ValidationMachine';
import StrategyLab from './pages/StrategyLab';
import OpsCenter from './pages/OpsCenter';
import ComingSoon from './pages/ComingSoon';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/camping-guides" element={<Guides />} />
          <Route path="/camping-guides/:slug" element={<CampingGuideDetail />} />
          <Route path="/guides/:slug" element={<GuideDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/host-your-land" element={<HostYourLand />} />
          <Route path="/validation" element={<ValidationMachine />} />
          <Route path="/ops" element={<OpsCenter />} />
          <Route path="/strategy" element={<StrategyLab />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cancellation" element={<CancellationRefund />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/responsible-camping-pledge" element={<ResponsibleCampingPledge />} />
        </Routes>
      </main>
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
