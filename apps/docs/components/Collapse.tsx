"use client";

import React from "react";

export default function Collapse({
  id,
  title,
  children,
  defaultOpen = true,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  // Start from a deterministic SSR value to avoid hydration mismatches.
  const [open, setOpen] = React.useState<boolean>(defaultOpen);
  // After hydration, read the persisted value (if any).
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("collapse:" + id);
      if (saved != null) setOpen(saved === "1");
    } catch {}
  }, [id]);
  // Persist on changes.
  React.useEffect(() => {
    try {
      localStorage.setItem("collapse:" + id, open ? "1" : "0");
    } catch {}
  }, [id, open]);
  return (
    <div className="af-collapse-section">
      <button
        onClick={() => setOpen((o) => !o)}
        className="af-collapse-trigger"
        aria-expanded={open ? "true" : "false"}
      >
        <span
          className={`af-collapse-icon ${open ? "af-collapse-icon-open" : ""}`}
        >
          ▶
        </span>
        <span className="af-collapse-title">{title}</span>
      </button>
      {open && <div className="af-collapse-content">{children}</div>}
    </div>
  );
}
