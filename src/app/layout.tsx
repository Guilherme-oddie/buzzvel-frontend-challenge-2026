import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luma — Learn at your own pace',
  description: 'Practical courses taught by people who do the work every day.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="top" className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-lg bg-white p-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
