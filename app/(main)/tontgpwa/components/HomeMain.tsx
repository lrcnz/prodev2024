'use client';
import WebApp from '@twa-dev/sdk';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import GrowthIcon from '../assets/icons/growth.png';
import InsuranceIcon from '../assets/icons/insurance.png';
import MicroLendingIcon from '../assets/icons/micro-lending.png';
import RemittenceIcon from '../assets/icons/remittence.png';
import SavingsIcon from '../assets/icons/savings.png';

import { cn } from '@/lib/utils';

const Card = ({
  icon,
  title,
  describe,
  apr,
  className,
  onClick,
}: {
  className?: string;
  icon?: any;
  title: React.ReactNode;
  describe: React.ReactNode;
  apr: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn('text-[#111111] justify-between p-3 bg-white rounded-xl items-center gap-5 inline-flex', className)}
    >
      <div className="h-12 items-center gap-2 flex">
        <div className="rounded-[48px] justify-center items-center">
          <Image src={icon} className="w-12 h-12 relative" alt="icon" />
        </div>
        <div className="flex-col gap-0.5 flex">
          <div className="text-base">{title}</div>
          <div className="text-[#92918e] text-sm">{describe}</div>
        </div>
      </div>
      <div className="px-2.5 py-1 bg-[#111111]/10 rounded-2xl justify-center items-center flex">
        <div className="text-center text-xs">{apr}</div>
      </div>
    </div>
  );
};

export const HomeMain = () => {
  const router = useRouter();

  useEffect(() => {
    const param = WebApp.initDataUnsafe.start_param;
    if (param) {
      router.push(`/tontgpwa/${param}`);
    }
  }, [router]);

  return (
    <div className="bg-[#F7F6F1] text-[#111111] px-4 flex flex-col mb-24">
      <div className="flex items-center justify-between mt-6">
        <div className="text-2xl font-bold">Featured Products</div>
        <div className="text-right text-[#007aff] text-base">See All</div>
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <Card
          onClick={() => router.push('/tontgpwa/savings')}
          icon={SavingsIcon}
          title="Super Savings"
          describe="SuperState"
          apr="5.60%"
        />
        <Card
          onClick={() => router.push('/tontgpwa/growth')}
          icon={GrowthIcon}
          title="Super Growth"
          describe="Gluon Protocol"
          apr="8.50%"
        />
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="text-2xl font-bold">Coming Soon</div>
        <div className="text-right text-[#007aff] text-base">See All</div>
      </div>
      <div className="grid grid-cols-3 gap-3 my-3 mb-32">
        {[
          {
            title: 'Remittence',
            icon: RemittenceIcon,
          },
          {
            title: 'Insurance',
            icon: InsuranceIcon,
          },
          {
            title: 'Micro Lending',
            icon: MicroLendingIcon,
          },
        ].map(({ title, icon }, i) => (
          <div key={i} className="py-3 bg-white rounded-xl flex-col justify-center items-center gap-2 flex">
            <div className="justify-center items-center inline-flex">
              <Image src={icon} alt={title} className="w-12 h-12 relative" />
            </div>
            <div className="text-center text-[#333333] text-sm">{title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
