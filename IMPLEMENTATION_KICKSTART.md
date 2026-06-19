# Lumière Medical Spa — Implementation Kickstart

A single-page, frontend-only luxury medical spa website for an affluent female
audience (ages 30–55) in Scottsdale, AZ. No backend, no APIs, no database, no
auth, no forms that submit. All interactivity is client-side state and mock
experiences. The build must feel luxurious, editorial, trustworthy, feminine,
and conversion-focused.

---

## 1. Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 (tokens in `globals.css`) |
| Components | shadcn/ui (Button preinstalled; add others via CLI as needed) |
| Icons | `lucide-react` |
| Animation | `framer-motion` |
| Fonts | Cormorant Garamond (headings) + Inter (body) via `next/font/google` |
| Data | Local TypeScript constants — **no** external data sources |

Dependencies to install before writing imports: `framer-motion`.
(`lucide-react` ships with the template; confirm before relying on it.)

---

## 2. Design System (locked decisions)

### Colors (define as tokens in `app/globals.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#FAF8F5` (Warm Ivory) | Page background |
| `--secondary` / linen | `#F4F0EB` (Soft Linen) | Alternating section bg |
| `--foreground` | `#222222` (Deep Charcoal) | Primary text, footer bg |
| `--muted-foreground` | `#6B6B6B` | Supporting text |
| `--accent` | `#D4B483` (Champagne Gold) | Accents, borders, labels |

Total = 5 colors. No purple/violet. No gradients. Always pair bg overrides with
text overrides for contrast. Footer inverts: charcoal bg, white/soft-gray text,
champagne accents.

### Typography
- Headings: **Cormorant Garamond** (`font-serif`), large editorial scale.
- Everything else (body, nav, buttons, labels): **Inter** (`font-sans`).
- Body line-height `leading-relaxed`.

| Element | Desktop | Mobile |
| --- | --- | --- |
| Hero headline | large display | 42px |
| Section headlines | display | 32px |
| Body | 18px | 16px |
| Small/support | — | 14px |
| Nav / Buttons | 16px | 16px |

### Spacing, radius, shadow
- Section vertical spacing: **120px desktop / 64px mobile**.
- Max content width: **1200px** (Final CTA block 1000px, results card 900px).
- Border radius: cards **24px**, buttons/inputs **16px**.
- Shadow (only one, subtle): `0 10px 30px rgba(0,0,0,0.06)`.
- Generous whitespace everywhere; mobile-first; standard Tailwind breakpoints only.

### Animation (Framer Motion)
- Duration `0.6s`, easing `easeOut`.
- Patterns: fade-up, blur reveal (`10px → 0px`), staggered children (~`0.12s`).
- The Assessment + Results screens get the **highest** animation budget.
- `prefers-reduced-motion`: disable blur, shrink movement distance, keep simple
  fades. Site must stay elegant when reduced.

---

## 3. Page Structure (exact order — 11 sections)

1. Navigation
2. Hero
3. Doctor Trust Section
4. Emotional Problem Section
5. Interactive Assessment
6. Personalized Results Screen
7. Before & After Results
8. Services
9. Why Choose Us
10. Final CTA
11. Footer + Contact + Map + Hours

No sections added or removed.

---

## 4. File Architecture

```
app/
  layout.tsx        # fonts, metadata, <html className="bg-background">
  page.tsx          # composes all sections in order
  globals.css       # design tokens + font theme vars
components/
  navigation.tsx
  sections/
    hero.tsx
    doctor-trust.tsx
    emotional-problem.tsx
    assessment.tsx              # multi-step + drives results
    personalized-results.tsx
    before-after.tsx
    services.tsx
    why-choose-us.tsx
    final-cta.tsx
    site-footer.tsx
  ui/
    section-label.tsx           # uppercase champagne eyebrow label
    primary-button.tsx / use shadcn Button variants
    before-after-slider.tsx     # draggable comparison
    reveal.tsx                  # shared Framer Motion fade-up/stagger wrapper
lib/
  assessment-data.ts            # questions + recommendation logic
  services-data.ts
  reduced-motion.ts             # hook for prefers-reduced-motion
```

