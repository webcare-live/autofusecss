Docs Search & Nav — Spec

Goal
- Client‑side search across files and headings with persistent active‑link highlighting in the sidebar.

Implementation
- Build an index on the server by reading `docs/` and `docs/utilities/` and extracting markdown headings via regex.
- Slug headings using `github-slugger` to match `rehype-slug` ids.
- Serialize items to the `Search` client component: `{ href, label, type }` where type is `file | heading`.
- Sidebar renders links with a `ActiveLink` client component that uses `usePathname()` to highlight the current entry.

Files
- `apps/docs/lib/search-index.ts` — builds the index
- `apps/docs/components/Search.tsx` — client UI with filter box
- `apps/docs/components/ActiveLink.tsx` — highlighting based on pathname
- `apps/docs/components/Sidebar.tsx` — wires everything together

Next
- Index H2–H3 only for noise reduction
- Add fuzzy match ranking and keyboard navigation
- Persist recent pages in localStorage

