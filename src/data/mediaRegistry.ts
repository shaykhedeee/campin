export type MediaUsage = "editorial-region" | "listing-photo";

export interface MediaAsset {
  src: string;
  region: string;
  subject: string;
  alt: string;
  sourceUrl: string;
  author: string;
  license: string;
  usage: MediaUsage;
}

/**
 * Licensed regional imagery used for discovery surfaces and unverified listing cards.
 * These photographs describe a region or landscape; they are not evidence of a
 * particular campsite's facilities, availability, or verification stage.
 */
export const mediaRegistry = {
  caravan: {
    src: "/images/india/kerala-backwaters-1600.webp",
    region: "Kerala backwaters",
    subject: "Kerala backwaters and a traditional houseboat",
    alt: "Traditional houseboat moving through the Kerala backwaters",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kerala_backwaters,_Houseboat,_India.jpg",
    author: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    usage: "editorial-region",
  },
  water: {
    src: "/images/india/kerala-backwaters-1600.webp",
    region: "Kerala backwaters",
    subject: "Kerala backwaters and a traditional houseboat",
    alt: "Traditional houseboat moving through the Kerala backwaters",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kerala_backwaters,_Houseboat,_India.jpg",
    author: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    usage: "editorial-region",
  },
  hills: {
    src: "/images/india/cherrapunji-nohkalikai-1600.webp",
    region: "Cherrapunji, Meghalaya",
    subject: "Nohkalikai Falls and forested cliffs",
    alt: "Nohkalikai Falls descending through the forested cliffs of Cherrapunji",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nohkalikai_Falls_of_Cherrapunji_in_summer.jpg",
    author: "Jyotishkardey",
    license: "CC BY-SA 4.0",
    usage: "editorial-region",
  },
  forest: {
    src: "/images/india/jibhi-waterfall-1600.webp",
    region: "Jibhi, Himachal Pradesh",
    subject: "Jibhi waterfall bridge and forest stream",
    alt: "Green footbridge over a forest stream near Jibhi waterfall",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bridge_at_Jibhi_Waterfall.jpg",
    author: "Rohan Pinto",
    license: "CC BY-SA 4.0",
    usage: "editorial-region",
  },
  farm: {
    src: "/images/india/kerala-tea-estate-1600.webp",
    region: "South India tea country",
    subject: "Tea plantations and mountain ridges near Kerala and Tamil Nadu",
    alt: "Rows of tea plants covering a mountain valley in South India",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kerala_-_tea_plantations.jpg",
    author: "Karin Šubrtová",
    license: "CC BY-SA 4.0",
    usage: "editorial-region",
  },
  desert: {
    src: "/images/india/thar-desert-1600.webp",
    region: "Thar Desert, Rajasthan",
    subject: "Wind-shaped dunes in the Great Indian Thar Desert",
    alt: "Wind-shaped golden dunes beneath a blue sky in the Thar Desert",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Great_Indian_Thar_Desert.jpg",
    author: "Kanthi Kiran",
    license: "CC BY-SA 4.0",
    usage: "editorial-region",
  },
  road: {
    src: "/images/india/spiti-tent-1600.webp",
    region: "Spiti Valley, Himachal Pradesh",
    subject: "High-altitude landscape near Chandra Taal with a tent",
    alt: "Small tent in the high-altitude landscape near Chandra Taal",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Abandoned_tent,_Chandra_Taal_(Lake),_HP,_India,_D35_7242_nx01.jpg",
    author: "Adarsh Patel",
    license: "CC BY-SA 4.0",
    usage: "editorial-region",
  },
  tent: {
    src: "/images/india/spiti-tent-1600.webp",
    region: "Spiti Valley, Himachal Pradesh",
    subject: "High-altitude landscape near Chandra Taal with a tent",
    alt: "Small tent in the high-altitude landscape near Chandra Taal",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Abandoned_tent,_Chandra_Taal_(Lake),_HP,_India,_D35_7242_nx01.jpg",
    author: "Adarsh Patel",
    license: "CC BY-SA 4.0",
    usage: "editorial-region",
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof mediaRegistry;

export function getMediaAsset(key: MediaKey): MediaAsset {
  return mediaRegistry[key];
}

export function mediaSrcSet(asset: MediaAsset): string {
  const compact = asset.src.replace("-1600.webp", "-900.webp");
  return `${compact} 900w, ${asset.src} 1600w`;
}
