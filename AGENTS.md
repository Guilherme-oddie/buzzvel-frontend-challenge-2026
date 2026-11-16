# Contribution guidelines

## Workflow

- Keep `main` stable and integrate work through `dev`.
- Start focused branches from `dev`: `feat/<issue>-<slug>`, `fix/<issue>-<slug>` or `chore/<issue>-<slug>`.
- Open focused PRs targeting `dev` and link the ticket; avoid direct changes to `dev` or `main`.
- Keep the linked issue and Project status current: Backlog, Ready, In progress, In review, Done.
- Merge feature PRs after review and checks, using squash merge.
- After final QA, open `release/<version>` into `main`; preserve history when merging the release PR, then tag and publish `v<version>`.

## Commits and PRs

- Write commits, tickets and PRs in English.
- Use Conventional Commits: `type(scope): short imperative description`.
- Describe the problem and resulting behavior, link the issue and list validation results.
- Include desktop and mobile screenshots for visual changes.
- Review the diff before requesting review; disclose failing checks and known limitations.
- Keep documentation brief and specific to this challenge.

## Tickets

- Include context, scope, acceptance criteria, validation and a design reference.
- Make acceptance criteria observable and keep tickets small; split a ticket across focused PRs when needed.
- Include responsiveness and accessibility in every UI ticket.

## Validation

- Test observable behavior, interactions, validation and failure states where relevant.
- Keep component tests beside components and utility tests beside utilities.
- Use unit/component tests for focused behavior and end-to-end tests for critical flows.
- Run relevant configured checks; run the production build for application or build configuration changes.
- Check UI changes on desktop, mobile and intermediate widths, including keyboard navigation.
- Record commands actually run and their results; never claim an unrun check passed.
