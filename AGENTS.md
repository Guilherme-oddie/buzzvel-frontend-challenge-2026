# Agent guidelines

## Communication

- Respond in Brazilian Portuguese (pt-BR); keep code, identifiers, comments, tests, documentation, tickets, commits and PRs in English.
- Be concise, direct and factual. Explain the result, relevant evidence, validation and material limitations.
- Explain the intended action before using tools and provide useful progress updates during sustained work, about every 60 seconds.
- Distinguish verified facts, assumptions and proposals; never invent access, remembered preferences or completed checks.
- Continue authorized work without repeated permission requests. Direct user instructions take precedence over these repository defaults.
- Keep documentation specific to this challenge and avoid references to unrelated companies or projects.

## Implementation and reuse

- Use React, Next.js App Router, TypeScript, Tailwind CSS and pnpm; follow existing component organization and framework conventions.
- Before every new method or refactor, explicitly search with `rg` for equivalent helpers and reuse them when appropriate.
- Before creating UI or styles, search shared components and existing patterns, including buttons, typography, inputs, labels, selects and icons.
- Prefer shared primitives over duplicate controls or raw HTML in feature components when an equivalent exists. Native HTML is appropriate inside a primitive or when no suitable shared component exists.
- Preserve design fidelity; do not force reuse through brittle overrides. Record a concrete reason when an existing primitive cannot fit.
- Search shared icons before adding one. Follow the established typed React API and registry when present; otherwise establish one reusable pattern, avoiding duplicate glyphs, feature-specific names or parallel rendering systems.

## Design and tickets

- Confirm access to external references before relying on them. Inspect Figma through the browser for this project.
- If a referenced node or required visual property cannot be inspected, report the gap and pause that part instead of inventing a value.
- Distinguish measured design values from implementation decisions for unspecified responsive or interaction behavior; document material assumptions briefly.
- Explain long English tickets in pt-BR first: objective, reproduction steps where relevant, current and expected behavior, acceptance criteria and ambiguities.
- An initial ticket analysis does not authorize implementation. Inspect the branch/worktree, references, affected files, reusable code, proposed approach, risks and validation scope.
- When estimating, briefly explain the work in simple Portuguese, use the user's scale and state material assumptions.
- Write tickets with context, scope, observable acceptance criteria, validation and a design reference. Include responsiveness and accessibility in every UI ticket.

## Branches and commits

- Keep `main` stable and integrate work through `dev`.
- Start focused branches from `dev`: `feat/<issue>-<slug>`, `fix/<issue>-<slug>`, `refactor/<issue>-<slug>` or `chore/<issue>-<slug>`.
- Link work to its GitHub issue and keep Project status current: Backlog, Ready, In progress, In review, Done.
- Open focused PRs targeting `dev`; avoid direct changes to `dev` or `main`. A ticket may span multiple focused PRs when necessary.
- When a PR depends on an unmerged setup or feature PR, branch from and temporarily target that parent branch; retarget `dev` after the dependency is merged.
- Use concise, action-oriented commits exactly as `<type>: <description>`, without a scope. Allowed types: `fix`, `feat`, `refactor`, `chore`.
- Example: `fix: show email validation error`.
- Use tools available on the current platform; do not assume machine-specific executable paths.

## Pull requests

- Create PRs ready for review by default; use a draft only when explicitly requested.
- Use titles `<Type>/#<issue>: <short imperative summary> [<target>]`. Types: `Feat`, `Fix`, `Refactor`, `Chore`. Targets: `DEV`, `Main` or `PARENT` for a dependent PR; use sentence case.
- Follow `.github/PULL_REQUEST_TEMPLATE.md`. Link the GitHub issue with its full URL and retain relevant screenshots when updating the body.
- Keep `Describe your changes` to one or two short paragraphs about the final behavior. Avoid commit-by-commit narration and an extra validation summary unless requested.
- Keep `How to test` practical, usually three or four steps covering the main flow and important regressions. Disclose known failures and limitations there when relevant.
- Review the diff before requesting review; check a checklist item only when the corresponding work has actually been performed.
- Include desktop and mobile screenshots for visual changes. When providing a copyable PR body in chat, return the complete body in one fenced `md` block.
- Confirm the exact content before posting PR/issue comments or external messages. A requested review report does not authorize replies or resolving review threads.
- Squash feature PRs after review and checks. After final QA, open `release/<version>` into `main`, preserve history when merging the release PR, then tag and publish `v<version>`.

## Tests and validation

- Add focused spec/test files for UI components, form/schema validation, or where neighboring files already establish that pattern. Add regression tests for nontrivial hooks/utilities when behavior warrants them; do not add tests for trivial copy or styling changes merely to increase coverage.
- Keep tests beside the component or utility they cover. Test observable behavior, relevant props, events, interactions, validation and failure states.
- Follow existing snapshot conventions when present; do not rely on snapshots alone for interactive behavior. Keep end-to-end tests focused on critical page flows.
- Run relevant configured tests and lint/type checks; run the production build for application or build configuration changes. Do not invent scripts that do not exist yet.
- Check UI changes on desktop, mobile and intermediate widths, including keyboard navigation, visible focus and reduced-motion behavior where applicable.
- Record only commands actually run and their results; disclose skipped or failing checks accurately.

## Local services

- Before starting a service, inspect running processes, listening ports and working directories. Reuse a suitable existing instance instead of starting a duplicate.
- Notify the user in pt-BR when Codex starts or stops a service. Include the service name, URL or port and PID when available.
- Do not stop or restart the user's services without authorization. Distinguish pre-existing services from those started by Codex.
- In the final response, list services started by Codex that remain running, after checking their status. Do not imply continuous monitoring or access to terminal history.

## Implementing review feedback

- Report changes comment by comment in pt-BR, preserving review order, reviewer name and the direct comment link.
- For each comment, quote the original request (label shortened excerpts), link the changed local file, show actual old and new code, and explain the difference.
- For moves or renames, show both paths or imports. Keep shared fixes traceable to each comment and identify partial or unresolved requests.
- Report validation and commit status accurately. Do not post replies or resolve threads without the required authorization.
