export interface Listing {
  id: string;
  title: string;
  location: string;
  state: string;
  type: "terrace" | "farm" | "forest" | "campervan" | "car-camping" | "desert" | "lakeside" | "orchard";
  price: number;
  description: string;
  longDescription: string;
  tags: string[];
  amenities: string[];
  images: string[];
  sitePhotos: string[]; // Specific pictures of the exact site area
  rating: number;
  reviews: number;
  hostName: string;
  googlePin: string;
  campervanFriendly: boolean;
  maxGuests: number;
  highlights: string[];
}

export const listings: Listing[] = [
  {
    id: "meghalaya-terrace",
    title: "The Cloud-Catcher Terrace",
    location: "Cherrapunji",
    state: "Meghalaya",
    type: "terrace",
    price: 1200,
    description: "A private terrace suspended over the wettest valley on Earth. Wake up above the clouds.",
    longDescription: "This isn't just land; it's a sanctuary in the sky. Located on a private Khasi family estate, this terrace offers a 270-degree view of the Cherrapunji valley. We spent three years carving this site manually to ensure zero impact on the root systems below. You'll wake up surrounded by mist, with the smell of wild orchids and the distant roar of a dozen waterfalls. The trail to the living root bridges starts right at your tent peg.",
    tags: ["High Altitude", "Northeast", "Monsoon Magic"],
    amenities: ["Stone Fire Place", "Western Washroom", "Drinking Water", "Local Khasi Meals", "Guide Support"],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
    ],
    sitePhotos: [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
      "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?w=800&q=80"
    ],
    rating: 4.9,
    reviews: 24,
    hostName: "Basil Khasi",
    googlePin: "https://maps.google.com/?q=Cherrapunji",
    campervanFriendly: false,
    maxGuests: 4,
    highlights: ["270° Valley View", "Hand-Carved Stone Pit", "Zero-Noise Zone", "Verified Safe for Solo Women"],
  },
  {
    id: "coorg-estate",
    title: "Old Heritage Coffee Glade",
    location: "Madikeri",
    state: "Coorg, Karnataka",
    type: "farm",
    price: 1500,
    description: "Pitch your tent under hundred-year-old shade trees in a working coffee estate.",
    longDescription: "Escape the concrete of Bangalore. Our estate has been family-owned since 1924. We have designated a specific 'Disconnection Zone' deep within the coffee plants where mobile signals fade and the only sound is the breeze through the cardamom vines. This specific site is flat, elevated, and provides a clear view of the Western Ghats ridge. We provide fresh estate-grown coffee and traditional Kodava meals cooked over wood-fire.",
    tags: ["Heritage Farm", "Western Ghats", "Coffee Culture"],
    amenities: ["Traditional Fire Place", "Private Washroom", "Electricity Point", "Secure Parking", "Home-Cooked Food"],
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80",
    ],
    sitePhotos: [
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80"
    ],
    rating: 4.9,
    reviews: 38,
    hostName: "Pravin Kuttappa",
    googlePin: "https://maps.google.com/?q=Madikeri",
    campervanFriendly: true,
    maxGuests: 6,
    highlights: ["90-Year Old Shade Trees", "Kodava Spice Experience", "Verified Drinking Water", "Fenced Security"],
  },
  {
    id: "jibhi-river",
    title: "The Banjar Valley Sanctuary",
    location: "Jibhi",
    state: "Himachal Pradesh",
    type: "forest",
    price: 1100,
    description: "Beside the Tirthan river, under a canopy of ancient cedars. The home of silence.",
    longDescription: "If your soul is tired of city noise, this is the remedy. This forest site is located on a private riverfront property in Jibhi. We only accept one booking at a time to ensure total privacy. The site is a 10-minute hike from the nearest road stop, meaning no engine sounds, just the Tirthan river. The cedars here are over 200 years old, creating a natural cathedral of silence. We provide local Himachali Siddu and Tudkiya for dinner.",
    tags: ["Riverside", "Digital Detox", "Ancient Forest"],
    amenities: ["Riverside Fire Pit", "Eco-Washroom", "Trekking Trails", "Natural Stream Water", "Himachali Cuisine"],
    images: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600&q=80",
    ],
    sitePhotos: [
      "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?w=800&q=80",
      "https://images.unsplash.com/photo-1525811902-f2342621330e?w=800&q=80"
    ],
    rating: 4.8,
    reviews: 19,
    hostName: "Dinesh Thakur",
    googlePin: "https://maps.google.com/?q=Jibhi",
    campervanFriendly: false,
    maxGuests: 4,
    highlights: ["Private River Access", "No Mobile Signal Zone", "Fresh Trout Catching", "Stargazing Deck"],
  },
  {
    id: "jaisalmer-stars",
    title: "The Golden Dune Hideout",
    location: "Sam Sand Dunes",
    state: "Rajasthan",
    type: "desert",
    price: 1400,
    description: "Deep desert camping away from the tourist crowds. Just you and the Milky Way.",
    longDescription: "While Jaisalmer is full of 'desert resorts', we offer the real Thar experience. This site is located 12km away from the commercial Sam dune area on a private desert estate. It is accessible only by 4x4 or camel. The dunes here are pristine and shifting. Zero light pollution makes this the best stargazing spot in India. We provide authentic Rajasthani folk music by a local Manganiyar family around the campfire.",
    tags: ["Deep Desert", "Milky Way Views", "Cultural Heritage"],
    amenities: ["Desert Fire Pit", "Basic Washroom", "Camel Transfers", "Traditional Dinner", "Local Musicians"],
    images: [
      "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1600&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80",
    ],
    sitePhotos: [
      "https://images.unsplash.com/photo-1512411487313-2619472dc0f4?w=800&q=80",
      "https://images.unsplash.com/photo-1504150559638-70331d10b6c1?w=800&q=80"
    ],
    rating: 4.9,
    reviews: 27,
    hostName: "Hanif Khan",
    googlePin: "https://maps.google.com/?q=Sam+Sand+Dunes",
    campervanFriendly: true,
    maxGuests: 8,
    highlights: ["Deep Desert Isolation", "Milky Way Guarantee", "Authentic Folk Music", "Local Desert Guides"],
  },
  {
    id: "spiti-base",
    title: "The Roof of the World Site",
    location: "Kaza",
    state: "Himachal Pradesh",
    type: "forest",
    price: 900,
    description: "A high-altitude sanctuary at 12,000ft. Rugged, beautiful, and profoundly silent.",
    longDescription: "This isn't just camping; it's a test of spirit. Located near Kaza in the Spiti Valley, our site is a private mountain clearing with a direct view of the Key Monastery. The air is thin, the light is sharp, and the silence is humming. We provide heavy local wool blankets and hot Butter Tea (Gur-Gur Chai) on arrival. This is where the mountains teach you who you really are.",
    tags: ["High Altitude", "Adventure", "Himalayan Soul"],
    amenities: ["Indoor Fire Place", "Heated Washroom", "BSNL Mobile Signal", "Local Spitian Meals", "Mountain Guides"],
    images: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
    ],
    sitePhotos: [
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80"
    ],
    rating: 5.0,
    reviews: 15,
    hostName: "Tenzin Dorje",
    googlePin: "https://maps.google.com/?q=Kaza",
    campervanFriendly: true,
    maxGuests: 4,
    highlights: ["Key Monastery View", "12,000ft Experience", "Stargazing Deck", "Verified Safe Corridor"],
  }
];

