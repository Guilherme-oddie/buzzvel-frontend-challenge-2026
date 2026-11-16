# Buzzvel Frontend Challenge 2026

Responsive page for Buzzvel's frontend coding challenge.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS and pnpm.

## Typography

Use `Typography` from `@/components/ui/atoms/Typography`: `variant` controls appearance; `as` controls the HTML tag. The Storybook catalogue documents the inspected Figma styles. Inter and Plus Jakarta Sans are served locally with their OFL licenses.

Mobile values apply below 960px; this breakpoint is an implementation decision. `caption` is a local name for the measured footer text, which has no named Figma style. Shared `typography-*` classes can also style native controls.

Text color inherits; use existing color utilities through `className`, e.g. `<Typography as="h1" variant="h1" className="text-primary">Heading</Typography>`.

## Workflow

Track work in the [public project](https://github.com/users/Guilherme-oddie/projects/1). Feature PRs target `dev`; releases promote validated changes to `main`.

## Run

```sh
pnpm install
pnpm dev        # http://127.0.0.1:3000
pnpm storybook  # http://127.0.0.1:6006
```

Checks: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm build-storybook`.

## Structure and scope

Components live in `src/components/ui/{atoms,molecules,organism,templates,pages}` with colocated stories and tests. Shared fixture data lives in `src/mocks`.

Current scope: Navbar only. Navigation destinations are mock anchors for future sections. The 960px breakpoint and expanded mobile menu are implementation decisions; Figma provides the desktop and closed mobile states.

## AI assistance

Codex assisted with setup and implementation. Changes are checked through component tests, builds and browser review.
