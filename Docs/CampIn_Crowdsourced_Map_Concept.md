# 🗺️ CampIn — Crowdsourced Verified Map Architecture Concept

This document outlines the product requirements and technical architecture for introducing a crowdsourced map of India where campers can submit free or highly accessible wild/public campsites, which then undergo a community and platform verification process.

---

## 1. The User Submission Flow
Campers who discover accessible spots (e.g., roadside pull-offs, beach clearings, rural viewpoints) can pin them directly on the Map Interface.

### Submission Parameters
1. **GPS Coordinates**: Auto-captured via mobile GPS sensor on location.
2. **Access Type**: Free / Paid (Dhaba/Homestay fee) / Permit-Required.
3. **Amenities Checklist**: Restrooms nearby? Water source? Cell network carriers (Jio/Airtel)?
4. **Photo Verification**: At least 2 photos (1 of the pitch zone, 1 of the road entrance) to verify safety.
5. **Safety Notes**: Any local restrictions, animal movement notes, or height clearance warnings for campervans.

---

## 2. The Verification Pipeline
To prevent trash accumulation, trespassing fines, or security issues, crowdsourced spots start as **"Candidate Spots"** and transition to **"Community Verified"** through a multi-tiered validation workflow:

```
[Camper Submits Spot]
       │
       ▼
[Candidate Spot on Map] (Shown in Orange with warning label)
       │
       ├─► Requirement 1: 3 independent camper check-ins (with photos & reviews)
       ├─► Requirement 2: Moderator land status check (cross-ref with public reserve forest borders)
       │
       ▼
[Community Verified Spot] (Shown in Green with Trust badge)
```

---

## 3. Moderation & Safety Measures
* **Auto-Flagging Reserve Forests**: If the pinned coordinates fall inside known reserve forest borders, the submission is automatically rejected or flagged for manual review.
* **Flag-to-Remove**: Any verified spot can be instantly flagged by campers if access changes (e.g., "Landowner placed fence," "Local authorities prohibited camping"). If flagged twice in 30 days, the spot is hidden until a moderator reviews it.
* **Clean-Up Pledges**: To maintain access, checking into a free campsite requires campers to take a quick photo of the spot before they pack up and leave to prove they did not leave litter.
