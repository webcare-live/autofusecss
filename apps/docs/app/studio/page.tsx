"use client";

import React from 'react';
import { ThemeStudio } from 'autofusecss/react';

export default function StudioPage() {
  return (
    <div className="af-studio-page">
      <div className="af-studio-page-header">
        <h1 className="af-studio-page-title">Theme Studio</h1>
        <p className="af-studio-page-subtitle">
          Craft your perfect design system with real-time visual feedback and live token updates.
        </p>
      </div>
      <div className="af-studio-container">
        <ThemeStudio />
      </div>
    </div>
  );
}

