'use client';

import { Footer } from './components/Footer';
import { HomeHeader } from './components/HomeHeader';
import { HomeMain } from './components/HomeMain';

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
