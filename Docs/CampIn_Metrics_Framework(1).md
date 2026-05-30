# 📊 CAMPIN — METRICS & SUCCESS FRAMEWORK

> What to measure, when to measure it, and what success looks like

---

## 1. MEASUREMENT PHILOSOPHY

- **Phase 1:** Measure trust and engagement, NOT revenue
- **Phase 2:** Measure marketplace health and unit economics
- **Phase 3:** Measure scale, retention, and profitability

Track weekly. Review monthly. Adjust quarterly.

---

## 2. MVP SUCCESS METRICS (Month 1–6)

### User Acquisition
| Metric | Month 1 | Month 3 | Month 6 | Tool |
|---|---|---|---|---|
| Website live | ✅ Week 2 | — | — | — |
| Total user signups | 50 | 200 | 500 | Airtable/Supabase |
| Signup form completion rate | >30% | >40% | >45% | Clarity |
| Average time on site | >1 min | >2 min | >2.5 min | GA4 |
| Bounce rate | <70% | <60% | <55% | GA4 |

### Supply Growth
| Metric | Month 1 | Month 3 | Month 6 | Tool |
|---|---|---|---|---|
| Host leads captured | 5 | 20 | 50 | Airtable |
| Listings live | 2 | 5 | 20 | Manual count |
| Host form completion rate | >50% | >60% | >65% | Clarity |
| Verified hosts | 1 | 3 | 10 | Manual |

### Community Building
| Metric | Month 1 | Month 3 | Month 6 | Tool |
|---|---|---|---|---|
| Instagram followers | 100 | 1,000 | 5,000 | Instagram |
| Instagram engagement rate | >3% | >4% | >4% | Instagram |
| WhatsApp community members | 20 | 100 | 200 | WhatsApp |
| Email subscribers | 20 | 100 | 300 | Resend/Mailchimp |

### Validation
| Metric | Target | Tool |
|---|---|---|
| First real booking | By Month 4 | Manual tracking |
| Real transaction (booking or support) | By Month 5 | Razorpay |
| NPS from first users | >50 | Survey |
| Host satisfaction | >4/5 | Direct feedback |

---

## 3. GROWTH METRICS (Month 6–18)

### Marketplace Health
| Metric | Target | Frequency |
|---|---|---|
| Active listings | 100+ | Monthly |
| Monthly bookings | 100+ | Monthly |
| Booking conversion rate | >5% | Weekly |
| Average booking value | ₹2,000+ | Monthly |
| Host response rate | >80% | Weekly |
| Host response time | <4 hours | Weekly |

### Revenue
| Metric | Target | Frequency |
|---|---|---|
| Monthly revenue | ₹25,000+ | Monthly |
| Revenue per booking | ₹350+ | Monthly |
| Take rate | 15–18% | Monthly |
| Featured listing revenue | ₹5,000+ | Monthly |

### User Engagement
| Metric | Target | Frequency |
|---|---|---|
| Monthly active users | 2,000+ | Monthly |
| Camper repeat rate | >25% | Monthly |
| Review submission rate | >40% of completed stays | Monthly |
| Average rating | >4.3/5 | Monthly |

### Organic Growth
| Metric | Target | Frequency |
|---|---|---|
| Instagram followers | 25,000+ | Monthly |
| Organic website traffic | 5,000+ sessions/month | Monthly |
| Email list size | 2,000+ | Monthly |
| SEO keyword rankings | Top 10 for 20+ keywords | Monthly |

### Host Metrics
| Metric | Target | Frequency |
|---|---|---|
| Host retention (6-month) | >70% | Monthly |
| Average host earnings | ₹5,000+/month | Monthly |
| New host applications | 10+/month | Monthly |
| Host satisfaction score | >4.5/5 | Quarterly |

---

## 4. SCALE METRICS (Month 18–36)

| Metric | Target | Tool |
|---|---|---|
| Active listings | 500+ | Dashboard |
| Monthly bookings | 1,000+ | Dashboard |
| Monthly revenue | ₹2,50,000+ | Razorpay |
| Monthly active users | 20,000+ | GA4/PostHog |
| Instagram followers | 1,00,000+ | Instagram |
| Mobile app downloads | 10,000+ | App stores |
| States covered | 15+ | Manual |
| Road Stops listed | 100+ | Dashboard |
| Camper NPS | >60 | Survey |
| Host NPS | >65 | Survey |
| App store rating | >4.5 | App stores |
| Customer support response time | <2 hours | Dashboard |

---

## 5. WEEKLY TRACKING TEMPLATE

### Every Monday, Log These Numbers:

| Category | Metric | This Week | Last Week | Change |
|---|---|---|---|---|
| **Traffic** | Total visitors | ___ | ___ | ___ |
| | Organic visitors | ___ | ___ | ___ |
| | Bounce rate | ___ | ___ | ___ |
| **Users** | New signups | ___ | ___ | ___ |
| | Total signups | ___ | ___ | ___ |
| **Supply** | New host applications | ___ | ___ | ___ |
| | Total listings live | ___ | ___ | ___ |
| **Bookings** | New bookings | ___ | ___ | ___ |
| | Revenue | ___ | ___ | ___ |
| **Community** | Instagram followers | ___ | ___ | ___ |
| | WhatsApp members | ___ | ___ | ___ |
| | Email subscribers | ___ | ___ | ___ |

---

## 6. MONTHLY REVIEW QUESTIONS

### User Side
1. Are signups growing week over week?
2. What's the signup-to-explore conversion rate?
3. Which listing types get the most views?
4. What are users searching for on the Explore page?
5. Where are users dropping off in the signup flow?

### Host Side
6. How many new host applications this month?
7. What's the host application approval rate?
8. What's the average time from application to live listing?
9. Which regions are generating the most host interest?
10. What concerns do hosts raise most often?

### Business Side
11. What's the revenue trend?
12. What's the cost per acquisition (when paid ads start)?
13. Which marketing channel drives the most signups?
14. What's the newsletter open rate?
15. What content gets the highest engagement?

---

## 7. ANALYTICS SETUP

### Google Analytics 4 Events to Track
```
page_view                    → All pages
signup_form_submit           → Signup page
signup_form_start            → Signup page
host_form_submit             → List Your Space page
host_form_start              → List Your Space page
explore_search               → Explore page
explore_filter_use           → Explore page
listing_card_click           → Explore page
support_cta_click            → Support page
hero_cta_click               → Home page
host_cta_click               → Home page
category_card_click          → Home page
```

### Microsoft Clarity
- Session recordings for all pages
- Heatmaps for Home, Explore, Signup, List Your Space
- Rage click detection
- Dead click detection
- Scroll depth tracking

### PostHog (Phase 2)
- Funnel analysis: Visit → Signup → Explore → Booking
- Retention analysis by cohort
- Feature usage tracking
- A/B test results

---

## 8. REPORTING CADENCE

| Report | Frequency | Audience | Format |
|---|---|---|---|
| Daily pulse | Daily | Founder | WhatsApp/Notion |
| Weekly metrics | Weekly | Founder | Notion template |
| Monthly review | Monthly | Founder + advisors | Notion doc |
| Quarterly OKR review | Quarterly | All stakeholders | Meeting + doc |

---

**Stay. Explore. CampIn. 🏕️**
