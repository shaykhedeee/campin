export const accommodationTypes = [
  "Motorhome sites", "Caravan sites", "Campervan sites", "Travel trailer sites", "RV sites",
  "Bring Your Own Tent (BYOT)", "Tent pitches", "Pre-pitched tents", "Bell tents", "Safari tents",
  "Glamping tents", "Yurts", "Domes", "Tipis / Tepees", "Treehouses", "Cabins", "Tiny houses",
  "Wooden cottages", "Eco huts", "Shepherd's huts", "Pods", "A-frame cabins", "Houseboats",
] as const;

export const campingLocations = [
  "Mountain camping", "Forest camping", "Farm camping", "Riverside camping", "Lakeside camping",
  "Beach camping", "Desert camping", "Jungle camping", "Hilltop camping", "Valley camping",
  "Vineyard camping", "Orchard camping", "Wildlife camping", "Island camping", "Snow camping",
  "Tea estate camping", "Coffee plantation camping",
] as const;

export const campingStyles = [
  "Family camping", "Solo camping", "Couple camping", "Pet-friendly camping", "Group camping",
  "Luxury glamping", "Off-grid camping", "Eco camping", "Adventure camping", "Digital detox camping",
  "Wellness camping", "Weekend camping", "Long-stay camping",
] as const;

export const activities = [
  "Trekking", "Hiking", "Mountain biking", "Rock climbing", "Ziplining", "Horse riding", "Fishing",
  "Kayaking", "Canoeing", "Rafting", "Swimming", "Bird watching", "Stargazing", "Photography",
  "Bonfire", "BBQ", "Archery", "Nature walks", "Yoga", "Meditation", "Wildlife safari", "Cycling",
  "Snow activities", "Paragliding", "Scuba diving",
] as const;

export const amenities = [
  "Toilets", "Hot showers", "Drinking water", "Electricity hookup", "Water hookup", "Wi-Fi",
  "Shared kitchen", "BBQ area", "Picnic tables", "Fire pits", "Firewood available", "Laundry",
  "Parking", "EV charging", "Swimming pool", "Children's play area", "CCTV", "First aid", "Pet area",
  "Grocery shop", "Restaurant", "Café", "Big rig access", "Drive-through pitches", "Pull-through sites",
  "Hardstanding pitches", "Grass pitches", "Shade available", "Awning space", "Dump station",
  "Water refill station", "Tent rental", "Sleeping bag rental", "Camping chair rental", "Bicycle rental",
  "Kayak rental", "Generator rental", "Portable power station rental",
] as const;

export const campinDiscoveryTaxonomy = {
  accommodationTypes,
  campingLocations,
  campingStyles,
  activities,
  amenities,
} as const;
