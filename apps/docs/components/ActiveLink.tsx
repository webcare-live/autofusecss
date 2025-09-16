"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active =
    pathname === href ||
    (pathname?.startsWith("/doc/") &&
      href.startsWith("/doc/") &&
      pathname.split("#")[0] === href.split("#")[0]);
  return (
    <Link
      href={href}
      className={`af-nav-link-sidebar ${active ? "af-nav-link-active" : ""}`}
    >
      {children}
    </Link>
  );
}
