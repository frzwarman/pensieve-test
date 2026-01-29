import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space',
});

export const metadata = {
  title: 'Pokédex',
  description: 'Modern Pokédex',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} p-5`}>
        {children}
      </body>
    </html>
  );
}
