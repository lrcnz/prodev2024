import { type Viewport } from 'next';

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
