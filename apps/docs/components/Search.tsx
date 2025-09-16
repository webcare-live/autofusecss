"use client";

import React from "react";
import Link from "next/link";

export default function Search({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [q, setQ] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(q.toLowerCase())
  );

  React.useEffect(() => {
    setIsOpen(q.length > 0);
  }, [q]);

  return (
    <div className="af-search-container">
      <div className="af-search-input-wrapper">
        <span className="af-search-icon">🔍</span>
        <input
          id="af-docs-search"
          className="af-search-input"
          placeholder="Search documentation..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setIsOpen(q.length > 0)}
        />
        {q && (
          <button
            className="af-search-clear"
            onClick={() => setQ("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {isOpen && (
        <div className="af-search-results">
          {filtered.length === 0 ? (
            <div className="af-search-no-results">
              <span>📋</span>
              <span>No results found</span>
            </div>
          ) : (
            <>
              <div className="af-search-results-header">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </div>
              {filtered.slice(0, 8).map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="af-search-result-item"
                  onClick={() => setQ("")}
                >
                  <span className="af-search-result-icon">📄</span>
                  <span className="af-search-result-label">{i.label}</span>
                </Link>
              ))}
              {filtered.length > 8 && (
                <div className="af-search-more">
                  +{filtered.length - 8} more results
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