State note: Assessment (step 5) and Results screen share state. Plan to keep
the Assessment + Results in one client component (or lift state to a small
client wrapper) so completing the quiz reveals the results screen without a
page reload.

---

## 5. Section-by-Section Spec

### 5.1 Navigation
- Sticky, transparent initially; after ~50px scroll add backdrop blur + subtle
  translucent background.
- Links: About, Treatments, Results, Assessment, Contact (smooth-scroll to
  section IDs). Plus a Book Consultation button → `#contact`.
- Mobile: hamburger → panel **slides in from the right** with backdrop overlay,
  close (X) button, and click-outside-to-close. Keyboard accessible.

### 5.2 Hero
- Desktop two-column **45% content / 55% imagery**; stacks on mobile.
- Headline (exact): `Look As Vibrant As You Feel.`
- Subheadline (exact): "Personalized aesthetic treatments designed by
  board-certified physician Dr. Sophia Laurent to help you achieve natural,
  confident, and lasting results."
- Primary CTA: `Book Your Consultation` (→ `#contact`).
- Secondary CTA: `Take The Skin Assessment` (→ `#assessment`).
- Social proof row: `4.9★ Average Rating`, `10,000+ Treatments Performed`,
  `Trusted By Women Across Arizona`.
- Warm ivory bg, very faint texture. No gradients/shapes/floating elements.
- Animations: headline fade-up + stagger; subheadline fade-up after; magnetic
  hover on primary; gentle hover on badges.
- Doctor image: portrait **3:4**, editorial style (generate via GenerateImage).

### 5.3 Doctor Trust Section
- Headline: "A Personalized Approach To Natural, Beautiful Results".
- Physician: **Dr. Sophia Laurent**, board-certified, 15+ years, philosophy
  ("listen carefully, create a personalized plan…"), Personalized Treatment
  Plans messaging. Transitions toward the assessment.

### 5.4 Emotional Problem Section
- Emotional connection only; leads into assessment. CTA: `Start My Assessment`.
- No assessment quiz here, no forms.

### 5.5 Interactive Assessment (high animation budget)
- Multi-step, one question visible at a time, progress indicator "Step X of 5"
  + champagne progress bar. Large clickable selection cards (no dropdowns/forms).
- Background Soft Linen `#F4F0EB`; card stands out.
- Selected card: enlarge + champagne border + soft glow; unselected fade.
- Transitions: current slides out, next fades/slides in.
- **Questions:**
  1. What is your primary concern? — Fine Lines & Wrinkles · Skin Laxity ·
     Uneven Skin Tone · Sun Damage · Volume Loss · Acne Scarring
  2. How would you describe your skin? — Dry · Combination · Oily · Sensitive · Normal
  3. What is your age range? — 25-34 · 35-44 · 45-54 · 55-64 · 65+
  4. What type of result are you hoping for? — Smoother Skin · Brighter
     Complexion · More Defined Features · Younger Appearance · Natural Refresh
  5. How soon are you hoping to see results? — As Soon As Possible ·
     Within 1-3 Months · I'm Exploring Options
- After Q5 → triggers Results screen (no reload).

