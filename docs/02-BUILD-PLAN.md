AutofuseCSS — Build Plan (Numbered)

01. Name & Handles

- Check npm availability: `npm view autofusecss` (404 = free). Done during planning.
- Prepare placeholder package in `packages/autofusecss`. Done.
- Publish when ready: `pnpm --filter autofusecss build && npm publish --access public` (requires npm token).
- Create GitHub org/repo `autofusecss` and mirror the spec and plan.

02. Package Skeleton (this commit)

- `src/tokens.ts`: tokens schema + defaults + clamp + CSS variable builder.
- `src/css/styles.css`: minimal base utilities.
- `src/react/Provider.tsx`: SSR-safe Provider that injects CSS variables.
- `src/tailwind/index.ts`: Tailwind plugin to expose tokens.
- `src/index.ts`: public exports.
- `package.json` exports map + `styles.css` export.

03. Local Build & Verify

- Install deps: `pnpm install` (workspace), or `pnpm --filter autofusecss install`.
- Build: `pnpm --filter autofusecss build`.
- CLI (optional, local): `pnpm --filter autofusecss exec autofusecss init && pnpm --filter autofusecss exec autofusecss build` (writes `autofuse.css`).
- Smoke import in a sandbox app: `import "autofusecss/styles.css";` and use `<AutofuseProvider/>`.

04. Initial Feature Set (M1)

- Fluid typography scale (xs–7xl) using clamp.
- Fluid spacing scale (0–20) using clamp.
- Semantic colors with CSS variables; light/dark via `[data-theme]`.
- Utilities subset: container, stack, spacing, text sizes, a few color helpers.
- Tailwind plugin maps tokens to `theme.extend`.

05. Documentation

- Phase spec: `01-AUTOFUSECSS-SPEC.md` (this folder).
- Package README with quick start. Done.
- Add examples in `examples/` (later).

06. M2 — CLI & Config

- `autofusecss.config.ts` typed config + `defineConfig` helper.
- CLI: `autofusecss init` to scaffold config; `autofusecss build` to emit `styles.css` with pruned utilities.
- Add themes (light/dark/high-contrast) presets.

07. M3 — Docs & Playground

- Next.js docs app: live tokens editor, copy CSS, Tailwind config exporter.
- A11y samples and color contrast validation.

08. Integration in Math Platform

- Add `autofusecss` as dependency in `apps/web` and import `styles.css` globally or via Tailwind plugin.
- Replace ad-hoc rhythm helpers with `af-stack-*`.
- Gate behind feature flag to avoid disruptive visual changes.

09. QA & Testing

- Unit tests: token merging, clamp outputs, plugin mapping (Vitest/Jest).
- E2E smoke in `apps/web` pages to ensure no layout regressions.

10. Release

- Version `0.1.0` after M1 QA.
- Publish release notes with migration guidance and examples.
