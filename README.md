# MergeX One Monorepo

This repository is a pnpm + Turborepo workspace for the MergeX applications and shared packages.

## Apps

- `@mergex/website` - public marketing website
- `@mergex/os` - internal operations portal
- `@mergex/hq` - client experience portal

## Shared Packages

Shared code lives in `packages/*`, including:

- `@mergex/auth`
- `@mergex/database`
- `@mergex/ui`
- `@mergex/types`
- `@mergex/notifications`
- `@mergex/documents`
- `@mergex/storage`
- `@mergex/email`
- `@mergex/analytics`
- `@mergex/utils`

## Install

```bash
pnpm install
```

If pnpm is not installed:

```bash
npm install -g pnpm
```

## Run All Apps

```bash
pnpm dev
```

This runs the `dev` task through Turborepo.

## Run a Specific App

```bash
pnpm --filter @mergex/os dev
pnpm --filter @mergex/website dev
pnpm --filter @mergex/hq dev
```

## Build

Build the full workspace:

```bash
pnpm build
```

Build a specific app:

```bash
pnpm --filter @mergex/os build
```

## Lint

Lint the full workspace:

```bash
pnpm lint
```

Lint a specific app:

```bash
pnpm --filter @mergex/os lint
```

## Database

Prisma schema and migrations live in `prisma/`.

Generate the Prisma client:

```bash
pnpm db:generate
```

## Add Packages

Add a dependency to the workspace root:

```bash
pnpm add package-name -w
```

Add a dependency to a specific app:

```bash
pnpm --filter @mergex/os add package-name
```

Add a local shared package to an app:

```bash
pnpm --filter @mergex/os add @mergex/ui@workspace:*
```

## Useful Docs

- Root architecture: `docs/Architecture/mergex_one_folder_structure.md`
- OS app structure: `docs/Architecture/mergex_os_folder_structure.md`

## Notes

This repo uses Next.js 16. Before changing Next.js app code, read the relevant local guide in `node_modules/next/dist/docs/` and follow any deprecation notices.
