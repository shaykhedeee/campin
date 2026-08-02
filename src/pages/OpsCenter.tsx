import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  CheckCircle,
  Edit,
  ExternalLink,
  FileText,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Plus,
  RefreshCw,
  Share2,
  Shield,
  Target,
  Trash,
  Zap,
} from "lucide-react";
import { getListings, isListingPubliclyPublishable, saveListings, type Listing, type ListingType, type VerificationStage } from "../data/listings";
import { getBlogPosts, saveBlogPosts, type BlogPost, type BlogSection, type BlogFaq } from "../data/blogPosts";
import { exportMvpLeadsToCsv, readMvpLeads } from "../lib/mvpLeadStore";
import { getValidationProgress, readValidationLeads } from "../lib/validationMachine";

const InstagramIcon = ({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const checklistStorageKey = "campin.ops.checklist.v1";
const setupTasks = [
  { id: "domain", label: "Register campin.co.in" },
  { id: "workspace", label: "Google Workspace setup (support@campin.co.in)" },
  { id: "lead-capture", label: "Lead capture destination confirmed" },
  { id: "razorpay", label: "Razorpay account activation" },
  { id: "socials", label: "Instagram @campin.co.in creation" },
  { id: "blog-verification", label: "Publish approved Journal backlog with local images" },
];

export default function OpsCenter() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("campin.admin.auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"analytics" | "listings" | "blogs" | "outbox" | "tasks">("analytics");
  const [activeListings, setActiveListings] = useState(() => getListings());
  const [activeBlogs, setActiveBlogs] = useState(() => getBlogPosts());

  // Social draft export state.
  const [isIgConnected, setIsIgConnected] = useState(() => {
    return localStorage.getItem("campin.ig.connected") === "true";
  });
  const [isConnectingIg, setIsConnectingIg] = useState(false);
  const [igAccount] = useState(() => {
    return localStorage.getItem("campin.ig.handle") || "@campin.co.in";
  });

  const [emailLogs, setEmailLogs] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("campin.email.logs.v1") || "[]");
    } catch {
      return [];
    }
  });

  const [checkedTaskIds, setCheckedTaskIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(checklistStorageKey);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Form states for campsite management
  const [isCampsiteFormOpen, setIsCampsiteFormOpen] = useState(false);
  const [editingCampsiteId, setEditingCampsiteId] = useState<string | null>(null);
  const [publishCampsiteToIg, setPublishCampsiteToIg] = useState(false);
  const [campsiteForm, setCampsiteForm] = useState({
    id: "",
    title: "",
    location: "",
    state: "Karnataka",
    region: "",
    price: 800,
    type: "byot" as ListingType,
    typeLabel: "Premium Pitch",
    description: "",
    longDescription: "",
    googlePin: "",
    imageVerified: false,
    byotFriendly: true,
    campervanFriendly: false,
    roadStop: false,
    maxGuests: 4,
    amenitiesInput: "Washroom, Drinking water, Campfire pit",
    essentialsInput: "Lockable restroom, Charging hooks",
    tagsInput: "Farm, Riverside",
    highlightsInput: "Coffee grove views, Starry skies",
  });

  // Form states for blog management
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [publishBlogToIg, setPublishBlogToIg] = useState(false);
  const [blogForm, setBlogForm] = useState({
    slug: "",
    title: "",
    metaTitle: "",
    metaDescription: "",
    category: "Camping Guides",
    readTime: "7 min read",
    primaryKeyword: "",
    summary: "",
    directAnswer: "",
    heroImage: "/images/blog_coorg_estate.jpg",
    takeawaysInput: "Choose verified private lands\nAlways pack high-quality rain tarps",
    sectionsInput: "### 1. Preparation and Pitching\nPack ground sheets and storm anchors.\n\n### 2. Legal Boundaries\nVerify border markers with landowners.",
    faqsInput: "Is it legal to camp?\nYes, on private farms with owner approval.\n\nWhat about wildlife?\nStick to fenced properties.",
  });

  useEffect(() => {
    const handleSync = () => {
      setActiveListings(getListings());
      setActiveBlogs(getBlogPosts());
    };
    window.addEventListener("campin-listings-updated", handleSync);
    window.addEventListener("campin-blogs-updated", handleSync);
    return () => {
      window.removeEventListener("campin-listings-updated", handleSync);
      window.removeEventListener("campin-blogs-updated", handleSync);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(checklistStorageKey, JSON.stringify([...checkedTaskIds]));
  }, [checkedTaskIds]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "campin2026") {
      sessionStorage.setItem("campin.admin.auth", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect master password. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("campin.admin.auth");
    setIsAuthenticated(false);
  };

  // Enable manual social draft export mode.
  const connectInstagram = () => {
    setIsConnectingIg(true);
    setTimeout(() => {
      localStorage.setItem("campin.ig.connected", "true");
      localStorage.setItem("campin.ig.handle", "@campin.co.in");
      setIsIgConnected(true);
      setIsConnectingIg(false);

      triggerOutboxEmail(
        "support@campin.co.in",
        "Instagram draft export enabled",
        `Draft export mode is enabled for ${igAccount}. Final posting still requires a real social account workflow.`,
        "Social Draft Export"
      );
    }, 2000);
  };

  const disconnectInstagram = () => {
    localStorage.removeItem("campin.ig.connected");
    localStorage.removeItem("campin.ig.handle");
    setIsIgConnected(false);
  };

  const downloadTextFile = (filename: string, content: string, mimeType = "text/plain") => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper to log actions to system outbox
  const triggerOutboxEmail = (recipient: string, subject: string, body: string, campaign: string) => {
    const newLog = {
      recipientEmail: recipient,
      subject,
      body,
      campaign,
      timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
    };
    const nextLogs = [newLog, ...emailLogs];
    setEmailLogs(nextLogs);
    localStorage.setItem("campin.email.logs.v1", JSON.stringify(nextLogs));
  };

  // Campsite CRUD Actions
  const openAddCampsite = () => {
    setEditingCampsiteId(null);
    setPublishCampsiteToIg(false);
    setCampsiteForm({
      id: "",
      title: "",
      location: "",
      state: "Karnataka",
      region: "",
      price: 800,
      type: "byot",
      typeLabel: "Premium Pitch",
      description: "",
      longDescription: "",
      googlePin: "",
      imageVerified: false,
      byotFriendly: true,
      campervanFriendly: false,
      roadStop: false,
      maxGuests: 4,
      amenitiesInput: "Washroom, Drinking water, Campfire pit",
      essentialsInput: "Lockable restroom, Charging hooks",
      tagsInput: "Farm, Riverside",
      highlightsInput: "Coffee grove views, Starry skies",
    });
    setIsCampsiteFormOpen(true);
  };

  const openEditCampsite = (listing: Listing) => {
    setEditingCampsiteId(listing.id);
    setPublishCampsiteToIg(false);
    setCampsiteForm({
      id: listing.id,
      title: listing.title,
      location: listing.location,
      state: listing.state,
      region: listing.region,
      price: listing.price,
      type: listing.type,
      typeLabel: listing.typeLabel,
      description: listing.description,
      longDescription: listing.longDescription,
      googlePin: listing.googlePin,
      imageVerified: Boolean(listing.imageVerified),
      byotFriendly: listing.byotFriendly,
      campervanFriendly: listing.campervanFriendly,
      roadStop: listing.roadStop,
      maxGuests: listing.maxGuests,
      amenitiesInput: listing.amenities.join(", "),
      essentialsInput: listing.essentials.join(", "),
      tagsInput: listing.tags.join(", "),
      highlightsInput: listing.highlights.join(", "),
    });
    setIsCampsiteFormOpen(true);
  };

  const handleCampsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormListing: Listing = {
      id: campsiteForm.id || `site-${Date.now()}`,
      title: campsiteForm.title,
      location: campsiteForm.location,
      state: campsiteForm.state,
      region: campsiteForm.region,
      type: campsiteForm.type,
      typeLabel: campsiteForm.typeLabel,
      price: Number(campsiteForm.price),
      description: campsiteForm.description,
      longDescription: campsiteForm.longDescription,
      googlePin: campsiteForm.googlePin,
      byotFriendly: campsiteForm.byotFriendly,
      campervanFriendly: campsiteForm.campervanFriendly,
      roadStop: campsiteForm.roadStop,
      maxGuests: Number(campsiteForm.maxGuests),
      image: "/images/blog_coorg_estate.jpg",
      imageVerified: campsiteForm.imageVerified,
      gallery: ["/images/blog_coorg_estate.jpg"],
      rating: 4.8,
      reviews: 4,
      hostName: "CampIn Onboarding Team",
      amenities: campsiteForm.amenitiesInput.split(",").map((s) => s.trim()).filter(Boolean),
      essentials: campsiteForm.essentialsInput.split(",").map((s) => s.trim()).filter(Boolean),
      tags: campsiteForm.tagsInput.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: campsiteForm.highlightsInput.split(",").map((s) => s.trim()).filter(Boolean),
      verification: ["Submitted through CampIn console", "Needs current host confirmation before stronger claims"],
      bestFor: "Request-first camper interest and host review",
      accessNote: "Access details must be confirmed with the host before any guest handoff.",
      signal: "Mobile signal not confirmed yet",
      permissionStatus: "not_verified",
      inventory: [
        {
          id: "request-pitch",
          label: "Request-first pitch",
          unitType: "tent_pitch",
          quantity: 1,
          maxGuestsPerUnit: Number(campsiteForm.maxGuests),
          pricePerNight: Number(campsiteForm.price),
        },
      ],
      verificationStage: editingCampsiteId ? (activeListings.find(l => l.id === editingCampsiteId)?.verificationStage || "reviewed") : "reviewed",
      sourceUrls: ["https://campin.co.in"],
      unknowns: [],
      availability: { mode: "request_to_book", minNights: 1 },
      hostContactMode: "campin_relay",
      contactPolicy: "gated_relay",
      contactVerificationStatus: "not_found",
      sourceType: "manual_research",
      confidence: {
        byotAllowed: "high",
        overnightParking: "high",
        washroom: "high",
        water: "high",
        electricity: "high",
        directBusinessContact: "high",
        campervanSuitability: "high",
      },
      nextAction: "Confirm permission, facilities, access, and host contact before public promotion.",
    };

    let nextListings;
    if (editingCampsiteId) {
      nextListings = activeListings.map((l) => (l.id === editingCampsiteId ? updatedFormListing : l));
    } else {
      nextListings = [...activeListings, updatedFormListing];
    }
    saveListings(nextListings);

    // Social draft export for manual review.
    if (publishCampsiteToIg && isIgConnected) {
      triggerOutboxEmail(
        "social-draft",
        `Social draft ready: ${campsiteForm.title}`,
        `POST PAYLOAD: {\n  "media_type": "IMAGE",\n  "image_url": "https://campin.co.in/images/blog_coorg_estate.jpg",\n  "caption": "New CampIn review candidate\\n\\n${campsiteForm.title} in ${campsiteForm.location}, ${campsiteForm.state}.\\n\\nRegion: ${campsiteForm.region}\\nRequest-first price signal: INR ${campsiteForm.price}/night\\n\\nCampIn reviews permission, access, washrooms, water, and host rules before any guest handoff. #campingindia #overlandingindia #campin",\n  "location_id": "india"\n}`,
        "Social Draft Export"
      );
      alert(`Social draft prepared for ${campsiteForm.title}. Review before posting.`);
    }

    setIsCampsiteFormOpen(false);
    setEditingCampsiteId(null);
  };

  const deleteCampsite = (id: string) => {
    if (confirm("Are you sure you want to delete this campsite?")) {
      saveListings(activeListings.filter((l) => l.id !== id));
    }
  };

  const toggleVerification = (id: string) => {
    const nextListings = activeListings.map((l) => {
      if (l.id === id) {
        if (l.verificationStage !== "reviewed" && !isListingPubliclyPublishable({ ...l, verificationStage: "reviewed" })) {
          alert("This listing is blocked. Add source-backed details, a verified property image, a current check date, and clear all unknowns before approving it.");
          return l;
        }
        const nextStage: VerificationStage = l.verificationStage === "reviewed" ? "lead" : "reviewed";
        return { ...l, verificationStage: nextStage };
      }
      return l;
    });
    saveListings(nextListings);
  };

  // Blog CRUD Actions
  const openAddBlog = () => {
    setEditingBlogSlug(null);
    setPublishBlogToIg(false);
    setBlogForm({
      slug: "",
      title: "",
      metaTitle: "",
      metaDescription: "",
      category: "Camping Guides",
      readTime: "7 min read",
      primaryKeyword: "",
      summary: "",
      directAnswer: "",
      heroImage: "/images/blog_coorg_estate.jpg",
      takeawaysInput: "Choose verified private lands\nAlways pack high-quality rain tarps",
      sectionsInput: "### 1. Preparation and Pitching\nPack ground sheets and storm anchors.\n\n### 2. Legal Boundaries\nVerify border markers with landowners.",
      faqsInput: "Is it legal to camp?\nYes, on private farms with owner approval.\n\nWhat about wildlife?\nStick to fenced properties.",
    });
    setIsBlogFormOpen(true);
  };

  const openEditBlog = (post: BlogPost) => {
    setEditingBlogSlug(post.slug);
    setPublishBlogToIg(false);
    setBlogForm({
      slug: post.slug,
      title: post.title,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      category: post.category,
      readTime: post.readTime,
      primaryKeyword: post.primaryKeyword,
      summary: post.summary,
      directAnswer: post.directAnswer,
      heroImage: post.heroImage,
      takeawaysInput: post.takeaways.join("\n"),
      sectionsInput: post.sections.map(s => `${s.heading}\n${s.body.join("\n")}`).join("\n\n"),
      faqsInput: post.faqs.map(f => `${f.question}\n${f.answer}`).join("\n\n"),
    });
    setIsBlogFormOpen(true);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse sections
    const rawSections = blogForm.sectionsInput.split(/\n\n+/);
    const sections: BlogSection[] = rawSections.map((sect) => {
      const lines = sect.split("\n").filter(Boolean);
      const heading = lines[0] || "Section";
      const body = lines.slice(1);
      return { heading, body };
    });

    // Parse FAQs
    const rawFaqs = blogForm.faqsInput.split(/\n\n+/);
    const faqs: BlogFaq[] = rawFaqs.map((fq) => {
      const lines = fq.split("\n").filter(Boolean);
      return {
        question: lines[0] || "Question",
        answer: lines[1] || "Answer",
      };
    });

    const updatedBlog: BlogPost = {
      slug: blogForm.slug || `blog-${Date.now()}`,
      title: blogForm.title,
      metaTitle: blogForm.metaTitle,
      metaDescription: blogForm.metaDescription,
      publishedAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      category: blogForm.category,
      readTime: blogForm.readTime,
      primaryKeyword: blogForm.primaryKeyword,
      secondaryKeywords: [],
      audience: "CampIn readers",
      searchIntent: "Acquire practical camping guides",
      summary: blogForm.summary,
      directAnswer: blogForm.directAnswer,
      heroImage: blogForm.heroImage,
      takeaways: blogForm.takeawaysInput.split("\n").map(t => t.trim()).filter(Boolean),
      sections,
      campinAngle: "CampIn helps campers request permission-first, reviewed outdoor stays in India.",
      cta: { label: "Explore Sites", href: "/explore", text: "Choose reviewed request-first properties on CampIn." },
      faqs,
      sources: [],
      schema: ["BlogPosting", "FAQPage"],
    };

    let nextBlogs;
    if (editingBlogSlug) {
      nextBlogs = activeBlogs.map((b) => (b.slug === editingBlogSlug ? updatedBlog : b));
    } else {
      nextBlogs = [...activeBlogs, updatedBlog];
    }
    saveBlogPosts(nextBlogs);

    // Social draft export for manual review.
    if (publishBlogToIg && isIgConnected) {
      triggerOutboxEmail(
        "social-draft",
        `Social draft ready: ${blogForm.title}`,
        `POST PAYLOAD: {\n  "media_type": "IMAGE",\n  "image_url": "https://campin.co.in${blogForm.heroImage}",\n  "caption": "New CampIn Journal guide\\n\\n${blogForm.title}\\n\\nRead the practical outdoor guide on CampIn.co.in.\\n\\n#campingindia #overlandingindia #responsibletravel #campin",\n  "link": "https://campin.co.in/blog/${blogForm.slug}"\n}`,
        "Social Draft Export"
      );
      alert(`Social draft prepared for "${blogForm.title}". Review before posting.`);
    }

    setIsBlogFormOpen(false);
    setEditingBlogSlug(null);
  };

  const deleteBlog = (slug: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      saveBlogPosts(activeBlogs.filter((b) => b.slug !== slug));
    }
  };

  const mvpLeads = readMvpLeads();
  const legacyLeads = readValidationLeads();
  const guideUnlockLeads = mvpLeads.filter((lead) => lead.type === "guide_unlock");
  const newsletterLeads = mvpLeads.filter((lead) => lead.type === "newsletter");
  const hostLeads = mvpLeads.filter((lead) => lead.type === "host_interest");
  const listingRequests = mvpLeads.filter((lead) => lead.type === "listing_inquiry");
  const latestLeadRows = [...mvpLeads, ...legacyLeads].slice(0, 8);

  // Auth screen fallback
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite px-4">
        <div className="w-full max-w-md rounded-3xl border border-forest/10 bg-white p-8 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/10 text-orange">
              <Lock size={32} />
            </div>
            <h1 className="mt-5 text-2xl font-black text-forest">CampIn Launch Console</h1>
            <p className="mt-2 text-sm text-textgrey">Enter the administrative credential to control listings and content.</p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-forest/75 tracking-wider">Master Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-orange focus:outline-none"
              />
            </div>

            {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-forest px-4 py-3 text-sm font-black text-white hover:bg-forest-light transition"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite pt-24 pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-white">
              <Shield size={20} />
            </span>
            <div>
              <h1 className="text-lg font-black text-forest">CampIn Console</h1>
              <p className="text-xs text-textgrey font-semibold">Launch capture command center</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-forest/10 px-4 py-2 text-sm font-bold text-forest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 border-b border-forest/10 pb-4">
          {[
            { id: "analytics", label: "Launch Leads & Drafts", icon: LayoutDashboard },
            { id: "listings", label: "Campsite Reviews", icon: MapPin },
            { id: "blogs", label: "Blog Editor", icon: FileText },
            { id: "outbox", label: "Email & Social Outbox", icon: Mail },
            { id: "tasks", label: "Launch Tasks", icon: Target },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                  isActive
                    ? "bg-forest text-white shadow-md"
                    : "bg-white text-forest border border-forest/10 hover:bg-forest/5"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Tab 1: Analytics, Socials & Connection */}
        {activeTab === "analytics" && (
          <section className="mt-8 space-y-8 animate-fade-up">
            {/* Connection Panel */}
            <div className="rounded-2xl border border-orange/20 bg-orange/5 p-6 shadow-sm flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4 items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/15 text-orange">
                  <InstagramIcon size={24} />
                </span>
                <div>
                  <h3 className="text-lg font-black text-forest">Social Draft Export</h3>
                  <p className="text-sm text-textgrey leading-relaxed">
                    {isIgConnected
                      ? `Draft export is enabled for ${igAccount}. Final posting remains manual.`
                      : "Enable a manual social draft queue for listings and articles."}
                  </p>
                </div>
              </div>

              {isIgConnected ? (
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-forest px-3 py-1 text-xs font-black text-white">
                    Draft mode on
                  </span>
                  <button
                    onClick={disconnectInstagram}
                    className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                  >
                    Turn off
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectInstagram}
                  disabled={isConnectingIg}
                  className="flex items-center gap-2 rounded-lg bg-orange px-5 py-2.5 text-sm font-black text-white hover:bg-orange-dark transition"
                >
                  {isConnectingIg ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Preparing queue...
                    </>
                  ) : (
                    <>
                      <Share2 size={16} />
                      Enable Draft Export
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Metrics cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-textgrey">Guide Unlocks</p>
                <p className="mt-2 text-4xl font-black text-forest">{guideUnlockLeads.length}</p>
                <p className="mt-1 text-xs text-textgrey font-semibold">Portable checklist requests</p>
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-textgrey">Campfire Leads</p>
                <p className="mt-2 text-4xl font-black text-forest">{newsletterLeads.length}</p>
                <p className="mt-1 text-xs text-textgrey font-semibold">Guide drop + weekly update subscribers</p>
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-textgrey">Verified Campsites</p>
                <p className="mt-2 text-4xl font-black text-forest">
                  {activeListings.filter((l) => l.verificationStage === "reviewed").length}
                </p>
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-textgrey">CampIn Leads</p>
                <p className="mt-2 text-4xl font-black text-forest">
                  {legacyLeads.length + mvpLeads.length}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-black text-forest">Lead Command Center</h3>
                  <p className="text-sm text-textgrey">
                    Segment and export starter-phase captures: guide unlocks, Campfire subscribers, host leads, and listing requests.
                  </p>
                </div>
                <button
                  onClick={() =>
                    downloadTextFile(
                      `campin-leads-${new Date().toISOString().slice(0, 10)}.csv`,
                      exportMvpLeadsToCsv(mvpLeads),
                      "text/csv"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-forest/10 px-4 py-2 text-sm font-black text-forest hover:bg-forest hover:text-white transition"
                >
                  <FileText size={16} />
                  Export lead CSV
                </button>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {[
                  ["Guide unlocks", guideUnlockLeads.length],
                  ["Campfire subscribers", newsletterLeads.length],
                  ["Host applications", hostLeads.length],
                  ["Listing requests", listingRequests.length],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-offwhite p-4">
                    <p className="text-xs font-black uppercase tracking-wider text-textgrey">{label}</p>
                    <p className="mt-2 text-2xl font-black text-forest">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-forest/10">
                <table className="min-w-full divide-y divide-forest/10 text-left text-sm">
                  <thead className="bg-forest/5 text-xs font-black uppercase tracking-wider text-forest/75">
                    <tr>
                      <th className="px-4 py-3">Lead</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-forest/10">
                    {latestLeadRows.length === 0 ? (
                      <tr>
                        <td className="px-4 py-4 text-textgrey" colSpan={4}>No local lead captures yet.</td>
                      </tr>
                    ) : (
                      latestLeadRows.map((lead: any) => (
                        <tr key={lead.id}>
                          <td className="px-4 py-3 font-bold text-forest">{lead.name || lead.email || lead.phone || lead.id}</td>
                          <td className="px-4 py-3 text-textgrey">{lead.type || lead.leadType || "legacy"}</td>
                          <td className="px-4 py-3 text-textgrey">{lead.city || "-"}</td>
                          <td className="px-4 py-3 text-textgrey">{lead.status || lead.syncStatus || "captured"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-black text-forest">Launch Capture Targets</h3>
                <div className="mt-6 space-y-4">
                  {getValidationProgress().map((item) => {
                    const percent = Math.min(100, Math.round((item.current / item.target) * 100));
                    return (
                      <div key={item.key}>
                        <div className="flex justify-between text-sm font-bold text-forest">
                          <span>{item.label}</span>
                          <span>{item.current} / {item.target}</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full rounded-full bg-forest/5 overflow-hidden">
                          <div className="h-full bg-orange transition-all" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Draft Preview */}
              <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-forest flex items-center gap-2">
                  <InstagramIcon size={20} className="text-orange" />
                  Social Draft Preview
                </h3>
                {isIgConnected ? (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "/images/blog_coorg_estate.jpg",
                      "/images/blog_bangalore_hill.jpg",
                      "/images/blog_legal_verify.jpg",
                      "/images/blog_monsoon_ghats.jpg",
                      "/images/blog_campervan_stop.jpg",
                      "/images/blog_ramanagara_stars.jpg",
                    ].map((img, idx) => (
                      <div key={idx} className="relative aspect-square overflow-hidden rounded-lg bg-forest/5">
                        <img src={img} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-textgrey">
                    <p className="font-semibold text-sm">Enable draft export mode to prepare manual social posts.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Campsite Reviews & CRUD */}
        {activeTab === "listings" && (
          <section className="mt-8 space-y-6 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-forest">Manage Campsites Directory</h2>
                <p className="text-sm text-textgrey">Review listings, add access notes, or update public review status.</p>
              </div>
              <button
                onClick={openAddCampsite}
                className="flex items-center gap-2 rounded-lg bg-orange px-4 py-2 text-sm font-black text-white hover:bg-orange-dark transition"
              >
                <Plus size={16} />
                Add Campsite
              </button>
            </div>

            {/* Campsite Form Modal / Section */}
            {isCampsiteFormOpen && (
              <form onSubmit={handleCampsiteSubmit} className="rounded-2xl border border-forest/10 bg-white p-6 shadow-lg space-y-4">
                <h3 className="text-lg font-black text-forest">
                  {editingCampsiteId ? "Edit Campsite Details" : "Add New Campsite Listing"}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Listing ID (Unique slug)</label>
                    <input
                      type="text"
                      required
                      disabled={!!editingCampsiteId}
                      value={campsiteForm.id}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, id: e.target.value })}
                      placeholder="e.g. malabar-hills-camp"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Campsite Title</label>
                    <input
                      type="text"
                      required
                      value={campsiteForm.title}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, title: e.target.value })}
                      placeholder="e.g. Malabar Hills Wilderness Camp"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Location City</label>
                    <input
                      type="text"
                      required
                      value={campsiteForm.location}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, location: e.target.value })}
                      placeholder="e.g. Chikmagalur"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">State</label>
                    <input
                      type="text"
                      required
                      value={campsiteForm.state}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, state: e.target.value })}
                      placeholder="e.g. Karnataka"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Region Corridor</label>
                    <input
                      type="text"
                      required
                      value={campsiteForm.region}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, region: e.target.value })}
                      placeholder="e.g. Western Ghats coffee corridor"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Price Per Night (₹)</label>
                    <input
                      type="number"
                      required
                      value={campsiteForm.price}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, price: Number(e.target.value) })}
                      placeholder="800"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Campsite Type</label>
                    <select
                      value={campsiteForm.type}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, type: e.target.value as ListingType })}
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none bg-white"
                    >
                      <option value="byot">BYOT (Bring Your Own Tent)</option>
                      <option value="campervan">Campervan Spot</option>
                      <option value="road-stop">Highway Road Stop</option>
                      <option value="farm">Farm Stay</option>
                      <option value="forest">Forest Edge</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Google Maps Pinned Link</label>
                    <input
                      type="url"
                      required
                      value={campsiteForm.googlePin}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, googlePin: e.target.value })}
                      placeholder="https://maps.google.com/?q=..."
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <label className="flex items-start gap-3 rounded-xl border border-orange/20 bg-orange/5 p-4 text-sm text-textgrey sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={campsiteForm.imageVerified}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, imageVerified: e.target.checked })}
                      className="mt-1 h-4 w-4 accent-orange"
                    />
                    <span><strong className="text-forest">Property image verified</strong><br />Only check this when the image was supplied by the property or its source and you have permission to publish it.</span>
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Amenities (Comma separated)</label>
                    <input
                      type="text"
                      value={campsiteForm.amenitiesInput}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, amenitiesInput: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Essentials (Comma separated)</label>
                    <input
                      type="text"
                      value={campsiteForm.essentialsInput}
                      onChange={(e) => setCampsiteForm({ ...campsiteForm, essentialsInput: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-forest">Short Description</label>
                  <textarea
                    required
                    value={campsiteForm.description}
                    onChange={(e) => setCampsiteForm({ ...campsiteForm, description: e.target.value })}
                    rows={2}
                    placeholder="Brief intro for explore page cards"
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-forest">Detailed Description</label>
                  <textarea
                    required
                    value={campsiteForm.longDescription}
                    onChange={(e) => setCampsiteForm({ ...campsiteForm, longDescription: e.target.value })}
                    rows={4}
                    placeholder="Deep details about terrain, shade, coordinates and rules"
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>

                {isIgConnected && (
                  <div className="flex items-center gap-3 bg-orange/5 p-4 rounded-xl border border-orange/10">
                    <input
                      type="checkbox"
                      id="publishCampsiteToIg"
                      checked={publishCampsiteToIg}
                      onChange={(e) => setPublishCampsiteToIg(e.target.checked)}
                      className="h-4 w-4 rounded accent-orange"
                    />
                    <label htmlFor="publishCampsiteToIg" className="text-sm font-black text-forest flex items-center gap-1.5 cursor-pointer">
                      <InstagramIcon size={16} className="text-orange" />
                      Add listing social draft for {igAccount}
                    </label>
                  </div>
                )}

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsCampsiteFormOpen(false)}
                    className="rounded-lg border border-forest/10 px-4 py-2 text-sm font-bold text-forest hover:bg-forest/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-forest px-4 py-2 text-sm font-black text-white hover:bg-forest-light"
                  >
                    Save Campsite
                  </button>
                </div>
              </form>
            )}

            {/* Campsites Listing Table */}
            <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-forest/10">
                <thead className="bg-forest/5 text-left text-xs font-black uppercase text-forest/75 tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Campsite Info</th>
                    <th className="px-6 py-4">Corridor</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Verification</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10 text-sm">
                  {activeListings.map((site) => {
                    const isVerified = site.verificationStage === "reviewed";
                    return (
                      <tr key={site.id} className="hover:bg-forest/[0.01]">
                        <td className="px-6 py-4">
                          <p className="font-black text-forest">{site.title}</p>
                          <p className="text-xs text-textgrey font-semibold">{site.location}, {site.state}</p>
                        </td>
                        <td className="px-6 py-4 font-semibold text-textgrey">{site.region}</td>
                        <td className="px-6 py-4 font-bold text-forest">₹{site.price}/night</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleVerification(site.id)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${
                              isVerified ? "bg-forest text-white" : "bg-orange/10 text-orange"
                            }`}
                          >
                            {isVerified ? <CheckCircle size={13} /> : <Zap size={13} />}
                            {isVerified ? "Verified (Reviewed)" : "Candidate Lead"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => openEditCampsite(site)}
                            className="text-forest hover:text-orange transition"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteCampsite(site.id)}
                            className="text-forest hover:text-red-600 transition"
                            title="Delete"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 3: Blog Editor */}
        {activeTab === "blogs" && (
          <section className="mt-8 space-y-6 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-forest">Manage Blog Content</h2>
                <p className="text-sm text-textgrey">Add, edit, or delete optimized overlanding and camping blogs.</p>
              </div>
              <button
                onClick={openAddBlog}
                className="flex items-center gap-2 rounded-lg bg-orange px-4 py-2 text-sm font-black text-white hover:bg-orange-dark transition"
              >
                <Plus size={16} />
                Create Blog Post
              </button>
            </div>

            {/* Blog Form Modal / Block */}
            {isBlogFormOpen && (
              <form onSubmit={handleBlogSubmit} className="rounded-2xl border border-forest/10 bg-white p-6 shadow-lg space-y-4">
                <h3 className="text-lg font-black text-forest">
                  {editingBlogSlug ? "Edit Blog Post" : "Compose New Blog Post"}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Post Slug (URL key)</label>
                    <input
                      type="text"
                      required
                      disabled={!!editingBlogSlug}
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      placeholder="e.g. guide-to-hills"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Post Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      placeholder="Catchy, high-value Title"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Meta Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.metaTitle}
                      onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Meta Description</label>
                    <input
                      type="text"
                      required
                      value={blogForm.metaDescription}
                      onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Category</label>
                    <input
                      type="text"
                      required
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      placeholder="e.g. Safe and Legal Camping"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-forest">Primary SEO Keyword</label>
                    <input
                      type="text"
                      required
                      value={blogForm.primaryKeyword}
                      onChange={(e) => setBlogForm({ ...blogForm, primaryKeyword: e.target.value })}
                      placeholder="e.g. camping legalities"
                      className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-forest">Hero Image Path</label>
                  <input
                    type="text"
                    required
                    value={blogForm.heroImage}
                    onChange={(e) => setBlogForm({ ...blogForm, heroImage: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-forest">Direct Answer Block (AEO Snippet)</label>
                  <textarea
                    required
                    value={blogForm.directAnswer}
                    onChange={(e) => setBlogForm({ ...blogForm, directAnswer: e.target.value })}
                    rows={2}
                    placeholder="Provide a concise 2-sentence direct answer to satisfy voice and AI search intent."
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-forest">Post Summary</label>
                  <textarea
                    required
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    rows={2}
                    placeholder="Short introduction hook"
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-forest">Takeaways (One per line)</label>
                  <textarea
                    required
                    value={blogForm.takeawaysInput}
                    onChange={(e) => setBlogForm({ ...blogForm, takeawaysInput: e.target.value })}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-forest">Sections (Format: Heading on line 1, body paragraphs below. Separate sections by empty lines)</label>
                  <textarea
                    required
                    value={blogForm.sectionsInput}
                    onChange={(e) => setBlogForm({ ...blogForm, sectionsInput: e.target.value })}
                    rows={8}
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-forest">FAQs (Format: Question on line 1, Answer on line 2. Separate FAQ blocks by empty lines)</label>
                  <textarea
                    required
                    value={blogForm.faqsInput}
                    onChange={(e) => setBlogForm({ ...blogForm, faqsInput: e.target.value })}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm focus:border-orange focus:outline-none"
                  />
                </div>

                {isIgConnected && (
                  <div className="flex items-center gap-3 bg-orange/5 p-4 rounded-xl border border-orange/10">
                    <input
                      type="checkbox"
                      id="publishBlogToIg"
                      checked={publishBlogToIg}
                      onChange={(e) => setPublishBlogToIg(e.target.checked)}
                      className="h-4 w-4 rounded accent-orange"
                    />
                    <label htmlFor="publishBlogToIg" className="text-sm font-black text-forest flex items-center gap-1.5 cursor-pointer">
                      <InstagramIcon size={16} className="text-orange" />
                      Add article social draft for {igAccount}
                    </label>
                  </div>
                )}

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsBlogFormOpen(false)}
                    className="rounded-lg border border-forest/10 px-4 py-2 text-sm font-bold text-forest hover:bg-forest/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-forest px-4 py-2 text-sm font-black text-white hover:bg-forest-light"
                  >
                    Save Blog Post
                  </button>
                </div>
              </form>
            )}

            {/* Blog Post list table */}
            <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-forest/10">
                <thead className="bg-forest/5 text-left text-xs font-black uppercase text-forest/75 tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Keyword</th>
                    <th className="px-6 py-4">Read Time</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10 text-sm">
                  {activeBlogs.map((post) => (
                    <tr key={post.slug} className="hover:bg-forest/[0.01]">
                      <td className="px-6 py-4">
                        <Link to={`/blog/${post.slug}`} target="_blank" className="font-black text-forest hover:text-orange flex items-center gap-1">
                          {post.title}
                          <ExternalLink size={13} className="text-textgrey" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-textgrey">{post.category}</td>
                      <td className="px-6 py-4 font-mono text-xs text-orange">{post.primaryKeyword || "none"}</td>
                      <td className="px-6 py-4 font-semibold text-textgrey">{post.readTime}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditBlog(post)}
                          className="text-forest hover:text-orange transition"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteBlog(post.slug)}
                          className="text-forest hover:text-red-600 transition"
                          title="Delete"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 4: Email & Social Outbox */}
        {activeTab === "outbox" && (
          <section className="mt-8 space-y-6 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-forest">Outbound API & Campaign Outbox Logs</h2>
                <p className="text-sm text-textgrey">Draft logs for guide emails, subscriber exports, and manually reviewed social posts.</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("campin.email.logs.v1");
                  setEmailLogs([]);
                }}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 hover:border-red-300 transition"
              >
                Clear Log History
              </button>
            </div>

            {emailLogs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-forest/20 p-12 text-center text-textgrey">
                <Mail size={36} className="mx-auto text-forest/20 mb-3" />
                <p className="font-semibold">No outbox logs found.</p>
                <p className="text-xs mt-1">Prepare a listing or article social draft, or capture guide subscribers, to generate logs.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {emailLogs.map((log: any, idx: number) => (
                  <div key={idx} className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm space-y-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-forest/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase bg-forest/10 text-forest px-2 py-0.5 rounded">
                          {log.campaign || "System Action"}
                        </span>
                        <p className="text-sm font-bold text-forest">
                          Recipient/Endpoint: <span className="text-textgrey">{log.recipientEmail}</span>
                        </p>
                      </div>
                      <p className="text-xs font-semibold text-textgrey">{log.timestamp || "just now"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-orange">Action Subject / Status</p>
                      <p className="text-base font-black text-forest">{log.subject}</p>
                    </div>
                    {log.body && (
                      <div className="rounded-lg bg-offwhite p-4 text-xs font-semibold font-mono text-forest overflow-auto max-h-40 whitespace-pre-wrap">
                        {log.body}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Tab 5: Tasks Checklist */}
        {activeTab === "tasks" && (
          <section className="mt-8 space-y-6 animate-fade-up">
            <div>
              <h2 className="text-xl font-black text-forest">Launch Preparedness Checklist</h2>
              <p className="text-sm text-textgrey">Track critical setup jobs before the starter launch.</p>
            </div>
            <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm space-y-4">
              {setupTasks.map((task) => {
                const isChecked = checkedTaskIds.has(task.id);
                return (
                  <button
                    key={task.id}
                    onClick={() => {
                      const next = new Set(checkedTaskIds);
                      if (next.has(task.id)) next.delete(task.id);
                      else next.add(task.id);
                      setCheckedTaskIds(next);
                    }}
                    className="flex w-full items-start gap-4 text-left p-3 rounded-lg hover:bg-offwhite transition"
                  >
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                      isChecked ? "bg-forest border-forest text-white" : "border-forest/30"
                    }`}>
                      {isChecked && <Check size={14} />}
                    </span>
                    <div>
                      <p className={`font-black text-base ${isChecked ? "text-textgrey line-through" : "text-forest"}`}>
                        {task.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
