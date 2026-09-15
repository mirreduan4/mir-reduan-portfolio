import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://redoxide.dev'),
  title: 'REDOXIDE — Digital Creator · AI Explorer · Tech Enthusiast',
  description:
    'REDOXIDE — a multidisciplinary digital creator exploring AI, technology, visual design, content creation, photography and interactive digital experiences.',
  keywords: [
    'REDOXIDE',
    'Digital Creator',
    'AI Explorer',
    'Tech Enthusiast',
    'Creative Technologist',
    'Interactive Web',
    'Visual Storytelling'
  ],
  authors: [{ name: 'REDOXIDE' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'REDOXIDE — Digital Creator · AI Explorer · Tech Enthusiast',
    description:
      'REDOXIDE — a multidisciplinary digital creator exploring AI, technology, visual design, content creation, photography and interactive digital experiences.',
    images: [
      {
        url: '/images/portrait.png',
        width: 1200,
        height: 1500,
        alt: 'REDOXIDE Cinematic Portrait',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REDOXIDE — Digital Creator · AI Explorer · Tech Enthusiast',
    description:
      'REDOXIDE — a multidisciplinary digital creator exploring AI, technology, visual design, content creation, photography and interactive digital experiences.',
    images: ['/images/portrait.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased selection:bg-red-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