### 5.6 Personalized Results Screen (highest animation budget)
- Loading experience 1.5–2s with elegant animated text states ("Analyzing Your
  Responses…", "Creating Your Personalized Treatment Plan…", "Preparing Your
  Recommendations…"). No spinners / generic loaders.
- Result card centered, max-width **900px**, ivory bg `#FAF8F5`.
- Label: `YOUR PERSONALIZED RESULTS` (uppercase, champagne).
- Headline: `Your Personalized Treatment Plan`.
- Subheadline (exact): "Based on your goals and assessment responses, these
  treatments are most likely to help you achieve natural-looking, long-lasting
  results."
- Primary recommendation (dominant): treatment name + "XX% Match" + short
  explanation. Map from answers using realistic logic across: Botox, Dermal
  Fillers, Microneedling, IPL Photofacial, Laser Resurfacing, HydraFacial.
- Secondary recommendation ("Recommended Enhancement") + short explanation.
- Expected Benefits cards: Smoother Appearance, Brighter Skin Tone, Natural
  Facial Rejuvenation, Improved Confidence, More Youthful Appearance (icons).
- Timeline (horizontal desktop / stacked mobile): Consultation → Personalized
  Treatment Plan → Treatment Session → Visible Results.
- Physician note quote card w/ doctor thumbnail (exact quote + "Dr. Sophia
  Laurent / Medical Director").
- Consultation invitation panel: "Ready To Discuss Your Personalized Plan?" +
  body copy.
- CTAs: `Book My Consultation` (primary → `#contact`) and `Retake Assessment`
  (secondary → resets quiz state).
- Recommendation logic plan: deterministic mapping in `assessment-data.ts`
  keyed primarily on Q1 (concern) → primary treatment; Q4/Q2 → secondary;
  confidence % derived from how well answers align (e.g., 88–97 range).

### 5.7 Before & After Results
- Label `REAL RESULTS`; headline "Subtle Enhancements. Meaningful Results.";
  exact subheadline about enhancing natural beauty.
- Interactive draggable before/after slider (mouse + touch), rounded, with
  "Before"/"After" labels on image. **Only place** before/after imagery appears.
- Featured case study card: Female, Age 47, Combination Facial Rejuvenation,
  12 Weeks, goal copy.
- Three result highlight cards: Smoother Skin Texture · More Even Skin Tone ·
  Refreshed Appearance.

### 5.8 Services
- Ivory bg. Section CTA below grid: "Not Sure Which Treatment Is Right For You?"
  → `Take The Assessment` (primary) + `Book Consultation` (secondary).
- Six service cards (line icons), hover = slight lift + soft shadow + champagne
  accent. Optional click-to-expand revealing Treatment Benefits / Expected
  Downtime / Ideal Candidate (concise, no big dropdowns):
  1. Botox & Wrinkle Relaxers — smooth fine lines, natural expression.
  2. Dermal Fillers — restore volume / facial balance.
  3. Laser Skin Rejuvenation — tone, texture, quality.
  4. Microneedling — collagen + texture.
  5. IPL Photofacial — reduce sun damage, brighter complexion.
  6. HydraFacial — deep cleanse + hydration.
- No pricing/packages/discounts/comparison tables.

### 5.9 Why Choose Us
- Soft Linen bg. Label `WHY LUMIÈRE`; headline "Luxury Care Backed By Medical
  Expertise"; exact subheadline.
- Six trust cards (3-col desktop / 1-col mobile): Physician-Led Treatments,
  Personalized Consultations, Natural-Looking Results, Advanced Technology,
  15+ Years Experience, Patient-Centered Care.
- "The Lumière Difference" feature block (two-column: clinic image left, copy
  right) — label `THE LUMIÈRE DIFFERENCE`, headline "Treatment Plans Built
  Around You, Not Packages", exact body copy.
- Trust strip (4): Board-Certified Physician · 10,000+ Treatments Performed ·
  15+ Years Experience · Luxury Patient Experience.
- CTA: "Experience Personalized Aesthetic Care" + `Book Consultation` /
  `Take Assessment`. No testimonials/reviews/ratings.

### 5.10 Final CTA
- Distinct centered luxury conversion block, max-width **1000px**, calm and
  confident, no urgency/pressure. Primary CTA → `#contact`.

### 5.11 Footer + Contact + Map + Hours
- Deep Charcoal `#222222` bg, white/soft-gray text, champagne accents.
- Four columns (stack on mobile):
  - **Brand:** "Lumière Medical Spa" + description.
  - **Contact:** Phone `(480) 555-0197` → `tel:+14805550197`; Email
    `hello@lumieremedspa.com` → `mailto:hello@lumieremedspa.com`; Address
    "7250 E Camelback Rd, Suite 220, Scottsdale, AZ 85251" (whole block clickable,
    opens map in new tab). Map card "View on Google Maps" (clickable, new tab) →
    `https://maps.google.com/?q=33.503819235631994,-111.92654493804308`, hover
    elevation + shadow + champagne highlight.
  - **Hours:** Mon–Thu 9:00 AM–6:00 PM, Fri 9:00 AM–5:00 PM, Sat 10:00 AM–3:00 PM,
    Sun Closed.
  - **Quick Links:** About, Treatments, Results, Assessment, Contact, Book Consultation.
- Location block: label `VISIT OUR CLINIC`, headline "Located In The Heart Of
  Scottsdale", body copy. Mock premium map card (NO Google Maps API): pin icon,
  "Scottsdale, Arizona", address summary, rounded, blur-reveal animation.
- Physician reinforcement card: thumbnail, "Dr. Sophia Laurent / Medical
  Director / Board-Certified Aesthetic Physician".
- Bottom bar: `© 2025 Lumière Medical Spa` + Privacy Policy / Terms & Conditions
  / Accessibility.
- No newsletter/popups/reviews/social feeds/promos.
- This section is the `#contact` scroll target.

---

## 6. Shared Components & Conventions
- `Reveal` wrapper: standard fade-up + optional blur + stagger, reads the
  reduced-motion hook and downgrades gracefully.
- `SectionLabel`: uppercase champagne eyebrow used by multiple sections.
- Buttons: Primary = charcoal bg / light text / magnetic-ish hover scale;
  Secondary = outlined with champagne border; radius 16px. All "Book
  Consultation" variants smooth-scroll to `#contact`.
- Section IDs: `#about`, `#treatments` (services), `#results` (before/after),
  `#assessment`, `#contact` — matching nav + footer quick links.
- Accessibility: 44px+ touch targets, semantic landmarks, alt text on all
  imagery, focus states, keyboard-operable mobile menu, reduced-motion support.

---

## 7. Images to Generate (GenerateImage)
1. Dr. Sophia Laurent portrait — 3:4, female physician ~40-45, white coat, warm,
   luxury clinic (hero + reused as thumbnails).
2. Before & After pair — natural facial rejuvenation, believable/clinical.
3. Luxury consultation room — warm lighting, modern editorial (Why Choose Us
   feature block).
All editorial/luxury style; avoid stock/AI clichés.

---

## 8. Build Order
1. Tokens + fonts (`globals.css`, `layout.tsx`, metadata, `<html>` bg).
2. Shared primitives (`Reveal`, `SectionLabel`, button variants, reduced-motion hook).
3. Navigation + mobile menu.
4. Static sections top→bottom: Hero → Doctor Trust → Emotional → Before/After →
   Services → Why Choose Us → Final CTA → Footer.
5. Interactive Assessment + Personalized Results (shared state).
6. Generate + wire images.
7. Browser verification (agent-browser): scroll/blur nav, mobile menu, assessment
   flow → results, before/after drag (mouse + touch), reduced-motion, responsive
   at mobile/tablet/desktop, all anchor links + tel/mailto/map links.

---

## 9. Open / Assumed Items (flag if wrong)
- Recommendation→answer mapping rules are not fully specified; will implement a
  sensible deterministic mapping (primarily Q1-driven) with confidence % in the
  88–97 range. Confirm if a specific mapping is required.
- Confirm `framer-motion` install is acceptable (vs. CSS-only) — plan assumes yes.
- Nav anchor naming above (`#treatments`/`#results`) is an assumption for the
  Services/Before-After sections; adjust labels if different IDs are preferred.
