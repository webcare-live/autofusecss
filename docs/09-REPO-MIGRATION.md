Repository Migration Guide — Monorepo → Standalone

Goal
- Move AutofuseCSS to `/Users/ivancirlig/Desktop/autofusecss` and push to `github.com/webcare-live/autofusecss`.

Steps

01. Export files

bash scripts/export-autofusecss.sh /Users/ivancirlig/Desktop/autofusecss

02. Initialize git and push

cd /Users/ivancirlig/Desktop/autofusecss
git init
git add -A
git commit -m "chore: init autofusecss from math monorepo"
git branch -M main
git remote add origin git@github.com:webcare-live/autofusecss.git
git push -u origin main

03. Publish placeholder to npm

pnpm install
pnpm build
npm publish --access public

04. Re-integrate in Math Platform

- Use dependency `autofusecss@^0.x` in `apps/web/package.json`, or keep `workspace:*` for local development.

Notes
- This guide assumes local GitHub authentication via SSH.
- Do not remove the package from the monorepo until the standalone flow is stable.

