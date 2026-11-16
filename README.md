# Buzzvel Frontend Challenge 2026

Responsive page for Buzzvel's frontend coding challenge.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS and pnpm.

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
