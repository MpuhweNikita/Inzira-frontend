import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import { ToastProvider } from '@/components/ui/Toast';
import { PageTransition } from '@/components/ui/PageTransition';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: 'Inzira | AI Career Platform',
  description: 'Accelerate your career with AI-powered resume analysis, skill gap detection, roadmaps, and mock interviews.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} font-sans`}>
      <body className="bg-[#f5f5f5] text-[#0e0e18] antialiased">
        <ToastProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </ToastProvider>
      </body>
    </html>
  );
}
