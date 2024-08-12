import { Inter, Roboto } from 'next/font/google';
import './globals.css';

import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'COSMIC ADV Solutions',
  description: 'Experienced Company For Advertising Solutions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
