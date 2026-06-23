# Sanity CMS Schema Design & Architecture Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Design and implement the lean editorial operating system for Sanity CMS, incorporating the 6 required content models, a custom structured sidebar, singletons, and rich filters for Insights.

**Architecture:** 
1. **Desk Structure (`structure.ts`)**: Custom grouping into *Publishing*, *Company*, *Legal*, and *System*.
2. **Singletons**: Configured for `privacyPolicy`, `termsOfUse`, and `globalSettings` (preventing creation/deletion).
3. **Filtering**: Pre-configured sub-menus under Insights for *All Insights*, *Featured*, *By Category*, and *Drafts*.
4. **Icons**: Clean monochrome icons using `lucide-react`.

**Tech Stack:** Sanity CMS v3, TypeScript, Lucide Icons.

---

## User Review Required

> [!IMPORTANT]
> The plan specifies using `lucide-react` for monochrome icons inside the Sanity Studio. We will install `lucide-react` inside `studio-mergex-console` as a dependency.
> Please review the custom structure and rich filters designed for Insights to ensure they match your expected editorial workflow.

---

## Proposed Changes

### Component: Sanity CMS Schemas

#### [NEW] [studio-mergex-console/schemaTypes/insight.ts](file:///d:/web%20development/the-mergex-company/studio-mergex-console/schemaTypes/insight.ts)
Defines the `insight` document type schema, categories, validation rules, and custom preview formatting.

#### [NEW] [studio-mergex-console/schemaTypes/caseStudy.ts](file:///d:/web%20development/the-mergex-company/studio-mergex-console/schemaTypes/caseStudy.ts)
Defines the `caseStudy` document type schema using "Constraint", "Intervention", "Outcome" and key-value metrics array.

#### [NEW] [studio-mergex-console/schemaTypes/career.ts](file:///d:/web%20development/the-mergex-company/studio-mergex-console/schemaTypes/career.ts)
Defines the `career` document type schema for open roles.

#### [NEW] [studio-mergex-console/schemaTypes/privacyPolicy.ts](file:///d:/web%20development/the-mergex-company/studio-mergex-console/schemaTypes/privacyPolicy.ts)
Defines the singleton schema for the Privacy Policy page.

#### [NEW] [studio-mergex-console/schemaTypes/termsOfUse.ts](file:///d:/web%20development/the-mergex-company/studio-mergex-console/schemaTypes/termsOfUse.ts)
Defines the singleton schema for the Terms of Use page.

#### [NEW] [studio-mergex-console/schemaTypes/globalSettings.ts](file:///d:/web%20development/the-mergex-company/studio-mergex-console/schemaTypes/globalSettings.ts)
Defines the singleton schema for default SEO, social links, footer links, and contact information.

#### [MODIFY] [studio-mergex-console/schemaTypes/index.ts](file:///d:/web%20development/the-mergex-company/studio-mergex-console/schemaTypes/index.ts)
Register all schema types.

### Component: Sanity Studio Custom Structure

#### [NEW] [studio-mergex-console/structure.ts](file:///d:/web%20development/the-mergex-company/studio-mergex-console/structure.ts)
Defines the custom sidebar groups (Publishing, Company, Legal, System) and filters/singletons.

#### [MODIFY] [studio-mergex-console/sanity.config.ts](file:///d:/web%20development/the-mergex-company/sanity.config.ts)
Attach the custom structure tool and define document actions to disable creation/deletion for singletons.

---

## Detailed Tasks

### Task 1: Install lucide-react in Studio
Install the icon library inside the Studio directory to enable clean, monochrome icons.

**Files:**
- Modify: `studio-mergex-console/package.json`

**Step 1: Install dependency**
Run from the root directory:
```powershell
cd studio-mergex-console
npm install lucide-react
```

---

### Task 2: Implement CMS Schema Types
Create the schema definitions for all 6 models and register them in `schemaTypes/index.ts`.

**Files:**
- Create: `studio-mergex-console/schemaTypes/insight.ts`
- Create: `studio-mergex-console/schemaTypes/caseStudy.ts`
- Create: `studio-mergex-console/schemaTypes/career.ts`
- Create: `studio-mergex-console/schemaTypes/privacyPolicy.ts`
- Create: `studio-mergex-console/schemaTypes/termsOfUse.ts`
- Create: `studio-mergex-console/schemaTypes/globalSettings.ts`
- Modify: `studio-mergex-console/schemaTypes/index.ts`

**Step 1: Write `insight.ts` schema**
Define fields: `title`, `slug`, `excerpt`, `coverImage`, `category` (with strict MergeX list), `readingTime`, `publishedDate`, `author`, `bodyContent`, `seoTitle`, `seoDescription`, `featuredInsight`. Configure custom document preview card.

**Step 2: Write `caseStudy.ts` schema**
Define fields: `clientName`, `slug`, `industry`, `coverImage`, `constraint`, `diagnosis`, `intervention` (rich content block), `outcome`, `metrics` (array of objects), `gallery`, `testimonial` (object), `publishedDate`, `seoTitle`, `seoDescription`.

**Step 3: Write `career.ts` schema**
Define fields: `roleTitle`, `slug`, `department`, `employmentType`, `location`, `roleOverview`, `responsibilities` (array), `requirements` (array), `status` (Open/Closed), `applyLink`, `publishedDate`.

**Step 4: Write `privacyPolicy.ts` schema**
Define singleton structure: `title`, `lastUpdated`, `content` (array of blocks), `seoTitle`, `seoDescription`.

**Step 5: Write `termsOfUse.ts` schema**
Define singleton structure: `title`, `lastUpdated`, `content` (array of blocks), `seoTitle`, `seoDescription`.

**Step 6: Write `globalSettings.ts` schema**
Define singleton structure: `siteTitle`, `siteDescription`, `ogImage`, `contactEmail`, `socialLinks`, `footerLinks`, `companyAddress`, `phone`.

**Step 7: Register Schemas in `schemaTypes/index.ts`**
Import and export all 6 schemas in the `schemaTypes` array.

---

### Task 3: Implement Custom Structure and Sidebar configuration
Configure the Desk/Structure Tool with custom groupings, singleton layouts, and rich filters for Insights.

**Files:**
- Create: `studio-mergex-console/structure.ts`
- Modify: `studio-mergex-console/sanity.config.ts`

**Step 1: Create `structure.ts`**
Implement the custom layout grouping and add filters for Insights (All, Featured, Category, Drafts).

**Step 2: Configure `sanity.config.ts`**
Attach `structure` to `structureTool()` and add document action filters to lock down singletons.

---

## Verification Plan

### Automated Tests
- Run `npm run build` in `studio-mergex-console` to ensure successful TypeScript compilation.

### Manual Verification
- Start the studio dev server: `npm run dev` in `studio-mergex-console`.
- Navigate to `http://localhost:3333` (or `http://localhost:3000/console`).
- Verify the sidebar groups: *Publishing*, *Company*, *Legal*, and *System*.
- Check that *Privacy Policy*, *Terms of Use*, and *Global Settings* show single editor screens (cannot add/delete).
- Verify the *Insights* sub-menus filter content correctly (All, Featured, By Category, Drafts).