export const categories = [
  { id: "terrace", title: "Terrace Camping", description: "Above the clouds", icon: "🏔️", count: "12+ spots" },
  { id: "farm", title: "Farm Stays", description: "Working estates", icon: "🌾", count: "18+ spots" },
  { id: "forest", title: "Forest Camping", description: "Deep disconnection", icon: "🌲", count: "15+ spots" },
  { id: "campervan", title: "Campervan Stops", description: "Verified road stops", icon: "🚐", count: "8+ stops" },
  { id: "car-camping", title: "Car Camping", description: "Drive up, set up", icon: "🚗", count: "20+ spots" },
  { id: "desert", title: "Desert Camping", description: "Pure dunes & stars", icon: "🏜️", count: "6+ spots" },
  { id: "lakeside", title: "Lakeside / Riverside", description: "Waterfront views", icon: "🏞️", count: "10+ spots" },
  { id: "orchard", title: "Orchard Camping", description: "Bloom & peace", icon: "🍎", count: "8+ spots" },
];

export const testimonials = [
  { name: "Priya Sharma", location: "Bangalore", text: "I was tired of noisy hotels. CampIn gave me the silence I didn't know I needed. The Coorg estate is a piece of heaven.", avatar: "👩🏽" },
  { name: "Rohan Mehta", location: "Mumbai", text: "Verified road stops for my Thar. No more anxiety about where to sleep. CampIn is the home for Indian road trippers.", avatar: "👨🏻" },
  { name: "Ananya Reddy", location: "Hyderabad", text: "Safety was my concern as a solo traveler. Knowing the founder verifies every site personally made all the difference.", avatar: "👩🏾" }
];

export const stats = [
  { value: "12+", label: "Verified States" },
  { value: "50+", label: "Audited Sanctuaries" },
  { value: "92%", label: "Host Revenue Share" },
  { value: "8%", label: "Startup Platform Fee" },
];

export const faqs = [
  { q: "What is 'Actual Proof' verification?", a: "Unlike other platforms, we don't allow stock photos. Hosts must submit high-resolution, unedited photos of the exact site you will use. We verify these against our manual site audit." },
  { q: "Is the Google Maps Pin accurate?", a: "Yes. Every host must provide an exact share link. We verify the pin's surroundings, access roads, and safety corridors before the listing goes live." },
  { q: "How is the 8% fee used?", a: "This is our 'Startup Fuel'. It covers the manual verification team, phone OTP costs, and building the road-stop infrastructure for India. Hosts keep 92% — the highest in the country." },
  { q: "What if the site is not as described?", a: "Because we review and accept listings from the backend only after verification, inaccuracies are rare. If a site fails our standards, we refund 100% and remove the host." }
];
