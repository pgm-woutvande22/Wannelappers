# CLAUDE.md

Guidance for Claude when working in this repository.

## Project

<!-- TODO: 1–3 sentences on what this app does and who it's for. -->
[Project name] is a SvelteKit web app that ...

## Stack

- **Svelte 5** (runes mode) + **SvelteKit**
- **TypeScript** (strict)
- **Vite** as dev server and bundler
- Package manager: **npm** <!-- change to pnpm / bun if needed -->
<!-- TODO: add what applies: Tailwind, Supabase, Prisma/Drizzle, Vitest, Playwright, adapter-vercel/node/static, ... -->

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (http://localhost:5173)
npm run build        # production build
npm run preview      # preview the production build
npm run check        # svelte-check + TypeScript
npm run lint         # ESLint + Prettier check
npm run format       # Prettier write
npm run test         # unit tests (Vitest), if configured
```

Before saying a task is done, run `npm run check` and `npm run lint` and fix any errors you introduced.

## Project structure

```
src/
  routes/            # SvelteKit routes (+page.svelte, +layout.svelte, +page.ts, +page.server.ts, +server.ts)
  lib/
    components/      # reusable UI components (PascalCase.svelte)
    server/          # server-only code (DB, secrets) – never import from client code
    stores/ or state/  # shared reactive state (*.svelte.ts)
    utils/           # pure helper functions
    types/           # shared TypeScript types
  app.html
  app.d.ts           # App.Locals, App.PageData, App.Error types
static/              # static assets served as-is
```

Import from `src/lib` via the `$lib` alias, never with long relative paths.

## Svelte 5 conventions

Use **runes** and the new syntax everywhere. Do not write Svelte 4 patterns.

- State: `let count = $state(0)`; derived values: `const double = $derived(count * 2)` (or `$derived.by(() => ...)` for multi-line logic).
- Props: `let { title, items = [], onselect }: Props = $props();` with a `Props` interface in the same file.
- Two-way binding on a prop only when really needed: `let { value = $bindable() } = $props();`
- Events: use attributes, `onclick={handle}`, **not** `on:click`. Component events are callback props (`onselect`), **not** `createEventDispatcher`.
- Content: use **snippets** (`{#snippet}` / `{@render children()}`), **not** `<slot>`.
- `$effect` only for real side effects (DOM, timers, external libraries). Never use it to sync or compute state; use `$derived` instead.
- Shared state lives in `.svelte.ts` files using runes (e.g. a class with `$state` fields). Use Svelte stores only when a library requires them.
- Keep components small. If a component exceeds ~200 lines or does more than one job, split it.

## SvelteKit conventions

- Data loading happens in `load` functions, not in `onMount` fetches.
  - `+page.server.ts` for anything touching secrets, the database or private APIs.
  - `+page.ts` for public data that can also load on the client.
- Mutations use **form actions** (`export const actions`) with `use:enhance`, unless there is a good reason for a `+server.ts` endpoint.
- Environment variables: `$env/static/private` / `$env/dynamic/private` only in server files; anything public must be prefixed `PUBLIC_`.
- Never import from `$lib/server` in client-side code.
- Return errors with `error(404, 'Not found')` and redirects with `redirect(303, '/path')` from `@sveltejs/kit`.
- Type `load` and actions with the generated `./$types` (`PageServerLoad`, `Actions`, etc.).

## Code style

- TypeScript everywhere (`<script lang="ts">`). No `any`; prefer explicit interfaces for props and API data.
- Components: `PascalCase.svelte`. Utilities and state files: `camelCase.ts` / `camelCase.svelte.ts`.
- Formatting is handled by Prettier (with `prettier-plugin-svelte`); don't hand-format against it.
- Styles: <!-- choose one --> component-scoped `<style>` blocks / Tailwind utility classes. Use CSS custom properties for colors and spacing; no hard-coded hex values scattered through components.
- Accessibility matters: semantic HTML, `<button>` for actions (not clickable `<div>`s), labels on form fields, `alt` on images, visible focus states. Fix svelte-check a11y warnings rather than ignoring them.

## Working rules for Claude

- Read the relevant files before changing them, and match the existing patterns in this repo.
- Keep changes focused on the task; don't refactor unrelated code or rename things without asking.
- Ask before adding a new dependency, and prefer what the project already uses.
- Don't touch `.env` files or commit secrets. Add new variables to `.env.example` instead.
- When adding a feature, also update types and, if tests exist, add or update a test.
- If something is ambiguous (UX, data shape, naming), ask a short question instead of guessing.

## Notes

<!-- TODO: anything project-specific: API base URLs, design tokens, known quirks, deployment target, etc. -->