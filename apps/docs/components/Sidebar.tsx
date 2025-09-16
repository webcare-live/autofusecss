import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Search from "./Search";
import ActiveLink from "./ActiveLink";
import { buildSearchIndex } from "../lib/search-index";
import Collapse from "./Collapse";
import DocTOC from "./DocTOC";
import { workspaceDocsRoot } from "../lib/mdx";

export default async function Sidebar() {
  const root = workspaceDocsRoot();
  const files = (await fs.readdir(root))
    .filter((f) => f.endsWith(".md"))
    .sort();
  const utilDir = path.join(root, "utilities");
  const utilFiles = (await fs.readdir(utilDir))
    .filter((f) => f.endsWith(".md"))
    .sort();

  const searchItems = [
    ...files.map((f) => ({
      href: `/doc/${f.replace(/\.md$/, "")}`,
      label: f.replace(/\.md$/, ""),
    })),
    ...utilFiles.map((f) => ({
      href: `/doc/utilities/${f.replace(/\.md$/, "")}`,
      label: f.replace(/\.md$/, ""),
    })),
    ...(await buildSearchIndex()),
  ];
  const pretty = (raw: string) => {
    // Turn '01-AUTOFUSECSS-SPEC' into '01. AutofuseCSS Spec'
    const m = raw.match(/^(\d+)[-_.]\s*(.*)$/);
    let head = '', rest = raw;
    if (m) { head = m[1] + '. '; rest = m[2]; }
    const words = rest.split(/[-_]+/).map((w) => w.toLowerCase()).map((w) => w.charAt(0).toUpperCase() + w.slice(1));
    return head + words.join(' ');
  };
  return (
    <aside className="af-sidebar-modern">
      <div className="af-sidebar-content">
        <Search items={searchItems} />
        <div className="af-sidebar-sections">
          <Collapse id="docs" title="Documentation" defaultOpen={true}>
            <nav className="af-nav-sections">
              {files.map((f) => {
                const href = `/doc/${f.replace(/\.md$/, "")}`;
                const label = pretty(f.replace(/\.md$/, ""));
                return (
                  <ActiveLink key={f} href={href}>
                    {label}
                  </ActiveLink>
                );
              })}
            </nav>
          </Collapse>
          <Collapse id="utilities" title="Utilities" defaultOpen={true}>
            <nav className="af-nav-sections">
              {utilFiles.map((f) => {
                const href = `/doc/utilities/${f.replace(/\.md$/, "")}`;
                const label = pretty(f.replace(/\.md$/, ""));
                return (
                  <ActiveLink key={f} href={href}>
                    {label}
                  </ActiveLink>
                );
              })}
            </nav>
          </Collapse>
        </div>
        <DocTOC />
      </div>
    </aside>
  );
}
