import './globals.css';
import NavigationBar from '@/components/ui/NavigationBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'COSMIC ADV Solutions',
  description: 'Experienced Company For Advertising Solutions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
