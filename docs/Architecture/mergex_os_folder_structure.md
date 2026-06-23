# MergeX OS Application Folder Structure

The following tree maps the exact current state of the `apps/os` directory, documenting all folder directories and key files (including Next.js layouts, pages, API handlers, configurations, and environment scripts):

```
apps/os/
├── .next/
├── .turbo/
├── docs/                       # OS specific operational files
├── public/                     # Static media assets, icons, and logos
├── src/                        # OS Source Directory
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Route Group for Authentication
│   │   │   ├── forgot-password/# Forgot Password page
│   │   │   │   └── page.tsx
│   │   │   ├── sign-in/        # Clerk dynamic Sign-In
│   │   │   │   └── [[...sign-in]]/
│   │   │   │       └── page.tsx
│   │   │   └── sign-up/        # Clerk dynamic Sign-Up
│   │   │       └── [[...sign-up]]/
│   │   │           └── page.tsx
│   │   ├── api/                # OS Backend API Route Handlers
│   │   │   ├── auth/           # Authentication Webhooks & Active Brand Lookup
│   │   │   │   ├── active-brand/route.ts
│   │   │   │   ├── invite-lookup/route.ts
│   │   │   │   ├── invite-validate/route.ts
│   │   │   │   ├── recovery-code/
│   │   │   │   │   ├── generate/route.ts
│   │   │   │   │   └── verify/route.ts
│   │   │   │   └── webhook/route.ts
│   │   │   ├── brands/         # Brand configuration APIs
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── crm/            # Sales CRM endpoints
│   │   │   │   ├── leads/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── route.ts
│   │   │   │   │       ├── activities/route.ts
│   │   │   │   │       ├── audit/route.ts
│   │   │   │   │       ├── business-review/route.ts
│   │   │   │   │       ├── convert/route.ts
│   │   │   │   │       ├── meetings/route.ts
│   │   │   │   │       ├── notes/route.ts
│   │   │   │   │       ├── proposals/route.ts
│   │   │   │   │       └── tasks/
│   │   │   │   │           ├── route.ts
│   │   │   │   │           └── [taskId]/route.ts
│   │   │   │   ├── meetings/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [meetingId]/route.ts
│   │   │   │   ├── opportunities/route.ts
│   │   │   │   ├── options/route.ts
│   │   │   │   ├── proposals/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [proposalId]/route.ts
│   │   │   │   └── settings/route.ts
│   │   │   ├── onboarding/route.ts
│   │   │   ├── profile/route.ts
│   │   │   ├── pulse/          # Notification engines & heartbeat processes
│   │   │   │   ├── activity/route.ts
│   │   │   │   ├── emit/route.ts
│   │   │   │   ├── notifications/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/route.ts
│   │   │   │   ├── preferences/route.ts
│   │   │   │   └── process/route.ts
│   │   │   ├── releases/       # Version releases APIs
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/route.ts
│   │   │   │   └── latest/route.ts
│   │   │   ├── search/route.ts
│   │   │   ├── setup/          # First-time portal initialization status
│   │   │   │   ├── route.ts
│   │   │   │   └── status/route.ts
│   │   │   ├── team/           # Team management web API
│   │   │   │   ├── invite/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── resend/route.ts
│   │   │   │   ├── members/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── archive/route.ts
│   │   │   │   │   ├── audit/route.ts
│   │   │   │   │   └── restore/route.ts
│   │   │   │   └── roles/route.ts
│   │   │   ├── upload/route.ts
│   │   │   └── user/active-brand/route.ts
│   │   ├── changelog/          # Release log card page
│   │   │   └── page.tsx
│   │   ├── invite/             # Dynamic invite lookup links
│   │   │   └── [token]/
│   │   │       └── page.tsx
│   │   ├── me/                 # Current employee profile edit routes
│   │   │   ├── edit/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── setup/              # Admin setup landing page
│   │   │   └── page.tsx
│   │   ├── sso-callback/       # SSO login callback handler
│   │   │   └── page.tsx
│   │   ├── unauthorized/       # Blocked access route warning screen
│   │   │   └── page.tsx
│   │   ├── workspaces/         # Workspace portals router
│   │   │   ├── [slug]/         # Dynamic slug layout
│   │   │   │   ├── clients/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── crm/
│   │   │   │   │   ├── companies/page.tsx
│   │   │   │   │   ├── contacts/page.tsx
│   │   │   │   │   ├── deals/page.tsx
│   │   │   │   │   ├── leads/
│   │   │   │   │   │   ├── [id]/page.tsx
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── leads-client.tsx
│   │   │   │   │   │   ├── new/page.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── sales-conversion/
│   │   │   │   │   │   ├── [id]/page.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── documents/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── knowledge/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── team/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   ├── notifications/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css         # Global styling settings
│   │   ├── layout.tsx          # Root Layout component
│   │   ├── not-found.tsx       # 404 page component
│   │   ├── page.tsx            # Main Landing / Dashboard page router
│   │   ├── robots.ts           # Search crawler parameters
│   │   └── sitemap.ts          # XML sitemap configuration
│   ├── components/             # Reusable UI elements (dialogs, tables, switches)
│   ├── constants/              # System constants and config maps
│   ├── contexts/               # Custom React Contexts (e.g., active brand Context)
│   ├── hooks/                  # Custom hooks (e.g., useActiveBrand)
│   ├── lib/                    # SDK & library setups (Clerk, Prisma, Supabase)
│   ├── modules/                # Core operations modules
│   ├── providers/              # React state provider wrappers
│   ├── proxy.ts                # Next.js request routing proxy (former middleware)
│   └── types/                  # Internal TypeScript type definitions
├── .env                        # Local environment variables
├── .gitignore                  # Local build ignoring rules
├── components.json             # shadcn components configs
├── eslint.config.mjs           # eslint configuration file
├── next-env.d.ts               # Next.js global types definition
├── next.config.ts              # Next.js configurations
├── opencode.json               # OpenCode extension configuration metadata
├── package.json                # Project dependencies and operational scripts
├── postcss.config.mjs          # CSS transformation configurations
├── skills-lock.json            # Active agent skills registry lockfile
├── tsconfig.json               # TypeScript compiler config
└── README.md                   # Application README file
```
