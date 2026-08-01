import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardCheck, Lightbulb, ArrowLeft } from "lucide-react";
import OpsCenter from "./pages/OpsCenter";
import ValidationMachine from "./pages/ValidationMachine";
import StrategyLab from "./pages/StrategyLab";

function AdminNavbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Ops Center", icon: LayoutDashboard },
    { path: "/validation", label: "Validation Machine", icon: ClipboardCheck },
    { path: "/strategy", label: "Strategy Lab", icon: Lightbulb },
  ];

  return (
    <header className="bg-stone-900 border-b border-stone-800 text-stone-100 sticky top-0 z-50 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-extrabold px-3 py-1 rounded text-sm tracking-wider uppercase">
              CampIn Ops
            </span>
          </Link>
          <span className="text-stone-500">|</span>
          <span className="text-xs text-stone-400 font-mono">Secure Administration Dashboard</span>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-600/20 text-orange-400 border border-orange-500/30"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Utility / Exit link */}
        <a
          href="/"
          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Public Site
        </a>
      </div>
    </header>
  );
}

export default function AdminApp() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
        <AdminNavbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<OpsCenter />} />
            <Route path="/validation" element={<ValidationMachine />} />
            <Route path="/strategy" element={<StrategyLab />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
