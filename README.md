# Buzzvel Frontend Challenge 2026

Responsive page for Buzzvel's frontend coding challenge.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS and pnpm.

## Run

```sh
pnpm install
pnpm dev        # http://127.0.0.1:3000
pnpm storybook  # http://127.0.0.1:6006
```

Local checks: `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm test`, `pnpm build`, `pnpm build-storybook`.

## Implementation

UI components follow Atomic Design in `src/components/ui/{atoms,molecules,organism}`, with colocated stories and tests. Components were developed in Storybook before page assembly, using shared design primitives, local assets and typed fixtures in `src/mocks`.

Form validation uses React Hook Form and Yup. Local asynchronous mocks cover pending, success, failure and retry without sending or persisting messages. Page assembly and demo-link behavior are tracked in [issue #18](https://github.com/Guilherme-oddie/buzzvel-frontend-challenge-2026/issues/18).

## Validation

Browser review compares Storybook previews against Figma at desktop, mobile and intermediate widths, including keyboard navigation and form states. Desktop and mobile screenshots are captured manually and attached directly to PR descriptions.

Vitest covers props, variants and snapshots, with focused interaction and mock tests. Each PR records completed checks and any pending visual, interaction or accessibility review.

## Delivery workflow

Work is tracked in the public [GitHub Projects board](https://github.com/users/Guilherme-oddie/projects/1): Backlog → Ready → In progress → In review → Done. Tickets define context, scope, acceptance criteria, validation and Figma references.

Feature branches use `feat/<issue>-<slug>` and PRs target `dev`. Commits follow `<type>: <description>`; feature PR titles follow `<Type>/#<issue>: <summary> [DEV]`. The [PR template](.github/PULL_REQUEST_TEMPLATE.md) includes a linked ticket, review checklist, test steps and screenshots.

Both `dev` and `main` require PRs and resolved discussions; force pushes and branch deletion are blocked. A single release to `main` is planned after final page validation.

Example: [Footer ticket #16](https://github.com/Guilherme-oddie/buzzvel-frontend-challenge-2026/issues/16) and [PR #34](https://github.com/Guilherme-oddie/buzzvel-frontend-challenge-2026/pull/34), including manually attached desktop and mobile screenshots.

## AI assistance

Codex assisted with setup and implementation.
