import './globals.css';
import Navbar from './components/Navbar';
import type { Metadata } from 'next'; // 1. Import Next.js specific type for metadata

// 2. Strongly type the metadata object
export const metadata: Metadata = {
  title: 'Jacob Arrowsmith | Portfolio',
  description: 'Full Stack Developer based in the UK.',
};

// 3. Define props interface: 'children' is a React Node
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}