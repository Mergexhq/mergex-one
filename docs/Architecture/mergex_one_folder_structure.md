# MergeX One Workspace Folder Structure

The following tree describes the root-level layout of the `mergex-one` pnpm Turborepo monorepo:

```
mergex-one/
├── .github/
│   └── workflows/
│       └── ci.yml               # Github Actions CI build & lint workflow
├── .agent/                      # Coding Agent configuration metadata
├── apps/                        # Applications (Next.js 16+)
│   ├── website/                 # Marketing website, careers, and public agreements
│   │   ├── src/                 # App source code
│   │   ├── public/              # Static assets
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.ts
│   ├── os/                      # MergeX OS (internal operations portal)
│   │   ├── src/                 # App source code
│   │   ├── public/              # Static assets
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.ts
│   └── hq/                      # MergeX HQ (client experience portal)
│       ├── src/                 # App source code
│       ├── public/              # Static assets
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.ts
├── packages/                    # Shared Packages (local workspace submodules)
│   ├── auth/                    # Shared auth permissions (Clerk & CASL)
│   ├── database/                # Shared database client instantiation & query layers
│   ├── ui/                      # Shared design system components & styles (Tailwind CSS v4)
│   ├── types/                   # Shared TypeScript models & types
│   ├── notifications/           # Push/in-app notification handlers
│   ├── documents/               # Document generation (PDF/Excel utilities)
│   ├── storage/                 # Cloudflare R2 / AWS S3 client wrapper
│   ├── email/                   # Resend transactional email client wrapper
│   ├── analytics/               # Analytics event tracking helpers
│   └── utils/                   # General helper functions
├── prisma/                      # Database Layer (root level)
│   ├── migrations/              # Database migration SQL files
│   └── schema.prisma            # Operational schema database definition
├── docs/                        # Monorepo Documentation
│   ├── PRD/                     # Product Requirement Documents
│   ├── SRS/                     # Software Requirement Specifications
│   ├── DAS/                     # Database Architecture Specifications
│   ├── SOP/                     # Standard Operating Procedures
│   └── Architecture/            # Architecture blueprints & structures
├── .gitignore                   # Monorepo gitignore file (ignores build cache/node_modules recursively)
├── package.json                 # Monorepo workspace settings & devDependencies
├── pnpm-workspace.yaml          # pnpm workspace configurations
├── pnpm-lock.yaml               # pnpm workspace lockfile
├── prisma.config.ts             # Prisma configuration (DIRECT_URL config for migration)
├── turbo.json                   # Turborepo task configuration
└── README.md                    # Project README file
```
