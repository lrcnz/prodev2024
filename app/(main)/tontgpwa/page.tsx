import { type Metadata, type Viewport } from 'next';

import { Footer } from './components/Footer';
import { HomeHeader } from './components/HomeHeader';
import { HomeMain } from './components/HomeMain';

export const viewport: Viewport = {
  themeColor: '#3270ef',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Gluon Money',
  description: 'Gluon Money',
};

const PWAPage = () => {
  return (
    <div className="text-[#F7F6F0] select-none">
      <HomeHeader />
      <HomeMain />
      <Footer active="earn" />
    </div>
  );
};

export default PWAPage;
