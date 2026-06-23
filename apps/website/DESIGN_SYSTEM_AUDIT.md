# DESIGN SYSTEM AUDIT

This document provides a comprehensive, exhaustive audit of the typography, colors, spacing, layout, components, icons, and responsiveness across the entire MergeX codebase. It catalogs current design inconsistencies and proposes a unified design system to align all pages under a cohesive, premium editorial design language.

---

## SECTION 1 — TYPOGRAPHY AUDIT

### Font Family Mappings & Usage

The codebase imports and references five distinct font families. The table below details their exact declarations, file paths, and typography styling.

| Font Family Name | Declared Variable / Class | File Path + Component/Element Name | Font Sizes Found | Font Weights Found | Line Heights Found | Letter Spacing Values |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Manrope** | `var(--font-manrope)`<br>`.font-body` | Global Body Font:<br>- [layout.tsx](file:///d:/web%20development/the-mergex-company/src/app/layout.tsx)<br>- [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css)<br><br>Scoped Page Styling:<br>- [about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css) (`.about-page`) <br>- [methodology.css](file:///d:/web%20development/the-mergex-company/src/app/methodology/methodology.css) (`.methodology-page`) <br>- [HomeHero.css](file:///d:/web%20development/the-mergex-company/src/modules/home/components/HomeHero.css) (`.home-hero-scroll-wrapper`) | `10px`, `11px`, `12px`, `12.5px`, `13px`, `13.5px`, `14px`, `15px`, `16px`, `17px`, `18px`, `20px`, `22px`, `24px`, `28px`, `32px`, `36px`, `40px`, `42px`, `48px`, `52px`, `56px`, `60px`, `72px`, `92px`, `96px` | `100` (extralight)<br>`300` (light)<br>`400` (normal)<br>`500` (medium)<br>`600` (semibold)<br>`700` (bold) | `1.05`, `1.08`, `1.12`, `1.22`, `1.35`, `1.4`, `1.5`, `1.6`, `1.65`, `1.7`, `1.75`, `1.8`, `1.85`, `leading-none`, `leading-tight`, `leading-snug`, `leading-relaxed` | `0.01em`, `0.02em`, `0.04em`, `0.06em`, `0.08em`, `0.1em`, `0.12em`, `0.15em`, `0.18em`, `0.2em`, `0.22em`, `0.25em`, `tracking-tighter`, `tracking-tight`, `tracking-wide`, `tracking-wider`, `tracking-widest` |
| **Playfair Display** | `var(--font-playfair-display)`<br>`.font-serif` | Heading & Editorial Accents:<br>- [layout.tsx](file:///d:/web%20development/the-mergex-company/src/app/layout.tsx)<br>- [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css)<br>- [about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css) (`--ap-serif`) <br>- [methodology.css](file:///d:/web%20development/the-mergex-company/src/app/methodology/methodology.css) (`--mp-serif`) <br>- [HomeHero.css](file:///d:/web%20development/the-mergex-company/src/modules/home/components/HomeHero.css) (`--hh-serif`) <br>- [InsightDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightDetailClient.tsx) (`h1`, `h2`) | `18px`, `20px`, `21px`, `22px`, `24px`, `25px`, `26px`, `28px`, `30px`, `32px`, `36px`, `38px`, `40px`, `42px`, `44px`, `48px`, `52px`, `56px`, `60px`, `68px`, `72px`, `80px`, `92px` | `300` (light)<br>`400` (normal)<br>`500` (medium)<br>`600` (semibold) | `1.05`, `1.08`, `1.1`, `1.12`, `1.2`, `1.22`, `1.35`, `1.4`, `1.75` | `-0.03em`, `-0.025em`, `-0.02em`, `-0.01em`, `tracking-tight` |
| **Clash Display** | `'Clash Display'`<br>`.font-clash` | Display Titles & Brand Logos:<br>- [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) (global utility)<br>- [FlowingMenu.css](file:///d:/web%20development/the-mergex-company/src/components/ui/FlowingMenu/FlowingMenu.css) (`.menu__item-link`, `marquee span`) <br>- [FooterCurtain.tsx](file:///d:/web%20development/the-mergex-company/src/components/FooterCurtain.tsx) (Logo banner)<br>- [Navbar.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/Navbar.tsx) (Desktop Header Logo)<br>- [MobileNav.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/MobileNav.tsx) (Mobile Header Logo)<br>- [InsightSidebar.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightSidebar.tsx) (`.font-clash`) | `1.1rem`, `1.8rem`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-[1.75rem]`, `text-[2.25rem]`, `14vw`, `19vw`, `20vw` | `600` (semibold)<br>`700` (bold) | `1.0` (line-height: 1), `1.1`, `1.15`, `leading-none`, `leading-snug` | `0.05em`, `0.6em`, `0.7em`, `tracking-wide`, `tracking-wider`, `tracking-widest` |
| **Roboto** | `var(--font-roboto)`<br>`.font-roboto` | Action Links & Labels:<br>- [layout.tsx](file:///d:/web%20development/the-mergex-company/src/app/layout.tsx)<br>- [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css)<br>- [Navbar.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/Navbar.tsx) (desktop link items) <br>- [MobileNav.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/MobileNav.tsx) (taglines) | `10px`, `11px`, `12px`, `13px` | `600` (semibold)<br>`700` (bold) | Browser default | `0.18em`, `0.22em`, `tracking-widest` |
| **Great Vibes** | `var(--font-great-vibes)`<br>`.font-great-vibes` | Loaded but unused:<br>- [layout.tsx](file:///d:/web%20development/the-mergex-company/src/app/layout.tsx)<br>- [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) | None | `400` | Browser default | None |

### Current Typography Inconsistencies

1. **Dead Font Loading**: The google font `Great Vibes` is imported in `layout.tsx` (lines 30-35) and registered in `globals.css` (line 203), but is **never used** anywhere in the active source directories. This results in waste of network weight.
2. **Redundant Inline Fonts**: Direct inline style overriding for `'Clash Display'` (e.g. `style={{ fontFamily: "'Clash Display', sans-serif" }}`) is used in [Navbar.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/Navbar.tsx), [MobileNav.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/MobileNav.tsx), and [InsightSidebar.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightSidebar.tsx) instead of relying cleanly on the `.font-clash` global class.
3. **Divergent Heading Fonts & Weights**:
   - `InsightDetailClient.tsx` uses Playfair Display (`font-serif`) for H2 headings with a semibold weight: `.text-2xl md:text-3xl font-serif font-semibold`.
   - `OpportunitiesSection.tsx` uses standard sans-serif (Manrope) for H2 headings with bold weight: `.text-3xl font-bold md:text-4xl`.
   - `ContactForm.tsx` uses standard sans-serif for H2 headings: `.text-2xl font-bold md:text-3xl`.
   - `InsightDetailClient.tsx` uses Clash Display for H3 headings: `.text-lg md:text-xl font-clash font-semibold`.
   - `OpportunitiesSection.tsx` uses standard sans-serif for H3 headings: `.text-lg font-bold`.
4. **Navigational Font Clashes**: Navigation links in `Navbar.tsx` use `font-roboto` (Roboto) with `font-bold` and uppercase letter spacing. Conversely, sidebars (`InsightSidebar.tsx`, `CaseStudySidebar.tsx`) use `font-clash` for navigation headers and default body fonts for links, making headers look inconsistent.
5. **Inconsistent Section Eyebrows**:
   - `AlsoFromMergeX.tsx`: `text-[10px] font-bold uppercase tracking-[0.25em] text-primary`
   - `HomeHero.tsx`: `text-xs font-bold uppercase tracking-widest text-primary` (0.1em)
   - `HomeHero.css` (`.hh-eyebrow`): `font-size: 11px; font-weight: 500; letter-spacing: 0.22em; uppercase`
   - `ContactSection.tsx` (`sectionLabel`): `text-[14px] font-bold tracking-[0.25em] uppercase`
   - `OpportunitiesSection.tsx` (meta): `text-xs font-bold tracking-wider uppercase`

---

## SECTION 2 — COLOR AUDIT

The project utilizes a split editorial theme (light warm papers and selective dark panels) but contains hundreds of hardcoded color declarations that dilute the primary system.

### Color Inventory & Tokens

| Color Hex / Value | Tailwind / CSS Variable Name | Where Used (File Path + Element Type) | Variable or Hardcoded |
| :--- | :--- | :--- | :--- |
| `#F3F3F3` | `--background`, `--ap-bg`, `--mp-bg` | - [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) (body background)<br>- [about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css) (`.about-page` background)<br>- [methodology.css](file:///d:/web%20development/the-mergex-company/src/app/methodology/methodology.css) (`.methodology-page` background)<br>- [CareersHero.tsx](file:///d:/web%20development/the-mergex-company/src/modules/careers/components/CareersHero.tsx) (Hero section background)<br>- [ContactForm.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactForm.tsx) (Form outer section background)<br>- [MarqueeStrip.tsx](file:///d:/web%20development/the-mergex-company/src/components/MarqueeStrip.tsx) (container) | Variable inside CSS files;<br>**Hardcoded** in TSX files as `bg-[#F3F3F3]` |
| `#080808` | `--background` (Dark mode) | - [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) (dark mode body background) | Variable |
| `#0a0a0a` | None | - [Navbar.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/Navbar.tsx) (`bg-[#0a0a0a]` dropdown panel)<br>- [MobileNav.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/MobileNav.tsx) (`bg-[#0a0a0a]` container background) | Hardcoded |
| `#020202` | `--sidebar` (Dark mode) | - [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) (dark sidebar token)<br>- [InsightSidebar.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightSidebar.tsx) (`bg-[#020202]` background)<br>- [CaseStudySidebar.tsx](file:///d:/web%20development/the-mergex-company/src/modules/case-studies/components/CaseStudySidebar.tsx) (`bg-[#020202]` background) | Variable token & **Hardcoded** in TSX sidebars |
| `#0B0B0B` | None | - [OvrnBrandContent.tsx](file:///d:/web%20development/the-mergex-company/src/modules/brands/components/OvrnBrandContent.tsx) (page wrapper background) | Hardcoded |
| `#E7E7E2` | `--border`, `--input` | - [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) (global borders/dividers) | Variable |
| `#E2E2DE` | `--ap-border`, `--mp-border` | - [about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css) (page border)<br>- [methodology.css](file:///d:/web%20development/the-mergex-company/src/app/methodology/methodology.css) (page border) | Variable (local scoped) |
| `#CECECA` | `--ap-border-mid`, `--mp-border-mid` | - [about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css) (mid borders)<br>- [methodology.css](file:///d:/web%20development/the-mergex-company/src/app/methodology/methodology.css) (mid borders) | Variable (local scoped) |
| `#8B5CF6` | `--primary`, `--ap-purple`, `--mp-purple` | - [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) (violet colors)<br>- [EcosystemDiagram.tsx](file:///d:/web%20development/the-mergex-company/src/modules/brands/components/EcosystemDiagram.tsx) (accent core color)<br>- [BrandBlock.tsx](file:///d:/web%20development/the-mergex-company/src/modules/brands/components/BrandBlock.tsx) (accent core color) | Variable & **Hardcoded** |
| `#7c3aed` | `--primary-hover` | - [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css)<br>- [HomeHero.css](file:///d:/web%20development/the-mergex-company/src/modules/home/components/HomeHero.css) (gradient end color) | Variable & **Hardcoded** |
| `#a78bfa` | `--primary-light`, `--hh-purple` | - [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css)<br>- [HomeHero.css](file:///d:/web%20development/the-mergex-company/src/modules/home/components/HomeHero.css) (gradient accent color) | Variable & **Hardcoded** |
| `#EBEBEB` | `--ap-surface`, `--mp-surface`, `--muted` | - [about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css)<br>- [methodology.css](file:///d:/web%20development/the-mergex-company/src/app/methodology/methodology.css)<br>- [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) | Variable token |
| `#E8E8E8` | `--background-subtle`, `--secondary` | - [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) | Variable token |
| `#FFFFFF` | None | - [about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css) (`.belief-card`, `.eco-card` background)<br>- [ContactSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactSection.tsx) (select inputs background)<br>- [InsightDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightDetailClient.tsx) (AI recommendation box) | Hardcoded |
| `#F5F3F0` | None | - [InsightDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightDetailClient.tsx) (light mode client container background) | Hardcoded |
| `#F5F2F9` | None | - [InsightDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightDetailClient.tsx) (overview card background) | Hardcoded |
| `#EAE8E4` | None | - [InsightDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightDetailClient.tsx) (tldr block background) | Hardcoded |
| `#0E0B18` | None | - [Proof.tsx](file:///d:/web%20development/the-mergex-company/src/modules/home/components/Proof.tsx) (proof block inner background) | Hardcoded |
| `#050a18` | None | - [neon-orbs.tsx](file:///d:/web%20development/the-mergex-company/src/components/ui/neon-orbs.tsx) (fallback dark background) | Hardcoded |

### Color Inconsistency Report

1. **Neutral Background Inconsistencies**:
   - The primary background is set to `#F3F3F3` in `globals.css` and scoped styles.
   - However, [InsightDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightDetailClient.tsx) introduces three other warm paper backgrounds: `#F5F3F0` (content container background), `#F5F2F9` (overview container background), and `#EAE8E4` (TL;DR block background). This breaks color consistency across similar views.
2. **Divergent Light-mode Borders**:
   - `globals.css` specifies `--border` as `#E7E7E2`.
   - `about.css` and `methodology.css` override this color by scoping `--ap-border`/`--mp-border` to `#E2E2DE`.
   - Form containers use Tailwind’s default `border-gray-200` (`#e5e7eb`).
3. **Hardcoded Gray and Dark Shades**:
   - Dark backgrounds use `#080808` (global dark), `#0a0a0a` (headers/drawers), `#020202` (sidebars), `#0B0B0B` (OVRN brand), `#0E0B18` (proof panel), `#0c0c10` (chat input), `#0d0d11` (chat header), and `#101010` (global dark card token). This creates a highly fragmented dark system.
4. **Purple Accent Hardcoding**:
   - `framer-motion` triggers and styling gradients utilize multiple hardcoded variations of purple (e.g. `violet-600`, `purple-600`, `purple-300`, `from-violet-400 to-violet-900` gradient, `#c084fc`, `#8b5cf6`, `#581c87`) instead of using centralized design tokens.

---

## SECTION 3 — SPACING & LAYOUT AUDIT

### Off-Grid Spacing Values

The layout grid is theoretically built on a 4px/8px scale. However, the scoped CSS stylesheets and ad-hoc components introduce several off-grid padding and margin configurations:

- **`.section-pill` ([about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css))**: `padding: 5px 14px;` (both vertical 5px and horizontal 14px break standard 4px steps).
- **`.hero-pill` ([about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css))**: `padding: 6px 16px;` (vertical 6px breaks 4px steps).
- **`.methodology-cta-btn` ([methodology.css](file:///d:/web%20development/the-mergex-company/src/app/methodology/methodology.css))**: `padding: 14px 28px;` (vertical 14px breaks 4px steps).
- **`Navbar.tsx` ([Navbar.tsx](file:///d:/web%20development/the-mergex-company/src/components/layout/Header/Navbar.tsx))**: Custom link paddings like `py-2.5 xl:py-3` (10px breaks 8px step, 12px is ok).

### Layout Metrics

1. **Max Width Container Scales**:
   - `max-w-[84rem]` (1344px): Used in [Proof.tsx](file:///d:/web%20development/the-mergex-company/src/modules/home/components/Proof.tsx) and [DiagnosticApproach.tsx](file:///d:/web%20development/the-mergex-company/src/modules/home/components/DiagnosticApproach.tsx).
   - `max-w-7xl` (1280px): Used in Home page layouts ([ProblemStatement.tsx](file:///d:/web%20development/the-mergex-company/src/modules/home/components/ProblemStatement.tsx), [InsightsPreview.tsx](file:///d:/web%20development/the-mergex-company/src/modules/home/components/InsightsPreview.tsx), [FinalCTA.tsx](file:///d:/web%20development/the-mergex-company/src/modules/home/components/FinalCTA.tsx), [AlsoFromMergeX.tsx](file:///d:/web%20development/the-mergex-company/src/modules/home/components/AlsoFromMergeX.tsx)) and [Footer.tsx](file:///d:/web%20development/the-mergex-company/src/components/Footer.tsx).
   - `max-w-6xl` (1152px): Used in [OpportunitiesSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/careers/components/OpportunitiesSection.tsx), [ContactSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactSection.tsx), and [OvrnBrandContent.tsx](file:///d:/web%20development/the-mergex-company/src/modules/brands/components/OvrnBrandContent.tsx).
   - `max-w-5xl` (1024px): Used in [CareersHero.tsx](file:///d:/web%20development/the-mergex-company/src/modules/careers/components/CareersHero.tsx) and [MergeXHero.tsx](file:///d:/web%20development/the-mergex-company/src/modules/brands-mergex/components/MergeXHero.tsx).
   - `max-w-3xl` (768px): Used in forms ([ContactForm.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactForm.tsx), [ContactNextSteps.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactNextSteps.tsx)).
   - `max-w-[800px]` & `max-w-[740px]`: Used in Detail pages ([InsightDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightDetailClient.tsx), [CaseStudyDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/case-studies/components/CaseStudyDetailClient.tsx)).
2. **Border Radii**:
   - `rounded-none` (0px): Used on contact form inputs, selects, apply buttons, and blog tags.
   - `rounded-[7px]` & `rounded-[9px]`: Hardcoded link button radius in `Navbar.tsx`.
   - `rounded-[10px]` & `rounded-[12px]`: Used on expanded desktop nav containers and newsletter container wrapper in `Footer.tsx`.
   - `rounded-[16px]`: Used on mobile header backgrounds and about page hero panels.
   - `rounded-[24px]`: Hardcoded detail content sections in `InsightDetailClient.tsx`.
   - `rounded-xl` (14px) / `rounded-2xl` (18px) / `rounded-3xl` (22px): Used interchangeably on cards, dialogs, and sidebars.
3. **Box Shadows**:
   - `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl` are used globally.
   - Custom shadow: `shadow-[0_4px_20px_rgba(0,0,0,0.08)]` and `shadow-[0_4px_20px_rgba(0,0,0,0.3)]` (used in detail page float buttons).
   - Custom shadow: `shadow-[0_2px_12px_rgba(0,0,0,0.15)]` (tldr card).
   - Hardcoded CSS shadow: `box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15)` in `FlowingMenu.css`.
4. **Z-Index System**:
   - `z-0`: Background images, radial layout ambient glow filters.
   - `z-2`: Careers hero top shadow gradient sheet.
   - `z-10`: Normal page headers and elements.
   - `z-15`: Chat welcome panel scroll shadow overlay.
   - `z-20`: Global shell elements (Navbar logo, footer container, AskMergeX FAB, orbs, empty state illustrations).
   - `z-30`: FAB/chat window, scale section methodology CTA trigger.
   - `z-40`: Megamenu viewport blur overlay.
   - `z-50`: Main navbar structure, mobile header capsule, mobile nav trigger button.
   - `z-60`: Mobile menu backdrop blur filter layer.
   - `z-61`: Mobile bottom drawer container.
   - `z-9999`: circular GPU layout transition ripple effect in `globals.css`.

### Spacing Inconsistencies

- **Form Section Margins**:
  - `ContactForm.tsx` spaces its main section using `py-20` (80px padding).
  - `OpportunitiesSection.tsx` spaces its main section using `py-24` (96px padding).
  - `WhoThrivesHere.tsx` spaces its main section using `py-24` (96px padding).
  - `ContactNextSteps.tsx` spaces its main section using `py-16 pb-24`.
- **Card Padding**:
  - `OpportunitiesSection.tsx` roles list card uses `p-6`.
  - `ContactForm.tsx` card uses `p-8 md:p-12`.
  - `OpportunitiesSection.tsx` open application card uses `p-8`.
  - `InsightDetailClient.tsx` tldr block card uses `p-8`.

---

## SECTION 4 — COMPONENT AUDIT

### Component Variant Mapping

The codebase does not share a unified component library. Instead, core elements like buttons, inputs, and cards are re-implemented ad-hoc in separate module files.

| Component Type | Variant Name | Usages (File Path) | Styling Specification (Rounded, padding, colors) | Inconsistent Styles |
| :--- | :--- | :--- | :--- | :--- |
| **Button** | Style A (Apply) | - [OpportunitiesSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/careers/components/OpportunitiesSection.tsx) | `rounded-none border border-gray-900 px-5 py-2 text-sm font-bold text-gray-900 transition-all hover:bg-gray-900 hover:text-white` | Sharp edges, black text. |
| | Style B (Form submit) | - [ContactForm.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactForm.tsx) | `group flex w-full items-center justify-center gap-3 rounded-none bg-gray-900 py-4 text-base font-bold text-white transition-all hover:bg-gray-800` | Sharp edges, black bg. |
| | Style C (Brands link) | - [AlsoFromMergeX.tsx](file:///d:/web%20development/the-mergex-company/src/modules/home/components/AlsoFromMergeX.tsx) | `group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]` | Rounded edges, border-foreground, scale-hover. |
| | Style D (Gradient) | - [ContactSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactSection.tsx)<br>- [Footer.tsx](file:///d:/web%20development/the-mergex-company/src/components/Footer.tsx) | `group flex w-fit items-center justify-center gap-2.5 rounded-[8px] bg-linear-to-b from-violet-400 to-violet-900 px-5 py-2 text-[14px] font-medium text-white transition-all hover:opacity-90 active:scale-[0.98]` | Rounded, purple vertical gradient. |
| | Style E (AI submit) | - [GuidedFlow.tsx](file:///d:/web%20development/the-mergex-company/src/components/ask-mergex/GuidedFlow.tsx) | `w-full py-2.5 bg-violet-600 text-white rounded-xl font-bold text-[12px] shadow-md hover:bg-violet-500 transition-all` | Extra rounded (xl), violet-600. |
| | Style F (Empty State) | - [EmptyState.tsx](file:///d:/web%20development/the-mergex-company/src/components/EmptyState.tsx) | `inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-all shadow-md shadow-black/10 group` | Extra rounded (xl), black solid bg. |
| **Form Inputs** | Sharp | - [ContactForm.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactForm.tsx) | `w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 focus:border-gray-900 focus:outline-none focus:ring-0 transition-colors` | Sharp edges, black focus. |
| | Rounded | - [ContactSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactSection.tsx) | `w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors` | Rounded edges, violet focus. |
| | Dark Mode | - [GuidedFlow.tsx](file:///d:/web%20development/the-mergex-company/src/components/ask-mergex/GuidedFlow.tsx) | `w-full bg-white/[0.03] border border-white/5 text-white placeholder-white/30 rounded-xl px-3.5 py-2.5 text-[12px] focus:border-violet-500/40` | Extra rounded (xl), dark background wrapper. |
| **Cards** | Bordered | - [OpportunitiesSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/careers/components/OpportunitiesSection.tsx) | `group flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-purple-300 hover:shadow-md` | Rounded-2xl, hover border purple. |
| | Styled Dark | - [OpportunitiesSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/careers/components/OpportunitiesSection.tsx) | `rounded-3xl bg-gray-900 p-8 text-white shadow-2xl` | Rounded-3xl, dark. |
| | Article Card | - [InsightCard.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightCard.tsx) | `group flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:shadow-lg transition-shadow duration-300` | Rounded-2xl, hover shadow only. |
| | Sidebar Card | - [ContactSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactSection.tsx) | `group block p-6 rounded-2xl bg-white border border-gray-200 transition-colors hover:border-violet-200` | Rounded-2xl, border-violet on hover. |

### Duplicated & Inconsistent Components

1. **Dead/Duplicate Contact Forms**:
   - `ContactForm.tsx` (found at [ContactForm.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactForm.tsx)) and `ContactSection.tsx` (found at [ContactSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactSection.tsx)) both implement full-fledged contact forms with custom states and success layouts.
   - `ContactSection.tsx` is imported and used by the contact pages, whereas `ContactForm.tsx` is a **dead/duplicated component** that remains in the codebase.
   - The two implementations use completely different styles (one uses `rounded-none` sharp borders and inputs with dark styling, while the other uses `rounded-lg` inputs with violet highlights).
2. **Disconnected Detail Shell Layouts**:
   - The detail view clients [InsightDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightDetailClient.tsx) and [CaseStudyDetailClient.tsx](file:///d:/web%20development/the-mergex-company/src/modules/case-studies/components/CaseStudyDetailClient.tsx) dynamically bypass the standard Footer and AskMergeXWidget layout wrappers in `LayoutShell.tsx` (lines 33-35, 43, 46, 52). This detaches the blog and case study pages from the global navigation shell.
3. **Empty Directories**:
   - Several layout directories are empty and contain no components:
     - `src/components/ui/Button/`
     - `src/components/ui/Card/`
     - `src/components/ui/Badge/`
     - `src/components/ui/Modal/`
     - `src/components/layout/Footer/`
     - `src/components/layout/SEO/`

---

## SECTION 5 — ICON AUDIT

### Icon Usage Mapping

The codebase relies heavily on the `lucide-react` library but contains dozens of inline SVG duplicates.

- **Imported Icon Library**: `lucide-react` (version `^1.16.0`). Used for icons like: `ArrowUpRight`, `Zap`, `Moon`, `Sun`, `X`, `ChevronRight`, `Volume2`, `VolumeX`, `SendHorizontal`, `LoaderIcon`, `Trash2`, `Minimize2`, `Plus`, `History`, `ChevronDown`, `ArrowRight`, `CheckCircle`, `FileText`, `Briefcase`, `Mail`.
- **Custom Inline SVGs**: Used extensively for:
  - Select drop-down arrows in [ContactForm.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactForm.tsx).
  - Social media icons in [Footer.tsx](file:///d:/web%20development/the-mergex-company/src/components/Footer.tsx) (LinkedIn, X, Instagram, Threads).
  - Spinner/loaders in forms ([ContactSection.tsx](file:///d:/web%20development/the-mergex-company/src/modules/contact/components/ContactSection.tsx)).
  - Back-to-top arrows in [Footer.tsx](file:///d:/web%20development/the-mergex-company/src/components/Footer.tsx) and [InsightSidebar.tsx](file:///d:/web%20development/the-mergex-company/src/modules/insights/components/InsightSidebar.tsx).
  - Diagnostic grid maps in [BrandsHero.tsx](file:///d:/web%20development/the-mergex-company/src/modules/brands/components/BrandsHero.tsx).
- **Icon Sizes Used**:
  - `11px` / `12px` (inline SVGs inside sidebars and dropdown items).
  - `13px` / `14px` (ArrowRight, ArrowUpRight in inline buttons).
  - `16px` / `20px` (ChevronDown, social links, chevron controls).
  - `24px` (Zap, primary navigation arrows).

### Icon Inconsistencies

- The project uses `lucide-react` for standard operations (like Close `X`, `ArrowRight`, `ChevronRight`) but defines **raw inline SVG code** for identical concepts in other files (e.g. select element dropdown chevrons in `ContactForm.tsx` vs Lucide `ChevronDown` in `ContactSection.tsx`). This adds unnecessary boilerplate and breaks size/color standardization.

---

## SECTION 6 — RESPONSIVENESS AUDIT

### Breakpoints Definition & Usage

The styling sheet contains two conflicting breakpoint definition methods:

1. **Tailwind Standard Screens (640px to 1536px)**:
   - `sm`: `640px`
   - `md`: `768px`
   - `lg`: `1024px`
   - `xl`: `1280px`
   - `2xl`: `1536px`
   - Used extensively inside TSX files via class headers (`md:grid-cols-2`, `lg:pl-4`, etc.).
2. **Custom Scoped Media Queries (in scoped CSS files)**:
   - [about.css](file:///d:/web%20development/the-mergex-company/src/app/about/about.css): `@media (max-width: 1024px)`, `@media (max-width: 900px)`, `@media (max-width: 640px)`.
   - [methodology.css](file:///d:/web%20development/the-mergex-company/src/app/methodology/methodology.css): `@media (max-width: 900px)`, `@media (max-width: 640px)`.
   - [HomeHero.css](file:///d:/web%20development/the-mergex-company/src/modules/home/components/HomeHero.css): `@media (max-width: 768px)`, `@media (max-width: 640px)`.

### Responsiveness Inconsistencies

- **The `900px` Breakpoint Split**: `about.css` and `methodology.css` transition their columns and reduce paddings at a custom `900px` threshold. This layout transition conflicts with Tailwind's standard `md` (768px) and `lg` (1024px) responsive triggers, causing layout shifts on intermediate tablet views.
- **Fluid Layout Clipping**: `FooterCurtain.tsx` styles its logo display size using viewport width (`text-[19vw]`, `text-[14vw]`, `text-[1.5vw]`). On short, wide screens (like laptop displays or horizontal tablets), this text becomes excessively large and clips.

---

## SECTION 7 — CURRENT DESIGN TOKENS / VARIABLES

All active global tokens are defined inside [globals.css](file:///d:/web%20development/the-mergex-company/src/app/globals.css) under the `:root` pseudo-class (lines 57-112) and dark-mode selector `.dark` (lines 115-140):

```css
:root {
  /* Neutral Editorial System - Clean & Premium */
  --background: #F3F3F3;
  --background-soft: #F3F3F3;
  --background-subtle: #E8E8E8;
  --foreground: #121212;
  --foreground-muted: #4A4A48;

  /* Purple Accent - Minimal & Strategic */
  --primary: #8B5CF6;
  --primary-hover: #7c3aed;
  --primary-light: #a78bfa;
  --accent: #F3F3F3;
  --accent-light: #e9d5ff;

  /* Borders & Dividers - Subtle Separation */
  --border: #E7E7E2;
  --border-light: #F0F0EC;

  /* Glassmorphism */
  --glass-bg: rgba(250, 250, 247, 0.8);
  --glass-border: rgba(139, 92, 246, 0.1);

  /* Shadow System - Restrained & Professional */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
  
  --radius: 0.625rem;
  
  /* Shadcn/UI Compatibility Tokens */
  --card: #F3F3F3;
  --card-foreground: #121212;
  --popover: #F3F3F3;
  --popover-foreground: #121212;
  --primary-foreground: #ffffff;
  --secondary: #E8E8E8;
  --secondary-foreground: #121212;
  --muted: #EBEBEB;
  --muted-foreground: #4A4A48;
  --accent-foreground: #8B5CF6;
  --destructive: oklch(0.577 0.245 27.325);
  --input: #E7E7E2;
  --ring: #8B5CF6;
  
  /* Sidebar & Other Components */
  --sidebar: #F3F3F3;
  --sidebar-foreground: #121212;
  --sidebar-primary: #8B5CF6;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #E8E8E8;
  --sidebar-accent-foreground: #121212;
  --sidebar-border: #E7E7E2;
  --sidebar-ring: #8B5CF6;
}

.dark {
  --background: #080808;
  --background-soft: #101010;
  --background-subtle: #1a1a1a;
  --foreground: #ECECE8;
  --foreground-muted: #a1a1aa;
  
  --border: #242424;
  --border-light: #333333;
  
  --card: #101010;
  --card-foreground: #ECECE8;
  --popover: #101010;
  --popover-foreground: #ECECE8;
  --secondary: #1a1a1a;
  --secondary-foreground: #ECECE8;
  --muted: #1a1a1a;
  --muted-foreground: #a1a1aa;
  --input: #333333;
  
  --sidebar: #020202;
  --sidebar-foreground: #ECECE8;
  --sidebar-accent: #242424;
  --sidebar-accent-foreground: #ECECE8;
  --sidebar-border: #333333;
}
```

---

## SECTION 8 — OVERALL INCONSISTENCY SUMMARY

Below are the top 10 most impactful design inconsistencies ranked by visual damage:

1. **Button Style Chaos (High Damage)**: Six radically different button styles (Style A to F, sharp, rounded, pill, gradient, black, hover-scaled) are scattered across different pages. This disrupts the visual hierarchy.
2. **Form Element Incoherence (High Damage)**: Form inputs on the contact pages use `rounded-lg` styling with violet focus highlights. Conversely, other sections use `rounded-none` inputs with black highlight lines, causing forms to feel disconnected.
3. **Hardcoded Paper Fills (Medium Damage)**: Custom page views introduce off-palette warm/cool light backgrounds (`#F5F3F0`, `#F5F2F9`, `#EAE8E4`) that break the clean neutral `#F3F3F3` theme.
4. **Scoped Tokens Shadowing Global Theme (Medium Damage)**: Scoped CSS files override global borders (`#E2E2DE` vs `#E7E7E2`) and text colors (`#5A5A58` vs `#4A4A48`), leading to minor color variations across pages.
5. **Hardcoded Dark Background Scales (Medium Damage)**: Dark-mode components use several slightly different dark shades (`#080808`, `#0a0a0a`, `#0d0d11`, `#0c0c10`, `#020202`, `#0B0B0B`) instead of referencing centralized theme tokens.
6. **Container Scale Fragmentation (Medium Damage)**: Page content layouts stretch across six different max-widths (`84rem`, `7xl`, `6xl`, `5xl`, `3xl`, `2xl`), misaligning margins between pages.
7. **Redundant Inline SVGs (Low Damage)**: Standard navigational indicators (like chevrons, close buttons, and arrows) are implemented via raw inline SVGs instead of reusing `lucide-react` icons. This makes them difficult to maintain.
8. **Unused Font Weight Loading (Low Damage)**: The Google Font `Great Vibes` is loaded globally in the app layout but never used on the site.
9. **Dead Component Code (Low Damage)**: `ContactForm.tsx` is a duplicate, unused component file. It sits next to the active `ContactSection.tsx` but is styled differently.
10. **Non-Standard Responsive Breakpoints (Low Damage)**: Scoped styles use custom `@media (max-width: 900px)` rules, creating layout shifts that deviate from Tailwind's standard breakpoint steps.

---

## SECTION 9 — RECOMMENDED DESIGN SYSTEM TOKENS

### Typography Scale

- **Primary Font**: `var(--font-manrope), sans-serif` (Clean sans-serif for body, metrics, and description elements).
- **Display Font**: `'Clash Display', var(--font-manrope), sans-serif` (Premium display font for branding and hero headings).
- **Serif Font**: `var(--font-playfair-display), serif` (Warm editorial serif for sub-headlines, blockquotes, and accents).
- **Action Font**: `var(--font-roboto), sans-serif` (Roboto, styled for navigation tags and metadata).
- **Mono Font**: `monospace` (Clean code block font).

#### Typography Sizing Definitions

| Token Size | Font Size Value | Line Height Value | Recommended Usage |
| :--- | :--- | :--- | :--- |
| `text-display-lg` | `clamp(52px, 7vw, 92px)` | `1.08` | Main Hero Headers |
| `text-display-md` | `clamp(40px, 5.5vw, 72px)` | `1.1` | Main Page Title Headers |
| `text-display-sm` | `clamp(28px, 3.2vw, 44px)` | `1.2` | Secondary Section Titles |
| `text-title-lg` | `24px` | `1.35` | Card Headers / Subsections |
| `text-title-md` | `20px` | `1.4` | Inner Section Content Titles |
| `text-body-lg` | `18px` | `1.75` | Primary Intro Paragraphs |
| `text-body-md` | `15px` | `1.7` | Default Body Prose & Paragraphs |
| `text-body-sm` | `13px` | `1.6` | Support Details / Captions |
| `text-eyebrow` | `11px` | `1.0` (tracking `0.22em`) | Navigation labels / Pill Tags |

---

### Color Tokens

#### Warm Editorial Light Palette

- `--bg-primary`: `#F3F3F3` (warm editorial backdrop)
- `--bg-secondary`: `#EBEBEB` (secondary surfaces)
- `--bg-tertiary`: `#E8E8E8` (subtle cards/fields)
- `--text-primary`: `#121212` (high-contrast text)
- `--text-secondary`: `#5A5A58` (secondary readable text)
- `--text-tertiary`: `#9A9A98` (support/meta labels)
- `--border-primary`: `#E7E7E2` (default light border)
- `--border-secondary`: `#F0F0EC` (subtle inner border dividers)

#### Premium Dark Palette (Unified Dark mode)

- `--bg-primary`: `#080808` (deep black background)
- `--bg-secondary`: `#101010` (card/module backgrounds)
- `--bg-tertiary`: `#1A1A1A` (input field/hover backgrounds)
- `--text-primary`: `#ECECE8` (creamy off-white text)
- `--text-secondary`: `#A1A1AA` (subtle support text)
- `--text-tertiary`: `#71717A` (dark meta descriptions)
- `--border-primary`: `#242424` (dark dividers)
- `--border-secondary`: `#333333` (subtle inner separators)

#### Primary Brand Accent (Violet / Purple)

- `--color-primary-50`: `#F5F3FF`
- `--color-primary-100`: `#EDE9FE`
- `--color-primary-200`: `#DDD6FE`
- `--color-primary-300`: `#C4B5FD`
- `--color-primary-400`: `#A78BFA`
- `--color-primary-500`: `#8B5CF6` (default brand accent token)
- `--color-primary-600`: `#7C3AED`
- `--color-primary-700`: `#6D28D9`
- `--color-primary-800`: `#5B21B6`
- `--color-primary-900`: `#4C1D95`

#### Semantic Colors (Alert / States)

- **Success**:
  - Light Background: `rgba(16, 185, 129, 0.08)`
  - Text/Border: `#10B981`
- **Warning**:
  - Light Background: `rgba(245, 158, 11, 0.08)`
  - Text/Border: `#F59E0B`
- **Error**:
  - Light Background: `rgba(239, 68, 68, 0.08)`
  - Text/Border: `#EF4444`
- **Info**:
  - Light Background: `rgba(139, 92, 246, 0.08)`
  - Text/Border: `#8B5CF6`

---

### Spacing Scale

Proposes a consistent 4px-base spacing scale:

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem;  /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem;    /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem;  /* 24px */
--space-8: 2rem;    /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem;   /* 48px */
--space-16: 4rem;   /* 64px */
--space-20: 5rem;   /* 80px */
--space-24: 6rem;   /* 96px */
```

- **Section padding**: Use `--space-24` (96px) for standard view margins.
- **Card padding**: Use `--space-6` (24px) or `--space-8` (32px) for card interiors.
- **Form element gaps**: Use `--space-5` (20px) or `--space-6` (24px).

---

### Border Radius Scale

Proposes four standard values:

- `radius-sm`: `4px` (small pill tags/labels)
- `radius-md`: `8px` (buttons, form inputs, small panels)
- `radius-lg`: `12px` (default card radius, dropdown sheets)
- `radius-xl`: `16px` (main section panels/hero container blocks)
- `radius-full`: `9999px` (avatar shapes / circular controls)

---

### Shadow Scale

Proposes three standard levels:

- `shadow-sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.03)` (small items, dropdown lines)
- `shadow-md`: `0 4px 12px -2px rgba(0, 0, 0, 0.05)` (card hover overlays, navigation capsules)
- `shadow-lg`: `0 12px 24px -4px rgba(0, 0, 0, 0.06)` (floating components, overlays)

---

### Z-Index Scale

Proposes named levels to prevent depth clipping:

- `z-index-background`: `0`
- `z-index-content`: `10`
- `z-index-floating`: `20` (FAB buttons, interactive elements)
- `z-index-header`: `50` (navigation bars)
- `z-index-overlay`: `60` (backdrop masks)
- `z-index-modal`: `70` (dialog panels, mobile drawers)
- `z-index-circular-transition`: `9999` (GPU clip path ripple)

---

## HOW TO USE THIS FILE

Pass this file to an AI agent with the instruction: 

"Read `DESIGN_SYSTEM_AUDIT.md` and implement the recommended design system tokens in Section 9. Then fix every inconsistency listed in Sections 1–8 by replacing all values with the new tokens."
