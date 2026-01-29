import './globals.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';

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
      <body className='p-5'>{children}</body>
    </html>
  );
}
