"use client";

import React from 'react';
import { AutofuseProvider } from 'autofusecss/react';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <AutofuseProvider>{children}</AutofuseProvider>;
}

