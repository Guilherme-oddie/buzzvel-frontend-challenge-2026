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

The full page is composed through a layout template and a page controller. Form validation uses React Hook Form and Yup; local asynchronous mocks cover pending, success, failure and retry without sending or persisting messages.

Navigation uses real section anchors with focus transferred to the destination. Category links lead to the featured preview; community links lead to people. Unavailable demo pages lead to contact with an announced notice. The application uses native URL fragments, while `Pages / LandingPage` in Storybook keeps navigation inside its canvas. The public form succeeds by default; failure and retry scenarios stay in stories and tests.

Successful application submissions log their values in the browser console and show a native confirmation alert alongside the inline feedback. Storybook previews use Actions and inline feedback without native popups.

## Validation

Browser review compares Storybook previews against Figma at desktop, mobile and intermediate widths, including keyboard navigation and form states. Desktop and mobile screenshots are captured manually and attached directly to PR descriptions.

Manual QA findings are recorded as individual comments in [QA ticket #8](https://github.com/Guilherme-oddie/buzzvel-frontend-challenge-2026/issues/8), covering location, reproduction steps, observed and expected behavior, and a `Fix verified` checklist. The [avatar overlap](https://github.com/Guilherme-oddie/buzzvel-frontend-challenge-2026/issues/8#issuecomment-7008825253) and [contact form copy](https://github.com/Guilherme-oddie/buzzvel-frontend-challenge-2026/issues/8#issuecomment-7008829381) reports show verified fixes from this review.

Vitest covers props, variants and snapshots, with focused interaction and mock tests. Each PR records completed checks and any pending visual, interaction or accessibility review.

## Delivery workflow

Work is tracked in the public [GitHub Projects board](https://github.com/users/Guilherme-oddie/projects/1): Backlog → Ready → In progress → In review → Done. Tickets define context, scope, acceptance criteria, validation and Figma references.

Feature branches use `feat/<issue>-<slug>` and PRs target `dev`. Commits follow `<type>: <description>`; feature PR titles follow `<Type>/#<issue>: <summary> [DEV]`. The [PR template](.github/PULL_REQUEST_TEMPLATE.md) includes a linked ticket, review checklist, test steps and screenshots.

Both `dev` and `main` require PRs and resolved discussions; force pushes and branch deletion are blocked. A single release to `main` is planned after final page validation.

Example: [Footer ticket #16](https://github.com/Guilherme-oddie/buzzvel-frontend-challenge-2026/issues/16) and [PR #34](https://github.com/Guilherme-oddie/buzzvel-frontend-challenge-2026/pull/34), including manually attached desktop and mobile screenshots.

## AI assistance

Codex assisted with setup and implementation.
