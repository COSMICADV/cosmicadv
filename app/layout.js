import './globals.css';
import NavigationBar from '@/components/ui/NavigationBar';
import Footer from '@/components/Footer';
import Head from 'next/head';

export const metadata = {
  title: 'COSMIC ADV Solutions',
  description: 'Experienced Company For Advertising Solutions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
