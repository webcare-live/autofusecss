import 'autofusecss/styles.css';
import ClientProvider from '../components/ClientProvider';
import HeaderControls from '../components/HeaderControls';
import React from 'react';
import Sidebar from '../components/Sidebar';

export const metadata = { title: 'AutofuseCSS Docs' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="af-font-inter">
        <ClientProvider>
          <div className="af-min-h-screen af-bg-gradient">
            {/* Modern Header */}
            <header className="af-header-modern">
              <div className="af-container af-flex af-justify-between af-items-center af-py-4">
                <a href="/" className="af-brand">
                  <div className="af-brand-icon">⚡</div>
                  <div>
                    <div className="af-brand-name">AutofuseCSS</div>
                    <div className="af-brand-tagline">Modern Design System</div>
                  </div>
                </a>
                <nav className="af-nav-modern">
                  <a href="/doc/01-AUTOFUSECSS-SPEC" className="af-nav-link">Spec</a>
                  <a href="/utilities" className="af-nav-link">Utilities</a>
                  <a href="/studio" className="af-nav-link af-nav-link-primary">Studio</a>
                </nav>
                <HeaderControls />
              </div>
            </header>
            
            {/* Main Content Area */}
            <div className="af-main-layout">
              <Sidebar />
              <main className="af-main-content">{children}</main>
            </div>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
