import '../../../src/css/styles.css';
import ClientProvider from '../components/ClientProvider';
import HeaderControls from '../components/HeaderControls';
import React from 'react';
import Sidebar from '../components/Sidebar';

export const metadata = { title: 'AutofuseCSS Docs' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}><strong>AutofuseCSS</strong> Docs</a>
              <nav style={{ display: 'flex', gap: '1rem' }}>
                <a href="/doc/01-AUTOFUSECSS-SPEC">Spec</a>
                <a href="/utilities">Utilities</a>
                <a href="/studio">Studio</a>
              </nav>
              <HeaderControls />
            </header>
            <Sidebar />
            <main>{children}</main>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
