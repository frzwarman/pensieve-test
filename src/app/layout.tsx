import './globals.css';

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
